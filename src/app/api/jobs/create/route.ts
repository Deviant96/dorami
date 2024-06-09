import prisma from "@/db/prisma";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  const { userId, job, jobLength } = await req.json();

  if (!userId) {
    return NextResponse.json(
      { message: "User ID details required" },
      { status: 500 }
    );
  }

  if (!job) {
    return NextResponse.json(
      { message: "Job details required" },
      { status: 500 }
    );
  }

  if (jobLength === undefined) {
    return NextResponse.json(
      { message: "Job length required" },
      { status: 500 }
    );
  }

  const data = await prisma.job.create({
    data: { ...job, order: jobLength, userId: userId },
  });

  return NextResponse.json({ data }, { status: 200 });
};
