import {
  apiError,
  apiResponse,
  getEventParams,
  NotFoundError,
  ForbiddenError,
} from '../../utils';
import { Images, Projects } from '../../models';

/**
 * @name GetProject
 * @description This api is responsible for getting all images and infos of a project.
 * @param {Object} event - Base event object of AWS Lambda.
 * @param {Object} event.pathParams.projectId - Project's id.
 * @command sls invoke local -f GetProject -p tests/mocks/Projects/getProject.json -s STAGE
 */

export const main = async (event) => {
  try {
    const { projectId, userId } = getEventParams(event);

    const [project] = await Projects
      .query('id')
      .eq(projectId)
      .where('deletedAt')
      .not()
      .exists()
      .exec();

    if (!project) throw new NotFoundError('Project not found!');
    if (userId !== project.userId) throw new ForbiddenError('Trying to access another user\'s project!');

    const images = await Images
      .query('projectId')
      .eq(projectId)
      .where('deletedAt')
      .not()
      .exists()
      .exec();

    console.log('project', { project });

    return apiResponse({
      message: 'Project successfully fetch!',
      project: {
        ...project,
        images,
      },
    }, 200);
  } catch (error) {
    console.error('Error', { error });
    return apiError(error);
  }
};
