import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { format, parseISO } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';

import { useHistory } from 'react-router-dom';

import { FiArrowLeft, FiArrowRight } from 'react-icons/fi';
import { Map, Marker, TileLayer, Popup } from 'react-leaflet';
import { LeafletMouseEvent } from 'leaflet';

import { Container, AnimationContainer } from './styles';

import api from '../../services/api';

import logo from '../../assets/logo.png';
import mapIcon from '../../utils/mapIcon';

import ModalCadastro from '../../components/ModalCadastro';

interface Pet {
  id: number;
  latitude: number;
  longitude: number;
  images: Array<{
    id: number;
    url: string;
  }>;
  created_at: string;
}

const LocationMap: React.FC = () => {
  const { goBack } = useHistory();

  const [position, setPosition] = useState({ latitude: 0, longitude: 0 });
  const [visible, setVisible] = useState(false);

  const [pets, setPets] = useState<Pet[]>([]);

  function handleMapClick(event: LeafletMouseEvent) {
    const { lat, lng } = event.latlng;
    setPosition({
      latitude: lat,
      longitude: lng,
    });
    setVisible(true);
  }

  useEffect(() => {
    api.get('pets').then(response => {
      setPets(response.data);
    });
  }, [visible]);

  return (
    <>
      <Container>
        <AnimationContainer>
          <header>
            <img src={logo} alt="PetFinder" />

            <h2>Viu um animalzinho perdido?</h2>
            <p>Marque o local em que ele foi avistado.</p>
          </header>

          <footer>
            <strong>Jales</strong>
            <span>São Paulo</span>

            <button type="button" onClick={goBack}>
              <FiArrowLeft size={24} color="#FFF" />
            </button>
          </footer>
        </AnimationContainer>

        <Map
          center={[-20.2845958, -50.5446169]}
          zoom={15}
          style={{ width: '100%', height: '100%', zIndex: 9 }}
          onClick={handleMapClick}
        >
          {/* <TileLayer
          url="https://a.tile.openstreetmap.org/{z}/{x}/{y}.png"
        /> */}

          <TileLayer
            url={`https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`}
          />

          {pets.map(pet => {
            return (
              <Marker
                icon={mapIcon}
                position={[pet.latitude, pet.longitude]}
                key={`${pet.longitude}${pet.latitude}${pet.id}marker`}
              >
                <Popup
                  closeButton={false}
                  minWidth={240}
                  maxHeight={270}
                  className="map-popup"
                >
                  {pet.images.map(image => {
                    return (
                      <div
                        className="image-box"
                        style={{ backgroundImage: `url(${image.url})` }}
                        key={`${pet.longitude}${pet.latitude}${pet.id}image`}
                      >
                        <img key={image.id} src={image.url} alt="foto" />
                      </div>
                    );
                  })}
                  <div className="date-box">
                    <span>
                      {format(
                        parseISO(pet.created_at),
                        "'Dia' dd 'de' MMMM 'às' HH:mm",
                        {
                          locale: ptBR,
                        },
                      )}
                    </span>
                  </div>
                  <Link to={`/pets/${pet.id}`}>
                    <FiArrowRight size={20} color="#fff" />
                  </Link>
                </Popup>
              </Marker>
            );
          })}

          {position.latitude !== 0 && (
            <Marker
              interactive={false}
              icon={mapIcon}
              position={[position.latitude, position.longitude]}
            />
          )}
        </Map>
      </Container>
      <ModalCadastro
        visible={visible}
        positionMap={position}
        hide={() => setVisible(false)}
      />
    </>
  );
};

export default LocationMap;
