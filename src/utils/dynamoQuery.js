import AWS from 'aws-sdk';

const documentClient = new AWS.DynamoDB.DocumentClient();

export const dynamo = {
  async get(id, tableName) {
    const params = {
      TableName: tableName,
      Key: {
        id,
      },
    };

    const response = await documentClient.get(params).promise();

    return response.Item;
  },

  async write(data, tableName) {
    const params = {
      TableName: tableName,
      Item: data,
    };

    const response = await documentClient.put(params).promise();

    return response;
  },

  async update({
    tableName,
    primaryKey,
    primaryKeyValue,
    updateKey,
    updateValue,
  }) {
    const params = {
      TableName: tableName,
      Key: { [primaryKey]: primaryKeyValue },
      UpdateExpression: `set ${updateKey} = :updateValue`,
      ExpressionAttributeValues: {
        ':updateValue': updateValue,
      },
    };

    return documentClient.update(params).promise();
  },

  async query({
    tableName,
    index,
    queryKey,
    queryValue,
  }) {
    const params = {
      TableName: tableName,
      IndexName: index,
      KeyConditionExpression: `${queryKey} = :hkey`,
      ExpressionAttributeValues: {
        ':hkey': queryValue,
      },
    };

    const response = await documentClient.query(params).promise();

    return response.Items || [];
  },

  async scan({ tableName, filterExpression, expressionAttributes }) {
    const params = {
      TableName: tableName,
      FilterExpression: filterExpression,
      ExpressionAttributeValues: expressionAttributes,
    };
    const res = await documentClient.scan(params).promise();

    return res.Items || [];
  },
};
