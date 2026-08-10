export type TypeFilter = 'all' | 'dog' | 'cat';
export type StatusFilter = 'all' | 'lost' | 'found';

export interface PetFilters {
  type: TypeFilter;
  status: StatusFilter;
}

interface FilterablePet {
  type: boolean;
  found: boolean;
}

export const defaultPetFilters: PetFilters = {
  type: 'all',
  status: 'all',
};

export function filterPets<Pet extends FilterablePet>(
  pets: Pet[],
  filters: PetFilters,
): Pet[] {
  return pets.filter(pet => {
    if (filters.type === 'dog' && !pet.type) return false;
    if (filters.type === 'cat' && pet.type) return false;

    if (filters.status === 'lost' && pet.found) return false;
    if (filters.status === 'found' && !pet.found) return false;

    return true;
  });
}
