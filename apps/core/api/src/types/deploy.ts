export interface DeployRequest {
  repositoryUrl: string;
}

export interface DeployResponse {
  message: string;
  jobId: string;
}

export interface SQSMessage {
  repositoryUrl: string;
  jobId: string;
  timestamp: string;
}
