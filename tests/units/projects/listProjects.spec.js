import {
  successEvent,
} from '../events/listProjects.json';
import {
  successResponse,
} from '../response/listProjects.json';
import { main as listProjects } from '../../../src/functions/projects/listProjects';
import { Projects } from '../../../src/models';

/*
  To run all test:
    npm run test

  To run listProject suits
    npm run test listProject.spec.js
*/

jest.spyOn(Projects, 'exec').mockImplementation(() => [{
  area: 9,
  city: 'Belem',
  country: 'Brasil',
  createdAt: '2022-05-26T15:25:59Z',
  email: 'pedroaluz137@gmail.com',
  id: '2c855ba6-5557-4314-afe0-125bf5f2654e',
  name: 'CESUPA',
  nativeForestArea: 2.2093875,
  nativeForestAreaPercent: 0.2454875,
  state: 'PA',
  status: 'REPROVADO',
  updatedAt: '2022-05-26T15:25:59Z',
  userId: 'us-east-1:5fe8b5e0-2400-4736-883c-2a1c593441cf',
}]);

jest.mock('aws-sdk');
jest.mock('../../../src/models');

describe('Testing list API', () => {
  test('Should return 200 if success event', async () => {
    const response = await listProjects(successEvent);

    const body = JSON.parse(response.body);

    expect(body).toMatchObject(successResponse);
  });

  test('Should return 500 if error in query', async () => {
    jest.spyOn(Projects, 'exec').mockImplementation(() => { throw new Error('Sou um erro aaaahhh'); });
    const response = await listProjects(successEvent);

    const body = JSON.parse(response.body);

    expect(body).toMatchObject({
      message: 'Internal server error',
    });
  });
});
