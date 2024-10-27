import { PrismaClient } from "@prisma/client";

import { Request, Response } from "express";
import admin from "firebase-admin";

const prisma = new PrismaClient();

const loginUser = async (req: Request, res: Response): Promise<any> => {
  const { result } = req.body;
  if (!result) {
    return console.log("error while loggin");
  }

  console.log({ result });
  const existingUser = await prisma.user.findUnique({
    where: {
      username: result._tokenResponse.screenName,
    },
  });

  if (!existingUser) {
    const newUser = await prisma.user.create({
      data: {
        uid:result.user.uid,
        username: result._tokenResponse.screenName,
        photoUrl: result._tokenResponse.photoUrl,
        email: result._tokenResponse?.email,
      },
    });
  }
  const token = req.headers.authorization?.split(" ")[1];
  const expiresIn = 60 * 60 * 24 * 5 * 1000;

  try {
    if (!token) {
      return res
        .status(401)
        .json({ message: "Unauthorized: No token provided" });
    }
    const sessionCookie = await admin
      .auth()
      .createSessionCookie(token, { expiresIn });

    const options = {
      maxAge: expiresIn,
      httpOnly: true,
      secure: false,
      sameSite: "strict"as const,
    };

    
    res.cookie("session", sessionCookie, options);


  return res.status(200).json({ message: "Message success" });


  } catch (error) {
    res.status(400).json({ message: "auth error" });
  }

  return res.status(200).json({ message: "Message success" });
};



const logoutUser = async (req: Request, res: Response): Promise<any> => {
  try {
    const decodedUser =req.decodedUser
   

    return res
    .clearCookie("session")
    .status(200).json({ message: "message success 212" })
    
  } catch (error) {
    res.status(400).json({ message: "auth error" });
  }
}
export {loginUser,logoutUser};
