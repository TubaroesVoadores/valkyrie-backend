import {
  apiError,
  apiResponse,
  getEventParams,
  NotFoundError,
} from '../../utils';
import { Images } from '../../models';

/**
 * @name GetImage
 * @description This api is responsible for getting  infos of a image.
 * @param {Object} event - Base event object of AWS Lambda.
 * @param {Object} event.pathParams.imageId - image's id.
 * @command sls invoke local -f GetImage -p tests/mocks/iamges/getImage.json -s STAGE
 */

export const main = async (event) => {
  try {
    const { imageId } = getEventParams(event);

    const [image] = await Images
      .query('id')
      .eq(imageId)
      .where('deletedAt')
      .not()
      .exists()
      .exec();

    if (!image) throw new NotFoundError('Image not found!');
    return apiResponse({
      message: 'Image successfully fetch!',
      image,
    }, 200);
  } catch (error) {
    return apiError(error);
  }
};
