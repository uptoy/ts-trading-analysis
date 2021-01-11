import {model,Schema,Document} from 'mongoose'
import bcrypt from 'bcrypt'

export interface IUser extends Document {
    firstName:string
    lastName:string
    password:string
    username:string
    email:string
    hash_password:string
    comparePassword:(password:string) =>Promise<boolean>
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
        unique:true,
        lowercase:true
    },
    hash_password:{
        type:String,
        enum:['user','admin'],
        default:'admin'
    },
    role:{
        type:String,
        enum:['user','admin'],
        default:'user'
    },
    contactNumber:{type:String},
    profilePicture:{type:String}
},{timestamps:true})

userSchema.virtual('password') //hash_passwordをpasswordとして吐き出してくれる
.set(function(password){
    this.hash_password = bcrypt.hashSync(password,10)
})

userSchema.virtual('fullName')
.get(function(){
    return `${this.firstName} ${this.lastName}`
})

userSchema.methods = {
    authenticate:function(password:String){
        return bcrypt.compare(password,this.hash_password)
    }
}


export default model('User',userSchema)