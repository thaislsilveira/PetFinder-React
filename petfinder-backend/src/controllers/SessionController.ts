import { Request, Response } from 'express';

import * as Yup from 'yup';

import SessionService from '../services/SessionService';

class SessionController {
  async store(request: Request, response: Response) {
    const schema = Yup.object().shape({
      email: Yup.string().email().required(),
      password: Yup.string().required(),
    });

    if (!(await schema.isValid(request.body))) {
      return response.status(400).json({ error: 'Validation fails' });
    }

    const { email, password } = request.body;

    const result = await SessionService.authenticate(email, password);

    if ('error' in result) {
      if (result.error === 'user_not_found') {
        return response.status(401).json({ error: 'User not found' });
      }

      return response
        .status(403)
        .json({ error: 'Incorrect email/password combination.' });
    }

    return response.json(result);
  }
}

export default new SessionController();
