import dynamoose from 'dynamoose';
import { imagesSchema } from './schemas';

const schema = new dynamoose.Schema(
  imagesSchema,
  {
    saveUnknown: [
      'data.**', // Assim vamos salvar valores desconhecidos só o que vierem dentro desse objetos data
    ],
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
