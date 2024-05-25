import prisma from "@/db/prisma";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  const { job, jobLength } = await req.json();

  console.log("API creating new job")

  if (!job) {
    return NextResponse.json({ message: "Job details required" }, { status: 500 });
  }
  if (!jobLength) {
    return NextResponse.json({ message: "Job length required" }, { status: 500 });
  }

  const data = await prisma.job.create({
    data: { ...job, order: jobLength },
  })

  console.log("API data for creating new job")
  console.log(data);
  return NextResponse.json({ data }, { status: 200 });
};