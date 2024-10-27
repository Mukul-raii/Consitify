import { Request, Response, NextFunction } from "express";
import { PrismaClient } from "@prisma/client";
const prisma=new PrismaClient();
declare module 'express-serve-static-core' {
    interface Request {
        decodedUser?: admin.auth.DecodedIdToken;
    }
}

import admin from 'firebase-admin';
const authHandler = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    const sessionCookie = req.cookies?.session || " ";
    if (!sessionCookie) {
        return res.status(401).json({ message: 'Unauthorized, session cookie not provided' });
    }

    console.log({sessionCookie});

    try {
        const decoded = await admin.auth().verifySessionCookie(sessionCookie, true);
        console.log("decoded user info ",decoded);
        const user=await prisma.user.findUnique({
            where:{
                uid:decoded.uid
            },select:{
                username:true
            }
        })
        if(!user){
            return res.status(400).json({message:"user not found"})
        }
        
        decoded.username=user.username
        req.decodedUser = decoded;
        next();
    } catch (error) {
        res.status(401).json({ message: 'Unauthorized, invalid session' });
    }
}

export default authHandler;
