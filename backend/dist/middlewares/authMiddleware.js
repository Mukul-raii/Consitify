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
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const firebase_admin_1 = __importDefault(require("firebase-admin"));
const authHandler = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const sessionCookie = ((_a = req.cookies) === null || _a === void 0 ? void 0 : _a.session) || " ";
    if (!sessionCookie) {
        return res.status(401).json({ message: 'Unauthorized, session cookie not provided' });
    }
    console.log({ sessionCookie });
    try {
        const decoded = yield firebase_admin_1.default.auth().verifySessionCookie(sessionCookie, true);
        console.log("decoded user info ", decoded);
        const user = yield prisma.user.findUnique({
            where: {
                uid: decoded.uid
            }, select: {
                username: true
            }
        });
        if (!user) {
            return res.status(400).json({ message: "user not found" });
        }
        decoded.username = user.username;
        req.decodedUser = decoded;
        next();
    }
    catch (error) {
        res.status(401).json({ message: 'Unauthorized, invalid session' });
    }
});
exports.default = authHandler;
