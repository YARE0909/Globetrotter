import type { NextApiResponse } from "next";
import {
  Authorization,
  AuthenticatedNextApiRequest,
} from "@/lib/middlewares/Authorization";
import prisma from "@/lib/prisma";

async function handler(req: AuthenticatedNextApiRequest, res: NextApiResponse) {
  if (req.method !== "GET") {
    res.setHeader("Allow", ["GET"]);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  const { user } = req;

  // Fetch the total number of questions answered by the user
  const totalQuestions = await prisma?.question.count({
    where: { userId: user.id },
  });

  const userWithStats = {
    ...user,
    totalQuestions,
  };

  return res.status(200).json({ user: userWithStats });
}

export default Authorization(handler);
