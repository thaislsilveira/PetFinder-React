import userView from './users_view';

describe('userView', () => {
  const user = {
    id: '1',
    name: 'Rex',
    email: 'rex@petfinder.com',
    password: 'hashed',
    phone: '11912345678',
  } as Parameters<typeof userView.render>[0];

  it('renders a user without exposing the password', () => {
    expect(userView.render(user)).toEqual({
      id: '1',
      name: 'Rex',
      email: 'rex@petfinder.com',
      phone: '11912345678',
    });
  });

  it('renders many users', () => {
    expect(userView.renderMany([user])).toEqual([
      {
        id: '1',
        name: 'Rex',
        email: 'rex@petfinder.com',
        phone: '11912345678',
      },
    ]);
  });
});
