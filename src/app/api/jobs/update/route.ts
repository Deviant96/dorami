import prisma from "@/db/prisma";
import { NextRequest, NextResponse } from "next/server";

export const PUT = async (req: NextRequest) => {
  const { userId, id, job } = await req.json();

  if (!job) {
    return NextResponse.json({ message: "Job details required" }, { status: 500 });
  }

  if (!id) {
    return NextResponse.json({ message: "ID is required" }, { status: 500 });
  }

  // Currently, if a user wants to edit progress in a job, 
  // it can only be done by removing the job and adding it again. 
  // Uncomment progress if such feature is implemented.
  const updatedJob = await prisma.job.update({
    where: { id: job.id, userId: userId },
    data: {
      companyName: job.companyName,
      isForeign: job.isForeign,
      details: job.details,
      date: job.date,
      notes: job.notes,
      status: job.status,
      order: job.order,
      // progress: {
      //   upsert: job.progress.map((progressItem: any) => ({
      //     where: { id: progressItem.id },
      //     update: {
      //       stage: {
      //         connect: { id: progressItem.stageId },
      //       }
      //     },
      //     create: {
      //       stage: {
      //         connectOrCreate: {
      //           where: { id: progressItem.stageId },
      //           create: {
      //             id: progressItem.stage.id,
      //             name: progressItem.stage.name,
      //             order: progressItem.stage.order,
      //           }
      //         }
      //       }
      //     }
      //   }))
      // }
    }
  });

  return NextResponse.json({ data: updatedJob }, { status: 200 });
};
