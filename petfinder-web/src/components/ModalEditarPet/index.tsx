import React, {
  useState,
  ChangeEvent,
  useRef,
  useEffect,
  useCallback,
} from 'react';
import InputMask from 'react-input-mask';

import {
  FiPlus as FiPlusIcon,
  FiXCircle as FiXCircleIcon,
} from 'react-icons/fi';
import Form from '../../utils/unformCompat';

import asIcon from '../../utils/icon';
import { container, modal, content } from '../ModalCadastro/styles';

import api from '../../services/api';
import { useToast } from '../../hooks/toast';
import getApiErrorMessage from '../../utils/getApiErrorMessage';
import isSessionExpiredError from '../../utils/isSessionExpiredError';
import { Pet } from '../../pages/Pet';

const FiPlus = asIcon(FiPlusIcon);
const FiXCircle = asIcon(FiXCircleIcon);

interface ModalProps {
  petId: string;
  pet: Pet;
  visible: boolean;
  hide: () => void;
  onUpdated: (pet: Pet) => void;
  onImageDeleted: (imageId: number) => void;
}

const ModalEditarPet: React.FC<ModalProps> = ({
  petId,
  pet,
  visible,
  hide,
  onUpdated,
  onImageDeleted,
}) => {
  const ref = useRef<HTMLInputElement>(null);
  const { addToast } = useToast();

  const [typeOn, setTypeOn] = useState(0);
  const [sexOn, setSexOn] = useState(0);
  const [foundOn, setFoundOn] = useState(0);
  const [port, setPort] = useState('');
  const [breed, setBreed] = useState('');
  const [information, setInformation] = useState('');
  const [responsibleName, setResponsibleName] = useState('');
  const [phone, setPhone] = useState('');
  const [existingImages, setExistingImages] = useState(pet.images);
  const [newImages, setNewImages] = useState<File[]>([]);
  const [newImagesPreview, setNewImagesPreview] = useState<string[]>([]);

  useEffect(() => {
    if (!visible) {
      return;
    }

    setTypeOn(pet.type ? 1 : 0);
    setSexOn(pet.sex ? 1 : 0);
    setFoundOn(pet.found ? 1 : 0);
    setPort(pet.port);
    setBreed(pet.breed);
    setInformation(pet.information);
    setResponsibleName(pet.responsible_name);
    setPhone(pet.phone ?? '');
    setExistingImages(pet.images);
    setNewImages([]);
    setNewImagesPreview([]);
  }, [visible, pet]);

  const handleDeleteImage = useCallback(
    async (imageId: number) => {
      try {
        await api.delete(`pets/${petId}/images/${imageId}`);

        setExistingImages(current =>
          current.filter(image => image.id !== imageId),
        );
        onImageDeleted(imageId);
      } catch (error) {
        if (isSessionExpiredError(error)) {
          addToast({
            type: 'error',
            title: 'Sessão expirada',
            description: 'Faça login novamente para continuar.',
          });
          return;
        }

        addToast({
          type: 'error',
          title: 'Erro ao remover foto',
          description: 'Não foi possível remover a foto, tente novamente.',
        });
      }
    },
    [addToast, onImageDeleted, petId],
  );

  function handleSelectImages(event: ChangeEvent<HTMLInputElement>) {
    if (!event.target.files) {
      return;
    }

    const selectedImages = Array.from(event.target.files);
    setNewImages(selectedImages);

    const selectedImagesPreview = selectedImages.map(image => {
      return URL.createObjectURL(image);
    });

    setNewImagesPreview(selectedImagesPreview);
  }

  const handleSubmit = useCallback(async () => {
    const data = new FormData();

    const unmaskedPhone = phone.replace(/[-()]/g, '');

    data.append('type', String(typeOn));
    data.append('latitude', String(pet.latitude));
    data.append('longitude', String(pet.longitude));
    data.append('sex', String(sexOn));
    data.append('found', String(foundOn));
    data.append('port', port);
    data.append('breed', breed);
    data.append('information', information);
    data.append('responsible_name', responsibleName);
    if (unmaskedPhone) {
      data.append('phone', unmaskedPhone);
    }
    newImages.forEach(image => {
      data.append('images', image);
    });

    try {
      const response = await api.put(`pets/${petId}`, data);

      onUpdated(response.data);
      hide();

      addToast({
        type: 'success',
        title: 'Cadastro atualizado!',
        description: 'As informações do pet foram atualizadas com sucesso.',
      });
    } catch (error) {
      if (isSessionExpiredError(error)) {
        addToast({
          type: 'error',
          title: 'Sessão expirada',
          description: 'Faça login novamente para continuar.',
        });
        return;
      }

      const imageError = getApiErrorMessage(error);

      addToast({
        type: 'error',
        title: imageError ? 'Foto inválida' : 'Erro ao atualizar',
        description:
          imageError ??
          'Verifique se todos os campos obrigatórios foram preenchidos corretamente.',
      });
    }
  }, [
    addToast,
    breed,
    hide,
    information,
    newImages,
    onUpdated,
    foundOn,
    pet.latitude,
    pet.longitude,
    petId,
    phone,
    port,
    responsibleName,
    sexOn,
    typeOn,
  ]);

  const handleOverlayClick = useCallback(
    (event: React.MouseEvent<HTMLDivElement>) => {
      if (event.target === ref.current) {
        hide();
      }
    },
    [hide],
  );

  return (
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
    <div
      className={container({ visible })}
      ref={ref}
      onClick={handleOverlayClick}
    >
      <div className={modal({ visibleEffect: true })}>
        <div className={content}>
          <Form onSubmit={handleSubmit}>
            <button
              className="button-close"
              onClick={() => hide()}
              type="button"
            >
              <FiXCircle size={24} />
            </button>
            <div className="modal-scroll">
              <fieldset>
                <legend>Editar dados</legend>
                <div className="input-block">
                  <label htmlFor="type">Tipo</label>
                  <div className="button-select">
                    <button
                      type="button"
                      name="type"
                      className={typeOn ? 'active' : ''}
                      onClick={() => {
                        setTypeOn(1);
                      }}
                    >
                      cachorro
                    </button>
                    <button
                      type="button"
                      name="type"
                      className={!typeOn ? 'active dont-open' : ''}
                      onClick={() => {
                        setTypeOn(0);
                      }}
                    >
                      gato
                    </button>
                  </div>
                </div>
                <div className="input-block">
                  <label htmlFor="sex">Sexo</label>
                  <div className="button-select">
                    <button
                      type="button"
                      name="sex"
                      className={sexOn ? 'active' : ''}
                      onClick={() => {
                        setSexOn(1);
                      }}
                    >
                      fêmea
                    </button>
                    <button
                      type="button"
                      name="sex"
                      className={!sexOn ? 'active dont-open' : ''}
                      onClick={() => {
                        setSexOn(0);
                      }}
                    >
                      macho
                    </button>
                  </div>
                </div>

                <div className="input-block">
                  <label htmlFor="found">Animal encontrado</label>
                  <div className="button-select">
                    <button
                      type="button"
                      name="found"
                      className={foundOn ? 'active' : ''}
                      onClick={() => {
                        setFoundOn(1);
                      }}
                    >
                      sim
                    </button>
                    <button
                      type="button"
                      name="found"
                      className={!foundOn ? 'active dont-open' : ''}
                      onClick={() => {
                        setFoundOn(0);
                      }}
                    >
                      não
                    </button>
                  </div>
                </div>

                <div className="input-block">
                  <label htmlFor="images">Fotos atuais</label>

                  <div className="images-container">
                    {existingImages.map(image => (
                      <div className="existing-image" key={image.id}>
                        <img src={image.url} alt={responsibleName} />
                        <button
                          type="button"
                          className="remove-image-button"
                          onClick={() => handleDeleteImage(image.id)}
                          aria-label="Remover foto"
                        >
                          <FiXCircle size={16} />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="input-block">
                  <label htmlFor="new-images">Adicionar fotos</label>

                  <div className="images-container">
                    {newImagesPreview.map((image, index) => (
                      <img key={index} src={image} alt={responsibleName} />
                    ))}
                    <label htmlFor="image[]" className="new-image">
                      <FiPlus size={24} color="#94443f" />
                    </label>
                  </div>
                  <input
                    multiple
                    onChange={handleSelectImages}
                    type="file"
                    id="image[]"
                  />
                </div>
              </fieldset>

              <fieldset>
                <div className="field-row">
                  <div className="input-block">
                    <label htmlFor="port">Porte</label>
                    <select
                      id="port"
                      value={port}
                      onChange={e => setPort(e.target.value)}
                    >
                      <option value="" disabled>
                        Selecione
                      </option>
                      <option value="Pequeno">Pequeno</option>
                      <option value="Médio">Médio</option>
                      <option value="Grande">Grande</option>
                    </select>
                  </div>

                  <div className="input-block">
                    <label htmlFor="breed">Raça</label>
                    <input
                      id="breed"
                      value={breed}
                      onChange={e => setBreed(e.target.value)}
                    />
                  </div>
                </div>

                <div className="input-block">
                  <label htmlFor="information">Informações</label>
                  <textarea
                    id="information"
                    value={information}
                    onChange={e => setInformation(e.target.value)}
                  />
                </div>

                <div className="field-row">
                  <div className="input-block">
                    <label htmlFor="responsible_name">Responsável</label>
                    <input
                      id="responsible_name"
                      value={responsibleName}
                      onChange={e => setResponsibleName(e.target.value)}
                    />
                  </div>
                  <div className="input-block">
                    <label htmlFor="phone">Telefone</label>
                    <InputMask
                      id="phone"
                      mask="(99)9999-9999"
                      value={phone}
                      onChange={e => setPhone(e.target.value)}
                    />
                  </div>
                </div>
              </fieldset>

              <button className="confirm-button" type="submit">
                Salvar alterações
              </button>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default ModalEditarPet;
