import AWS from 'aws-sdk';
import {
  apiError,
  apiResponse,
  getEventParams,
  createImagesBucket,
} from '../../utils';
import { Projects } from '../../models';

const genereteImageLink = async (images) => {
  const links = await Promise.all(
    images.map(async ({ image }) => {
      const { s3link, id } = await createImagesBucket({ image });

      return { image: s3link, id };
    }),
  );

  return links;
};

const callImagesCreates = async (images, projectId) => {
  const lambda = new AWS.Lambda();

  await lambda.invoke({
    FunctionName: process.env.CreateImageLambdaName,
    InvocationType: 'Event',
    Payload: JSON.stringify({
      body: {
        projectId,
        images,
      },
    }),
  }).promise();
};

/**
 * @name CreateProject
 * @description This api is responsible for creating a new project.
 * @param {Object} event - Base event object of AWS Lambda.
 * @param {Object} event.body.name - Project's name.
 * @param {Object} event.requestContext.identity.cognitoIdentityId - User's id of cognito.
 * @command sls invoke local -f CreateProject -p tests/mocks/Projects/createProject.json  -s STAGE
 */

export const main = async (event) => {
  try {
    const {
      name,
      userId,
      city,
      state,
      country,
      area,
      email,
      images,
    } = getEventParams(event);

    const project = await Projects.create({
      name,
      userId,
      city,
      state,
      country,
      area,
      email,
    });

    if (images) {
      const imagesLinks = await genereteImageLink(images);
      console.log(imagesLinks);
      await callImagesCreates(imagesLinks, project.id);

      project.images = imagesLinks;
    }

    console.log('Project', { pedro: project.images });

    return apiResponse({ message: 'New project created!', project }, 200);
  } catch (error) {
    console.error('Error', { error });
    return apiError(error);
  }
};
