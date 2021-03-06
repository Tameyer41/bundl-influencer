import prisma from "@lib/prisma";

export default async (req, res) => {
  const { id, name, url } = req.body;
  if (req.method === "PUT") {
    try {
      const updateUser = await prisma.user.update({
        data: {
          name,
          onboarded: true,
          image: url,
        },
        where: {
          id: id,
        },
      });
      res.status(200).json(updateUser);
    } catch (error) {
      res.status(403).json({ err: error.message });
    }
  } else if (req.method === "GET") {
    try {
      const userId = req.query.id;
      const user = await prisma.user.findUnique({
        where: {
          id: userId,
        },
      });
      res.status(200).json(user);
    } catch (error) {
      res.status(403).json({ err: "Error occurred while getting a user." });
    }
  }
};
