import { Job, JobProgress, Stage } from '@prisma/client';

export interface JobWithProgress extends Job {
  progress: (JobProgress & {
    stage: Stage;
  })[];
}
