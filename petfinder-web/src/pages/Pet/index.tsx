import React, { useEffect, useState } from 'react';

import { FiClock, FiInfo } from 'react-icons/fi';
import { Map, Marker, TileLayer } from 'react-leaflet';
import { useParams } from 'react-router-dom';
import api from '../../services/api';

import Sidebar from '../../components/Sidebar';

import location from '../../assets/location.png';

import { Container, Content } from './styles';

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
  }, []);

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
            <h1>{pet.port}</h1>
            <p>{pet.breed}</p>

            <div className="map-container">
              <Map
                center={[pet.latitude, pet.longitude]}
                zoom={16}
                style={{ width: '100%', height: 280 }}
                dragging={false}
                touchZoom={false}
                zoomControl={false}
                scrollWheelZoom={false}
                doubleClickZoom={false}
              >
                <TileLayer
                  url={`https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`}
                />
                <Marker
                  interactive={false}
                  icon={location}
                  position={[pet.latitude, pet.longitude]}
                />
              </Map>

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

            <hr />

            <h2>Informações</h2>
            <p>{pet.information}</p>

            <div className="type-details">
              {pet.type ? (
                <div className="type">
                  <FiInfo size={32} color="#39CC83" />
                  Cachorro
                </div>
              ) : (
                <div className="open-on-weekends dont-open">
                  <FiInfo size={32} color="##ff669D" />
                  Gato
                </div>
              )}
            </div>
            <div className="type-details">
              {pet.type ? (
                <div className="type">
                  <FiInfo size={32} color="#39CC83" />
                  Feminino
                </div>
              ) : (
                <div className="open-on-weekends dont-open">
                  <FiInfo size={32} color="##ff669D" />
                  Masculino
                </div>
              )}
            </div>

            <h2>Nome do Responsável</h2>
            <p>{pet.responsible_name}</p>

            <h2>Telefone</h2>
            <p>{pet.phone}</p>

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
