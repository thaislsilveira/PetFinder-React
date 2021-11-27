import React from 'react';
import { FiMail, FiUser } from 'react-icons/fi';
import { Form } from '@unform/web';

import Input from '../../components/Input';

import { Container, Content } from './styles';
import { useAuth } from '../../hooks/auth';
import Sidebar from '../../components/Sidebar';

const Profile: React.FC = () => {
  const { user } = useAuth();

  const handleSubmit = ev => {
    console.log(ev);
  };

  return (
    <Container>
      <Sidebar />
      <Content>
        <div className="details">
          <h1>Meu perfil</h1>
          <Form onSubmit={handleSubmit}>
            <Input name="name" icon={FiUser} value={user.name} />
            <Input name="email" icon={FiMail} value={user.email} />
          </Form>
        </div>
      </Content>
    </Container>
  );
};

export default Profile;
