import prisma from "@/db/prisma";
import { User } from "@prisma/client";
import { NextResponse } from "next/server";

export const getUser = async (
    username: string
): Promise<User | null> => {
  return await prisma.user.findUnique({
    where: {
        username: String(username),
    },
  });
};

// export const GET = async () => {
//   const res =
//   return NextResponse.json({ data: res });
// };
