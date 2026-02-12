// Cloudinary Configuration
// Similar to firebase.js setup

import { CloudinaryContext } from 'cloudinary-react';

// Your Cloudinary Configuration
// Get these from: https://cloudinary.com/console
const cloudinaryConfig = {
  cloudName: "dgtouikob",
};

export { cloudinaryConfig };

/**
 * Helper function to generate Cloudinary URLs
 * @param {string} publicId - The path/name of the image in Cloudinary (e.g., "covers/dance-destiny")
 * @param {object} transformations - Optional transformations (width, quality, format, etc.)
 * @returns {string} - Full Cloudinary URL
 */
export function getCloudinaryUrl(publicId, transformations = {}) {
  const {
    width,
    height,
    crop = 'fill',
    quality = 'auto',
    format = 'auto',
  } = transformations;

  const baseUrl = `https://res.cloudinary.com/${cloudinaryConfig.cloudName}/image/upload`;
  
  // Build transformation string
  const transforms = [];
  if (width) transforms.push(`w_${width}`);
  if (height) transforms.push(`h_${height}`);
  if (crop) transforms.push(`c_${crop}`);
  transforms.push(`q_${quality}`);
  transforms.push(`f_${format}`);
  
  const transformString = transforms.join(',');
  
  return `${baseUrl}/${transformString}/${publicId}`;
}

/**
 * Helper function for video URLs
 * @param {string} publicId - The path/name of the video in Cloudinary
 * @returns {string} - Full Cloudinary video URL
 */
export function getCloudinaryVideoUrl(publicId, transformations = {}) {
  const {
    width,
    quality = 'auto',
    format = 'auto',
  } = transformations;

  const baseUrl = `https://res.cloudinary.com/${cloudinaryConfig.cloudName}/video/upload`;
  
  const transforms = [];
  if (width) transforms.push(`w_${width}`);
  transforms.push(`q_${quality}`);
  transforms.push(`f_${format}`);
  
  const transformString = transforms.join(',');
  
  return `${baseUrl}/${transformString}/${publicId}`;
}

/**
 * Optimize an existing Cloudinary video URL by adding transformations
 * Balanced for quality and file size (targets ~3-5MB for background clips)
 * @param {string} url - Full Cloudinary URL
 * @returns {string} - Optimized Cloudinary URL
 */
export function optimizeCloudinaryVideoUrl(url) {
  if (!url || !url.includes('cloudinary.com')) return url;
  
  // Extract the public ID from the URL
  // Example: https://res.cloudinary.com/dgtouikob/video/upload/v1770421887/NaturoSynth_-_PHANTOM_V3_1_xyooxb.mov
  const regex = /\/video\/upload\/(?:v\d+\/)?(.+)$/;
  const match = url.match(regex);
  
  if (!match) return url;
  
  const publicId = match[1];
  const cloudName = url.match(/cloudinary\.com\/([^/]+)/)?.[1] || cloudinaryConfig.cloudName;
  
  // Build optimized URL with transformations for background playback
  // w_1280: 720p resolution (plenty for blurred background)
  // br_1500k: 1.5 Mbps bitrate (good quality/size balance)
  // vc_h264: H.264 codec (best browser support)
  // q_auto:good: Good quality auto-optimization
  // f_auto: Auto format (WebM for Chrome, MP4 for Safari)
  const optimizations = 'w_1280,br_1500k,vc_h264,q_auto:good,f_auto';
  
  return `https://res.cloudinary.com/${cloudName}/video/upload/${optimizations}/${publicId}`;
}

/**
 * Pre-configured image URLs for common use cases
 */
export const CloudinaryPresets = {
  // Album covers - square, optimized
  albumCover: (publicId) => getCloudinaryUrl(publicId, {
    width: 600,
    height: 600,
    crop: 'fill',
    quality: 'auto',
    format: 'auto'
  }),
  
  // Background images - large, optimized
  background: (publicId) => getCloudinaryUrl(publicId, {
    width: 1920,
    quality: 'auto',
    format: 'auto'
  }),
  
  // Show flyers - portrait, optimized
  flyer: (publicId) => getCloudinaryUrl(publicId, {
    width: 800,
    quality: 'auto',
    format: 'auto'
  }),
  
  // Performance photos - medium size
  performancePhoto: (publicId) => getCloudinaryUrl(publicId, {
    width: 1200,
    quality: 'auto',
    format: 'auto'
  }),
  
  // Icons/logos - small, PNG
  icon: (publicId) => getCloudinaryUrl(publicId, {
    width: 400,
    format: 'png'
  }),
  
  // Thumbnail - small
  thumbnail: (publicId) => getCloudinaryUrl(publicId, {
    width: 300,
    height: 300,
    crop: 'fill',
    quality: 'auto',
    format: 'auto'
  })
};

export default cloudinaryConfig;

