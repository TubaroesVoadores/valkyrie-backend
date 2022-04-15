import { v4 as uuidv4 } from 'uuid';
import { formatISO } from 'date-fns';

export default {
  id: {
    type: String,
    required: true,
    default: uuidv4,
    hashKey: true,
  },
  collectionId: {
    type: String,
    required: true,
    index: {
      name: 'CollectionImage',
      rangeKey: 'id',
      global: true,
    },
  },
  data: {
    type: Object,
  },
  s3link: {
    type: String,
    required: true,
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
