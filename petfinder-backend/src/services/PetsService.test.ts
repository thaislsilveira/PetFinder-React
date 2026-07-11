import prisma from '../database/prisma';
import PetsService from './PetsService';

vi.mock('../database/prisma', () => ({
  default: {
    pet: {
      findMany: vi.fn(),
      findUniqueOrThrow: vi.fn(),
      create: vi.fn(),
      update: vi.fn(),
    },
    image: {
      findFirstOrThrow: vi.fn(),
      delete: vi.fn(),
    },
  },
}));

const mockedPrisma = prisma as unknown as {
  pet: {
    findMany: ReturnType<typeof vi.fn>;
    findUniqueOrThrow: ReturnType<typeof vi.fn>;
    create: ReturnType<typeof vi.fn>;
    update: ReturnType<typeof vi.fn>;
  };
  image: {
    findFirstOrThrow: ReturnType<typeof vi.fn>;
    delete: ReturnType<typeof vi.fn>;
  };
};

describe('PetsService', () => {
  beforeEach(() => {
    mockedPrisma.pet.findMany.mockReset();
    mockedPrisma.pet.findUniqueOrThrow.mockReset();
    mockedPrisma.pet.create.mockReset();
    mockedPrisma.pet.update.mockReset();
    mockedPrisma.image.findFirstOrThrow.mockReset();
    mockedPrisma.image.delete.mockReset();
  });

  it('finds all pets including their images', async () => {
    mockedPrisma.pet.findMany.mockResolvedValueOnce([{ id: 1 }]);

    const pets = await PetsService.findAll();

    expect(mockedPrisma.pet.findMany).toHaveBeenCalledWith({
      include: { images: true },
    });
    expect(pets).toEqual([{ id: 1 }]);
  });

  it('finds a pet by id including its images', async () => {
    mockedPrisma.pet.findUniqueOrThrow.mockResolvedValueOnce({ id: 1 });

    const pet = await PetsService.findById(1);

    expect(mockedPrisma.pet.findUniqueOrThrow).toHaveBeenCalledWith({
      where: { id: 1 },
      include: { images: true },
    });
    expect(pet).toEqual({ id: 1 });
  });

  it('creates a pet, nesting the images to create', async () => {
    const data = {
      type: true,
      latitude: 12.5,
      longitude: -38.2,
      sex: false,
      port: 'Médio',
      breed: 'Vira-lata',
      information: 'Muito dócil',
      responsibleName: 'Rex Owner',
      phone: '11912345678',
      images: [{ path: 'dog.png' }],
    };

    mockedPrisma.pet.create.mockResolvedValueOnce({ id: 1, ...data });

    const pet = await PetsService.create(data);

    const { images, ...petData } = data;

    expect(mockedPrisma.pet.create).toHaveBeenCalledWith({
      data: { ...petData, images: { create: images } },
      include: { images: true },
    });
    expect(pet).toEqual({ id: 1, ...data });
  });

  it('updates a pet, nesting any new images to create', async () => {
    const data = {
      type: true,
      latitude: 12.5,
      longitude: -38.2,
      sex: false,
      port: 'Médio',
      breed: 'Vira-lata',
      information: 'Muito dócil',
      responsibleName: 'Rex Owner',
      phone: '11912345678',
      found: false,
      images: [{ path: 'cat.png' }],
    };

    mockedPrisma.pet.findUniqueOrThrow.mockResolvedValueOnce({
      found: false,
      foundAt: null,
    });
    mockedPrisma.pet.update.mockResolvedValueOnce({ id: 1, ...data });

    const pet = await PetsService.update(1, data);

    const { images, ...petData } = data;

    expect(mockedPrisma.pet.update).toHaveBeenCalledWith({
      where: { id: 1 },
      data: { ...petData, foundAt: null, images: { create: images } },
      include: { images: true },
    });
    expect(pet).toEqual({ id: 1, ...data });
  });

  it('updates a pet without touching images when none are provided', async () => {
    const data = {
      type: true,
      latitude: 12.5,
      longitude: -38.2,
      sex: false,
      port: 'Médio',
      breed: 'Vira-lata',
      information: 'Muito dócil',
      responsibleName: 'Rex Owner',
      phone: '11912345678',
      found: false,
    };

    mockedPrisma.pet.findUniqueOrThrow.mockResolvedValueOnce({
      found: false,
      foundAt: null,
    });
    mockedPrisma.pet.update.mockResolvedValueOnce({ id: 1, ...data });

    await PetsService.update(1, data);

    expect(mockedPrisma.pet.update).toHaveBeenCalledWith({
      where: { id: 1 },
      data: { ...data, foundAt: null },
      include: { images: true },
    });
  });

  it('sets foundAt the first time a pet is marked as found', async () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date('2026-07-11T12:00:00.000Z'));

    const data = {
      type: true,
      latitude: 12.5,
      longitude: -38.2,
      sex: false,
      port: 'Médio',
      breed: 'Vira-lata',
      information: 'Muito dócil',
      responsibleName: 'Rex Owner',
      phone: '11912345678',
      found: true,
    };

    mockedPrisma.pet.findUniqueOrThrow.mockResolvedValueOnce({
      found: false,
      foundAt: null,
    });
    mockedPrisma.pet.update.mockResolvedValueOnce({ id: 1, ...data });

    await PetsService.update(1, data);

    expect(mockedPrisma.pet.update).toHaveBeenCalledWith({
      where: { id: 1 },
      data: { ...data, foundAt: new Date('2026-07-11T12:00:00.000Z') },
      include: { images: true },
    });

    vi.useRealTimers();
  });

  it('keeps the original foundAt when an already found pet is edited again', async () => {
    const originalFoundAt = new Date('2026-01-01T00:00:00.000Z');

    const data = {
      type: true,
      latitude: 12.5,
      longitude: -38.2,
      sex: false,
      port: 'Médio',
      breed: 'Vira-lata',
      information: 'Muito dócil atualizado',
      responsibleName: 'Rex Owner',
      phone: '11912345678',
      found: true,
    };

    mockedPrisma.pet.findUniqueOrThrow.mockResolvedValueOnce({
      found: true,
      foundAt: originalFoundAt,
    });
    mockedPrisma.pet.update.mockResolvedValueOnce({ id: 1, ...data });

    await PetsService.update(1, data);

    expect(mockedPrisma.pet.update).toHaveBeenCalledWith({
      where: { id: 1 },
      data: { ...data, foundAt: originalFoundAt },
      include: { images: true },
    });
  });

  it('clears foundAt when a pet is unmarked as found', async () => {
    const data = {
      type: true,
      latitude: 12.5,
      longitude: -38.2,
      sex: false,
      port: 'Médio',
      breed: 'Vira-lata',
      information: 'Muito dócil',
      responsibleName: 'Rex Owner',
      phone: '11912345678',
      found: false,
    };

    mockedPrisma.pet.findUniqueOrThrow.mockResolvedValueOnce({
      found: true,
      foundAt: new Date('2026-01-01T00:00:00.000Z'),
    });
    mockedPrisma.pet.update.mockResolvedValueOnce({ id: 1, ...data });

    await PetsService.update(1, data);

    expect(mockedPrisma.pet.update).toHaveBeenCalledWith({
      where: { id: 1 },
      data: { ...data, foundAt: null },
      include: { images: true },
    });
  });

  it('deletes an image scoped to its pet', async () => {
    const image = { id: 9, path: 'dog.png', petId: 1 };
    mockedPrisma.image.findFirstOrThrow.mockResolvedValueOnce(image);
    mockedPrisma.image.delete.mockResolvedValueOnce(image);

    const result = await PetsService.deleteImage(1, 9);

    expect(mockedPrisma.image.findFirstOrThrow).toHaveBeenCalledWith({
      where: { id: 9, petId: 1 },
    });
    expect(mockedPrisma.image.delete).toHaveBeenCalledWith({
      where: { id: 9 },
    });
    expect(result).toEqual(image);
  });
});
