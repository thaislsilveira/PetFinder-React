import React from 'react';
import { render, screen, waitFor, act } from '@testing-library/react';

import { ToastProvider } from './toast';
import {
  UserLocationProvider,
  useUserLocation,
  DEFAULT_CENTER,
  DEFAULT_LOCATION_LABEL,
} from './geolocation';

const LocationProbe: React.FC = () => {
  const { mapCenter, locationLabel, locating, locateUser } = useUserLocation();

  return (
    <div>
      <span data-testid="center">{mapCenter.join(',')}</span>
      <span data-testid="label">
        {locationLabel.city}/{locationLabel.state}
      </span>
      <span data-testid="locating">{String(locating)}</span>
      <button type="button" onClick={locateUser}>
        Localizar
      </button>
    </div>
  );
};

function renderProbe() {
  return render(
    <ToastProvider>
      <UserLocationProvider>
        <LocationProbe />
      </UserLocationProvider>
    </ToastProvider>,
  );
}

describe('useUserLocation', () => {
  const originalGeolocation = navigator.geolocation;
  const originalFetch = global.fetch;

  afterEach(() => {
    Object.defineProperty(navigator, 'geolocation', {
      value: originalGeolocation,
      configurable: true,
    });
    global.fetch = originalFetch;
    vi.restoreAllMocks();
  });

  it('auto-locates on mount and updates the map center on success', async () => {
    const getCurrentPosition = vi.fn((success: PositionCallback) => {
      success({
        coords: { latitude: 10, longitude: 20 },
      } as GeolocationPosition);
    });
    Object.defineProperty(navigator, 'geolocation', {
      value: { getCurrentPosition },
      configurable: true,
    });
    global.fetch = vi.fn().mockResolvedValue({
      json: () => Promise.resolve({ address: {} }),
    }) as unknown as typeof fetch;

    renderProbe();

    await waitFor(() =>
      expect(screen.getByTestId('center')).toHaveTextContent('10,20'),
    );
    expect(getCurrentPosition).toHaveBeenCalledTimes(1);
    expect(screen.getByTestId('locating')).toHaveTextContent('false');
  });

  it('updates the location label from the reverse geocoding response', async () => {
    const getCurrentPosition = vi.fn((success: PositionCallback) => {
      success({
        coords: { latitude: 10, longitude: 20 },
      } as GeolocationPosition);
    });
    Object.defineProperty(navigator, 'geolocation', {
      value: { getCurrentPosition },
      configurable: true,
    });
    global.fetch = vi.fn().mockResolvedValue({
      json: () =>
        Promise.resolve({ address: { city: 'Jales', state: 'São Paulo' } }),
    }) as unknown as typeof fetch;

    renderProbe();

    await waitFor(() =>
      expect(screen.getByTestId('label')).toHaveTextContent('Jales/São Paulo'),
    );
  });

  it('falls back to the default center and shows a toast when geolocation is unsupported', async () => {
    Object.defineProperty(navigator, 'geolocation', {
      value: undefined,
      configurable: true,
    });

    renderProbe();

    await waitFor(() =>
      expect(
        screen.getByText('Seu navegador não suporta geolocalização.'),
      ).toBeInTheDocument(),
    );
    expect(screen.getByTestId('center')).toHaveTextContent(
      DEFAULT_CENTER.join(','),
    );
    expect(screen.getByTestId('label')).toHaveTextContent(
      `${DEFAULT_LOCATION_LABEL.city}/${DEFAULT_LOCATION_LABEL.state}`,
    );
  });

  it('shows a specific toast message when the user denies location permission', async () => {
    const getCurrentPosition = vi.fn(
      (
        _success: PositionCallback,
        error: (err: GeolocationPositionError) => void,
      ) => {
        error({ code: 1 } as GeolocationPositionError);
      },
    );
    Object.defineProperty(navigator, 'geolocation', {
      value: { getCurrentPosition },
      configurable: true,
    });

    renderProbe();

    await waitFor(() =>
      expect(
        screen.getByText('Permissão de localização negada pelo navegador.'),
      ).toBeInTheDocument(),
    );
    expect(screen.getByTestId('locating')).toHaveTextContent('false');
  });

  it('lets the user retry locating manually via locateUser', async () => {
    const getCurrentPosition = vi.fn((success: PositionCallback) => {
      success({
        coords: { latitude: 1, longitude: 2 },
      } as GeolocationPosition);
    });
    Object.defineProperty(navigator, 'geolocation', {
      value: { getCurrentPosition },
      configurable: true,
    });
    global.fetch = vi.fn().mockResolvedValue({
      json: () => Promise.resolve({ address: {} }),
    }) as unknown as typeof fetch;

    renderProbe();

    await waitFor(() => expect(getCurrentPosition).toHaveBeenCalledTimes(1));

    act(() => {
      screen.getByRole('button', { name: 'Localizar' }).click();
    });

    await waitFor(() => expect(getCurrentPosition).toHaveBeenCalledTimes(2));
  });
});
