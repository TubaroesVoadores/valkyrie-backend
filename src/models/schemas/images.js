import { v4 as uuidv4 } from 'uuid';
import { formatISO } from 'date-fns';

export default {
  id: {
    type: String,
    required: true,
    default: uuidv4,
    hashKey: true,
  },
  projectId: {
    type: String,
    required: true,
    index: {
      name: 'ProjectImage',
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
  filteredImageLink: {
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
