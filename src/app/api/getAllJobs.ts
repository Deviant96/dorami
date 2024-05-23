'use server';

import prisma from "@/db/prisma";
import { JobWithProgress } from "@/types/JobWithProgress";

export const getAllJobs = async () => {
  const jobs: JobWithProgress[] = await prisma.job.findMany({
    include: {
      progress: {
        include: {
          stage: true,
        },
      },
    },
    orderBy: { order: "asc" },
  });

  return jobs;
};