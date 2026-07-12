import fs from 'fs';
import path from 'path';

import { Request, Response } from 'express';

import { z } from 'zod';

import petView from '../views/pets_view';

import PetsService from '../services/PetsService';
import PetImageValidationService from '../services/PetImageValidationService';
import phoneRegExp from '../validation/phone';
import uploadsDir from '../config/uploadsDir';

const petFieldsSchema = {
  type: z.boolean(),
  latitude: z.coerce.number({ error: 'Latitude é obrigatório' }),
  longitude: z.coerce.number({ error: 'longitude é obrigatório' }),
  sex: z.boolean(),
  port: z.string().min(1, 'Porte é obrigatório'),
  breed: z.string().min(1, 'Raça é obrigatório'),
  information: z.string().min(1, 'Informações do Responsável são obrigatórias'),
  responsible_name: z.string().min(1, 'Nome do Responsável é obrigatório'),
  phone: z
    .string()
    .regex(phoneRegExp, 'Número de telefone não é válido')
    .optional(),
};

const createSchema = z.object({
  ...petFieldsSchema,
  images: z.array(z.object({ path: z.string().min(1) })),
});

const updateSchema = z.object({
  ...petFieldsSchema,
  found: z.boolean(),
  images: z.array(z.object({ path: z.string().min(1) })).optional(),
});

export default {
  async index(request: Request, response: Response) {
    const pets = await PetsService.findAll();

    return response.json(petView.renderMany(pets));
  },

  async show(request: Request, response: Response) {
    const { id } = request.params;

    const pet = await PetsService.findById(Number(id));

    return response.json(petView.render(pet));
  },

  async create(request: Request, response: Response) {
    const {
      type,
      latitude,
      longitude,
      sex,
      port,
      breed,
      information,
      responsible_name,
      phone,
    } = request.body;

    const requestImages = request.files as Express.Multer.File[];
    const images = requestImages.map(image => {
      return { path: image.filename };
    });

    const invalidImage = await PetImageValidationService.validate(
      images.map(image => image.path),
    );

    if (invalidImage) {
      requestImages.forEach(image => {
        fs.unlink(path.join(uploadsDir, image.filename), () => {});
      });

      return response.status(400).json({
        error:
          'Uma ou mais imagens enviadas não parecem ser de um animal de estimação.',
      });
    }

    const data = {
      type: type === '1',
      latitude,
      longitude,
      sex: sex === '1',
      port,
      breed,
      information,
      responsible_name,
      phone,
      images,
    };

    const parsedData = createSchema.parse(data);

    const pet = await PetsService.create({
      type: parsedData.type,
      latitude: parsedData.latitude,
      longitude: parsedData.longitude,
      sex: parsedData.sex,
      port: parsedData.port,
      breed: parsedData.breed,
      information: parsedData.information,
      responsibleName: parsedData.responsible_name,
      phone: parsedData.phone,
      images: parsedData.images,
    });

    return response.status(201).json(pet);
  },

  async update(request: Request, response: Response) {
    const { id } = request.params;

    const {
      type,
      latitude,
      longitude,
      sex,
      port,
      breed,
      information,
      responsible_name,
      phone,
      found,
    } = request.body;

    const requestImages = request.files as Express.Multer.File[];
    const images = requestImages.map(image => {
      return { path: image.filename };
    });

    const invalidImage = await PetImageValidationService.validate(
      images.map(image => image.path),
    );

    if (invalidImage) {
      requestImages.forEach(image => {
        fs.unlink(path.join(uploadsDir, image.filename), () => {});
      });

      return response.status(400).json({
        error:
          'Uma ou mais imagens enviadas não parecem ser de um animal de estimação.',
      });
    }

    const data = {
      type: type === '1',
      latitude,
      longitude,
      sex: sex === '1',
      port,
      breed,
      information,
      responsible_name,
      phone,
      found: found === '1',
      images,
    };

    const parsedData = updateSchema.parse(data);

    const pet = await PetsService.update(Number(id), {
      type: parsedData.type,
      latitude: parsedData.latitude,
      longitude: parsedData.longitude,
      sex: parsedData.sex,
      port: parsedData.port,
      breed: parsedData.breed,
      information: parsedData.information,
      responsibleName: parsedData.responsible_name,
      phone: parsedData.phone,
      found: parsedData.found,
      images: parsedData.images,
    });

    return response.json(petView.render(pet));
  },

  async deleteImage(request: Request, response: Response) {
    const { petId, imageId } = request.params;

    const image = await PetsService.deleteImage(Number(petId), Number(imageId));

    fs.unlink(path.join(uploadsDir, image.path), () => {});

    return response.status(204).send();
  },
};
