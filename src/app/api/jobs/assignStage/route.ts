import prisma from "@/db/prisma";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  const { userId, jobId, stageId } = await req.json();

  if (!userId) {
    return NextResponse.json({ message: "User ID details required" }, { status: 500 });
  }

  const data = await prisma.jobProgress.create({
    data: {
      jobId,
      stageId,
      userId,
    },
  });
  
  return NextResponse.json({ data }, { status: 200 });
};