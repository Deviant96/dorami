import prisma from "@/db/prisma";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  const { id } = await req.json();

  console.log("API creating new job")

  if (!id) {
    return NextResponse.json({ message: "ID cannot be empty" }, { status: 500 });
  }

  const data = await prisma.job.delete({ where: { id } });

  return NextResponse.json({ data }, { status: 200 });
};