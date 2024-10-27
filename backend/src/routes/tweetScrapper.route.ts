import { Router } from "express";
import { addChallenge,allChallenge,createProgressTable } from "../controllers/tweetScrapper";
import authHandler from "../middlewares/authMiddleware";
const router=Router()


router.route('/addchallenge').post(authHandler,addChallenge)
router.route('/getallchallenge').get(authHandler,allChallenge)
router.route('/createProgressTable').post(authHandler,createProgressTable)






export default router