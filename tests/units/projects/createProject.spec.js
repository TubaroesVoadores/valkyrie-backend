import {
  successEvent,
  invalidInputEvent,
  successEventWithImages,
} from '../events/createProject.json';
import {
  successResponse,
  invalidInputResponse,
  successResponseWithImages,
} from '../response/createProject.json';
import { main as createProject } from '../../../src/functions/projects/createProject';

/*
  To run all test:
    npm run test

  To run createProject suits
    npm run test createProject.spec.js
*/

jest.mock('../../../src/models');
jest.mock('aws-sdk');

describe('Testing createProject API', () => {
  test('Should return 200 if success event with images', async () => {
    const response = await createProject(successEventWithImages);

    const body = JSON.parse(response.body);

    expect(body).toMatchObject(successResponseWithImages);
  });

  test('Should return 200 if success event', async () => {
    const response = await createProject(successEvent);

    const body = JSON.parse(response.body);

    expect(body).toMatchObject(successResponse);
  });

  test('Should return 404 if project area is invalid', async () => {
    const response = await createProject(invalidInputEvent);

    const body = JSON.parse(response.body);

    expect(body).toMatchObject(invalidInputResponse);
  });
});
