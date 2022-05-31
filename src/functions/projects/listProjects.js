import { apiError, apiResponse, getEventParams } from '../../utils';
import { Projects } from '../../models';

/**
 * @name ListProjects
 * @description This api is responsible for list projects.
 * @param {Object} event - Base event object of AWS Lambda.
 * @param {Object} event.pathParams.projectId - Project's name.
 * @command sls invoke local -f ListProjects -p tests/mocks/Projects/listProjects.json -s STAGE
 */

export const main = async (event) => {
  try {
    const { userId } = getEventParams(event);

    const projects = await Projects.query('userId')
      .eq(userId)
      .where('deletedAt')
      .not()
      .exists()
      .exec();

    console.log('project', { projects });

    return apiResponse({
      message: 'Projects successfully fetch',
      projects,
    }, 200);
  } catch (error) {
    console.error('Error', { error });
    return apiError(error);
  }
};
