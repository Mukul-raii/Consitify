import { Request, Response } from 'express';
import { Prisma, PrismaClient } from '@prisma/client';
import { TwitterApi } from 'twitter-api-v2';

const prisma = new PrismaClient();

const twitterClient = new TwitterApi({
    appKey: 'BrYx0MyMP3Z8K6lwkXmKS6hef',
    appSecret: 'ujIPRpy0qS4Ur9lRELpIhWV8KvM11awjAnEbcfIGcw4UMMaXuP',
    accessToken: '1314125953665130496-lvr5YZxxQ6WTj08ifoU5rpuxkxJlhJ',
    accessSecret: 'd69aIXIvIB4GQ1Ak18lcT6ip58at6CdPZKoH6xdrArV02',
  });




const addChallenge = async (req: Request, res: Response): Promise<any> => {
    const { challengeName, noOfDays ,startDate}: { challengeName: string; noOfDays: number,startDate:Date } = req.body 
    const decodedUser = req.decodedUser;
    
    if (!challengeName || !noOfDays || !decodedUser ||startDate) {
        return res.status(400).json({ message: "all fields are required" });
    }

    const userId =decodedUser.uid

    const user = await prisma.user.findUnique({
        where:{
            uid:userId
            
        },
        select:{
            id:true
        }
    })
    if(!user){
        return res.status(400).json({message:"user not found"})
    }

    const challenge = await prisma.challenges.create({
        data:{
           
            challengeName,
            noOfDays,
            user:{
                connect:{id:user.id}
            },
            startDate:startDate
        }
        
    })



    return res.status(200).json({data:challenge})
    
    
}


const createProgressTable = async (req:Request,res:Response): Promise<any> => {
    const decodedUser =req.decodedUser
    const {challengeID,userId}=req.body
    

    if(!challengeID || !userId){
        return res.status(400).json({message:"all fields are required"})
    }
    const username=decodedUser?.username;

    const uid=decodedUser?.uid

    if(!uid || !username){
        return res.status(400).json({message:"user not found"})
    }

    const challengeProgress= await prisma.challenges.findUnique({
        where:{
            userId:userId,
            id:challengeID
        },
        select:{
            progressTable:true
        }
    })
    console.log(challengeProgress?.progressTable);

    const userTweets = await twitterClient.v2.userTimeline(username, {
        start_time: '2024-09-01T00:00:00Z',
        max_results: 100, // Adjust as needed (max is 100)
    });

    console.log(userTweets);
    

    return res.status(200).json({data:challengeProgress?.progressTable})


}


const allChallenge =async(req:Request,res:Response):Promise<any>=>{
    const decodedUser =req.decodedUser

    if(!decodedUser){
        return res.status(400).json({message:"user not found"})
    }

    const uid = decodedUser.uid
    const user = await prisma.user.findUnique({
        where:{
            uid:uid
        },
        select:{
            challenges:true
        }
    })
    if(!user){
        return res.status(400).json({message:"user not found"})
    }
    console.log(user.challenges);
    
    console.log("user all challenges :",user.challenges);
    
    return res.status(200).json({data:user.challenges})
}




export {addChallenge,createProgressTable,allChallenge}