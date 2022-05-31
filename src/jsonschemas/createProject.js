export const createProjectSchema = {
  type: 'object',
  required: true,
  properties: {
    name: {
      type: 'string',
      required: true,
    },
    userId: {
      type: 'string',
      required: true,
    },
    city: {
      type: 'string',
    },
    state: {
      type: 'string',
    },
    country: {
      type: 'string',
    },
    area: {
      type: 'number',
    },
    email: {
      type: 'string',
    },
  },
};
