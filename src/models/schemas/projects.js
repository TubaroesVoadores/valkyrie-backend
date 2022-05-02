import { v4 as uuidv4 } from 'uuid';
import { formatISO } from 'date-fns';

export default {
  id: {
    type: String,
    required: true,
    default: uuidv4,
    hashKey: true,
  },
  userId: {
    type: String,
    index: {
      name: 'UserProject',
      rangeKey: 'id',
      global: true,
    },
  },
  name: {
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
    default: 'processing',
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
