import React from 'react';
import { Link } from 'react-router-dom';

import { FiArrowRight } from 'react-icons/fi';

import logoImg from '../../assets/logo.png';

import { Container, Content, ContentRight, Header } from './styles';
import { useAuth } from '../../hooks/auth';

const Dashboard: React.FC = () => {
  const { user } = useAuth();

  return (
    <Container>
      <Content>
        <Header>
          <img src={logoImg} alt="PetFinder" />
          <ContentRight>
            <div>
              <span>Bem-vindo,</span>
              <Link to="/profile">
                <strong>{user.name}</strong>
              </Link>
              <br />
              <strong>Jales</strong>
              <br />
              <span>São Paulo</span>
            </div>
          </ContentRight>
        </Header>

        <main>
          <h1>Leve felicidade aos animais</h1>
          <p>Encontre animais que estão perdidos.</p>
        </main>

        <Link className="absolute-link" to="/location">
          <FiArrowRight size={26} color="rgba(0, 0, 0, 0.6)" />
        </Link>
      </Content>
    </Container>
  );
};

export default Dashboard;
