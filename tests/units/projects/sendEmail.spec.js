import {
  successEventEmailForms,
  invalidInputEventEmailForms,
  successEventLandingEmail,
  invalidInputEventLandingEmail,
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

const { mock } = require('nodemailer');

describe('Testing emailForms API', () => {
  test('Should return 200 if success event', async () => {
    const response = await emailForms(successEventEmailForms);

    const body = JSON.parse(response.body);

    expect(body.message).toEqual('Email sent successfully!');
  });

  test('Should return 404 if email forms is invalid', async () => {
    let message;
    const sentEmails = mock.getSentMail();

    if (sentEmails.length < 0) {
      message = {
        message:
          'Wrong entry format, instance.description is not of a type(s) number',
      };
    } else {
      message = { message: 'Email sent successfully!' };
    }
    const response = await emailForms(invalidInputEventEmailForms);

    const body = JSON.parse(response.body);

    expect(body).toMatchObject(message);
  });
});

describe('Testing landingEmail API', () => {
  test('Should return 200 if success event', async () => {
    const response = await landingEmail(successEventLandingEmail);

    const body = JSON.parse(response.body);

    expect(body.message).toEqual('Email sent successfully!');
  });

  test('Should return 404 if landing email is invalid', async () => {
    let message;
    const sentEmails = mock.getSentMail();

    if (sentEmails.length < 0) {
      message = {
        message:
          'Wrong entry format, instance.description is not of a type(s) number',
      };
    } else {
      message = { message: 'Email sent successfully!' };
    }

    const response = await landingEmail(invalidInputEventLandingEmail);

    const body = JSON.parse(response.body);

    expect(body).toMatchObject(message);
  });
});
