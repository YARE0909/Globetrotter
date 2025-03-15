import {
  Authorization,
  AuthenticatedNextApiRequest,
} from "@/lib/middlewares/Authorization";
import type { NextApiResponse } from "next";

async function handler(req: AuthenticatedNextApiRequest, res: NextApiResponse) {
  if (req.method !== "GET") {
    res.setHeader("Allow", ["GET"]);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  const leaderboard = await prisma?.user.findMany({
    select: {
      userName: true,
      score: true,
      inCorrectAnswers: true,
      _count: {
        select: {
          Question: true,
        },
      },
    },
    orderBy: {
      score: "desc",
    },
  });

  return res.status(200).json({
    leaderboard: leaderboard?.map((user) => ({
      userName: user.userName,
      score: user.score,
      inCorrectAnswers: user.inCorrectAnswers,
    questionCount: user._count.Question,
    })),
  });
}

export default handler;
