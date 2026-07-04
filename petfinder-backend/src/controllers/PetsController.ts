import { Request, Response } from 'express';

import * as Yup from 'yup';

import petView from '../views/pets_view';

import PetsService from '../services/PetsService';

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

    const phoneRegExp =
      /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

    const schema = Yup.object().shape({
      type: Yup.boolean().required(''),
      latitude: Yup.number().required('Latitude é obrigatório'),
      longitude: Yup.number().required('longitude é obrigatório'),
      sex: Yup.boolean().required(''),
      port: Yup.string().required('Porte é obrigatório'),
      breed: Yup.string().required('Raça é obrigatório'),
      information: Yup.string().required(
        'Informações do Responsável são obrigatórias',
      ),
      responsible_name: Yup.string().required(
        'Nome do Responsável é obrigatório',
      ),
      phone: Yup.string().matches(
        phoneRegExp,
        'Número de telefone não é válido',
      ),
      images: Yup.array(
        Yup.object().shape({
          path: Yup.string().required(),
        }),
      ),
    });

    await schema.validate(data, {
      abortEarly: false,
    });

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
