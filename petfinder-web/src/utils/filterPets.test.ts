import { filterPets, defaultPetFilters } from './filterPets';

const dogLost = { id: 1, type: true, found: false };
const dogFound = { id: 2, type: true, found: true };
const catLost = { id: 3, type: false, found: false };
const catFound = { id: 4, type: false, found: true };
const pets = [dogLost, dogFound, catLost, catFound];

describe('filterPets', () => {
  it('returns every pet when both filters are "all"', () => {
    expect(filterPets(pets, defaultPetFilters)).toEqual(pets);
  });

  it('keeps only dogs when the type filter is "dog"', () => {
    expect(filterPets(pets, { type: 'dog', status: 'all' })).toEqual([
      dogLost,
      dogFound,
    ]);
  });

  it('keeps only cats when the type filter is "cat"', () => {
    expect(filterPets(pets, { type: 'cat', status: 'all' })).toEqual([
      catLost,
      catFound,
    ]);
  });

  it('keeps only pets still lost when the status filter is "lost"', () => {
    expect(filterPets(pets, { type: 'all', status: 'lost' })).toEqual([
      dogLost,
      catLost,
    ]);
  });

  it('keeps only pets marked as found when the status filter is "found"', () => {
    expect(filterPets(pets, { type: 'all', status: 'found' })).toEqual([
      dogFound,
      catFound,
    ]);
  });

  it('combines type and status filters', () => {
    expect(filterPets(pets, { type: 'dog', status: 'found' })).toEqual([
      dogFound,
    ]);
  });
});
