import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { AxiosError } from 'axios';

import { ToastProvider } from '../../hooks/toast';
import api from '../../services/api';
import ModalCadastro from '.';

vi.mock('../../services/api', () => ({
  default: { post: vi.fn() },
}));

const mockedApi = api as unknown as {
  post: ReturnType<typeof vi.fn>;
};

const positionMap = { latitude: -23.55, longitude: -46.63 };

function renderModal(
  overrides: Partial<React.ComponentProps<typeof ModalCadastro>> = {},
) {
  const hide = vi.fn();

  render(
    <ToastProvider>
      <ModalCadastro
        positionMap={positionMap}
        visible
        hide={hide}
        {...overrides}
      />
    </ToastProvider>,
  );

  return { hide };
}

describe('ModalCadastro', () => {
  beforeEach(() => {
    mockedApi.post.mockReset();
  });

  it('starts with gato and macho selected by default', () => {
    renderModal();

    expect(screen.getByRole('button', { name: 'gato' })).toHaveClass(
      'active dont-open',
    );
    expect(screen.getByRole('button', { name: 'macho' })).toHaveClass(
      'active dont-open',
    );
    expect(screen.getByRole('button', { name: 'cachorro' })).not.toHaveClass(
      'active',
    );
  });

  it('toggles type and sex selection on click', () => {
    renderModal();

    fireEvent.click(screen.getByRole('button', { name: 'cachorro' }));
    fireEvent.click(screen.getByRole('button', { name: 'fêmea' }));

    expect(screen.getByRole('button', { name: 'cachorro' })).toHaveClass(
      'active',
    );
    expect(screen.getByRole('button', { name: 'fêmea' })).toHaveClass('active');
  });

  it('submits the filled fields together with the current map position', async () => {
    mockedApi.post.mockResolvedValueOnce({ data: {} });

    const { hide } = renderModal();

    fireEvent.click(screen.getByRole('button', { name: 'cachorro' }));
    fireEvent.change(screen.getByLabelText('Porte'), {
      target: { value: 'Médio' },
    });
    fireEvent.change(screen.getByLabelText('Raça'), {
      target: { value: 'Vira-lata' },
    });
    fireEvent.change(screen.getByLabelText('Responsável'), {
      target: { value: 'Fulano de Tal' },
    });
    fireEvent.click(screen.getByRole('button', { name: 'Confirmar' }));

    await waitFor(() => expect(mockedApi.post).toHaveBeenCalledTimes(1));

    const [url, formData] = mockedApi.post.mock.calls[0];
    expect(url).toBe('pets');
    expect(formData.get('type')).toBe('1');
    expect(formData.get('latitude')).toBe(String(positionMap.latitude));
    expect(formData.get('longitude')).toBe(String(positionMap.longitude));
    expect(formData.get('port')).toBe('Médio');
    expect(formData.get('breed')).toBe('Vira-lata');
    expect(formData.get('responsible_name')).toBe('Fulano de Tal');

    await waitFor(() => expect(hide).toHaveBeenCalled());
    expect(screen.getByText('Cadastro realizado!')).toBeInTheDocument();
  });

  it('resets the form fields after a successful submission', async () => {
    mockedApi.post.mockResolvedValueOnce({ data: {} });

    renderModal();

    fireEvent.change(screen.getByLabelText('Raça'), {
      target: { value: 'Vira-lata' },
    });
    fireEvent.click(screen.getByRole('button', { name: 'Confirmar' }));

    await waitFor(() => expect(mockedApi.post).toHaveBeenCalledTimes(1));
    await waitFor(() => expect(screen.getByLabelText('Raça')).toHaveValue(''));
  });

  it('shows a generic error toast when the request fails', async () => {
    mockedApi.post.mockRejectedValueOnce(new Error('network error'));

    const { hide } = renderModal();

    fireEvent.click(screen.getByRole('button', { name: 'Confirmar' }));

    await waitFor(() =>
      expect(screen.getByText('Erro no cadastro')).toBeInTheDocument(),
    );
    expect(hide).not.toHaveBeenCalled();
  });

  it('shows a specific toast when the API rejects a photo that is not a pet', async () => {
    const error = new AxiosError('Bad Request');
    error.response = {
      data: { error: 'Uma ou mais imagens não parecem ser de um animal.' },
      status: 400,
      statusText: 'Bad Request',
      headers: {},
      config: error.config as never,
    };
    mockedApi.post.mockRejectedValueOnce(error);

    const { hide } = renderModal();

    fireEvent.click(screen.getByRole('button', { name: 'Confirmar' }));

    await waitFor(() =>
      expect(screen.getByText('Foto inválida')).toBeInTheDocument(),
    );
    expect(
      screen.getByText('Uma ou mais imagens não parecem ser de um animal.'),
    ).toBeInTheDocument();
    expect(hide).not.toHaveBeenCalled();
  });

  it('shows a session-expired toast instead of "Foto inválida" when the token has expired', async () => {
    const error = new AxiosError('Unauthorized');
    error.response = {
      data: { error: 'jwt expired', tokenExpired: true },
      status: 401,
      statusText: 'Unauthorized',
      headers: {},
      config: error.config as never,
    };
    mockedApi.post.mockRejectedValueOnce(error);

    const { hide } = renderModal();

    fireEvent.click(screen.getByRole('button', { name: 'Confirmar' }));

    await waitFor(() =>
      expect(screen.getByText('Sessão expirada')).toBeInTheDocument(),
    );
    expect(screen.queryByText('Foto inválida')).not.toBeInTheDocument();
    expect(hide).not.toHaveBeenCalled();
  });
});
