import { Validator } from 'jsonschema';
import { InvalidInputError } from './erros';

const validateBody = (body, schema) => {
  if (!schema) return body;

  const v = new Validator();
  const validation = v.validate(body, schema);

  console.log('werqwerqw', validation.errors);

  if (validation.errors.length > 0) {
    const errors = validation.errors.map((error) => `${error.stack}`).join(',');
    throw new InvalidInputError(`Wrong entry format, ${errors}`, errors);
  }

  return body;
};

export const getEventParams = (event, schema) => {
  const {
    body,
    pathParameters,
    requestContext,
  } = event;

  const cognitoIdentityId = requestContext?.identity?.cognitoIdentityId;
  const entry = typeof body === 'string' ? JSON.parse(body) : body;

  validateBody(entry, schema);

  return {
    ...entry,
    ...pathParameters,
    userId: entry?.userId || cognitoIdentityId,
  };
};
