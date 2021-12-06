import React, { useEffect, useState } from 'react';
import InputMask from 'react-input-mask';

import { GiCat, GiSittingDog, GiFemale, GiMale } from 'react-icons/gi';
import { useParams } from 'react-router-dom';
import api from '../../services/api';

import Sidebar from '../../components/Sidebar';

import { Container, Content } from './styles';
import MapComponent from '../../components/Map';
import pointIcon from '../../utils/pointIcon';

interface Pet {
  latitude: number;
  longitude: number;
  type: string;
  port: string;
  sex: string;
  breed: string;
  information: string;
  responsible_name: string;
  phone: string;
  images: Array<{
    id: number;
    url: string;
  }>;
}

interface PetParams {
  id: string;
}

const Pet: React.FC = () => {
  const params = useParams<PetParams>();
  const [pet, setPet] = useState<Pet>();
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  useEffect(() => {
    api.get(`pets/${params.id}`).then(response => {
      setPet(response.data);
    });
  }, [params.id]);

  if (!pet) {
    return <p>Carregando...</p>;
  }

  return (
    <Container>
      <Sidebar />
      <Content>
        <div className="pet-details">
          <img src={pet.images[activeImageIndex].url} alt={pet.type} />

          <div className="images">
            {pet.images.map((image, index) => {
              return (
                <button
                  key={image.id}
                  className={activeImageIndex === index ? 'active' : ''}
                  type="button"
                  onClick={() => {
                    setActiveImageIndex(index);
                  }}
                >
                  <img src={image.url} alt={pet.type} />
                </button>
              );
            })}
          </div>

          <div className="pet-details-content">
            <h2>{pet.port}</h2>
            <p>{pet.breed}</p>

            <div className="map-container">
              <MapComponent
                latitude={pet.latitude}
                longitude={pet.longitude}
                icon={pointIcon}
              />

              <footer>
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href={`https://www.google.com/maps/dir/?api=1&destination=${pet.latitude}, ${pet.longitude}`}
                >
                  Ver rotas no Google Maps
                </a>
              </footer>
            </div>
            <h2>Informações</h2>
            <p>{pet.information}</p>

            <div className="type-details">
              {pet.type ? (
                <div className="type-animal">
                  <GiSittingDog size={32} color="#D2691E" />
                  cachorro
                </div>
              ) : (
                <div className="type-animal">
                  <GiCat size={32} color="#D2691E" />
                  gato
                </div>
              )}
            </div>
            <div className="type-details">
              {pet.type ? (
                <div className="type-sex">
                  <GiFemale size={32} color="#808080" />
                  fêmea
                </div>
              ) : (
                <div className="type-sex">
                  <GiMale size={32} color="#808080" />
                  macho
                </div>
              )}
            </div>

            <h2>Nome do Responsável</h2>
            <p>{pet.responsible_name}</p>

            <h2>Telefone</h2>

            <p>
              <InputMask
                className="phone"
                mask="(99)9999-9999"
                value={pet.phone}
              />
            </p>

            {/*
            <button type="button" className="contact-button">
              <FaWhatsapp size={20} color="#FFF" />
              Entrar em contato
            </button> */}
          </div>
        </div>
      </Content>
    </Container>
  );
};

export default Pet;
