import AWS from 'aws-sdk';
import { registerUser } from '../../../scripts/createUser';
import { successResponse } from '../response/createUser.json';

jest.mock('aws-sdk');

process.argv = ['valkyrie.cesupa@gmail.com', 'valkyrie'];

describe('Testing user creation', () => {
  test('Should return Success if success creation', async () => {
    const response = await registerUser();

    expect(response).toMatchObject(successResponse);
  });

  test('Should return Error during user creation', async () => {
    const cognitoHandler = AWS.CognitoIdentityServiceProvider.prototype.adminCreateUser;

    cognitoHandler.mockImplementationOnce(() => {
      throw new Error('Error during user creation!');
    });

    const response = await registerUser();

    expect(response).toBe('Error while creating user');
  });
});
