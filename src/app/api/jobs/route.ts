import prisma from "@/db/prisma";
import { JobWithProgress } from "@/types/JobWithProgress";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  const { userId } = await req.json();

  const jobs: JobWithProgress[] = await prisma.job.findMany({
    include: {
      progress: {
        include: {
          stage: true,
        },
      },
    },
    where: { userId: userId },
    orderBy: { order: "asc" },
  });


  return NextResponse.json(jobs);
};
