import * as projectService from '../services/projectService.js';
import { deleteCloudinaryImage } from '../services/cloudinaryService.js';

// Helper for validating project fields
function validateProjectInput(data, isUpdate = false) {
  const errors = {};

  if (!isUpdate || data.title !== undefined) {
    if (!data.title || typeof data.title !== 'string' || !data.title.trim()) {
      errors.title = 'Title is required';
    }
  }

  if (!isUpdate || data.client !== undefined) {
    if (!data.client || typeof data.client !== 'string' || !data.client.trim()) {
      errors.client = 'Client name is required';
    }
  }

  if (!isUpdate || data.category !== undefined) {
    const validCategories = ['UI/UX', 'Branding', 'Graphic', 'Video'];
    if (!data.category || !validCategories.includes(data.category)) {
      errors.category = `Category must be one of: ${validCategories.join(', ')}`;
    }
  }

  if (!isUpdate || data.excerpt !== undefined) {
    if (!data.excerpt || typeof data.excerpt !== 'string' || !data.excerpt.trim()) {
      errors.excerpt = 'Excerpt / summary description is required';
    }
  }

  // Ensure image or images exist
  const hasImage = data.image || (Array.isArray(data.images) && data.images.length > 0);
  if (!isUpdate && !hasImage) {
    errors.image = 'At least one project image is required';
  }

  if (Array.isArray(data.images) && data.images.length > 10) {
    errors.images = 'A project can contain a maximum of 10 images';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
}

// Helper to consolidate uploaded files and string image lists
function processUploadedImages(req) {
  let images = [];

  // 1. Check if existing images array passed as body
  if (req.body.images) {
    try {
      images = typeof req.body.images === 'string' ? JSON.parse(req.body.images) : req.body.images;
      if (!Array.isArray(images)) images = [];
    } catch {
      images = [];
    }
  } else if (req.body.image) {
    images = [req.body.image];
  }

  // 2. Add single file upload if present
  if (req.file?.path) {
    images.unshift(req.file.path);
  }

  // 3. Add multiple files upload if present
  if (req.files) {
    const fileList = Array.isArray(req.files)
      ? req.files
      : Object.values(req.files).flat();
    
    fileList.forEach(f => {
      if (f.path) images.push(f.path);
    });
  }

  // Deduplicate and enforce max 10 images limit
  images = Array.from(new Set(images.filter(Boolean))).slice(0, 10);
  return images;
}

// Public: GET published projects
export async function getPublicProjects(req, res) {
  try {
    const { category, search } = req.query;
    const projects = await projectService.getAllProjects({
      status: 'published',
      category,
      search
    });
    return res.status(200).json({ success: true, count: projects.length, data: projects });
  } catch (err) {
    console.error('Error fetching public projects:', err);
    return res.status(500).json({ error: 'Failed to fetch projects' });
  }
}

// Public: GET single project by slug or ID
export async function getPublicProjectBySlugOrId(req, res) {
  try {
    const { identifier } = req.params;
    let project = null;

    if (/^\d+$/.test(identifier)) {
      project = await projectService.getProjectById(identifier);
    } else {
      project = await projectService.getProjectBySlug(identifier);
    }

    if (!project || project.status !== 'published') {
      return res.status(404).json({ error: 'Project not found' });
    }

    return res.status(200).json({ success: true, data: project });
  } catch (err) {
    console.error('Error fetching project:', err);
    return res.status(500).json({ error: 'Failed to fetch project' });
  }
}

// Protected Admin: GET all projects (draft + published)
export async function getAdminProjects(req, res) {
  try {
    const { status, category, search } = req.query;
    const projects = await projectService.getAllProjects({
      status: status || null,
      category,
      search
    });
    return res.status(200).json({ success: true, count: projects.length, data: projects });
  } catch (err) {
    console.error('Error fetching admin projects:', err);
    return res.status(500).json({ error: 'Failed to fetch projects' });
  }
}

// Protected Admin: GET single project by ID
export async function getAdminProjectById(req, res) {
  try {
    const { id } = req.params;
    const project = await projectService.getProjectById(id);
    if (!project || project.status === 'deleted') {
      return res.status(404).json({ error: 'Project not found' });
    }
    return res.status(200).json({ success: true, data: project });
  } catch (err) {
    console.error('Error fetching project by ID:', err);
    return res.status(500).json({ error: 'Failed to fetch project' });
  }
}

// Protected Admin: POST create project
export async function createProject(req, res) {
  try {
    const input = { ...req.body };
    const images = processUploadedImages(req);

    input.images = images;
    input.image = images[0] || input.image || '';

    const { isValid, errors } = validateProjectInput(input, false);
    if (!isValid) {
      return res.status(400).json({ error: 'Validation failed', details: errors });
    }

    const newProject = await projectService.createProject(input);
    return res.status(201).json({
      success: true,
      message: 'Project created successfully',
      data: newProject
    });
  } catch (err) {
    console.error('Error creating project:', err);
    if (err.code === '23505') {
      return res.status(400).json({
        error: 'A project with this title or slug already exists',
        details: { title: 'A project with this title or slug already exists. Please choose a unique title or slug.' }
      });
    }
    return res.status(500).json({ error: err.message || 'Failed to create project' });
  }
}

// Protected Admin: PUT update project
export async function updateProject(req, res) {
  try {
    const { id } = req.params;
    const input = { ...req.body };

    const existing = await projectService.getProjectById(id);
    if (!existing || existing.status === 'deleted') {
      return res.status(404).json({ error: 'Project not found' });
    }

    const images = processUploadedImages(req);
    if (images.length > 0) {
      input.images = images;
      input.image = images[0];
    } else if (existing.images?.length > 0) {
      input.images = existing.images;
      input.image = existing.images[0];
    }

    const { isValid, errors } = validateProjectInput(input, true);
    if (!isValid) {
      return res.status(400).json({ error: 'Validation failed', details: errors });
    }

    const updated = await projectService.updateProject(id, input);
    return res.status(200).json({
      success: true,
      message: 'Project updated successfully',
      data: updated
    });
  } catch (err) {
    console.error('Error updating project:', err);
    if (err.code === '23505') {
      return res.status(400).json({
        error: 'A project with this title or slug already exists',
        details: { title: 'A project with this title or slug already exists. Please choose a unique title or slug.' }
      });
    }
    return res.status(500).json({ error: err.message || 'Failed to update project' });
  }
}

// Protected Admin: DELETE soft-delete project
export async function deleteProject(req, res) {
  try {
    const { id } = req.params;
    const existing = await projectService.getProjectById(id);
    if (!existing || existing.status === 'deleted') {
      return res.status(404).json({ error: 'Project not found' });
    }

    const deleted = await projectService.softDeleteProject(id);
    return res.status(200).json({
      success: true,
      message: 'Project archived/deleted successfully',
      data: deleted
    });
  } catch (err) {
    console.error('Error deleting project:', err);
    return res.status(500).json({ error: 'Failed to delete project' });
  }
}

// Protected Admin: PATCH quick status toggle or reorder
export async function patchProject(req, res) {
  try {
    const { id } = req.params;
    const { status, display_order, order } = req.body;

    const existing = await projectService.getProjectById(id);
    if (!existing || existing.status === 'deleted') {
      return res.status(404).json({ error: 'Project not found' });
    }

    if (status && !['draft', 'published'].includes(status)) {
      return res.status(400).json({ error: "Invalid status value. Must be 'draft' or 'published'." });
    }

    const patched = await projectService.patchProjectStatusOrOrder(id, {
      status,
      display_order: display_order !== undefined ? display_order : order
    });

    return res.status(200).json({
      success: true,
      message: 'Project updated successfully',
      data: patched
    });
  } catch (err) {
    console.error('Error patching project:', err);
    return res.status(500).json({ error: 'Failed to update project' });
  }
}

// Protected Admin: POST standalone single image upload
export async function uploadImageFile(req, res) {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No image file uploaded' });
    }
    const imageUrl = req.file.path; // Cloudinary permanent HTTPS URL
    return res.status(200).json({
      success: true,
      message: 'Image uploaded successfully to Cloudinary',
      url: imageUrl
    });
  } catch (err) {
    console.error('Error uploading image:', err);
    return res.status(500).json({ error: 'Failed to upload image' });
  }
}

// Protected Admin: POST standalone multiple images upload (up to 10)
export async function uploadMultipleImageFiles(req, res) {
  try {
    const fileList = Array.isArray(req.files) ? req.files : Object.values(req.files || {}).flat();
    if (!fileList || fileList.length === 0) {
      return res.status(400).json({ error: 'No image files uploaded' });
    }

    const urls = fileList.map(f => f.path).filter(Boolean).slice(0, 10);
    return res.status(200).json({
      success: true,
      message: `${urls.length} images uploaded successfully`,
      urls
    });
  } catch (err) {
    console.error('Error uploading multiple images:', err);
    return res.status(500).json({ error: 'Failed to upload images' });
  }
}
