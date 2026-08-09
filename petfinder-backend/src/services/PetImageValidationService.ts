import fs from 'fs/promises';
import path from 'path';

import {
  GoogleGenAI,
  createPartFromBase64,
  createUserContent,
} from '@google/genai';

import uploadsDir from '../config/uploadsDir';

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

const mimeTypeByExtension: Record<string, string> = {
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.png': 'image/png',
  '.gif': 'image/gif',
  '.webp': 'image/webp',
};

interface UploadedImage {
  /** Server-generated, on-disk filename. Never derived from client input. */
  storedFilename: string;
  /** Client-supplied filename, used only to steer the E2E mock — never for filesystem access. */
  originalFilename: string;
}

async function isPetImage({
  storedFilename,
  originalFilename,
}: UploadedImage): Promise<boolean> {
  const extension = path.extname(storedFilename).toLowerCase();
  const mimeType = mimeTypeByExtension[extension];

  if (!mimeType) return false;

  // Lets E2E tests exercise both outcomes without calling the real Gemini API:
  // the fixture's original filename decides the verdict.
  if (process.env.PET_IMAGE_VALIDATION_MOCK === 'true') {
    return !originalFilename.toLowerCase().includes('not-a-pet');
  }

  const imageData = await fs.readFile(path.join(uploadsDir, storedFilename));

  const response = await ai.models.generateContent({
    model: 'gemini-3.5-flash',
    contents: createUserContent([
      createPartFromBase64(imageData.toString('base64'), mimeType),
      'Responda apenas "sim" ou "nao": esta imagem mostra um animal de estimação (cachorro, gato ou similar)?',
    ]),
  });

  const answer = (response.text ?? '').trim().toLowerCase();

  return answer.startsWith('sim');
}

export default {
  validate(images: UploadedImage[]): Promise<string | null> {
    return images.reduce<Promise<string | null>>(async (previous, image) => {
      const invalidFilename = await previous;

      if (invalidFilename) return invalidFilename;

      const isPet = await isPetImage(image);

      return isPet ? null : image.storedFilename;
    }, Promise.resolve(null));
  },
};
