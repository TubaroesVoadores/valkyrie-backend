import {
  apiError,
  apiResponse,
} from '../utils';

export const main = async () => {
  try {
    const test = 'test';

    return apiResponse({ test }, 200);
  } catch (error) {
    return apiError(error);
  }
};
