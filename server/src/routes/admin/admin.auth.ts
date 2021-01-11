import express from 'express'
import {signup,signin,requireSignin, signout} from "../../controllers/admin/admin.auth"
import {validateSignupRequest,isRequestValidated,validateSigninRequest} from '../../validators/auth'
import {requireSignin} from '../../common.middleware'


const router = express.Router()

router.post('/admin/signup',signup)
router.post('/admin/signin',signin)
router.post('/admin/signout',signout)

export default router