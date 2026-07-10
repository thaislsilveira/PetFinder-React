import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';

import { useToast } from './toast';

export const DEFAULT_CENTER: [number, number] = [-20.2845958, -50.5446169];
export const DEFAULT_LOCATION_LABEL = { city: 'Jales', state: 'São Paulo' };

interface ReverseGeocodeResponse {
  address?: {
    city?: string;
    town?: string;
    village?: string;
    state?: string;
  };
}

const GEOLOCATION_ERROR_MESSAGES: Record<number, string> = {
  1: 'Permissão de localização negada pelo navegador.',
  2: 'Não foi possível determinar sua localização.',
  3: 'Tempo esgotado ao tentar obter sua localização. Verifique se o Serviço de Localização do sistema está ativado para o navegador.',
};

interface UserLocationContextData {
  mapCenter: [number, number];
  locationLabel: { city: string; state: string };
  locating: boolean;
  locateUser: () => void;
}

const UserLocationContext = createContext<UserLocationContextData>(
  null as unknown as UserLocationContextData,
);

const UserLocationProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const { addToast } = useToast();

  const [mapCenter, setMapCenter] = useState<[number, number]>(DEFAULT_CENTER);
  const [locationLabel, setLocationLabel] = useState(DEFAULT_LOCATION_LABEL);
  const [locating, setLocating] = useState(false);

  const locateUser = useCallback(() => {
    if (!navigator.geolocation) {
      addToast({
        type: 'info',
        title: 'Localização não utilizada',
        description: 'Seu navegador não suporta geolocalização.',
      });
      return;
    }

    setLocating(true);

    navigator.geolocation.getCurrentPosition(
      geoPosition => {
        const { latitude, longitude } = geoPosition.coords;

        setMapCenter([latitude, longitude]);
        setLocating(false);

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
        setLocating(false);

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

  const hasAutoLocated = useRef(false);

  useEffect(() => {
    if (hasAutoLocated.current) {
      return;
    }

    hasAutoLocated.current = true;
    locateUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps -- only auto-run once per private session, the button covers manual retries
  }, []);

  const value = useMemo(
    () => ({ mapCenter, locationLabel, locating, locateUser }),
    [mapCenter, locationLabel, locating, locateUser],
  );

  return (
    <UserLocationContext.Provider value={value}>
      {children}
    </UserLocationContext.Provider>
  );
};

function useUserLocation(): UserLocationContextData {
  const context = useContext(UserLocationContext);

  if (!context) {
    throw new Error(
      'useUserLocation must be used within a UserLocationProvider',
    );
  }

  return context;
}

export { UserLocationProvider, useUserLocation };
