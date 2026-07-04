import { Request, Response } from 'express';
import { hash } from 'bcryptjs';

import { z } from 'zod';

import UsersService from '../services/UsersService';
import phoneRegExp from '../validation/phone';
import userView from '../views/users_view';

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

    const schema = z.object({
      name: z.string().min(1, 'Nome é obrigatório'),
      email: z.string().email(),
      password: z.string().min(1),
      phone: z
        .string()
        .regex(phoneRegExp, 'Número de telefone não é válido')
        .optional(),
    });

    schema.parse(data);

    const user = await UsersService.create({
      name,
      email,
      password: hashedPassword,
      phone,
    });

    return response.status(201).json(userView.render(user));
  },
};
