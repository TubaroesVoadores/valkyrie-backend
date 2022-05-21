import nodemailer from 'nodemailer';

export const sendEmail = async (subjectKey, htmls) => {
  const transport = nodemailer.createTransport({
    host: 'smtp.mailtrap.io',
    port: 2525,
    auth: {
      user: '825201a245f203',
      pass: '0923035fccac53',
    },
  });

  const mailSent = await transport.sendMail({
    subject:
      subjectKey === 'emailForms'
        ? 'Solicitação de criação de novo projeto'
        : 'Solicitação de contato com o Valkyrie',
    from: `Valkyrie<${process.env.EMAIL}>`,
    to: process.env.EMAIL,
    html: htmls,
  });

  return mailSent;
};
