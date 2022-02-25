export const apiResponse = (body, statusCode) => {
  const finalHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Credentials': true,
    'Access-Control-Allow-Headers': 'X-Amz-Security-Token',
  };

  return {
    statusCode,
    headers: finalHeaders,
    body: JSON.stringify(body),
  };
};
