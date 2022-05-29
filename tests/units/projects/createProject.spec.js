import { successEvent } from '../events/createProject.json';
import { successResponse } from '../response/createProject.json';
import { main as createProject } from '../../../src/functions/projects/createProject';

jest.mock('../../../src/models');
jest.mock('aws-sdk');

describe('Testing createProject API', () => {
  test('Should return 200 if success event', async () => {
    const response = await createProject(successEvent);

    const body = JSON.parse(response.body);

    expect(body).toMatchObject(successResponse);
  });
});
