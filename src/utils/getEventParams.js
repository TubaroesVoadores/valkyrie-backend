export const getEventParams = (event) => {
  const {
    body,
    pathParameters,
    requestContext,
  } = event;

  console.log('body', { event: body });
  const cognitoIdentityId = requestContext?.identity?.cognitoIdentityId;
  const entry = typeof body === 'string' ? JSON.parse(body) : body;

  console.log('Entry:', { entry });

  return {
    ...entry,
    ...pathParameters,
    userId: cognitoIdentityId,
  };
};
