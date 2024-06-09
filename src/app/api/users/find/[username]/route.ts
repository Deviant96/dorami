import prisma from "@/db/prisma";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (
  req: NextRequest,
  { params }: { params: { username: string } }
) => {
  const username = params.username;

  if (!username) {
    return NextResponse.json({ message: "Username required" }, { status: 500 });
  }

  const data = await prisma.user.findFirst({
    where: {
      username: username,
    },
  });

  return NextResponse.json({ data }, { status: 200 });
};
