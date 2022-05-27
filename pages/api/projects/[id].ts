import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "@lib/prisma";

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const projectId = req.query.id;

  if (req.method === "GET") {
    handleGET(projectId, res);
  } else if (req.method === "PUT") {
    handlePUT(req, res);
  } else if (req.method === "DELETE") {
    handleDELETE(projectId, res);
  } else {
    throw new Error(
      `The HTTP ${req.method} method is not supported at this route.`
    );
  }
}

// GET /api/project/:id
async function handleGET(projectId, res) {
  const project = await prisma.project.findUnique({
    select: {
      name: true,
      description: true,
      id: true,
    },
    where: { id: projectId },
  });
  const projectsOnUsers = await prisma.projectsOnUsers.findMany({
    include: {
      user: true,
    },
    where: {
      projectId: projectId,
    },
  });
  res.json({ project, projectsOnUsers });
  res.statusCode = 200;
}

// UPDATE /api/project/:id
async function handlePUT(req, res) {
  const projectId = req.query.id;
  const { name, description } = req.body;

  const updateProject = await prisma.project.update({
    where: { id: `${projectId}` },
    data: {
      name: name,
      description: description,
    },
  });
  res.json(updateProject);
  res.statusCode = 200;
}

// DELETE /api/project/:id
async function handleDELETE(projectId, res) {
  const deleteProject = await prisma.project.delete({
    where: { id: `${projectId}` },
  });
  res.json(deleteProject);
  res.statusCode = 200;
}
