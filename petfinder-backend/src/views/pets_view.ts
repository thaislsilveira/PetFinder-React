import type PetsService from '../services/PetsService';
import imagesView from './images_view';

type Pet = Awaited<ReturnType<typeof PetsService.findAll>>[number];

export default {
  render(pet: Pet) {
    return {
      id: pet.id,
      type: pet.type,
      latitude: Number(pet.latitude),
      longitude: Number(pet.longitude),
      sex: pet.sex,
      port: pet.port,
      breed: pet.breed,
      information: pet.information,
      responsible_name: pet.responsibleName,
      phone: pet.phone,
      found: pet.found,
      found_at: pet.foundAt,
      images: imagesView.renderMany(pet.images),
      created_at: pet.createdAt,
    };
  },

  renderMany(pets: Pet[]) {
    return pets.map(pet => this.render(pet));
  },
};
