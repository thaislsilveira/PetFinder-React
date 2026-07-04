import prisma from '../database/prisma';

interface CreateUserData {
  name: string;
  email: string;
  password: string;
  phone: string;
}

export default {
  findByEmail(email: string) {
    return prisma.user.findUnique({ where: { email } });
  },

  findById(id: string) {
    return prisma.user.findUnique({ where: { id } });
  },

  create(data: CreateUserData) {
    return prisma.user.create({ data });
  },
};
