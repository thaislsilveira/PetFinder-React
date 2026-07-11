import React, { useCallback, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { format, parseISO } from 'date-fns';
import { ptBR } from 'date-fns/locale';

import {
  FiArrowLeft as FiArrowLeftIcon,
  FiArrowRight as FiArrowRightIcon,
  FiCrosshair as FiCrosshairIcon,
  FiLogOut as FiLogOutIcon,
} from 'react-icons/fi';
import {
  MapContainer,
  Marker,
  TileLayer,
  Popup,
  useMap,
  useMapEvents,
} from 'react-leaflet';
import { LeafletMouseEvent } from 'leaflet';

import asIcon from '../../utils/icon';
import {
  container,
  animationContainer,
  exitButton,
  locateButton,
} from './styles';

import api from '../../services/api';

import mapIcon from '../../utils/mapIcon';
import foundMapIcon from '../../utils/foundMapIcon';

import ModalCadastro from '../../components/ModalCadastro';
import Logo from '../../components/Logo';
import { useAuth } from '../../hooks/auth';
import { useUserLocation } from '../../hooks/geolocation';

const FiArrowLeft = asIcon(FiArrowLeftIcon);
const FiArrowRight = asIcon(FiArrowRightIcon);
const FiCrosshair = asIcon(FiCrosshairIcon);
const FiLogOut = asIcon(FiLogOutIcon);

interface Pet {
  id: number;
  latitude: number;
  longitude: number;
  found: boolean;
  found_at: string | null;
  images: Array<{
    id: number;
    url: string;
  }>;
  created_at: string;
}

interface MapClickHandlerProps {
  onMapClick(event: LeafletMouseEvent): void;
}

const MapClickHandler: React.FC<MapClickHandlerProps> = ({ onMapClick }) => {
  useMapEvents({
    click: onMapClick,
  });

  return null;
};

const RecenterMap: React.FC<{ center: [number, number] }> = ({ center }) => {
  const map = useMap();

  useEffect(() => {
    map.setView(center);
  }, [center, map]);

  return null;
};

const LocationMap: React.FC = () => {
  const { signOut } = useAuth();
  const navigate = useNavigate();
  const {
    mapCenter,
    locationLabel,
    locating: locatingUser,
    locateUser,
  } = useUserLocation();

  const [position, setPosition] = useState({ latitude: 0, longitude: 0 });
  const [visible, setVisible] = useState(false);

  const [pets, setPets] = useState<Pet[]>([]);

  const handleMapClick = useCallback((event: LeafletMouseEvent) => {
    const { lat, lng } = event.latlng;
    setPosition({
      latitude: lat,
      longitude: lng,
    });
    setVisible(true);
  }, []);

  useEffect(() => {
    api.get('pets').then(response => {
      setPets(response.data);
    });
  }, [visible]);

  return (
    <>
      <div className={container}>
        <div className={animationContainer}>
          <header>
            <Logo />

            <h2>Viu um animalzinho perdido?</h2>
            <p>Marque o local em que ele foi avistado.</p>
          </header>

          <footer>
            <p>
              <strong>{locationLabel.city}</strong>
              <span>, {locationLabel.state}</span>
            </p>

            <button type="button" onClick={() => navigate(-1)}>
              <FiArrowLeft size={24} color="#FFF" />
            </button>
          </footer>
        </div>

        <MapContainer
          center={mapCenter}
          zoom={15}
          style={{ width: '100%', height: '100%', zIndex: 9 }}
        >
          <RecenterMap center={mapCenter} />
          <MapClickHandler onMapClick={handleMapClick} />

          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />

          {pets.map(pet => {
            return (
              <Marker
                icon={pet.found ? foundMapIcon : mapIcon}
                position={[pet.latitude, pet.longitude]}
                key={`${pet.longitude}${pet.latitude}${pet.id}marker`}
              >
                <Popup
                  closeButton={false}
                  minWidth={240}
                  maxHeight={270}
                  className={
                    pet.found ? 'map-popup map-popup-found' : 'map-popup'
                  }
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
                        "'Cadastrado em' dd 'de' MMMM 'às' HH:mm",
                        {
                          locale: ptBR,
                        },
                      )}
                    </span>
                    {pet.found && pet.found_at && (
                      <span>
                        {format(
                          parseISO(pet.found_at),
                          "'Encontrado em' dd 'de' MMMM 'às' HH:mm",
                          {
                            locale: ptBR,
                          },
                        )}
                      </span>
                    )}
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

          <button
            type="button"
            className={locateButton}
            onClick={locateUser}
            disabled={locatingUser}
            title="Usar minha localização"
          >
            <FiCrosshair size={18} color="#94443f" />
          </button>

          <button type="button" className={exitButton} onClick={signOut}>
            <FiLogOut size={18} color="#94443f" />
          </button>
        </MapContainer>
      </div>
      <ModalCadastro
        visible={visible}
        positionMap={position}
        hide={() => setVisible(false)}
      />
    </>
  );
};

export default LocationMap;
