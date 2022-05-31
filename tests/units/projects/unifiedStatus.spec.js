import {
  successEvent,
  successEventString,
} from '../events/unifiedStatus.json';
import { main as unifiedStatus } from '../../../src/functions/projects/unifiedStatus';
import { Images } from '../../../src/models';

/*
  To run all test:
    npm run test

  To run createProject suits
    npm run test createProject.spec.js
*/

jest.mock('../../../src/models');
jest.mock('aws-sdk');

const imagesDefault = {
  createdAt: '2022-05-26T00:51:56Z',
  data: {
    area: 3,
    lat: 38.98769411111111,
    log: -107.88787850000001,
    nativeForest: 0.3686286458333333,
  },
  filteredImageLink: 'https://bucket.s3.amazonaws.com/image.jpg',
  id: '111e2711-d708-4cec-a3d7-8e6c14d6ac6b',
  projectId: 'a8c4f47e-758a-49c0-9ad9-d438e3bad42e',
  s3link: 'https://bucket.s3.amazonaws.com/image.jpg',
  updatedAt: '2022-05-26T00:51:56Z',
};

describe('Testing createProject API', () => {
  test('Should return status REPROVADO if native forest area percent <= 0.25', async () => {
    const response = await unifiedStatus(successEvent);

    expect(response).toBe('finished unified status REPROVADO');
  });

  test('Testing with json string event', async () => {
    const response = await unifiedStatus(successEventString);

    expect(response).toBe('finished unified status REPROVADO');
  });

  test('Should return status APROVADO if native forest area percent >= 0.25', async () => {
    jest.spyOn(Images, 'exec').mockImplementation(() => [
      imagesDefault,
      imagesDefault,
      imagesDefault,
    ]);

    const response = await unifiedStatus(successEvent);

    expect(response).toBe('finished unified status APROVADO');
  });

  test('Should stop execution if there are unfinished images', async () => {
    jest.spyOn(Images, 'exec').mockImplementation(() => [{}]);

    const response = await unifiedStatus(successEvent);

    expect(response).toBe('There are unfinished images');
  });

  test('Should return error if there are error', async () => {
    jest.spyOn(Images, 'exec').mockImplementation(() => { throw new Error('Sou um error hahahah >:)'); });

    const response = await unifiedStatus(successEvent);

    expect(response).toBe('An error ocurred in unifiedStatus Sou um error hahahah >:)');
  });
});
