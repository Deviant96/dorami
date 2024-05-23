'use server';

import prisma from "@/db/prisma";

export const getAllJobs = async () => {
  "use server";

  const jobs = await prisma.job.findMany({
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
