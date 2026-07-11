import petView from './pets_view';

describe('petView', () => {
  const createdAt = new Date('2026-01-01T00:00:00.000Z');

  const pet = {
    id: 1,
    type: true,
    latitude: '12.5' as unknown as number,
    longitude: '-38.2' as unknown as number,
    sex: false,
    port: 'Médio',
    breed: 'Vira-lata',
    information: 'Muito dócil',
    responsibleName: 'Rex Owner',
    phone: '11912345678',
    found: false,
    images: [{ id: 1, path: 'dog.png', petId: 1 }],
    createdAt,
    updatedAt: createdAt,
  } as unknown as Parameters<typeof petView.render>[0];

  it('renders a pet, coercing latitude/longitude to numbers and images to urls', () => {
    expect(petView.render(pet)).toEqual({
      id: 1,
      type: true,
      latitude: 12.5,
      longitude: -38.2,
      sex: false,
      port: 'Médio',
      breed: 'Vira-lata',
      information: 'Muito dócil',
      responsible_name: 'Rex Owner',
      phone: '11912345678',
      found: false,
      images: [{ id: 1, url: 'http://localhost:3333/uploads/dog.png' }],
      created_at: createdAt,
    });
  });

  it('renders many pets', () => {
    const result = petView.renderMany([pet]);

    expect(result).toHaveLength(1);
    expect(result[0].responsible_name).toBe('Rex Owner');
  });
});
