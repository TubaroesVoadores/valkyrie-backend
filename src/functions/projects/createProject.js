import AWS from 'aws-sdk';
import {
  apiError,
  apiResponse,
  getEventParams,
  createImagesBucket,
} from '../../utils';
import { Projects } from '../../models';

const genereteImageLink = async (images) => {
  Promise.all(
    images.map((image) => {
      createImagesBucket(image)
    }
  );
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
  const lambda = new AWS.Lambda();

  try {
    let {
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

    if (images) images = genereteImageLink(images);

    await lambda.invoke({
      FunctionName: process.env.CreateImageLambdaName,
      InvocationType: 'Event',
      Payload: JSON.stringify({
        body: {
          projectId: project.id,
          images,
        },
      }),
    }).promise();

    console.log('project', { project });

    return apiResponse({ message: 'New project created!', project }, 200);
  } catch (error) {
    console.error('Error', { error });
    return apiError(error);
  }
};
