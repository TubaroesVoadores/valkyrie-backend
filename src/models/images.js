import dynamoose from 'dynamoose';
import { imagesSchema } from './schemas';

const schema = new dynamoose.Schema(
  imagesSchema,
  {
    saveUnknown: false, // Assim vamos salvar só o que queremos
    timestamps: false,
  },
);

export const Images = dynamoose.model(
  process.env.imagesTableDynamoName,
  schema,
  {
    create: false,
    waitForActive: false, // Para ativar o modelo depois da criação da tabela no dynamoDB
  },
);
