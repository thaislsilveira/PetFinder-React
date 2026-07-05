import React from 'react';
import { Link } from 'react-router-dom';

import { FiArrowRight as FiArrowRightIcon } from 'react-icons/fi';

import logoImg from '../../assets/logo.png';
import backgroundImg from '../../assets/background.svg';

import asIcon from '../../utils/icon';
import { container, content, contentRight, header } from './styles';
import { useAuth } from '../../hooks/auth';

const FiArrowRight = asIcon(FiArrowRightIcon);

const Dashboard: React.FC = () => {
  const { user } = useAuth();

  return (
    <div className={container}>
      <div
        className={content}
        style={{ backgroundImage: `url(${backgroundImg})` }}
      >
        <div className={header}>
          <img src={logoImg} alt="PetFinder" />
          <div className={contentRight}>
            <div>
              <span>Bem-vindo,</span>
              <Link className="profile-link" to="/profile">
                <strong>{user.name}</strong>
              </Link>
              <br />
              <strong>Jales</strong>
              <br />
              <span>São Paulo</span>
            </div>
          </div>
        </div>

        <main>
          <h1>Leve felicidade aos animais</h1>
          <p>Encontre animais que estão perdidos.</p>
        </main>

        <Link className="absolute-link" to="/location">
          <FiArrowRight size={26} color="rgba(0, 0, 0, 0.6)" />
        </Link>
      </div>
    </div>
  );
};

export default Dashboard;
