import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "@lib/prisma";

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const projectId = req.query.id;

  if (req.method === "PUT") {
    handlePUT(req, res);
  } else {
    throw new Error(
      `The HTTP ${req.method} method is not supported at this route.`
    );
  }
}

// UPDATE /api/project/:id
async function handlePUT(req, res) {
  const { selected, user } = req.body;

  const updateProject = await prisma.project.update({
    where: { id: `${selected.id}` },
    data: {
      users: {
        create: {
          userId: user.user.id,
          role: "Creator",
        },
      },
    },
  });
  res.json(updateProject);
  res.status(200);
}
