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
 * @command sls invoke local -f CreateProject -p tests/mocks/Projects/createProject.json  -s STAGE
 */

export const main = async (event) => {
  try {
    const {
      name,
      userId,
      city,
      state,
      country,
      area,
    } = getEventParams(event);

    const project = await Projects.create({
      name,
      userId,
      city,
      state,
      country,
      area,
    });

    console.log('project', { project });

    return apiResponse({ message: 'New project created!', project }, 200);
  } catch (error) {
    console.error('Error', { error });
    return apiError(error);
  }
};
