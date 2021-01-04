import Pet from '../models/Pet';
import imagesView from './images_view';

export default {
  render(pet: Pet) {
    return {
      id: pet.id,
      type: pet.type,
      latitude: pet.latitude,
      longitude: pet.longitude,
      sex: pet.sex,
      port: pet.port,
      breed: pet.breed,
      information: pet.information,
      responsible_name: pet.responsible_name,
      phone: pet.phone,
      images: imagesView.renderMany(pet.images),
      created_at: pet.created_at,
    };
  },

  renderMany(pets: Pet[]) {
    return pets.map(pet => this.render(pet));
  },
};
