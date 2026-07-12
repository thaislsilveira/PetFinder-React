import fs from 'fs';

import { Request, Response } from 'express';
import { ZodError } from 'zod';

import PetsService from '../services/PetsService';
import PetImageValidationService from '../services/PetImageValidationService';
import PetsController from './PetsController';

vi.mock('../services/PetsService', () => ({
  default: {
    findAll: vi.fn(),
    findById: vi.fn(),
    create: vi.fn(),
    update: vi.fn(),
    deleteImage: vi.fn(),
  },
}));

vi.mock('../services/PetImageValidationService', () => ({
  default: { validate: vi.fn() },
}));

vi.mock('fs', () => ({
  default: { unlink: vi.fn((filePath, callback) => callback()) },
}));

const mockedPetsService = PetsService as unknown as {
  findAll: ReturnType<typeof vi.fn>;
  findById: ReturnType<typeof vi.fn>;
  create: ReturnType<typeof vi.fn>;
  update: ReturnType<typeof vi.fn>;
  deleteImage: ReturnType<typeof vi.fn>;
};

const mockedPetImageValidationService =
  PetImageValidationService as unknown as {
    validate: ReturnType<typeof vi.fn>;
  };

const mockedFs = fs as unknown as { unlink: ReturnType<typeof vi.fn> };

function createResponse() {
  const response = {} as Response;
  response.status = vi.fn().mockReturnValue(response);
  response.json = vi.fn().mockReturnValue(response);
  return response;
}

const createdAt = new Date('2026-01-01T00:00:00.000Z');
const updatedAt = createdAt;

function makePet(overrides = {}) {
  return {
    id: 1,
    type: true,
    latitude: 12.5,
    longitude: -38.2,
    sex: false,
    port: 'Médio',
    breed: 'Vira-lata',
    information: 'Muito dócil',
    responsibleName: 'Rex Owner',
    phone: '11912345678',
    images: [{ id: 1, path: 'dog.png', petId: 1 }],
    createdAt,
    updatedAt,
    ...overrides,
  };
}

describe('PetsController', () => {
  beforeEach(() => {
    mockedPetsService.findAll.mockReset();
    mockedPetsService.findById.mockReset();
    mockedPetsService.create.mockReset();
    mockedPetsService.update.mockReset();
    mockedPetsService.deleteImage.mockReset();
    mockedPetImageValidationService.validate
      .mockReset()
      .mockResolvedValue(null);
    mockedFs.unlink.mockClear();
  });

  describe('index', () => {
    it('lists all pets rendered through the pet view', async () => {
      mockedPetsService.findAll.mockResolvedValueOnce([makePet()]);

      const request = {} as Request;
      const response = createResponse();

      await PetsController.index(request, response);

      expect(response.json).toHaveBeenCalledWith([
        expect.objectContaining({ id: 1, responsible_name: 'Rex Owner' }),
      ]);
    });
  });

  describe('show', () => {
    it('finds a pet by the numeric id from the route params', async () => {
      mockedPetsService.findById.mockResolvedValueOnce(makePet());

      const request = { params: { id: '1' } } as unknown as Request;
      const response = createResponse();

      await PetsController.show(request, response);

      expect(mockedPetsService.findById).toHaveBeenCalledWith(1);
      expect(response.json).toHaveBeenCalledWith(
        expect.objectContaining({ id: 1 }),
      );
    });
  });

  describe('create', () => {
    function makeRequest(overrides: Record<string, unknown> = {}) {
      return {
        body: {
          type: '1',
          latitude: '12.5',
          longitude: '-38.2',
          sex: '0',
          port: 'Médio',
          breed: 'Vira-lata',
          information: 'Muito dócil',
          responsible_name: 'Rex Owner',
          phone: '11912345678',
          ...overrides,
        },
        files: [{ filename: 'dog.png' }],
      } as unknown as Request;
    }

    it('creates a pet, coercing form fields and mapping uploaded files to images', async () => {
      const createdPet = makePet();
      mockedPetsService.create.mockResolvedValueOnce(createdPet);

      const request = makeRequest();
      const response = createResponse();

      await PetsController.create(request, response);

      expect(mockedPetsService.create).toHaveBeenCalledWith({
        type: true,
        latitude: 12.5,
        longitude: -38.2,
        sex: false,
        port: 'Médio',
        breed: 'Vira-lata',
        information: 'Muito dócil',
        responsibleName: 'Rex Owner',
        phone: '11912345678',
        images: [{ path: 'dog.png' }],
      });
      expect(response.status).toHaveBeenCalledWith(201);
      expect(response.json).toHaveBeenCalledWith(createdPet);
    });

    it('rejects a request missing required fields', async () => {
      const request = makeRequest({ breed: '' });
      const response = createResponse();

      await expect(
        PetsController.create(request, response),
      ).rejects.toBeInstanceOf(ZodError);
      expect(mockedPetsService.create).not.toHaveBeenCalled();
    });

    it('rejects and cleans up uploaded files when an image is not a pet', async () => {
      mockedPetImageValidationService.validate.mockResolvedValueOnce('dog.png');

      const request = makeRequest();
      const response = createResponse();

      await PetsController.create(request, response);

      expect(mockedFs.unlink).toHaveBeenCalledWith(
        expect.stringContaining('dog.png'),
        expect.any(Function),
      );
      expect(mockedPetsService.create).not.toHaveBeenCalled();
      expect(response.status).toHaveBeenCalledWith(400);
      expect(response.json).toHaveBeenCalledWith(
        expect.objectContaining({ error: expect.any(String) }),
      );
    });
  });

  describe('update', () => {
    function makeRequest(overrides: Record<string, unknown> = {}) {
      return {
        params: { id: '1' },
        body: {
          type: '1',
          latitude: '12.5',
          longitude: '-38.2',
          sex: '0',
          port: 'Médio',
          breed: 'Vira-lata',
          information: 'Muito dócil',
          responsible_name: 'Rex Owner',
          phone: '11912345678',
          ...overrides,
        },
        files: [],
      } as unknown as Request;
    }

    it('updates a pet, coercing form fields, and renders it through the pet view', async () => {
      const updatedPet = makePet({ breed: 'Poodle' });
      mockedPetsService.update.mockResolvedValueOnce(updatedPet);

      const request = makeRequest();
      const response = createResponse();

      await PetsController.update(request, response);

      expect(mockedPetsService.update).toHaveBeenCalledWith(1, {
        type: true,
        latitude: 12.5,
        longitude: -38.2,
        sex: false,
        port: 'Médio',
        breed: 'Vira-lata',
        information: 'Muito dócil',
        responsibleName: 'Rex Owner',
        phone: '11912345678',
        found: false,
        images: [],
      });
      expect(response.status).not.toHaveBeenCalled();
      expect(response.json).toHaveBeenCalledWith(
        expect.objectContaining({ id: 1, breed: 'Poodle' }),
      );
    });

    it('marks the pet as found when the found flag is sent', async () => {
      mockedPetsService.update.mockResolvedValueOnce(makePet());

      const request = makeRequest({ found: '1' });
      const response = createResponse();

      await PetsController.update(request, response);

      expect(mockedPetsService.update).toHaveBeenCalledWith(
        1,
        expect.objectContaining({ found: true }),
      );
    });

    it('maps newly uploaded files to images when provided', async () => {
      mockedPetsService.update.mockResolvedValueOnce(makePet());

      const request = {
        ...makeRequest(),
        files: [{ filename: 'new-photo.png' }],
      } as unknown as Request;
      const response = createResponse();

      await PetsController.update(request, response);

      expect(mockedPetsService.update).toHaveBeenCalledWith(
        1,
        expect.objectContaining({ images: [{ path: 'new-photo.png' }] }),
      );
    });

    it('rejects a request missing required fields', async () => {
      const request = makeRequest({ breed: '' });
      const response = createResponse();

      await expect(
        PetsController.update(request, response),
      ).rejects.toBeInstanceOf(ZodError);
      expect(mockedPetsService.update).not.toHaveBeenCalled();
    });
  });

  describe('deleteImage', () => {
    it('deletes the image and removes its file, responding with no content', async () => {
      mockedPetsService.deleteImage.mockResolvedValueOnce({
        id: 9,
        path: 'dog.png',
        petId: 1,
      });

      const request = {
        params: { petId: '1', imageId: '9' },
      } as unknown as Request;
      const response = createResponse();
      response.send = vi.fn().mockReturnValue(response);

      await PetsController.deleteImage(request, response);

      expect(mockedPetsService.deleteImage).toHaveBeenCalledWith(1, 9);
      expect(mockedFs.unlink).toHaveBeenCalledWith(
        expect.stringContaining('dog.png'),
        expect.any(Function),
      );
      expect(response.status).toHaveBeenCalledWith(204);
      expect(response.send).toHaveBeenCalled();
    });
  });
});
