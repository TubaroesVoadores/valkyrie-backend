import dynamoose from 'dynamoose';
import { imagesSchema } from './schemas';

const schema = new dynamoose.Schema(
  imagesSchema,
  {
    saveUnknown: [
      'data.**',
    ],
    timestamps: false,
  },
);

export const Images = dynamoose.model(
  process.env.imagesTableDynamoName,
  schema,
  {
    create: false,
    waitForActive: false,
  },
);
