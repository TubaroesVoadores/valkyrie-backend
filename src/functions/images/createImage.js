// import axios from 'axios';
import {
  apiError,
  apiResponse,
  getEventParams,
  NotFoundError,
  createImagesBucket,
} from '../../utils';
import { Images, Projects } from '../../models';

/**
 * @name CreateImages
 * @description This api is responsible for creating a new image.
 * @param {Object} event - Base event object of AWS Lambda.
 * @param {Object} event.body.name - Project's name.
 * @param {Object} event.requestContext.identity.cognitoIdentityId - User's id of cognito.
 * @command sls invoke local -f CreateImages -p tests/mocks/images/createImages.json  -s STAGE
 */

export const main = async (event) => {
  try {
    const {
      projectId,
      images: files,
    } = getEventParams(event);

    const [project] = await Projects
      .query('id')
      .eq(projectId)
      .where('deletedAt')
      .not()
      .exists()
      .exec();

    if (project) throw new NotFoundError('Project not found!');

    const images = await Promise.all(files.map(async ({ image }) => {
      const { s3link, id } = await createImagesBucket({ image, projectId });

      const img = await Images.create({
        projectId,
        id,
        s3link,
      });

      return img;
    }));

    // await Promise.allSettled(callImageProcessor(images));

    return apiResponse({ message: 'New images created!', images, projectId }, 200);
  } catch (error) {
    return apiError(error);
  }
};
