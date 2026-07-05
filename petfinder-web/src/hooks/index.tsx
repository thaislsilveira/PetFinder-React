import React from 'react';

import { AuthUser } from './auth';
import { ToastProvider } from './toast';

const AppUser: React.FC<React.PropsWithChildren> = ({ children }) => (
  <AuthUser>
    <ToastProvider>{children}</ToastProvider>
  </AuthUser>
);

export default AppUser;
