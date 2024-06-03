import prisma from "@/db/prisma";
import { signOut } from "next-auth/react";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
//   const { job, jobLength } = await req.json();
    const data = await signOut();
//   if (!job) {
//     return NextResponse.json({ message: "Job details required" }, { status: 500 });
//   }
//   if (!jobLength) {
//     return NextResponse.json({ message: "Job length required" }, { status: 500 });
//   }

//   const data = await prisma.job.create({
//     data: { ...job, order: jobLength },
//   })

  return NextResponse.json({ data }, { status: 200 });
    
};