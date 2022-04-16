import AWS from "aws-sdk";

const ddb = new AWS.DynamoDB({ apiVersion: "2012-10-08" });

export const main = async (event, context) => {
  console.log(event);

  const date = new Date();

  const { usersTableDynamoName } = process.env;
  const regionEnv = process.env.REGION;

  AWS.config.update({ region: regionEnv });

  // If the required parameters are present, proceed
  if (event.request.userAttributes.sub) {
    // -- Write data to DDB
    const ddbParams = {
      Item: {
        id: { S: event.request.userAttributes.sub },
        __typename: { S: "User" },
        username: { S: event.userName },
        email: { S: event.request.userAttributes.email },
        createdAt: { S: date.toISOString() },
      },
      TableName: usersTableDynamoName,
    };

    // Call DynamoDB
    try {
      await ddb.putItem(ddbParams).promise();
      console.log("Success");
    } catch (err) {
      console.log("Error", err);
    }

    console.log("Success: Everything executed correctly");
    context.done(null, event);
  } else {
    // Nothing to do, the user's email ID is unknown
    console.log("Error: Nothing was written to DDB or SQS");
    context.done(null, event);
  }
};
