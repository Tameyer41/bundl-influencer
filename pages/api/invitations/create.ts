import { getSession } from "next-auth/react";
import prisma from "@lib/prisma";

// POST /api/invitations/create
export default async function handle(req, res) {
  if (req.method !== "POST") {
    res.status(405).send({ message: "Only POST requests allowed" });
    return;
  }

  const { email, company_name } = req.body;

  const session = await getSession({ req });

  if (!session) {
    res.status(401).send({ message: "Unauthorized" });
    return;
  }

  if (session.role !== "admin") {
    res.status(401).send({ message: "Unauthorized" });
    return;
  }

  const owner_name = session.name;

  let current_company_name = session.role === "admin" ? "EKHO" : company_name;

  const result = await prisma.userInvitation.create({
    data: {
      invited_by: owner_name,
      email: email,
      company_name: current_company_name,
    },
  });
  const add_to_whitelist = await prisma.whitelist.create({
    data: {
      email: email,
    },
  });
  res.json(result);
}
