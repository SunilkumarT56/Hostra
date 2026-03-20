import { Request, Response, NextFunction } from 'express';
import { body, validationResult } from 'express-validator';

export const validateDeploy = [
  body('repositoryUrl')
    .isURL()
    .withMessage('Invalid repository URL')
    .notEmpty()
    .withMessage('Repository URL is required'),
  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];
