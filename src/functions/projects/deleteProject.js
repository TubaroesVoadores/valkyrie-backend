import { formatISO } from 'date-fns';
import {
  apiError,
  apiResponse,
  getEventParams,
} from '../../utils';
import { Projects } from '../../models';

/**
 * @name DeleteProject
 * @description This api is responsible for deleting a project.
 * @param {Object} event - Base event object of AWS Lambda.
 * @param {Object} event.pathParams.projectId - Project's id.
 * @command sls invoke local -f DeleteProject -p tests/mocks/Projects/deleteProject.json -s STAGE
 */

export const main = async (event) => {
  try {
    const { projectId } = getEventParams(event);

    const project = await Projects.update({
      id: projectId,
      deletedAt: formatISO(new Date()),
      updatedAt: formatISO(new Date()),
    });

    return apiResponse({ message: 'Project deleted!', project }, 200);
  } catch (error) {
    return apiError(error);
  }
};
