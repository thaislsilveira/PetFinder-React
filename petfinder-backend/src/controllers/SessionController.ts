import { Request, Response } from 'express';

import { z } from 'zod';

import SessionService from '../services/SessionService';

class SessionController {
  async store(request: Request, response: Response) {
    const schema = z.object({
      email: z.string().email(),
      password: z.string().min(1),
    });

    const parsed = schema.safeParse(request.body);

    if (!parsed.success) {
      return response.status(400).json({ error: 'Validation fails' });
    }

    const { email, password } = parsed.data;

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
