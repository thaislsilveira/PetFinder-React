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

interface UpdatePetData {
  type: boolean;
  latitude: number;
  longitude: number;
  sex: boolean;
  port: string;
  breed: string;
  information: string;
  responsibleName: string;
  phone?: string;
  found: boolean;
  images?: { path: string }[];
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

  async update(id: number, data: UpdatePetData) {
    const { images, ...pet } = data;

    const existing = await prisma.pet.findUniqueOrThrow({ where: { id } });

    const foundAt = pet.found ? (existing.foundAt ?? new Date()) : null;

    return prisma.pet.update({
      where: { id },
      data: {
        ...pet,
        foundAt,
        ...(images && images.length > 0 ? { images: { create: images } } : {}),
      },
      include: { images: true },
    });
  },

  async deleteImage(petId: number, imageId: number) {
    const image = await prisma.image.findFirstOrThrow({
      where: { id: imageId, petId },
    });

    await prisma.image.delete({ where: { id: imageId } });

    return image;
  },
};
