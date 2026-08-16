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
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB per file
  fileFilter,
});

// Helper to upload a single buffer to Cloudinary
async function uploadBufferToCloudinary(buffer) {
  return new Promise((resolve, reject) => {
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
    uploadStream.end(buffer);
  });
}

// Stream multiple files to Cloudinary concurrently
async function streamFilesToCloudinary(req, res, next) {
  try {
    // If single file in req.file
    if (req.file && req.file.buffer) {
      const result = await uploadBufferToCloudinary(req.file.buffer);
      req.file.path = result.secure_url;
      req.file.cloudinaryPublicId = result.public_id;
    }

    // If multiple files in req.files
    if (req.files) {
      if (Array.isArray(req.files)) {
        await Promise.all(
          req.files.map(async (file) => {
            if (file.buffer) {
              const result = await uploadBufferToCloudinary(file.buffer);
              file.path = result.secure_url;
              file.cloudinaryPublicId = result.public_id;
            }
          })
        );
      } else if (typeof req.files === 'object') {
        const fileLists = Object.values(req.files);
        await Promise.all(
          fileLists.flat().map(async (file) => {
            if (file.buffer) {
              const result = await uploadBufferToCloudinary(file.buffer);
              file.path = result.secure_url;
              file.cloudinaryPublicId = result.public_id;
            }
          })
        );
      }
    }

    next();
  } catch (err) {
    console.error('❌ Cloudinary upload error:', err);
    next(new Error(`Image upload to Cloudinary failed: ${err.message}`));
  }
}

export const uploadImage = {
  single: (fieldName) => {
    const multerMiddleware = multerUpload.single(fieldName);
    return (req, res, next) => {
      multerMiddleware(req, res, (err) => {
        if (err) return next(err);
        streamFilesToCloudinary(req, res, next);
      });
    };
  },
  array: (fieldName, maxCount = 10) => {
    const multerMiddleware = multerUpload.array(fieldName, maxCount);
    return (req, res, next) => {
      multerMiddleware(req, res, (err) => {
        if (err) return next(err);
        streamFilesToCloudinary(req, res, next);
      });
    };
  },
  fields: (fieldsConfig) => {
    const multerMiddleware = multerUpload.fields(fieldsConfig);
    return (req, res, next) => {
      multerMiddleware(req, res, (err) => {
        if (err) return next(err);
        streamFilesToCloudinary(req, res, next);
      });
    };
  },
  any: () => {
    const multerMiddleware = multerUpload.any();
    return (req, res, next) => {
      multerMiddleware(req, res, (err) => {
        if (err) return next(err);
        streamFilesToCloudinary(req, res, next);
      });
    };
  },
};
