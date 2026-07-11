import prisma from '../database/prisma';

interface CreatePetData {
  type: boolean;
  latitude: number;
  longitude: number;
  sex: boolean;
  port: string;
  breed: string;
  information: string;
  responsibleName: string;
  phone?: string;
  images: { path: string }[];
}

export default {
  findAll() {
    return prisma.pet.findMany({ include: { images: true } });
  },

  findById(id: number) {
    return prisma.pet.findUniqueOrThrow({
      where: { id },
      include: { images: true },
    });
  },

  create(data: CreatePetData) {
    const { images, ...pet } = data;

    return prisma.pet.create({
      data: {
        ...pet,
        images: { create: images },
      },
      include: { images: true },
    });
  },
};
