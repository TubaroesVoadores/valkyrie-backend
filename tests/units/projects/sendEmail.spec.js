import {
  successEventEmailForms,
  successEventLandingEmail,
} from '../events/sendEmail.json';
import {
  emailForms,
  landingEmail,
} from '../../../src/functions/projects/sendEmail';

/*
    To run all test:
      npm run test

    To run createProject suits
      npm run test sendEmail.spec.js
  */

jest.mock('../../../src/models');
jest.mock('aws-sdk');

describe('Testing emailForms API', () => {
  test('Should return 200 if success event', async () => {
    const response = await emailForms(successEventEmailForms);

    const body = JSON.parse(response.body);

    expect(body.message).toEqual('Email sent successfully!');
  });

  test('Should return 404 if email forms is invalid', async () => {
    const response = await emailForms();

    expect(response.statusCode).toEqual(500);
  });
});

describe('Testing landingEmail API', () => {
  test('Should return 200 if success event', async () => {
    const response = await landingEmail(successEventLandingEmail);

    const body = JSON.parse(response.body);

    expect(body.message).toEqual('Email sent successfully!');
  });

  test('Should return 404 if landing email is invalid', async () => {
    const response = await landingEmail();

    expect(response.statusCode).toEqual(500);
  });
});
