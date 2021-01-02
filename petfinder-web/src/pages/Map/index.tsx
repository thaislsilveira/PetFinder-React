import React, { useState } from 'react';

import { useHistory } from 'react-router-dom';

import { FiPlus, FiArrowLeft } from 'react-icons/fi';
import { Map, Marker, TileLayer } from 'react-leaflet';
import { LeafletMouseEvent } from 'leaflet';

import { Container, AnimationContainer } from './styles';

import logo from '../../assets/logo.png';
import mapIcon from '../../utils/mapIcon';

import ModalCadastro from '../../components/ModalCadastro';

const LocationMap: React.FC = () => {
  const { goBack } = useHistory();

  const [position, setPosition] = useState({ latitude: 0, longitude: 0 });
  const [visible, setVisible] = useState(false);

  function handleMapClick(event: LeafletMouseEvent) {
    const { lat, lng } = event.latlng;
    setPosition({
      latitude: lat,
      longitude: lng,
    });
    setVisible(true);
    console.log(event);
  }

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
