import {
  successEvent,
} from '../events/getImage.json';
import {
  successResponse,
} from '../response/getImage.json';
import { main as getImage } from '../../../src/functions/images/getImage';
import { Images } from '../../../src/models';
/*
  To run all test:
    npm run test

  To run getImage.spec.js suits
    npm run test getImage.spec.js
*/

jest.mock('../../../src/models');
jest.mock('aws-sdk');

describe('Testing getProject API', () => {
  test('Should return 200 if success event', async () => {
    const response = await getImage(successEvent);

    const body = JSON.parse(response.body);

    expect(body).toMatchObject(successResponse);
  });

  test('Should return 404 if project not found.', async () => {
    jest.spyOn(Images, 'exec').mockImplementation(() => []);

    const response = await getImage(successEvent);

    const body = JSON.parse(response.body);

    expect(body).toMatchObject({ message: 'Image not found!' });
  });
});
