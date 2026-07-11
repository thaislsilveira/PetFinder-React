import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';

import { ToastProvider } from '../../hooks/toast';
import api from '../../services/api';
import { Pet } from '../../pages/Pet';
import ModalEditarPet from '.';

vi.mock('../../services/api', () => ({
  default: { put: vi.fn(), delete: vi.fn() },
}));

vi.mock('@react-spring/web', () => ({
  useTransition:
    (items: unknown[]) =>
    (renderItem: (style: object, item: unknown) => React.ReactNode) =>
      items.map(item => renderItem({}, item)),
  animated: new Proxy(
    {},
    {
      get: () => 'div',
    },
  ),
}));

const mockedApi = api as unknown as {
  put: ReturnType<typeof vi.fn>;
  delete: ReturnType<typeof vi.fn>;
};

const pet: Pet = {
  latitude: -23.55,
  longitude: -46.63,
  type: true,
  port: 'Médio',
  sex: false,
  found: false,
  breed: 'Vira-lata',
  information: 'Muito dócil',
  responsible_name: 'Fulano de Tal',
  phone: '11912345678',
  images: [{ id: 1, url: 'http://localhost:3333/uploads/dog.png' }],
};

function renderModal(
  overrides: Partial<React.ComponentProps<typeof ModalEditarPet>> = {},
) {
  const hide = vi.fn();
  const onUpdated = vi.fn();
  const onImageDeleted = vi.fn();

  render(
    <ToastProvider>
      <ModalEditarPet
        petId="1"
        pet={pet}
        visible
        hide={hide}
        onUpdated={onUpdated}
        onImageDeleted={onImageDeleted}
        {...overrides}
      />
    </ToastProvider>,
  );

  return { hide, onUpdated, onImageDeleted };
}

describe('ModalEditarPet', () => {
  beforeEach(() => {
    mockedApi.put.mockReset();
    mockedApi.delete.mockReset();
  });

  it("pre-fills the form with the pet's current data when opened", () => {
    renderModal();

    expect(screen.getByLabelText('Porte')).toHaveValue('Médio');
    expect(screen.getByLabelText('Raça')).toHaveValue('Vira-lata');
    expect(screen.getByLabelText('Informações')).toHaveValue('Muito dócil');
    expect(screen.getByLabelText('Responsável')).toHaveValue('Fulano de Tal');
    expect(screen.getByLabelText('Telefone')).toHaveValue('(11)9123-4567');
    expect(screen.getByRole('button', { name: 'cachorro' })).toHaveClass(
      'active',
    );
    expect(screen.getByRole('button', { name: 'macho' })).toHaveClass(
      'active dont-open',
    );
    expect(screen.getByRole('button', { name: 'não' })).toHaveClass(
      'active dont-open',
    );
  });

  it("submits the edited fields together with the pet's unchanged location", async () => {
    mockedApi.put.mockResolvedValueOnce({
      data: { ...pet, breed: 'Poodle' },
    });

    const { hide, onUpdated } = renderModal();

    fireEvent.change(screen.getByLabelText('Raça'), {
      target: { value: 'Poodle' },
    });
    fireEvent.click(screen.getByRole('button', { name: 'Salvar alterações' }));

    await waitFor(() => expect(mockedApi.put).toHaveBeenCalledTimes(1));

    const [url, formData] = mockedApi.put.mock.calls[0];
    expect(url).toBe('pets/1');
    expect(formData.get('latitude')).toBe(String(pet.latitude));
    expect(formData.get('longitude')).toBe(String(pet.longitude));
    expect(formData.get('breed')).toBe('Poodle');
    expect(formData.get('responsible_name')).toBe('Fulano de Tal');
    expect(formData.get('found')).toBe('0');

    await waitFor(() =>
      expect(onUpdated).toHaveBeenCalledWith({ ...pet, breed: 'Poodle' }),
    );
    expect(hide).toHaveBeenCalled();
    expect(screen.getByText('Cadastro atualizado!')).toBeInTheDocument();
  });

  it('sends found=1 when the pet is marked as found', async () => {
    mockedApi.put.mockResolvedValueOnce({ data: { ...pet, found: true } });

    renderModal();

    fireEvent.click(screen.getByRole('button', { name: 'sim' }));
    fireEvent.click(screen.getByRole('button', { name: 'Salvar alterações' }));

    await waitFor(() => expect(mockedApi.put).toHaveBeenCalledTimes(1));

    const [, formData] = mockedApi.put.mock.calls[0];
    expect(formData.get('found')).toBe('1');
  });

  it('deletes a photo and notifies the parent when its remove button is clicked', async () => {
    mockedApi.delete.mockResolvedValueOnce({});

    const { onImageDeleted } = renderModal();

    fireEvent.click(screen.getByRole('button', { name: 'Remover foto' }));

    await waitFor(() =>
      expect(mockedApi.delete).toHaveBeenCalledWith('pets/1/images/1'),
    );
    expect(onImageDeleted).toHaveBeenCalledWith(1);
    expect(
      screen.queryByRole('button', { name: 'Remover foto' }),
    ).not.toBeInTheDocument();
  });

  it('shows an error toast and keeps the photo when deletion fails', async () => {
    mockedApi.delete.mockRejectedValueOnce(new Error('network error'));

    const { onImageDeleted } = renderModal();

    fireEvent.click(screen.getByRole('button', { name: 'Remover foto' }));

    await waitFor(() =>
      expect(screen.getByText('Erro ao remover foto')).toBeInTheDocument(),
    );
    expect(onImageDeleted).not.toHaveBeenCalled();
    expect(
      screen.getByRole('button', { name: 'Remover foto' }),
    ).toBeInTheDocument();
  });

  it('shows an error toast and keeps the modal open when the update request fails', async () => {
    mockedApi.put.mockRejectedValueOnce(new Error('network error'));

    const { hide, onUpdated } = renderModal();

    fireEvent.click(screen.getByRole('button', { name: 'Salvar alterações' }));

    await waitFor(() =>
      expect(screen.getByText('Erro ao atualizar')).toBeInTheDocument(),
    );
    expect(onUpdated).not.toHaveBeenCalled();
    expect(hide).not.toHaveBeenCalled();
  });
});
