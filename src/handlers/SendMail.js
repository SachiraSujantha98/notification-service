import AWS from 'aws-sdk';

const ses = new AWS.SES({ region: 'us-east-1' });

export const handler = async (event) => {
  const params = {
    Source: 'sachirasujanthamp@gmail.com',
    Destination: {
      ToAddresses: ['sachirasujanthamp@gmail.com']
    },
    Message: {
      Body: {
        Text: { Data: 'Hello from AWS Lambda' },
      },
      Subject: { Data: 'Test Email' },
    },
  };

  try {
    const result = await ses.sendEmail(params).promise();
    console.log(result);
    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Email sent successfully' })
    };
  } catch (error) {
    console.log(error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message })
    };
  }
};


