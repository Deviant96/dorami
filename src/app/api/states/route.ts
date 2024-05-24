import prisma from "@/db/prisma";
import { NextResponse } from "next/server";

export const GET = async () => {
  const res = await prisma.stage.findMany({
    orderBy: { order: "asc" },
  });
  return NextResponse.json({ data: res });
};
