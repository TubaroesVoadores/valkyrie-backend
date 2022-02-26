import { apiResponse } from './apiResponse';

export const apiError = (error) => {
  console.error('error message: ', { error });

  let statusCode;
  const body = {};

  switch (error.name) {
    case 'InvalidInputError':
      statusCode = 400;
      body.message = error.message;
      break;
    case 'RequestError':
      statusCode = error?.status;
      body.message = error.message;
      break;
    case 'NotAuthorizedError':
    case 'UnauthorizedError':
      statusCode = 403;
      body.message = error.message;
      break;
    default:
      statusCode = 500;
      body.message = 'Internal server error';
      break;
  }

  return apiResponse(body, statusCode);
};
