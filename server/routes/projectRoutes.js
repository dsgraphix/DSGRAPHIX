import express from 'express';
import {
  getPublicProjects,
  getPublicProjectBySlugOrId,
  getAdminProjects,
  getAdminProjectById,
  createProject,
  updateProject,
  deleteProject,
  patchProject,
  uploadImageFile,
  uploadMultipleImageFiles
} from '../controllers/projectController.js';
import { verifyAuth } from '../middleware/auth.js';
import { uploadImage } from '../middleware/upload.js';

const router = express.Router();

// Public routes (Read-only, published projects)
router.get('/projects', getPublicProjects);
router.get('/projects/:identifier', getPublicProjectBySlugOrId);

// Protected Admin routes (Full CRUD + Draft management)
router.get('/admin/projects', verifyAuth, getAdminProjects);
router.get('/admin/projects/:id', verifyAuth, getAdminProjectById);
router.post('/admin/projects', verifyAuth, uploadImage.any(), createProject);
router.put('/admin/projects/:id', verifyAuth, uploadImage.any(), updateProject);
router.delete('/admin/projects/:id', verifyAuth, deleteProject);
router.patch('/admin/projects/:id', verifyAuth, patchProject);
router.post('/admin/upload', verifyAuth, uploadImage.single('imageFile'), uploadImageFile);
router.post('/admin/upload-multiple', verifyAuth, uploadImage.array('imageFiles', 10), uploadMultipleImageFiles);

export default router;
