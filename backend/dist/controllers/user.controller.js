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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logoutUser = exports.loginUser = void 0;
const client_1 = require("@prisma/client");
const firebase_admin_1 = __importDefault(require("firebase-admin"));
const prisma = new client_1.PrismaClient();
const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    const { result } = req.body;
    if (!result) {
        return console.log("error while loggin");
    }
    console.log({ result });
    const existingUser = yield prisma.user.findUnique({
        where: {
            username: result._tokenResponse.screenName,
        },
    });
    if (!existingUser) {
        const newUser = yield prisma.user.create({
            data: {
                uid: result.user.uid,
                username: result._tokenResponse.screenName,
                photoUrl: result._tokenResponse.photoUrl,
                email: (_a = result._tokenResponse) === null || _a === void 0 ? void 0 : _a.email,
            },
        });
    }
    const token = (_b = req.headers.authorization) === null || _b === void 0 ? void 0 : _b.split(" ")[1];
    const expiresIn = 60 * 60 * 24 * 5 * 1000;
    try {
        if (!token) {
            return res
                .status(401)
                .json({ message: "Unauthorized: No token provided" });
        }
        const sessionCookie = yield firebase_admin_1.default
            .auth()
            .createSessionCookie(token, { expiresIn });
        const options = {
            maxAge: expiresIn,
            httpOnly: true,
            secure: false,
            sameSite: "strict",
        };
        res.cookie("session", sessionCookie, options);
        return res.status(200).json({ message: "Message success" });
    }
    catch (error) {
        res.status(400).json({ message: "auth error" });
    }
    return res.status(200).json({ message: "Message success" });
});
exports.loginUser = loginUser;
const logoutUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const decodedUser = req.decodedUser;
        return res
            .clearCookie("session")
            .status(200).json({ message: "message success 212" });
    }
    catch (error) {
        res.status(400).json({ message: "auth error" });
    }
});
exports.logoutUser = logoutUser;
