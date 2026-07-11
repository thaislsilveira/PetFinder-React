import React, { useEffect, useState } from 'react';
import InputMask from 'react-input-mask';

import {
  GiCat as GiCatIcon,
  GiSittingDog as GiSittingDogIcon,
  GiFemale as GiFemaleIcon,
  GiMale as GiMaleIcon,
} from 'react-icons/gi';
import { FiCheck as FiCheckIcon } from 'react-icons/fi';
import { useParams } from 'react-router-dom';
import api from '../../services/api';

import Sidebar from '../../components/Sidebar';
import Button from '../../components/Button';
import ModalEditarPet from '../../components/ModalEditarPet';

import signInBackgoundImg from '../../assets/backgroundLogin.jpg';
import asIcon from '../../utils/icon';
import { container, content } from './styles';
import MapComponent from '../../components/Map';
import pointIcon from '../../utils/pointIcon';

const GiCat = asIcon(GiCatIcon);
const GiSittingDog = asIcon(GiSittingDogIcon);
const GiFemale = asIcon(GiFemaleIcon);
const GiMale = asIcon(GiMaleIcon);
const FiCheck = asIcon(FiCheckIcon);

export interface Pet {
  latitude: number;
  longitude: number;
  type: boolean;
  port: string;
  sex: boolean;
  breed: string;
  information: string;
  responsible_name: string;
  phone: string;
  found: boolean;
  images: Array<{
    id: number;
    url: string;
  }>;
}

interface PetParams extends Record<string, string | undefined> {
  id: string;
}

const Pet: React.FC = () => {
  const params = useParams<PetParams>();
  const [pet, setPet] = useState<Pet>();
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [editVisible, setEditVisible] = useState(false);

  useEffect(() => {
    api.get(`pets/${params.id}`).then(response => {
      setPet(response.data);
    });
  }, [params.id]);

  useEffect(() => {
    setActiveImageIndex(current =>
      pet && current >= pet.images.length ? 0 : current,
    );
  }, [pet]);

  if (!pet) {
    return <p>Carregando...</p>;
  }

  return (
    <div
      className={container}
      style={{ backgroundImage: `url(${signInBackgoundImg})` }}
    >
      <Sidebar />
      <main className={content}>
        <div className="pet-details">
          {pet.found && (
            <div className="found-badge">
              <FiCheck size={16} color="#fff" />
              Encontrado
            </div>
          )}

          {pet.images.length > 0 && (
            <img
              src={pet.images[activeImageIndex].url}
              alt={pet.type ? 'Cachorro' : 'Gato'}
            />
          )}

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
                  <img src={image.url} alt={pet.type ? 'Cachorro' : 'Gato'} />
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

              {pet.sex ? (
                <div className="type-sex">
                  <GiFemale size={32} color="#94443F" />
                  fêmea
                </div>
              ) : (
                <div className="type-sex">
                  <GiMale size={32} color="#94443F" />
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

            <Button type="button" onClick={() => setEditVisible(true)}>
              Editar
            </Button>
          </div>
        </div>
      </main>

      {params.id && (
        <ModalEditarPet
          petId={params.id}
          pet={pet}
          visible={editVisible}
          hide={() => setEditVisible(false)}
          onUpdated={updatedPet => setPet(updatedPet)}
          onImageDeleted={imageId =>
            setPet(current =>
              current
                ? {
                    ...current,
                    images: current.images.filter(
                      image => image.id !== imageId,
                    ),
                  }
                : current,
            )
          }
        />
      )}
    </div>
  );
};

export default Pet;
