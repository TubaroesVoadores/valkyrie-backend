export const main = async (event) => {
  try {
    const test = 'test';
    return {
      statusCode: 200,
      body: JSON.stringify({
        test
      }),
    };
  } catch (error) {
    console.log(error);
    return {
      statusCode: 500,
      body: JSON.stringify({error: error.message}),
    };
  }
};