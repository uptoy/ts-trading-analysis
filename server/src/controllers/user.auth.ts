import {Request,Response,NextFunction} from 'express'
import User,{IUser} from '../models/user'
import  jwt  from 'jsonwebtoken'

export const signup = (req:Request, res:Response) => {
    User.findOne({ email: req.body.email })
        .exec((error, user) => {
            if (user) return res.status(400).json({
                message: 'User already registered'
            })
            const {
                firstName,
                lastName,
                email,
                password
            } = req.body;
            const _user = new User({
                firstName,
                lastName,
                email,
                password,
                username: Math.random().toString()
            })
            _user.save((error, data) => {
                if (error) {
                    return res.status(400).json({
                        message: 'something went wrong'
                    })
                }
                if (data)
                    return res.status(201).json({
                        message: 'user create successful'
                    })
            })

        })
}

export const signin = (req:Request, res:Response) => {
    User.findOne({email:req.body.email})
    .exec((error,user)=>{
        if(error) return res.status(400).json(error)
        if(user){
            if(user.authenticate(req.body.password)){

            }
        }else{
            return res.status(400).json({message:'something went wrong'})
        }
    })

}