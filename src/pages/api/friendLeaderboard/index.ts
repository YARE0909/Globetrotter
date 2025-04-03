import {
  Authorization,
  AuthenticatedNextApiRequest,
} from "@/lib/middlewares/Authorization";
import type { NextApiResponse } from "next";
import prisma from "@/lib/prisma";

async function handler(req: AuthenticatedNextApiRequest, res: NextApiResponse) {
  if (req.method !== "GET") {
    res.setHeader("Allow", ["GET"]);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  const { user } = req;
  console.log({ user });

  const leaderboard = await prisma?.user.findMany({
    where: {
      id: {
        in: user.friendId,
      },
    },
    select: {
      userName: true,
      displayName: true,
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
    leaderboard: leaderboard
      //   ?.filter((friend) => user.friendId.includes(friend.userName))
      ?.map((user) => ({
        userName: user.userName,
        displayName: user.displayName,
        score: user.score,
        inCorrectAnswers: user.inCorrectAnswers,
        questionCount: user._count.Question,
      })),
  });
}

export default Authorization(handler);

