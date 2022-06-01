import {
  successEventEmailForms,
  invalidInputEventEmailForms,
  successEventLandingEmail,
  invalidInputEventLandingEmail,
} from '../events/sendEmail.json';
import {
  successResponseEmailForms,
  invalidInputResponseEmailForms,
  successResponseLandingEmail,
  invalidInputResponseLandingEmail,
} from '../response/sendEmail.json';
import {
  emailForms,
  landingEmail,
} from '../../../src/functions/projects/sendEmail';

const sendMailMock = jest.fn((mailOptions, callback) => callback());

/*
    To run all test:
      npm run test

    To run createProject suits
      npm run test sendEmail.spec.js
  */

jest.mock('../../../src/models');
jest.mock('aws-sdk');
jest.mock('nodemailer');
const nodemailer = require('nodemailer');

nodemailer.createTransport.mockReturnValue({ sendmail: sendMailMock });

beforeEach(() => {
  sendMailMock.mockClear();
  nodemailer.createTransport.mockClear();
});

describe('Testing emailForms API', () => {
  test('Should return 200 if success event', async () => {
    const response = await emailForms(successEventEmailForms);

    const body = JSON.parse(response.body);

    expect(body).toMatchObject(successResponseEmailForms);
  });

  test('Should return 404 if email forms is invalid', async () => {
    const response = await emailForms(invalidInputEventEmailForms);

    const body = JSON.parse(response.body);

    expect(body).toMatchObject(invalidInputResponseEmailForms);
  });
});

describe('Testing landingEmail API', () => {
  test('Should return 200 if success event', async () => {
    const response = await landingEmail(successEventLandingEmail);

    const body = JSON.parse(response.body);

    expect(body).toMatchObject(successResponseLandingEmail);
  });

  test('Should return 404 if landing email is invalid', async () => {
    const response = await landingEmail(invalidInputEventLandingEmail);

    const body = JSON.parse(response.body);

    expect(body).toMatchObject(invalidInputResponseLandingEmail);
  });
});
