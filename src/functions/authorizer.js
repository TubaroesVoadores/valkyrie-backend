import { UnauthorizedError, dynamo, apiError } from '../utils';

const generatePolicy = ({ allow }) => ({
  principalId: 'token',
  policyDocument: {
    Version: '2012-10-17',
    Statement: {
      Action: 'execute-api:Invoke',
      Effect: allow ? 'Allow' : 'Deny',
      Resource: '*',
    },
  },
});

export const main = async (event) => {
  const {
    headers,
  } = event;
  const { usersTableDynamoName } = process.env;

  try {
    const token = headers['x-Amz-Security-Token'];

    if (!token) {
      return new UnauthorizedError('Token is not valid.');
    }

    const response = await dynamo.get(token, usersTableDynamoName);

    if (!response) {
      return new UnauthorizedError('Token is not exist.');
    }

    return generatePolicy({ allow: true });
  } catch (error) {
    return apiError(error);
  }
};
