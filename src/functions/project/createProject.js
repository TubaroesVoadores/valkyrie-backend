import {
  apiError,
  apiResponse,
  getEventParams,
} from '../../utils';
import { Projects } from '../../models';

/**
 * @name CreateProject
 * @description This api is responsible for creating a new project.
 * @param {Object} event - Base event object of AWS Lambda.
 * @param {Object} event.body.name - Project's name.
 * @param {Object} event.requestContext.identity.cognitoIdentityId - User's id of cognito.
 * @command sls invoke local -f CreateProject -p tests/mocks/Projects/createProject.json
 */

export const main = async (event) => {
  try {
    const { name, userId } = getEventParams(event);

    const response = await Projects.create({
      name,
      userId,
    });

    return apiResponse({ response }, 200);
  } catch (error) {
    return apiError(error);
  }
};
