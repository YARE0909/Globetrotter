// lib/Authorization.ts
import { NextApiRequest, NextApiResponse, NextApiHandler } from "next";
import jwt from "jsonwebtoken";
import prisma from "@/lib/prisma";

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key";

// Define a custom type to include user data on the request object
export interface AuthenticatedNextApiRequest extends NextApiRequest {
  user?: any;
}

export function Authorization(handler: NextApiHandler) {
  return async (req: AuthenticatedNextApiRequest, res: NextApiResponse) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({ error: "Not Authorised" });
    }

    const token = authHeader.split(" ")[1];

    if (!token) {
      return res.status(401).json({ error: "Not Authorised" });
    }

    try {
      // Verify the token using the JWT_SECRET
      const decoded = jwt.decode(token);
      if (!decoded) {
        return res.status(401).json({ error: "Not Authorised" });
      }

      const { userId } = decoded as { userId: string };
      if (!userId) {
        return res.status(401).json({ error: "Not Authorised" });
      }

      const user = await prisma.user.findUnique({
        where: { id: userId },
        select: {
          id: true,
          userName: true,
          displayName: true,
          score: true,
          inCorrectAnswers: true,
          friendId: true
        },
      });
      if (!user) {
        return res.status(401).json({ error: "Not Authorised" });
      }
      // Attach the decoded token (e.g., user info) to the request object
      req.user = user;
      // Call the next handler with the authenticated request
      return handler(req, res);
    } catch (error) {
      return res.status(401).json({ error: "Not Authorised" });
    }
  };
}
