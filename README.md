# Notification Service

A serverless email notification service built with AWS Lambda, SQS, and SES.

## Features

- Send emails using AWS SES
- Queue-based email processing with SQS
- Serverless architecture using AWS Lambda

## Prerequisites

- Node.js 18.x or later
- AWS CLI configured with appropriate credentials
- Serverless Framework CLI installed (`npm install -g serverless`)
- Verified email in AWS SES (for sender address)

## Installation

```bash
npm install
```

## Configuration

1. Make sure your AWS credentials are properly configured
2. Verify your sender email address in AWS SES
3. Update the sender email in `src/handlers/SendMail.js`

## Deployment

Development environment:
```bash
npm run deploy
```

## Usage

The service listens to an SQS queue for email messages in the following format:

```json
{
  "recipient": "recipient@example.com",
  "subject": "Email Subject",
  "body": "Email Body"
}
```
