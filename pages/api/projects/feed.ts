import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "@db";

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const projects = await prisma.project.findMany({
    include: {
      users: {
        include: {
          user: true,
        },
      },
    },
  });
  res.json(projects);
}
