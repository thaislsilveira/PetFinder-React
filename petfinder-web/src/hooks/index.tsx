import React from 'react';

import { AuthUser } from './auth';

const AppUser: React.FC = ({ children }) => <AuthUser>{children}</AuthUser>;

export default AppUser;
