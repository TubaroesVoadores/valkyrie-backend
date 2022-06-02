const AWS = require('aws-sdk');

require('dotenv').config();

export const registerUser = async () => {
  const cognitoidentityserviceprovider = new AWS.CognitoIdentityServiceProvider();

  const params = {
    UserPoolId: 'us-east-1_lpjZn9Wuk',
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

  try {
    const response = await cognitoidentityserviceprovider.adminCreateUser(params);

    return response;
  } catch (error) {
    return 'Error while creating user';
  }
};

registerUser();
