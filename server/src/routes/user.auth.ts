import express from 'express'
import {signup,signin,requireSignin} from "../controllers/user.auth"
const router = express.Router()

router.post('signup',signup)
router.post('signin',signin)

export default router