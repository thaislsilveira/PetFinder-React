import prisma from '../database/prisma';
import PetsService from './PetsService';

vi.mock('../database/prisma', () => ({
  default: {
    pet: {
      findMany: vi.fn(),
      findUniqueOrThrow: vi.fn(),
      create: vi.fn(),
    },
  },
}));

const mockedPrisma = prisma as unknown as {
  pet: {
    findMany: ReturnType<typeof vi.fn>;
    findUniqueOrThrow: ReturnType<typeof vi.fn>;
    create: ReturnType<typeof vi.fn>;
  };
};

describe('PetsService', () => {
  beforeEach(() => {
    mockedPrisma.pet.findMany.mockReset();
    mockedPrisma.pet.findUniqueOrThrow.mockReset();
    mockedPrisma.pet.create.mockReset();
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
});
