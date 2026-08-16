import { v2 as cloudinary } from 'cloudinary';
import { config } from '../config/env.js';

cloudinary.config({
  cloud_name: config.cloudinaryCloudName,
  api_key: config.cloudinaryApiKey,
  api_secret: config.cloudinaryApiSecret,
  secure: true,
});

/**
 * Safely deletes an image asset from Cloudinary when replaced or soft-deleted
 * @param {string} imageUrl Full Cloudinary HTTPS URL
 */
export async function deleteCloudinaryImage(imageUrl) {
  if (!imageUrl || typeof imageUrl !== 'string' || !imageUrl.includes('cloudinary.com')) {
    return;
  }
  try {
    // Extract public_id including folder hierarchy (e.g. dsgraphix/projects/project-12345)
    const regex = /\/upload\/(?:v\d+\/)?([^\.]+)/;
    const match = imageUrl.match(regex);
    if (match && match[1]) {
      const publicId = match[1];
      await cloudinary.uploader.destroy(publicId);
      console.log(`🗑️  Deleted orphaned Cloudinary asset: ${publicId}`);
    }
  } catch (err) {
    console.error('⚠️  Failed to delete Cloudinary asset:', err.message);
  }
}

export default cloudinary;
