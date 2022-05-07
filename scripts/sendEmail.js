const generator = require('generate-password');
const AWS = require('aws-sdk');
require('dotenv').config();

const userPassword = generator.generate({
  length: 10,
  numbers: true,
  uppercase: true,
  lowercase: true,
  symbols: true,
});
console.log(userPassword);

const registerUser = () => {
  AWS.config.update({
    region: 'us-east-1', // change region if required
  });

  // eslint-disable-next-line operator-linebreak
  const cognitoidentityserviceprovider =
    new AWS.CognitoIdentityServiceProvider();

  const params = {
    UserPoolId: process.env.COGNITO_USER_POOL_ID,
    Username: process.env.USER_EMAIL,
    TemporaryPassword: userPassword,
    UserAttributes: [
      {
        Name: 'email',
        Value: process.env.USER_EMAIL,
      },
      {
        Name: 'name',
        Value: process.env.NAME,
      },
    ],
  };
  cognitoidentityserviceprovider.adminCreateUser(params, (err, data) => {
    if (err) console.log(err, err.stack);
    else console.log(data);
  });
};

registerUser();
