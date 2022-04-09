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
    case 'UnauthorizedError':
      statusCode = 401;
      body.message = error.message;
      break;
    case 'ForbiddenError':
      statusCode = 403;
      body.message = error.message;
      break;
    case 'NotFoundError':
      statusCode = 404;
      body.message = error.message;
      break;
    case 'TimeoutError':
      statusCode = 504;
      body.message = error.message;
      break;
    default:
      statusCode = 500;
      body.message = 'Internal server error';
      break;
  }

  return apiResponse(body, statusCode);
};
