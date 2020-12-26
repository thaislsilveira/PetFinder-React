import React from 'react';

import { FiPlus } from 'react-icons/fi';
import { Map, TileLayer } from 'react-leaflet';

import logo from '../../assets/logo.png';

import { Container, AnimationContainer, LinkAnimal } from './styles';

const LocationMap: React.FC = () => {
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
          </footer>
        </AnimationContainer>

        <Map
          center={[-20.2845958, -50.5446169]}
          zoom={14}
          style={{ width: '100%', height: '100%', zIndex: 9 }}
        >
          {/* <TileLayer
          url="https://a.tile.openstreetmap.org/{z}/{x}/{y}.png"
        /> */}

          <TileLayer
            url={`https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`}
          />
        </Map>

        <LinkAnimal to="/" className="create-animal">
          <FiPlus size={32} color="#fff" />
        </LinkAnimal>
      </Container>
    </>
  );
};

export default LocationMap;
