import type { NextApiResponse } from "next";
import {
  Authorization,
  AuthenticatedNextApiRequest,
} from "@/lib/middlewares/Authorization";
import prisma from "@/lib/prisma";

async function handler(req: AuthenticatedNextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    res.setHeader("Allow", ["POST"]);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  const { user } = req;
  const { friendId } = req.body;

  try {
    const friendDetails = await prisma.user.findUnique({
      where: {
        id: friendId,
      },
    });

    if (!friendDetails) {
      return res.status(404).json({ error: "Friend User Not Found" });
    } else {
      //   Add user friends
      console.log({ user });
      console.log({ friendDetails });
      const response = await prisma.user.update({
        where: {
          id: user.id,
        },
        data: {
          friendId: {
            push: friendId,
          },
        },
      });

      const friendResponse = await prisma.user.update({
        where: {
          id: friendDetails.id,
        },
        data: {
          friendId: {
            push: user.id,
          },
        },
      });

      if (response && friendResponse) {
        return res.status(200).json({ message: "Friend Added" });
      }
    }
  } catch (error) {
    console.log({ error });
    return res.status(500).json({ message: "Something Went wrong" });
  }
}

export default Authorization(handler);
