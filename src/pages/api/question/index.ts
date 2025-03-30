import {
  Authorization,
  AuthenticatedNextApiRequest,
} from "@/lib/middlewares/Authorization";
import { Destination, Question } from "@/lib/types";
import { GetRandomOptions, GetRandomQuestion } from "@/lib/util/questions";
import shuffleArray from "@/lib/util/randomiseArray";
import type { NextApiResponse } from "next";
import prisma from "@/lib/prisma";

async function handler(req: AuthenticatedNextApiRequest, res: NextApiResponse) {
  if (req.method !== "GET") {
    res.setHeader("Allow", ["GET"]);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  const { user } = req;

  const randomQuestion: Destination = GetRandomQuestion();

  try {
    const questionEntry = await prisma?.question.create({
      data: {
        userId: user.id,
        city: randomQuestion.city,
        country: randomQuestion.country,
        clues: randomQuestion.clues,
        verified: false,
        trivia: randomQuestion.trivia,
        fun_fact: randomQuestion.fun_fact,
        userAnswer: "",
      },
    });

    const randomOptions = GetRandomOptions();
    const options = shuffleArray(
      [questionEntry?.city, ...randomOptions].filter(
        (option): option is string => option !== undefined
      )
    );

    const question: Question = {
      id: questionEntry!.id,
      clues: randomQuestion!.clues,
      options,
    };

    return res.status(200).json({ question });
  } catch (error) {
    return res.status(500).json({ error: "Something Went Wrong" });
  }
}

export default Authorization(handler);
