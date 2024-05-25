import prisma from "@/db/prisma";
import { NextRequest, NextResponse } from "next/server";

export const PUT = async (req: NextRequest) => {
  const { job } = await req.json();

  if (!job) {
    return NextResponse.json({ message: "Job details required" }, { status: 500 });
  }
  const data = await prisma.job.update({
    where: { id: job.id },
    data: job,
  })
  return NextResponse.json({ data }, { status: 200 });
};
