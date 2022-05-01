export const getEventParams = (event) => {
  const {
    body,
    requestContext: {
      identity: {
        cognitoIdentityId,
      },
    },
    pathParameters,
  } = event;

  const entry = typeof body === 'string' ? JSON.parse(body) : body;

  return {
    ...entry,
    ...pathParameters,
    userId: cognitoIdentityId,
  };
};
