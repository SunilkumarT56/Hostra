import { Request, Response, NextFunction } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { sqsService } from '../services/sqs.service.js';
import { DeployRequest, DeployResponse } from '../types/deploy.js';

export const deployController = async (
  req: Request<{}, {}, DeployRequest>,
  res: Response<DeployResponse>,
  next: NextFunction
) => {
  try {
    const { repositoryUrl } = req.body;
    const jobId = uuidv4();

    await sqsService.sendMessage({
      repositoryUrl,
      jobId,
      timestamp: new Date().toISOString(),
    });

    res.status(202).json({
      message: 'Deployment job queued successfully',
      jobId,
    });
  } catch (error) {
    next(error);
  }
};
