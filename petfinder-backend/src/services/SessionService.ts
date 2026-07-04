import { compareSync } from 'bcryptjs';
import jwt from 'jsonwebtoken';

import UsersService from './UsersService';
import authConfig from '../config/auth';

type AuthenticateResult =
  | { error: 'user_not_found' }
  | { error: 'invalid_password' }
  | { user: { id: string; name: string; email: string }; token: string };

export default {
  async authenticate(
    email: string,
    password: string,
  ): Promise<AuthenticateResult> {
    const user = await UsersService.findByEmail(email);

    if (!user) {
      return { error: 'user_not_found' };
    }

    const passwordMatched = compareSync(password, user.password);

    if (!passwordMatched) {
      return { error: 'invalid_password' };
    }

    const token = jwt.sign({ id: user.id }, authConfig.secret, {
      expiresIn: authConfig.expiresIn,
    });

    return {
      user: { id: user.id, name: user.name, email: user.email },
      token,
    };
  },
};
