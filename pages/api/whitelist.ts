import { getSession } from "next-auth/react";
import prisma from "@lib/prisma";

// POST /api/post
// Required fields in body: email

export default async function handle(req, res) {
  if (req.method !== "POST") {
    res.status(405).send({ message: "Only POST requests allowed" });
    return;
  }

  const { email } = req.body;

  const session = await getSession({ req });

  if (!session) {
    res.status(401).send({ message: "Unauthorized" });
    return;
  }

  if (session.user.role !== "admin") {
    res.status(401).send({ message: "Unauthorized" });
    return;
  }

  const result = await prisma.whitelist.create({
    data: {
      email: email,
    },
  });
  res.json(result);
}
