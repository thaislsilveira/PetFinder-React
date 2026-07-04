import { Request, Response } from 'express';
import { hash } from 'bcryptjs';

import * as Yup from 'yup';

import UsersService from '../services/UsersService';

export default {
  async create(request: Request, response: Response) {
    const { name, email, password, phone } = request.body;

    const hashedPassword = await hash(password, 8);

    const data = {
      name,
      email,
      password,
      phone,
    };

    const phoneRegExp =
      /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

    const schema = Yup.object().shape({
      name: Yup.string().required('Nome é obrigatório'),
      email: Yup.string().email().required(),
      password: Yup.string().required(),
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

    const user = await UsersService.create({
      name,
      email,
      password: hashedPassword,
      phone,
    });

    return response.status(201).json(user);
  },
};
