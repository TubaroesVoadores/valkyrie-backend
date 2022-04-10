import dynamoose from 'dynamoose';
import { usersSchema } from './schemas';

const schema = new dynamoose.Schema(
  usersSchema,
  {
    saveUnknown: false, // Assim vamos aslavar só o que queremos
    timestamps: false,
  },
);

export const Users = dynamoose.model(
  process.env.usersTableDynamoName,
  schema,
  {
    create: false,
    waitForActive: false, // Para ativar o modelo depois da criação da tabela no dynamoDB
  },
);
