import React, {
  useState,
  ChangeEvent,
  useRef,
  useEffect,
  useCallback,
} from 'react';

import { FiPlus, FiXCircle } from 'react-icons/fi';
import { Form } from '@unform/web';

import { Container, Modal, Content } from './styles';

import api from '../../services/api';
import { useToast } from '../../hooks/toast';

interface ModalProps {
  positionMap: {
    latitude: number;
    longitude: number;
  };
  visible: boolean;
  hide: () => void;
}

const ModalCadastro: React.FC<ModalProps> = ({
  positionMap,
  visible,
  hide,
}) => {
  const ref = useRef<HTMLInputElement>(null);
  const { addToast } = useToast();

  const [position, setPosition] = useState({ latitude: 0, longitude: 0 });

  const [typeOn, setTypeOn] = useState(0);
  const [sexOn, setSexOn] = useState(0);
  const [port, setPort] = useState('');
  const [breed, setBreed] = useState('');
  const [information, setInformation] = useState('');
  const [responsibleName, setResponsibleName] = useState('');
  const [phone, setPhone] = useState('');
  const [images, setImages] = useState<File[]>([]);
  const [previewImages, setPreviewImages] = useState<string[]>([]);

  useEffect(() => {
    setPosition(positionMap);
  }, [positionMap]);

  function handleSelectImages(event: ChangeEvent<HTMLInputElement>) {
    if (!event.target.files) {
      return;
    }

    const selectedImages = Array.from(event.target.files);
    setImages(selectedImages);

    const selectedImagesPreview = selectedImages.map(image => {
      return URL.createObjectURL(image);
    });

    setPreviewImages(selectedImagesPreview);
  }

  const handleSubmit = useCallback(async () => {
    const { latitude, longitude } = position;

    const data = new FormData();
    data.append('type', String(typeOn));
    data.append('latitude', String(latitude));
    data.append('longitude', String(longitude));
    data.append('sex', String(sexOn));
    data.append('port', port);
    data.append('breed', breed);
    data.append('information', information);
    data.append('responsible_name', responsibleName);
    data.append('phone', phone);
    images.forEach(image => {
      data.append('images', image);
    });

    await api.post('pets', data);

    hide();

    addToast({
      type: 'success',
      title: 'Cadastro realizado!',
      description: 'Agora você pode visualizar o perfil do pet no mapa!',
    });
  }, [
    addToast,
    breed,
    hide,
    images,
    information,
    phone,
    port,
    position,
    responsibleName,
    sexOn,
    typeOn,
  ]);

  function handleOverlayClick(event) {
    if (event.target === ref.current) {
      hide();
    }
  }

  return (
    <Container visible={visible} ref={ref} onClick={handleOverlayClick}>
      <Modal visibleEffect>
        <Content>
          <Form onSubmit={handleSubmit}>
            <button
              className="button-close"
              onClick={() => hide()}
              type="button"
            >
              <FiXCircle size={24} />
            </button>
            <fieldset>
              <legend>Dados</legend>
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
                    Cachorro
                  </button>
                  <button
                    type="button"
                    name="type"
                    className={!typeOn ? 'active dont-open' : ''}
                    onClick={() => {
                      setTypeOn(0);
                    }}
                  >
                    Gato
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
                    Feminino
                  </button>
                  <button
                    type="button"
                    name="sex"
                    className={!sexOn ? 'active dont-open' : ''}
                    onClick={() => {
                      setSexOn(0);
                    }}
                  >
                    Masculino
                  </button>
                </div>
              </div>

              <div className="input-block">
                <label htmlFor="port">Porte</label>
                <input
                  id="port"
                  value={port}
                  onChange={e => setPort(e.target.value)}
                  maxLength={300}
                />
              </div>

              <div className="input-block">
                <label htmlFor="images">Fotos</label>

                <div className="images-container">
                  {previewImages?.map((image, index) => (
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
              <div className="input-block">
                <label htmlFor="breed">Raça</label>
                <input
                  id="breed"
                  value={breed}
                  onChange={e => setBreed(e.target.value)}
                />
              </div>

              <div className="input-block">
                <label htmlFor="information">Informações</label>
                <textarea
                  id="information"
                  value={information}
                  onChange={e => setInformation(e.target.value)}
                />
              </div>
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
                <input
                  id="phone"
                  value={phone}
                  onChange={e => setPhone(e.target.value)}
                />
              </div>
            </fieldset>

            <button className="confirm-button" type="submit">
              Confirmar
            </button>
          </Form>
        </Content>
      </Modal>
    </Container>
  );
};

export default ModalCadastro;
