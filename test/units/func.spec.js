import { main as func } from '../../src/functions/func';

describe('Test Jest Installation', () => {
  test('Should success', async () => {
    const response = await func();
    expect(response).toMatchObject({
      statusCode: 200,
      body: "{\"test\":\"test\"}"
  })
  });
});