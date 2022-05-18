// import axios from 'axios';
import { S3 } from 'aws-sdk';
import {
  apiError,
  apiResponse,
  getEventParams,
/*   InvalidInputError, */
/*   NotFoundError, */
} from '../../utils';
import { /* Images, */ /* Projects */ } from '../../models';

const s3 = new S3();

const createImages = async (image) => {
  const data = Buffer.from(image.replace(/^data:image\/\w+;base64,/, ''), 'base64');

  const Key = `${new Date().toISOString()}.jpeg`;

  const params = {
    Bucket: process.env.imagesBucketName,
    Key,
    Body: data,
    ContentType: 'image/jpg',
    ACL: 'public-read',
  };

  const url = `https://${process.env.imagesBucketName}.s3-${process.env.region}.amazonaws.com/${Key}`;

  await s3.upload(params).promise();

  return url;
};

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
      /* lat, log, */ /* projectId, */ image,
    } = getEventParams(event);

    /*     const [project] = await Projects
      .query('id')
      .eq(projectId)
      .where('deletedAt')
      .not()
      .exists()
      .exec();

    if (!project) throw new NotFoundError('Project not found!');
 */
    const bucketUrl = await createImages(image);

    const imagesUrls = await Promise.all(image.map(async (x) => {
      const bucketUrl1 = await createImages(x);
      return bucketUrl1;
    }));

    console.log(imagesUrls);
    // await Promise.allSettled(callImageProcessor(images));

    return apiResponse({ message: 'New images created!', bucketUrl }, 200);
  } catch (error) {
    return apiError(error);
  }
};
