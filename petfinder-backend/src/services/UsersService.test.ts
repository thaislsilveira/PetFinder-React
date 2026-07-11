import prisma from '../database/prisma';
import UsersService from './UsersService';

vi.mock('../database/prisma', () => ({
  default: {
    user: {
      findUnique: vi.fn(),
      create: vi.fn(),
    },
  },
}));

const mockedPrisma = prisma as unknown as {
  user: {
    findUnique: ReturnType<typeof vi.fn>;
    create: ReturnType<typeof vi.fn>;
  };
};

describe('UsersService', () => {
  beforeEach(() => {
    mockedPrisma.user.findUnique.mockReset();
    mockedPrisma.user.create.mockReset();
  });

  it('finds a user by email', async () => {
    mockedPrisma.user.findUnique.mockResolvedValueOnce({ id: '1' });

    const user = await UsersService.findByEmail('rex@petfinder.com');

    expect(mockedPrisma.user.findUnique).toHaveBeenCalledWith({
      where: { email: 'rex@petfinder.com' },
    });
    expect(user).toEqual({ id: '1' });
  });

  it('finds a user by id', async () => {
    mockedPrisma.user.findUnique.mockResolvedValueOnce({ id: '1' });

    const user = await UsersService.findById('1');

    expect(mockedPrisma.user.findUnique).toHaveBeenCalledWith({
      where: { id: '1' },
    });
    expect(user).toEqual({ id: '1' });
  });

  it('creates a user', async () => {
    const data = {
      name: 'Rex',
      email: 'rex@petfinder.com',
      password: 'hashed',
      phone: '11912345678',
    };

    mockedPrisma.user.create.mockResolvedValueOnce({ id: '1', ...data });

    const user = await UsersService.create(data);

    expect(mockedPrisma.user.create).toHaveBeenCalledWith({ data });
    expect(user).toEqual({ id: '1', ...data });
  });
});
