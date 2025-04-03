// pages/api/authentication/index.ts
import type { NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import prisma from "@/lib/prisma";

// Use an environment variable for the JWT secret in production
const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    res.setHeader("Allow", ["POST"]);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  const { action, userName, password, displayName } = req.body;

  if (!action) {
    return res.status(400).json({ error: "Action is required" });
  }

  // Handle user registration
  if (action === "register") {
    if (!userName || !password || !displayName) {
      return res.status(400).json({ error: "Missing fields for registration" });
    }

    try {
      // Check if the user already exists
      const existingUser = await prisma.user.findUnique({
        where: { userName },
      });
      if (existingUser) {
        return res.status(400).json({ error: "User already exists" });
      }

      // Hash the password before storing
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(password, saltRounds);

      // Create a new user in the database
      const newUser = await prisma.user.create({
        data: {
          userName,
          password: hashedPassword,
          displayName,
          score: 0,
        },
      });

      // Create a JWT token with the userName as payload
      const token = jwt.sign({ userId: newUser.id }, JWT_SECRET, {
        expiresIn: "1h",
      });
      return res
        .status(201)
        .json({ message: "User registered successfully", token });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Internal server error" });
    }
  }

  // Handle user login
  else if (action === "login") {
    if (!userName || !password) {
      return res.status(400).json({ error: "Missing fields for login" });
    }

    try {
      // Find the user by userName
      const user = await prisma.user.findUnique({ where: { userName } });
      if (!user) {
        return res.status(400).json({ error: "Invalid user credentials" });
      }

      // Compare the provided password with the stored hashed password
      const validPassword = await bcrypt.compare(password, user.password);
      if (!validPassword) {
        return res.status(400).json({ error: "Invalid user credentials" });
      }

      // Create a JWT token with the userName as payload
      const token = jwt.sign({ userId: user.id }, JWT_SECRET, {
        expiresIn: "1h",
      });
      return res.status(200).json({ message: "Login successful", token });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Internal server error" });
    }
  } else {
    return res.status(400).json({ error: "Invalid action" });
  }
}
