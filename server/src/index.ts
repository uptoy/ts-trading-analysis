import express from 'express'
import mongoose,{ConnectionOptions} from 'mongoose'
import morgan from 'morgan'
import cors from 'cors'


const app = express()
const env = require('dotenv')
const PORT = 8000

//routes
const userRoutes = require('./routes/user')

(async()=>{
    try{
        const mongooseOptions:ConnectionOptions ={
            useUnifiedTopology:true,
            useNewUrlParser:true,
            useCreateIndex:true
        }
        const db = await mongoose.connect('mongodb://localhost/trade',mongooseOptions)
        console.log('database is connected to:' ,db.connection.name)
    }catch(error){
        console.log(error)
    }
})()


app.use('/api',userRoutes)

app.use(morgan('dev'))　//ログ出力
app.use(cors()) //cors有効化
app.use(express.json())
app.use(express.urlencoded({extended:false})) //配列型のフォームデータを受け取る


app.listen(PORT,()=>{
    console.log(`server on port ${PORT}`)
})