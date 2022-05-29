const AWS = jest.createMockFromModule("aws-sdk");

AWS.S3.prototype.upload = jest.fn(() => ({
  promise: jest.fn(() => ({
    Location: "https://bucket.s3.amazonaws.com/image.jpg",
  })),
}));

AWS.Lambda.prototype.invoke = jest.fn(() => ({
  promise: jest.fn(() => ({
    response: {
      status: "202",
      payload: "",
    }
  })),
}));

module.exports = AWS;
