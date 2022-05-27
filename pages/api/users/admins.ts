import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "@lib/prisma";

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const admins = await prisma.user.findMany({
    where: {
      role: "admin",
    },
  });
  res.json(admins);
}
