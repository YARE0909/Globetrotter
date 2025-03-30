import type { NextApiResponse } from "next";
import {
  Authorization,
  AuthenticatedNextApiRequest,
} from "@/lib/middlewares/Authorization";
import { QuestionStatus } from "@/lib/enums/questionStatus";
import prisma from "@/lib/prisma";

async function handler(req: AuthenticatedNextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    res.setHeader("Allow", ["GET"]);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  const { user } = req;
  const { questionId, answer } = req.body;

  try {
    const questionRow = await prisma?.question.findUnique({
      where: { id: questionId },
    });

    const correctAnswer = questionRow?.city;

    // Handle the case where the user has answered correctly
    if (answer.toLowerCase() === correctAnswer?.toLowerCase()) {
      await prisma?.question.update({
        where: { id: questionId },
        data: { verified: true, userAnswer: answer },
      });

      await prisma?.user.update({
        where: { id: user.id },
        data: { score: user.score + 1 },
      });

      const userScore = await prisma?.user.findUnique({
        where: { id: user.id },
        select: { score: true },
      });

      return res.status(200).json({
        status: QuestionStatus.CorrectAnswer,
        userScore,
        attemptsLeft: questionRow!.clues.length - questionRow!.attempts,
        trivia: questionRow!.trivia,
        fun_fact: questionRow!.fun_fact,
      });
    } else {
      // Handle the case where the user has no attempts left
      if (questionRow!.attempts === questionRow!.clues?.length) {
        await prisma?.question.update({
          where: { id: questionId },
          data: { attempts: questionRow!.attempts - 1 },
        });
        await prisma?.user.update({
          where: { id: user.id },
          data: { inCorrectAnswers: user.inCorrectAnswers + 1 },
        });
        return res.status(200).json({
          status: QuestionStatus.NoAttempts,
          correctAnswer,
          attemptsLeft: questionRow!.clues.length - questionRow!.attempts,
          trivia: questionRow!.trivia,
          fun_fact: questionRow!.fun_fact,
        });
      } else {
        await prisma?.question.update({
          where: { id: questionId },
          data: {
            attempts: questionRow!.attempts + 1,
            userAnswer: answer,
          },
        });
        await prisma?.user.update({
          where: { id: user.id },
          data: { inCorrectAnswers: user.inCorrectAnswers + 1 },
        });
        return res.status(200).json({
          status: QuestionStatus.WrongAnswer,
          attemptsLeft: questionRow!.clues.length - questionRow!.attempts,
          trivia: questionRow!.trivia,
          fun_fact: questionRow!.fun_fact,
        });
      }
    }
  } catch (error) {
    console.error({ error });
    return res.status(500).json({ error: "Something Went Wrong" });
  }
}

export default Authorization(handler);
