import prisma from "@/db/prisma";
import { NextRequest, NextResponse } from "next/server";

export const DELETE = async (req: NextRequest) => {
  const { id } = await req.json();

  if (!id) {
    return NextResponse.json({ message: "Stage ID cannot be empty" }, { status: 500 });
  }

  // Also delete the constrain
  await prisma.jobProgress.deleteMany({
    where: { stageId: id },
  });
  const data = await prisma.stage.delete({ where: { id } });
  return NextResponse.json(data, { status: 200 });
};
