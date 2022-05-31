import {
  successEvent,
  forbiddenEvent,
  notFoundEvent,
} from '../events/getProject.json';
import {
  successResponse,
  forbiddenResponse,
  notFoundResponse,
} from '../response/getProject.json';
import { main as getProject } from '../../../src/functions/projects/getProject';
import { Projects } from '../../../src/models';
/*
  To run all test:
    npm run test

  To run getProject.spec.js suits
    npm run test getProject.spec.js
*/

jest.mock('../../../src/models');
jest.mock('aws-sdk');

describe('Testing getProject API', () => {
  test('Should return 200 if success event', async () => {
    const response = await getProject(successEvent);

    const body = JSON.parse(response.body);

    expect(body).toMatchObject(successResponse);
  });

  test('Should return 403 if trying to access another user\'s project.', async () => {
    const response = await getProject(forbiddenEvent);

    const body = JSON.parse(response.body);

    expect(body).toMatchObject(forbiddenResponse);
  });

  test('Should return 404 if project not found.', async () => {
    jest.spyOn(Projects, 'exec').mockImplementation(() => []);

    const response = await getProject(notFoundEvent);

    const body = JSON.parse(response.body);

    expect(body).toMatchObject(notFoundResponse);
  });
});
