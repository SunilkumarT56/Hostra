import { SQSClient, SendMessageCommand } from '@aws-sdk/client-sqs';
import { config } from '../config/env.js';
import { SQSMessage } from '../types/deploy.js';

class SQSService {
  private client: SQSClient;

  constructor() {
    this.client = new SQSClient({
      region: config.aws.region,
      credentials: {
        accessKeyId: config.aws.accessKeyId,
        secretAccessKey: config.aws.secretAccessKey,
      },
    });
  }

  async sendMessage(message: SQSMessage): Promise<void> {
    const command = new SendMessageCommand({
      QueueUrl: config.aws.sqsQueueUrl,
      MessageBody: JSON.stringify(message),
    });

    try {
      await this.client.send(command);
    } catch (error) {
      console.error('Error sending message to SQS:', error);
      throw new Error('Failed to queue deployment job');
    }
  }
}

export const sqsService = new SQSService();
