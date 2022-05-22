import { getSession } from "next-auth/react";
import prisma from "@lib/prisma";

// POST /api/post
// Required fields in body: email

export default async function handle(req, res) {
  if (req.method !== "POST") {
    res.status(405).send({ message: "Only POST requests allowed" });
    return;
  }

  const { emails } = req.body;

  const session = await getSession({ req });

  if (!session) {
    res.status(401).send({ message: "Unauthorized" });
    return;
  }

  if (session.role !== "admin") {
    res.status(401).send({ message: "Unauthorized" });
    return;
  }
  const listOfNames = req.body.map((data) => data.email);

  const createWhitelist = await prisma.whitelist.createMany({
    data: listOfNames.map((email) => ({
      email: email,
    })),
  });

  res.json(createWhitelist);

  console.log(JSON.stringify(createWhitelist));
}
