import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FiArrowLeft as FiArrowLeftIcon } from 'react-icons/fi';

import Pets from '../../assets/pets.png';

import asIcon from '../../utils/icon';
import { container } from './styles';

const FiArrowLeft = asIcon(FiArrowLeftIcon);

const Sidebar: React.FC = () => {
  const navigate = useNavigate();

  return (
    <aside className={container}>
      <img src={Pets} alt="PetFinder" />

      <footer>
        <button type="button" onClick={() => navigate(-1)}>
          <FiArrowLeft size={24} color="#FFF" />
        </button>
      </footer>
    </aside>
  );
};

export default Sidebar;
