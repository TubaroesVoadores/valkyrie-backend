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
      projectId,
      file,
    } = getEventParams(event);

    const { s3link } = createImagesBucket({ projectId, file, isFiltered: true });

    const image = await Images.update({
      id: imageId,
      data,
      filteredImageLink: s3link,
      updatedAt: formatISO(new Date()),
    });

    return apiResponse({ message: 'image updated!', image }, 200);
  } catch (error) {
    return apiError(error);
  }
};
