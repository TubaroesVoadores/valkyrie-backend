export const getEventParams = (event) => {
  const {
    body,
    requestContext: {
      identity: {
        cognitoIdentityId,
      },
    },
  } = event;

  const entry = typeof body === 'string' ? JSON.parse(body) : body;

  return {
    ...entry,
    userId: cognitoIdentityId,
  };
};
