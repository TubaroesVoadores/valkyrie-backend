import {
  successEvent,
} from '../events/webhookImage.json';
import {
  successResponse,
} from '../response/webhookImage.json';
import { main as webhookImage } from '../../../src/functions/images/webhookImage';
import { Images } from '../../../src/models';

/*
  To run all test:
    npm run test

  To run webhookImage suits
    npm run test webhookImage.spec.js
*/

jest.mock('../../../src/models');
jest.mock('aws-sdk');

describe('Testing webhookImage API', () => {
  test('Should return 200 with success event', async () => {
    const response = await webhookImage(successEvent);

    const body = JSON.parse(response.body);

    expect(body).toMatchObject(successResponse);
  });

  test('Should return 500 if failed', async () => {
    jest.spyOn(Images, 'update').mockImplementation(() => { throw new Error('Se deu mal seu bobão'); });

    const response = await webhookImage(successEvent);
    const body = JSON.parse(response.body);

    expect(body).toMatchObject({ message: 'Internal server error' });
  });
});
