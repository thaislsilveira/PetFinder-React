import { Request, Response } from 'express';
import { compareSync } from 'bcryptjs';

import { getRepository } from 'typeorm';

import * as Yup from 'yup';
import jwt from 'jsonwebtoken';

import User from '../models/User';
import authConfig from '../config/auth';

class SessionController {
  async store(request: Request, response: Response) {
    const usersRepository = getRepository(User);

    const schema = Yup.object().shape({
      email: Yup.string().email().required(),
      password: Yup.string().required(),
    });

    if (!(await schema.isValid(request.body))) {
      return response.status(400).json({ error: 'Validation fails' });
    }

    const { email, password } = request.body;

    const user = await usersRepository.findOne({
      where: {
        email,
      },
    });

    if (!user) {
      return response.status(401).json({ error: 'User not found' });
    }

    const { id, name, password: encryptedPassword } = user;

    const passwordMatched = compareSync(password, encryptedPassword);

    if (!passwordMatched) {
      return response
        .status(403)
        .json({ error: 'Incorrect email/password combination.' });
    }

    return response.json({
      user: {
        id,
        name,
        email,
      },
      token: jwt.sign({ id }, authConfig.secret, {
        expiresIn: authConfig.expiresIn,
      }),
    });
  }
}

export default new SessionController();
