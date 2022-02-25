import { apiResponse } from './apiResponse';

export const apiError = (error) => {
  console.error('error message: ', { error });

  let statusCode;
  const body = {};

  switch (error.name) {
    case 'InvalidInputError':
      statusCode = 400;
      body.error = error.message;
      break;
    case 'RequestError':
      body.error = error.message;
      statusCode = error?.status;
      break;
    case 'NotAuthorizedError':
      statusCode = 403;
      body.error = error.message;
      break;
    default:
      statusCode = 500;
      body.error = "Couldn't fetch the search";
      break;
  }

  return apiResponse(body, statusCode);
};
