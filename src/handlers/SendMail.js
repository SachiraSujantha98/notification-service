import AWS from 'aws-sdk';

const ses = new AWS.SES({ region: 'us-east-1' });

export const handler = async (event, context) => {

  const record = event.Records[0];
  const email = JSON.parse(record.body);
  const { subject, body, recipient } = email;

  const params = {
    Source: 'sachirasujanthamp@gmail.com',
    Destination: {
      ToAddresses: [recipient]
    },
    Message: {
      Body: {
        Text: { Data: body },
      },
      Subject: { Data: subject },
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


