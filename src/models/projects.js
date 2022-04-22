import dynamoose from 'dynamoose';
import { projectsSchema } from './schemas';

const schema = new dynamoose.Schema(
  projectsSchema,
  {
    saveUnknown: false,
    timestamps: false,
  },
);

export const Projects = dynamoose.model(
  process.env.projectsTableDynamoName,
  schema,
  {
    create: false,
    waitForActive: false,
  },
);
