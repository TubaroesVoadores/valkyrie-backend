import { v4 as uuidv4 } from 'uuid';
import { formatISO } from 'date-fns';

export default {
  id: {
    type: String,
    required: true,
    default: uuidv4,
    hashKey: true,
  },
  area: {
    type: Number,
  },
  userId: {
    type: String,
    index: {
      name: 'UserProject',
      rangeKey: 'id',
      global: true,
    },
  },
  nativeForestArea: {
    type: Number,
  },
  name: {
    required: true,
    type: String,
  },
  email: {
    required: true,
    type: String,
  },
  nameProject: {
    required: true,
    type: String,
  },
  description: {
    required: true,
    type: String,
  },
  city: {
    type: String,
  },
  state: {
    type: String,
  },
  status: {
    type: String,
    enum: ['CRIADO', 'REPROVADO', 'APROVADO'],
    default: 'CRIADO',
  },
  country: {
    type: String,
  },
  createdAt: {
    type: String,
    required: true,
    default: formatISO(new Date()),
    forceDefault: true,
  },
  updatedAt: {
    type: String,
    required: true,
    default: formatISO(new Date()),
    forceDefault: true,
  },
  deletedAt: {
    type: String,
  },
};
