"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.allChallenge = exports.createProgressTable = exports.addChallenge = void 0;
const client_1 = require("@prisma/client");
const twitter_api_v2_1 = require("twitter-api-v2");
const prisma = new client_1.PrismaClient();
const twitterClient = new twitter_api_v2_1.TwitterApi({
    appKey: 'BrYx0MyMP3Z8K6lwkXmKS6hef',
    appSecret: 'ujIPRpy0qS4Ur9lRELpIhWV8KvM11awjAnEbcfIGcw4UMMaXuP',
    accessToken: '1314125953665130496-lvr5YZxxQ6WTj08ifoU5rpuxkxJlhJ',
    accessSecret: 'd69aIXIvIB4GQ1Ak18lcT6ip58at6CdPZKoH6xdrArV02',
});
const addChallenge = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { challengeName, noOfDays, startDate } = req.body;
    const decodedUser = req.decodedUser;
    if (!challengeName || !noOfDays || !decodedUser || startDate) {
        return res.status(400).json({ message: "all fields are required" });
    }
    const userId = decodedUser.uid;
    const user = yield prisma.user.findUnique({
        where: {
            uid: userId
        },
        select: {
            id: true
        }
    });
    if (!user) {
        return res.status(400).json({ message: "user not found" });
    }
    const challenge = yield prisma.challenges.create({
        data: {
            challengeName,
            noOfDays,
            user: {
                connect: { id: user.id }
            },
            startDate: startDate
        }
    });
    return res.status(200).json({ data: challenge });
});
exports.addChallenge = addChallenge;
const createProgressTable = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const decodedUser = req.decodedUser;
    const { challengeID, userId } = req.body;
    if (!challengeID || !userId) {
        return res.status(400).json({ message: "all fields are required" });
    }
    const username = decodedUser === null || decodedUser === void 0 ? void 0 : decodedUser.username;
    const uid = decodedUser === null || decodedUser === void 0 ? void 0 : decodedUser.uid;
    if (!uid || !username) {
        return res.status(400).json({ message: "user not found" });
    }
    const challengeProgress = yield prisma.challenges.findUnique({
        where: {
            userId: userId,
            id: challengeID
        },
        select: {
            progressTable: true
        }
    });
    console.log(challengeProgress === null || challengeProgress === void 0 ? void 0 : challengeProgress.progressTable);
    const userTweets = yield twitterClient.v2.userTimeline(username, {
        start_time: '2024-09-01T00:00:00Z',
        max_results: 100, // Adjust as needed (max is 100)
    });
    console.log(userTweets);
    return res.status(200).json({ data: challengeProgress === null || challengeProgress === void 0 ? void 0 : challengeProgress.progressTable });
});
exports.createProgressTable = createProgressTable;
const allChallenge = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const decodedUser = req.decodedUser;
    if (!decodedUser) {
        return res.status(400).json({ message: "user not found" });
    }
    const uid = decodedUser.uid;
    const user = yield prisma.user.findUnique({
        where: {
            uid: uid
        },
        select: {
            challenges: true
        }
    });
    if (!user) {
        return res.status(400).json({ message: "user not found" });
    }
    console.log(user.challenges);
    console.log("user all challenges :", user.challenges);
    return res.status(200).json({ data: user.challenges });
});
exports.allChallenge = allChallenge;
