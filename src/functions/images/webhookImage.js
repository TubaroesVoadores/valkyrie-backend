import { formatISO } from 'date-fns';
import AWS from 'aws-sdk';
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
  const lambda = new AWS.Lambda();
  try {
    const {
      id: imagePath,
      nativeForest,
      lat,
      log,
      area,
      link,
    } = getEventParams(event);

    const imageId = imagePath.replace('_resized_filtered', '').split('.')[0];

    const imageFiltered = await Images.update({
      id: imageId,
      data: {
        nativeForest,
        lat,
        log,
        area,
      },
      filteredImageLink: link,
      updatedAt: formatISO(new Date()),
    });

    await lambda.invoke({
      FunctionName: process.env.UnifiedStatusLambdaName,
      InvocationType: 'Event',
      Payload: JSON.stringify({
        projectId: imageFiltered.projectId,
      }),
    }).promise();

    return apiResponse({ message: 'image updated!', imageFiltered }, 200);
  } catch (error) {
    console.log(error);
    return apiError(error);
  }
};
