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

import logo from '../../assets/logo.png';
import mapIcon from '../../utils/mapIcon';

import ModalCadastro from '../../components/ModalCadastro';
import { useAuth } from '../../hooks/auth';
import { useToast } from '../../hooks/toast';

const FiArrowLeft = asIcon(FiArrowLeftIcon);
const FiArrowRight = asIcon(FiArrowRightIcon);
const FiCrosshair = asIcon(FiCrosshairIcon);
const FiLogOut = asIcon(FiLogOutIcon);

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

interface MapClickHandlerProps {
  onMapClick(event: LeafletMouseEvent): void;
}

const MapClickHandler: React.FC<MapClickHandlerProps> = ({ onMapClick }) => {
  useMapEvents({
    click: onMapClick,
  });

  return null;
};

const DEFAULT_CENTER: [number, number] = [-20.2845958, -50.5446169];
const DEFAULT_LOCATION_LABEL = { city: 'Jales', state: 'São Paulo' };

interface ReverseGeocodeResponse {
  address?: {
    city?: string;
    town?: string;
    village?: string;
    state?: string;
  };
}

const RecenterMap: React.FC<{ center: [number, number] }> = ({ center }) => {
  const map = useMap();

  useEffect(() => {
    map.setView(center);
  }, [center, map]);

  return null;
};

const GEOLOCATION_ERROR_MESSAGES: Record<number, string> = {
  1: 'Permissão de localização negada pelo navegador.',
  2: 'Não foi possível determinar sua localização.',
  3: 'Tempo esgotado ao tentar obter sua localização. Verifique se o Serviço de Localização do sistema está ativado para o navegador.',
};

const LocationMap: React.FC = () => {
  const { signOut } = useAuth();
  const { addToast } = useToast();
  const navigate = useNavigate();

  const [position, setPosition] = useState({ latitude: 0, longitude: 0 });
  const [visible, setVisible] = useState(false);
  const [mapCenter, setMapCenter] = useState<[number, number]>(DEFAULT_CENTER);
  const [locationLabel, setLocationLabel] = useState(DEFAULT_LOCATION_LABEL);

  const [pets, setPets] = useState<Pet[]>([]);
  const [locatingUser, setLocatingUser] = useState(false);

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

  const locateUser = useCallback(() => {
    if (!navigator.geolocation) {
      addToast({
        type: 'info',
        title: 'Localização não utilizada',
        description: 'Seu navegador não suporta geolocalização.',
      });
      return;
    }

    setLocatingUser(true);

    navigator.geolocation.getCurrentPosition(
      geoPosition => {
        const { latitude, longitude } = geoPosition.coords;

        setMapCenter([latitude, longitude]);
        setLocatingUser(false);

        fetch(
          `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}`,
        )
          .then(response => response.json())
          .then((data: ReverseGeocodeResponse) => {
            const city =
              data.address?.city || data.address?.town || data.address?.village;

            if (city && data.address?.state) {
              setLocationLabel({ city, state: data.address.state });
            }
          })
          .catch(() => {});
      },
      geoError => {
        setLocatingUser(false);

        addToast({
          type: 'info',
          title: 'Localização não utilizada',
          description:
            GEOLOCATION_ERROR_MESSAGES[geoError.code] ??
            'Usando a localização padrão do mapa.',
        });
      },
      { timeout: 20000, maximumAge: 60000 },
    );
  }, [addToast]);

  useEffect(() => {
    locateUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps -- only auto-run once on mount, the button covers manual retries
  }, []);

  return (
    <>
      <div className={container}>
        <div className={animationContainer}>
          <header>
            <img src={logo} alt="PetFinder" />

            <h2>Viu um animalzinho perdido?</h2>
            <p>Marque o local em que ele foi avistado.</p>
          </header>

          <footer>
            <p className="location-label">
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
      {/* <ModalPet
        visible={visible}
        positionMap={position}
        hide={() => setVisible(false)}
      /> */}
    </>
  );
};

export default LocationMap;
