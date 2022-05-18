const nodemailer = require('nodemailer');
const smtpTransport = require('nodemailer-smtp-transport');

const sesAccessKey = '<email username>';
const sesSecretKey = '<email password>';

// eslint-disable-next-line func-names
exports.handler = function (event, context, callback) {
  const requestBody = JSON.parse(event.body);
  const emailBody = requestBody.text;

  const transporter = nodemailer.createTransport(
    smtpTransport({
      service: 'gmail',
      auth: {
        user: sesAccessKey,
        pass: sesSecretKey,
      },
    }),
  );

  const mailOptions = {
    from: '<from email address',
    to: '<to email address>',
    bcc: '<bcc email addres>',
    subject: 'Test subject',
    text: emailBody,
  };

  transporter.sendMail(mailOptions, (error) => {
    if (error) {
      const response = {
        statusCode: 500,
        body: JSON.stringify({
          error: error.message,
        }),
      };
      callback(null, response);
    }
    const response = {
      statusCode: 200,
      body: JSON.stringify({
        message: 'Email processed succesfully!',
      }),
    };
    callback(null, response);
  });
};
