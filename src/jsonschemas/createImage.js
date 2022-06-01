export const createImageSchema = {
  type: 'object',
  required: true,
  properties: {
    projectId: {
      type: 'string',
      required: true,
    },
    images: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          image: {
            type: 'string',
          },
        },
      },
      minItems: 1,
      required: true,
    },
  },
};
