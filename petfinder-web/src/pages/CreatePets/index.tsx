import React, { useState, FormEvent, ChangeEvent } from 'react';
import { Map, Marker, TileLayer } from 'react-leaflet';
import { LeafletMouseEvent } from 'leaflet';

import { FiPlus } from 'react-icons/fi';
import { Form } from '@unform/web';

import { useHistory } from 'react-router-dom';
import Sidebar from '../../components/Sidebar';

import { Container, Content } from './styles';

import mapIcon from '../../utils/mapIcon';

import api from '../../services/api';

const CreatePet: React.FC = () => {
  const history = useHistory();

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

  function handleMapClick(event: LeafletMouseEvent) {
    const { lat, lng } = event.latlng;
    setPosition({
      latitude: lat,
      longitude: lng,
    });
  }
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
  async function handleSubmit(event: FormEvent) {
    event.preventDefault();

    const { latitude, longitude } = position;

    const data = new FormData();
    data.append('type', String(typeOn));
    data.append('latitude', String(latitude));
    data.append('longitude', String(longitude));
    data.append('sex', String(sexOn));
    data.append('breed', breed);
    data.append('information', information);
    data.append('responsible_name', responsibleName);
    data.append('phone', phone);
    images.forEach(image => {
      data.append('images', image);
    });

    await api.post('pets', data);

    alert('Cadastro realizado com sucesso!');

    history.push('/dashboard');
  }

  return (
    <Container>
      <Sidebar />

      <Content>
        <Form onSubmit={handleSubmit}>
          <fieldset>
            <legend>Dados</legend>

            <Map
              center={[-20.2836333, -50.5440513]}
              style={{ width: '100%', height: 280 }}
              zoom={15}
              onClick={handleMapClick}
            >
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

            <div className="input-block">
              <label htmlFor="port">Porte</label>
              <textarea
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
                onChange={e => setInformation(e.target.value)}
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
    </Container>
  );
};

export default CreatePet;
