import { truncate } from 'fs'
import {model,Schema,Document} from 'mongoose'

export interface IUser extends Document {
    firstName:string
    lastName:string
    password:string

}

const  userSchema = new Schema({
    firstName:{
        type:String,
        require:true,
        trim:true,
        min:3,
        max:20
    },
        lastName:{
        type:String,
        require:true, //未入力不可
        trim:true,
        unique:true, //カラムの重複不可
        min:3,
        max:20
    },
        username:{
        type:String,
        require:true,
        trim:true,
        unique:true,
        index:true,
        lowercase:true
    },
    email:{
        type:String,
        required:true,
        trim:true,
        unique:true
    }
})

export default model('User',userSchema)