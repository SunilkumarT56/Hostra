import dotenv from 'dotenv';

dotenv.config();

export const config = {
  port: process.env.PORT || 3000,
  aws: {
    region: process.env.AWS_REGION || 'ap-southeast-2',
    accessKeyId: process.env.AWS_ACCESS_KEY_ID || '',
    secretAccessKey: process.env.AWS_SECRET_KEY || '',
    sqsQueueUrl: process.env.SQS_URL || '',
  },
  env: process.env.NODE_ENV || 'development',
};

if (config.env === 'production') {
  const missing = [];
  if (!config.aws.accessKeyId) missing.push('AWS_ACCESS_KEY_ID');
  if (!config.aws.secretAccessKey) missing.push('AWS_SECRET_KEY');
  if (!config.aws.sqsQueueUrl) missing.push('SQS_URL');
  
  if (missing.length > 0) {
    console.warn(`Warning: Missing production environment variables: ${missing.join(', ')}`);
  }
}
