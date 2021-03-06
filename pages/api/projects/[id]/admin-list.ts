import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "@lib/prisma";

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const projectId = req.query.id;

  if (req.method === "GET") {
    handleGET(projectId, res);
  } else {
    throw new Error(
      `The HTTP ${req.method} method is not supported at this route.`
    );
  }
}

// GET /api/project/:id
async function handleGET(projectId, res: NextApiResponse) {
  const project = await prisma.project.findUnique({
    select: {
      name: true,
      description: true,
      id: true,
      color: true,
      private: true,
      brief: true,
    },
    where: { id: projectId },
  });
  const projectsOnUsers = await prisma.projectsOnUsers.findMany({
    include: {
      user: true,
    },
    where: {
      projectId: projectId,
      NOT: {
        role: "Creator",
      },
    },
  });
  res.json({ project, projectsOnUsers });
  res.status(200).end();
}

// UPDATE /api/project/:id
// async function handlePUT(req, res) {
//   const projectId = req.query.id;
//   const { name, description, brief } = req.body;

//   const updateProject = await prisma.project.update({
//     where: { id: `${projectId}` },
//     data: {
//       name: name,
//       description: description,
//       brief: brief,
//     },
//   });
//   res.json(updateProject);
//   res.status(200);
// }
