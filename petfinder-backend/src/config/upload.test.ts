import upload, { ALLOWED_IMAGE_MIME_TYPES } from './upload';
import UnsupportedFileTypeError from '../errors/UnsupportedFileTypeError';

const storage = upload.storage as unknown as {
  getFilename: (
    request: unknown,
    file: { mimetype: string },
    callback: (error: Error | null, filename?: string) => void,
  ) => void;
};

describe('upload config', () => {
  describe('filename generation', () => {
    function getFilename(file: { mimetype: string; originalname: string }) {
      return new Promise<string | undefined>((resolve, reject) => {
        storage.getFilename({}, file as never, (error, filename) => {
          if (error) reject(error);
          else resolve(filename);
        });
      });
    }

    it('ignores the original filename entirely, preventing path traversal', async () => {
      const filename = await getFilename({
        mimetype: 'image/png',
        originalname: '../../../../etc/passwd',
      });

      expect(filename).not.toContain('..');
      expect(filename).not.toContain('etc/passwd');
      expect(filename).toMatch(/^[0-9a-f-]{36}\.png$/);
    });

    it('derives the extension from the validated mimetype, not the client-supplied one', async () => {
      const filename = await getFilename({
        mimetype: 'image/jpeg',
        originalname: 'anything.exe',
      });

      expect(filename).toMatch(/\.jpg$/);
    });
  });

  describe('fileFilter', () => {
    it.each(Object.keys(ALLOWED_IMAGE_MIME_TYPES))('accepts %s', mimetype => {
      const callback = vi.fn();

      upload.fileFilter({} as never, { mimetype } as never, callback);

      expect(callback).toHaveBeenCalledWith(null, true);
    });

    it('rejects unsupported mime types (e.g. text/html) with a typed error', () => {
      const callback = vi.fn();

      upload.fileFilter(
        {} as never,
        { mimetype: 'text/html' } as never,
        callback,
      );

      expect(callback).toHaveBeenCalledWith(
        expect.any(UnsupportedFileTypeError),
      );
    });
  });
});
