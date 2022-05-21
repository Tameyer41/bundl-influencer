import { getSession } from "next-auth/react";
import prisma from "@lib/prisma";

// POST /api/post
// Required fields in body: title
// Optional fields in body: content
export default async function handle(req, res) {
  if (req.method !== "POST") {
    res.status(405).send({ message: "Only POST requests allowed" });
    return;
  }

  const { name, description, privacy } = req.body;

  const session = await getSession({ req });

  if (!session) {
    res.status(401).send({ message: "Unauthorized" });
    return;
  }

  if (session.user.role !== "admin") {
    res.status(401).send({ message: "Unauthorized" });
    return;
  }

  const ownerId = session.user.id;

  const result = await prisma.project.create({
    data: {
      name: name,
      description: description,
      private: privacy === "true",
      users: {
        create: {
          userId: ownerId,
          role: "Owner",
        },
      },
    },
  });
  res.json(result);
}
