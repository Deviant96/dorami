import prisma from "@/db/prisma";
import { NextRequest } from "next/server";
import { API_RESPONSE_MESSAGES } from "../../(lib)/consts";
import { auth } from "@/app/auth";

export const DELETE = async (req: NextRequest) => {
  const session = await auth();
  if (!session)
    return Response.json(
      { message: API_RESPONSE_MESSAGES.ERROR.UNAUTHORIZED },
      { status: 500 }
    );

  const { userId, id } = await req.json();

  if (!id) {
    return Response.json(
      { message: API_RESPONSE_MESSAGES.ERROR.BAD_REQUEST },
      { status: 500 }
    );
  }

  // Also delete the constrain
  await prisma.jobProgress.deleteMany({
    where: { stageId: id },
  });
  await prisma.stage.delete({ where: { userId, id } });
  return Response.json({ success: true }, { status: 200 });
};
