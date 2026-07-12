import multer from 'multer';

import uploadsDir from './uploadsDir';

export default {
  storage: multer.diskStorage({
    destination: uploadsDir,
    filename: (request, file, callback) => {
      const fileName = `${Date.now()}-${file.originalname}`;

      callback(null, fileName);
    },
  }),
};
