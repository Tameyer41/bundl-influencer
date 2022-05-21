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

  const { name, note, location, startTime, endTime, date } = req.body;

  const session = await getSession({ req });

  if (!session) {
    res.status(401).send({ message: "Unauthorized" });
    return;
  }

  if (session.role !== "admin") {
    res.status(401).send({ message: "Unauthorized" });
    return;
  }

  const ownerId = session.id;

  const result = await prisma.event.create({
    data: {
      name: name,
      location: location,
      note: note,
      startTime: new Date(startTime),
      endTime: new Date(endTime),
      date: new Date(date),
    },
  });
  res.json(result);
}
