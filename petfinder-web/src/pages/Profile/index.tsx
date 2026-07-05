import React from 'react';
import { FiMail as FiMailIcon, FiUser as FiUserIcon } from 'react-icons/fi';
import Form from '../../utils/unformCompat';

import Input from '../../components/Input';

import signInBackgoundImg from '../../assets/backgroundLogin.jpg';
import asIcon from '../../utils/icon';
import { container, content } from './styles';
import { useAuth } from '../../hooks/auth';
import Sidebar from '../../components/Sidebar';

const FiMail = asIcon(FiMailIcon);
const FiUser = asIcon(FiUserIcon);

const Profile: React.FC = () => {
  const { user } = useAuth();

  const handleSubmit = (): void => {};

  return (
    <div
      className={container}
      style={{ backgroundImage: `url(${signInBackgoundImg})` }}
    >
      <Sidebar />
      <div className={content}>
        <div className="details">
          <h1>Meu perfil</h1>
          <Form onSubmit={handleSubmit}>
            <Input name="name" icon={FiUser} value={user.name} />
            <Input name="email" icon={FiMail} value={user.email} />
          </Form>
        </div>
      </div>
    </div>
  );
};

export default Profile;
