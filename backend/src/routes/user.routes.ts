import { Router } from "express";
import  {loginUser,logoutUser} from "../controllers/user.controller";
import authHandler from "../middlewares/authMiddleware";

const router=Router()


router.route('/login').post(loginUser)
router.route('/logout').post(authHandler,logoutUser)





export default router