import fs from 'fs/promises';
import path from 'path';

import {
  GoogleGenAI,
  createPartFromBase64,
  createUserContent,
} from '@google/genai';

const uploadsDir = path.join(__dirname, '..', '..', 'uploads');

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

const mimeTypeByExtension: Record<string, string> = {
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.png': 'image/png',
  '.gif': 'image/gif',
  '.webp': 'image/webp',
};

async function isPetImage(filename: string): Promise<boolean> {
  const extension = path.extname(filename).toLowerCase();
  const mimeType = mimeTypeByExtension[extension];

  if (!mimeType) return true;

  const imageData = await fs.readFile(path.join(uploadsDir, filename));

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
  validate(filenames: string[]): Promise<string | null> {
    return filenames.reduce<Promise<string | null>>(
      async (previous, filename) => {
        const invalidFilename = await previous;

        if (invalidFilename) return invalidFilename;

        const isPet = await isPetImage(filename);

        return isPet ? null : filename;
      },
      Promise.resolve(null),
    );
  },
};
