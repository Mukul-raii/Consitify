"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const tweetScrapper_1 = require("../controllers/tweetScrapper");
const authMiddleware_1 = __importDefault(require("../middlewares/authMiddleware"));
const router = (0, express_1.Router)();
router.route('/addchallenge').post(authMiddleware_1.default, tweetScrapper_1.addChallenge);
router.route('/getallchallenge').get(authMiddleware_1.default, tweetScrapper_1.allChallenge);
router.route('/createProgressTable').post(authMiddleware_1.default, tweetScrapper_1.createProgressTable);
exports.default = router;
