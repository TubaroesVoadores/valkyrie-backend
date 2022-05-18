import { S3 } from 'aws-sdk';
import { v4 as uuidv4 } from 'uuid';

export const createImagesBucket = async ({ image, isFiltered, projectId }) => {
  const s3 = new S3();
  const data = Buffer.from(image.replace(/^data:image\/\w+;base64,/, ''), 'base64');

  const id = isFiltered ? `${uuidv4()}-filtered` : uuidv4();

  try {
    const params = {
      Bucket: process.env.imagesBucketName,
      Key: `${projectId}/${id}`,
      Body: data,
      ContentType: 'image/jpg',
      ACL: 'public-read',
    };

    const { Location: s3link } = await s3.upload(params).promise();
    return { id, s3link };
  } catch (error) {
    console.error(error);

    throw new Error(error);
  }
};