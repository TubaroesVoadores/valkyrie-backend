import {
  apiError,
  apiResponse,
} from '../utils';

export const main = async (event) => {
  try {
    console.log(event);
    const test = 'test';

    return apiResponse({ test }, 200);
  } catch (error) {
    return apiError(error);
  }
};
