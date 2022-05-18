import { formatISO } from 'date-fns';
import {
  apiError,
  apiResponse,
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
    } = getEventParams(event);

    const image = await Images.update({
      id: imageId,
      data,
      updatedAt: formatISO(new Date()),
    });

    return apiResponse({ message: 'image updated!', image }, 200);
  } catch (error) {
    return apiError(error);
  }
};
