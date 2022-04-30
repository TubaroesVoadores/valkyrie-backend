import {
  apiError,
  apiResponse,
  getEventParams,
  NotFoundError,
} from '../../utils';
import { Images, Projects } from '../../models';

/**
 * @name GetProject
 * @description This api is responsible for deleting a project.
 * @param {Object} event - Base event object of AWS Lambda.
 * @param {Object} event.pathParams.projectId - Project's name.
 * @command sls invoke local -f GetProject -p tests/mocks/Projects/getProject.json -s STAGE
 */

export const main = async (event) => {
  try {
    const { projectId } = getEventParams(event);

    const [project] = await Projects
      .query('id')
      .eq(projectId)
      .where('deletedAt')
      .not()
      .exists()
      .exec();

    if (!project) throw new NotFoundError('Project not found!');

    const images = (
      await Images
        .query('projectId')
        .eq(projectId)
        .where('deletedAt')
        .not()
        .exists()
        .exec()
    ).toJSON();

    return apiResponse({
      message: 'Project successfully fetch!',
      project: {
        ...project,
        images,
      },
    }, 200);
  } catch (error) {
    return apiError(error);
  }
};