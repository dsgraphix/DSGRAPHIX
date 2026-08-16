import multer from 'multer';
import cloudinary from '../services/cloudinaryService.js';

// Buffer files in memory — never touches local disk
const memoryStorage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
  const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'image/svg+xml'];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Invalid image format. Allowed: JPG, PNG, WEBP, GIF, SVG.'), false);
  }
};

const multerUpload = multer({
  storage: memoryStorage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
  fileFilter,
});

// Streams the in-memory buffer directly to Cloudinary, then injects the secure URL
// into req.file.path — exactly where the controllers expect it
async function streamToCloudinary(req, res, next) {
  if (!req.file || !req.file.buffer) return next(); // No file — skip

  try {
    const result = await new Promise((resolve, reject) => {
      const publicId = `project-${Date.now()}-${Math.round(Math.random() * 1e9)}`;
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          folder: 'dsgraphix/projects',
          public_id: publicId,
          transformation: [{ quality: 'auto', fetch_format: 'auto' }],
        },
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        }
      );
      uploadStream.end(req.file.buffer);
    });

    // Set path to Cloudinary's permanent HTTPS URL — controllers read req.file.path
    req.file.path = result.secure_url;
    req.file.cloudinaryPublicId = result.public_id;
    console.log(`✅ Cloudinary upload success: ${result.secure_url}`);
    next();
  } catch (err) {
    console.error('❌ Cloudinary upload_stream error:', err);
    next(new Error(`Image upload to Cloudinary failed: ${err.message}`));
  }
}

// Wraps both middlewares into a single .single() call — drop-in replacement,
// no route changes required
export const uploadImage = {
  single: (fieldName) => {
    const multerMiddleware = multerUpload.single(fieldName);
    return (req, res, next) => {
      multerMiddleware(req, res, (err) => {
        if (err) return next(err);
        streamToCloudinary(req, res, next);
      });
    };
  },
};
