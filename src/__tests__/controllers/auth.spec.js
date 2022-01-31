const { authRegisterController } = require('../../controllers/auth');
const User = require('../../database/schemas/User');
const { hashPassword } = require('../../utils/helpers');

jest.mock('../../utils/helpers', () => ({
  hashPassword: jest.fn(() => 'hash password'),
}));

jest.mock('../../database/schemas/User');

const request = {
  body: {
    email: 'fake_email',
    password: 'fake_password',
  },
};

const response = {
  status: jest.fn((x) => x),
  send: jest.fn((x) => x),
};

it('should send a status code of 400 when user exists', async () => {
  User.findOne.mockImplementationOnce(() => ({
    id: 1,
    email: 'email',
    password: 'password',
  }));
  await authRegisterController(request, response);
  expect(response.status).toHaveBeenCalledWith(400);
  expect(response.send).toHaveBeenCalledTimes(1);
});

it('should send a status code of 201 when new user is created', async () => {
  User.findOne.mockResolvedValueOnce(undefined);
  User.create.mockResolvedValueOnce({
    id: 1,
    email: 'email',
    password: 'password',
  });
  await authRegisterController(request, response);
  expect(hashPassword).toHaveBeenCalledWith('fake_password');
  expect(User.create).toHaveBeenCalledWith({
    email: 'fake_email',
    password: 'hash password',
  });
  expect(response.send).toHaveBeenCalledWith(201);
});
