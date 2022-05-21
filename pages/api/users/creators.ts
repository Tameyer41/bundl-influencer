import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "@lib/prisma";

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const creators = await prisma.user.findMany({
    where: {
      role: "user",
    },
  });
  res.json(creators);
}
