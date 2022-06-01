import {
  successEvent,
  invalindInputEventNoImages,
  successEventWithLink,
  invalindInputEventNoProjectId,
  invalindInputEventImageType,
} from '../events/createImages.json';
import {
  successResponse,
  successResponseWithLink,
} from '../response/createImages.json';
import { main as createImage } from '../../../src/functions/images/createImage';
import { Projects } from '../../../src/models';

/*
  To run all test:
    npm run test

  To run createImage suits
    npm run test createImage.spec.js
*/

jest.mock('../../../src/models');
jest.mock('aws-sdk');

describe('Testing createProject API', () => {
  test('Should return 200 if event with images link', async () => {
    const response = await createImage(successEventWithLink);

    const body = JSON.parse(response.body);

    expect(body).toMatchObject(successResponseWithLink);
  });

  test('Should return 200 if event with images base:64', async () => {
    const response = await createImage(successEvent);

    const body = JSON.parse(response.body);

    expect(body).toMatchObject(successResponse);
  });

  test('Should return 400 if event don\t have images', async () => {
    const response = await createImage(invalindInputEventNoImages);

    const body = JSON.parse(response.body);

    expect(body).toMatchObject({
      message: 'Wrong entry format, instance.images does not meet minimum length of 1',
    });
  });

  test('Should return 400 if event don\t have projectId', async () => {
    const response = await createImage(invalindInputEventNoProjectId);

    const body = JSON.parse(response.body);

    expect(body).toMatchObject({
      message: 'Wrong entry format, instance.projectId is required',
    });
  });

  test('Should return 400 if event images[*].image is not string', async () => {
    const response = await createImage(invalindInputEventImageType);

    const body = JSON.parse(response.body);

    expect(body).toMatchObject({
      message: 'Wrong entry format, instance.images[0].image is not of a type(s) string',
    });
  });

  test('Should return 404 if there is no project with projectId', async () => {
    jest.spyOn(Projects, 'exec').mockImplementation(() => {});

    const response = await createImage(successEvent);

    const body = JSON.parse(response.body);

    expect(body).toMatchObject({
      message: 'Project not found!',
    });
  });
});
