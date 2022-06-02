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

AWS.CognitoIdentityServiceProvider.prototype.adminCreateUser = jest.fn(() => ({
    User: { 
      Attributes: [ 
         { 
            Name: 'name',
            Value: 'valkyrie'
         },
         { 
           Name: 'email',
           Value: 'valkyrie.cesupa@gmail.com'
         },
         {
          Name: 'email_verified',
          Value: 'true',
        }
      ],
      Enabled: true,
      UserCreateDate: '2022-05-26T00:51:56Z',
      UserLastModifiedDate: '2022-05-26T00:51:56Z',
      Username: 'valkyrie',
      UserStatus: 'jest'  
    }
}));

module.exports = AWS;
