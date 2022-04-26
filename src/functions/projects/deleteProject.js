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
 * @param {Object} event.pathParams.projectId - Project's name.
 * @command sls invoke local -f DeleteProject -p tests/mocks/Projects/deleteProject.json
 */

export const main = async (event) => {
  try {
    const { projectId } = getEventParams(event);

    const project = await Projects.create({
      id: projectId,
      deleteAt: formatISO(new Date()),
    });

    return apiResponse({ message: 'New project created!', project }, 200);
  } catch (error) {
    return apiError(error);
  }
};
