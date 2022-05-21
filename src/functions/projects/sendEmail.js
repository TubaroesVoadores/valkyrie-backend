import nodemailer from 'nodemailer';
import { apiError, apiResponse, getEventParams } from '../../utils';

/**
 * @name EmailForms
 * @description This api is responsible for send email of forms.
 * @param {Object} event - Base event object of AWS Lambda.
 * @param {Object} event.body.name - Project's nameProject.
 * @param {Object} event.body.description - Project's description.
 * @param {Object} event.requestContext.identity.cognitoIdentityId - User's id of cognito.
 * @command sls invoke local -f EmailForms -p tests/mocks/Projects/emailForms.json  -s STAGE
 */

export const emailForms = async (event) => {
  try {
    const { nameProject, description, userId } = getEventParams(event);

    const htmlForms = `
      <html>
      <body style="color: black; background-color: #f6f9f6">
          <center style="background-color: #f6f9f6; padding: 30px 0">
          <div style="
                  background-color: white;
                  width: fit-content;
              ">
              <div style="
                  background-color: #15B54A;
                  color: white;
                  padding: 15px;
                  ">
              <span style="font-size: 30px; font-weight: bold">
                  Valkyrie
              </span>
              </div>
              <div style="padding: 10px 30px 30px 30px">
              <p style="font-size: 18px">
                  Usuário: <strong>${userId}</strong>
              </p>
              <p style="font-size: 18px">
                  Nome do projeto: <strong>${nameProject}</strong>
              </p>
              <p style="font-size: 18px">
                  Descrição: <strong>${description}</strong>
              </p>
              <br />
              <br />
              <span style="font-size: 16px;">
                  Essa mensagem foi enviada a você pelo serviço
                  <strong>Valkyrie.</strong>
              </span>
              <br />
              <span style="font-size: 14px;">Por favor não responda a este e-mail.</span>
              </div>
          </div>
          </center>
      </body>
      </html>
        `;

    const transport = nodemailer.createTransport({
      host: 'smtp.mailtrap.io',
      port: 2525,
      auth: {
        user: '825201a245f203',
        pass: '0923035fccac53',
      },
    });

    const mailSent = await transport.sendMail({
      subject: 'Solicitação de criação de novo projeto',
      from: `Valkyrie<${process.env.email}>`,
      to: `${process.env.email}`,
      html: htmlForms,
    });

    return apiResponse({ message: 'Email sent successfully!', mailSent }, 200);
  } catch (error) {
    return apiError(error);
  }
};

/**
 * @name LandingEmail
 * @description This api is responsible for send email of landing page.
 * @param {Object} event - Base event object of AWS Lambda.
 * @param {Object} event.body.name - Project's name.
 * @param {Object} event.body.email - Project's email.
 * @param {Object} event.body.description - Project's description.
 * @command sls invoke local -f LandingEmail -p tests/mocks/Projects/landingEmail.json  -s STAGE
 */

export const landingEmail = async (event) => {
  try {
    const { name, email, description } = getEventParams(event);

    const htmlLanding = `
                        <html>
                        <body style="color: black; background-color: #f6f9f6">
                            <center style="background-color: #f6f9f6; padding: 30px 0">
                            <div style="
                                    background-color: white;
                                    width: fit-content;
                                ">
                                <div style="
                                    background-color: #15B54A;
                                    color: white;
                                    padding: 15px;
                                    ">
                                <span style="font-size: 30px; font-weight: bold">
                                    Valkyrie
                                </span>
                                </div>
                                <div style="padding: 10px 30px 30px 30px">
                                <p style="font-size: 18px">
                                    Nome: <strong>${name}</strong>
                                </p>
                                <p style="font-size: 18px">
                                    Email: <strong>${email}</strong>
                                </p>
                                <p style="font-size: 18px">
                                    Descrição: <strong>${description}</strong>
                                </p>
                                <br />
                                <br />
                                <span style="font-size: 16px;">
                                    Essa mensagem foi enviada a você pelo serviço
                                    <strong>Valkyrie.</strong>
                                </span>
                                <br />
                                <span style="font-size: 14px;">Por favor não responda a este e-mail.</span>
                                </div>
                            </div>
                            </center>
                        </body>
                        </html>
                        `;

    const transport = nodemailer.createTransport({
      host: 'smtp.mailtrap.io',
      port: 2525,
      auth: {
        user: '825201a245f203',
        pass: '0923035fccac53',
      },
    });

    const mailSent = await transport.sendMail({
      subject: 'Solicitação de contato com o Valkyrie',
      from: `Valkyrie<${process.env.email}>`,
      to: `${process.env.email}`,
      html: htmlLanding,
    });

    return apiResponse({ message: 'Email sent successfully!', mailSent }, 200);
  } catch (error) {
    return apiError(error);
  }
};
