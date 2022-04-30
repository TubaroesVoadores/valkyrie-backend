import { formatISO } from 'date-fns';
import {
  apiError,
  apiResponse,
  getEventParams,
} from '../../utils';
import { Projects } from '../../models';

/**
 * @name UpdateProject
 * @description This api is responsible for updating a project.
 * @param {Object} event - Base event object of AWS Lambda.
 * @param {Object} event.pathParams.projectId - Project's id.
 * @param {Object} event.body.name - Project's name.
 * @command sls invoke local -f UpdateProject -p tests/mocks/Projects/updateProject.json -s STAGE
 */

export const main = async (event) => {
  try {
    const { projectId, name } = getEventParams(event);

    const project = await Projects.update({
      id: projectId,
      name,
      updatedAt: formatISO(new Date()),
    });

    return apiResponse({ message: 'Project updated!', project }, 200);
  } catch (error) {
    return apiError(error);
  }
};
