import crypto from 'crypto';

import multer from 'multer';

import uploadsDir from './uploadsDir';
import UnsupportedFileTypeError from '../errors/UnsupportedFileTypeError';

export const MAX_PET_IMAGES = 4;

export const ALLOWED_IMAGE_MIME_TYPES: Record<string, string> = {
  'image/jpeg': '.jpg',
  'image/png': '.png',
  'image/gif': '.gif',
  'image/webp': '.webp',
};

export default {
  storage: multer.diskStorage({
    destination: uploadsDir,
    filename: (request, file, callback) => {
      const extension = ALLOWED_IMAGE_MIME_TYPES[file.mimetype];
      const fileName = `${crypto.randomUUID()}${extension}`;

      callback(null, fileName);
    },
  }),
  fileFilter: (
    request: Express.Request,
    file: Express.Multer.File,
    callback: multer.FileFilterCallback,
  ) => {
    if (!ALLOWED_IMAGE_MIME_TYPES[file.mimetype]) {
      callback(new UnsupportedFileTypeError());
      return;
    }

    callback(null, true);
  },
};
