import {
  apiError,
  apiResponse,
  getEventParams,
} from '../../utils';
import { Images } from '../../models';

/**
 * @name GetImage
 * @command sls invoke local -f GetImage -p tests/mocks/Projects/getImage.json -s STAGE
 */

export const main = async (event) => {
  try {
    const { imageId } = getEventParams(event);

    const [images] = await Images
      .query('id')
      .eq(imageId)
      .where('deletedAt')
      .not()
      .exists()
      .exec();

    return apiResponse({
      message: 'Project successfully fetch!',
      images,
    }, 200);
  } catch (error) {
    return apiError(error);
  }
};
