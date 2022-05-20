import { formatISO } from 'date-fns';
import {
  apiError,
  apiResponse,
  createImagesBucket,
  getEventParams,
} from '../../utils';
import { Images } from '../../models';

/**
 * @name WebhookImage
 * @command sls invoke local -f WebhookImage -p tests/mocks/images/webhookImage.json  -s STAGE
 */

export const main = async (event) => {
  try {
    const {
      imageId,
      data,
      file: image,
    } = getEventParams(event);

    const { s3link } = await createImagesBucket({ image, isFiltered: true });

    const imageFiltered = await Images.update({
      id: imageId,
      data,
      filteredImageLink: s3link,
      updatedAt: formatISO(new Date()),
    });

    return apiResponse({ message: 'image updated!', imageFiltered }, 200);
  } catch (error) {
    console.log(error);
    return apiError(error);
  }
};
