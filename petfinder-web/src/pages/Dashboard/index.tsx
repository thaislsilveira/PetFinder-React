import React from 'react';
import { Link } from 'react-router-dom';

import { FiArrowRight } from 'react-icons/fi';

import logoImg from '../../assets/logo.png';

import { Container, Content, Location } from './styles';

const Dashboard: React.FC = () => {
  return (
    <Container>
      <Content>
        <img src={logoImg} alt="PetFinder" />

        <main>
          <h1>Leve felicidade aos animais</h1>
          <p>Encontre animais que estão perdidos.</p>
        </main>

        <Location>
          <strong>Jales</strong>
          <span>São Paulo</span>
        </Location>

        <Link to="/location">
          <FiArrowRight size={26} color="rgba(0, 0, 0, 0.6)" />
        </Link>
      </Content>
    </Container>
  );
};

export default Dashboard;
