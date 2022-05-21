const AWS = require('aws-sdk');

require('dotenv').config();

const registerUser = () => {
  AWS.config.update({
    region: 'us-east-1',
  });

  const cognitoidentityserviceprovider =
    new AWS.CognitoIdentityServiceProvider();

  const params = {
    UserPoolId: process.env.cognitoUserPoolId,
    Username: process.argv[2],
    ForceAliasCreation: true,
    UserAttributes: [
      {
        Name: 'email',
        Value: process.argv[2],
      },
      {
        Name: 'name',
        Value: process.argv[3],
      },
      {
        Name: 'email_verified',
        Value: 'true',
      },
    ],
  };
  cognitoidentityserviceprovider.adminCreateUser(params, (err, data) => {
    if (err) console.log(err, err.stack);
    else console.log(data);
  });
};

registerUser();
