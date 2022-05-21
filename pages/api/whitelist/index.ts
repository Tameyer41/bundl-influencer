import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "@lib/prisma";

export default async function handle(req, res) {
  const whitelist = await prisma.whitelist.findMany();
  res.status(200).json({ whitelist });
}
