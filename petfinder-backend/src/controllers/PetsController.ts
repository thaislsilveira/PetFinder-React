import { Request, Response } from 'express';

import { z } from 'zod';

import petView from '../views/pets_view';

import PetsService from '../services/PetsService';
import phoneRegExp from '../validation/phone';

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

    const schema = z.object({
      type: z.boolean(),
      latitude: z.coerce.number({ required_error: 'Latitude é obrigatório' }),
      longitude: z.coerce.number({ required_error: 'longitude é obrigatório' }),
      sex: z.boolean(),
      port: z.string().min(1, 'Porte é obrigatório'),
      breed: z.string().min(1, 'Raça é obrigatório'),
      information: z
        .string()
        .min(1, 'Informações do Responsável são obrigatórias'),
      responsible_name: z.string().min(1, 'Nome do Responsável é obrigatório'),
      phone: z
        .string()
        .regex(phoneRegExp, 'Número de telefone não é válido')
        .optional(),
      images: z.array(z.object({ path: z.string().min(1) })).optional(),
    });

    schema.parse(data);

    const pet = await PetsService.create({
      type: data.type,
      latitude: data.latitude,
      longitude: data.longitude,
      sex: data.sex,
      port: data.port,
      breed: data.breed,
      information: data.information,
      responsibleName: data.responsible_name,
      phone: data.phone,
      images: data.images,
    });

    return response.status(201).json(pet);
  },
};
