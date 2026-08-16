import * as projectService from '../services/projectService.js';

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

  if (!isUpdate && !data.image) {
    errors.image = 'Project image is required';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
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

    // If an image file was uploaded via multipart/form-data
    if (req.file) {
      input.image = req.file.path; // Cloudinary returns permanent HTTPS URL in req.file.path
    }

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
    return res.status(500).json({ error: 'Failed to create project' });
  }
}

// Protected Admin: PUT update project
export async function updateProject(req, res) {
  try {
    const { id } = req.params;
    const input = { ...req.body };

    // If an image file was uploaded
    if (req.file) {
      input.image = req.file.path; // Cloudinary returns permanent HTTPS URL in req.file.path
    }

    const existing = await projectService.getProjectById(id);
    if (!existing || existing.status === 'deleted') {
      return res.status(404).json({ error: 'Project not found' });
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
    return res.status(500).json({ error: 'Failed to update project' });
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

// Protected Admin: POST standalone image upload
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
