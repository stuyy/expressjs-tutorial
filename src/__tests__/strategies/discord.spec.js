const { discordVerifyFunction } = require('../../strategies/discord');
const DiscordUser = require('../../database/schemas/DiscordUser');

jest.mock('../../database/schemas/DiscordUser');

const accessToken = '123';
const refreshToken = '456';
const profile = {
  id: '2313213424',
};

const done = jest.fn((x) => x);

describe('Discord Verify Function', () => {
  it('should return user if found', async () => {
    const mockedUser = {
      id: 'id_123',
      discordId: profile.id,
      createdAt: new Date(),
    };
    DiscordUser.findOne.mockResolvedValueOnce(mockedUser);
    await discordVerifyFunction(accessToken, refreshToken, profile, done);
    expect(DiscordUser.findOne).toHaveBeenCalledWith({
      discordId: profile.id,
    });
    expect(done).toHaveBeenCalledWith(null, mockedUser);
  });

  it('should create user & return if not found', async () => {
    const newProfile = {
      id: '1234',
    };
    const newUser = {
      id: 1,
      discordId: '1234',
      createdAt: new Date(),
    };
    DiscordUser.create.mockResolvedValueOnce(newUser);
    DiscordUser.findOne.mockImplementationOnce(() => undefined);
    await discordVerifyFunction(accessToken, refreshToken, newProfile, done);
    expect(DiscordUser.findOne).toHaveBeenCalledWith({
      discordId: newProfile.id,
    });
    expect(DiscordUser.findOne).toHaveReturnedWith(undefined);
    expect(DiscordUser.create).toHaveBeenCalledWith({ discordId: '1234' });
    expect(done).toHaveBeenCalledWith(null, newUser);
  });
});
