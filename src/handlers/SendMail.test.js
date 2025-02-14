import { handler } from './SendMail';
import AWS from 'aws-sdk';

jest.mock('aws-sdk', () => {
  const SES = {
    sendEmail: jest.fn().mockReturnThis(),
    promise: jest.fn().mockResolvedValue({
      MessageId: '12345'
    })
  };
  return { SES: jest.fn(() => SES) };
});

const mockEvent = {
  Records: [
    {
      body: JSON.stringify({
        subject: 'Test Subject',
        body: 'Test Body',
        recipient: 'test@example.com'
      })
    }
  ]
};

test('handler sends an email successfully', async () => {
  const response = await handler(mockEvent);
  expect(response.statusCode).toBe(200);
  expect(JSON.parse(response.body).message).toBe('Email sent successfully');
  expect(AWS.SES().sendEmail).toHaveBeenCalledWith(expect.objectContaining({
    Source: 'sachirasujanthamp@gmail.com',
    Destination: { ToAddresses: ['test@example.com'] },
    Message: {
      Body: { Text: { Data: 'Test Body' } },
      Subject: { Data: 'Test Subject' }
    }
  }));
});

test('handler handles email sending error', async () => {
  AWS.SES().promise.mockRejectedValueOnce(new Error('Email sending failed'));
  const response = await handler(mockEvent);
  expect(response.statusCode).toBe(500);
  expect(JSON.parse(response.body).error).toBe('Email sending failed');
}); 