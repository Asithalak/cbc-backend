import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';   
import productsRouter from './Routes/productsRouter.js';
import userRouter from './Routes/userRouter.js';
import orderRouter from './Routes/orderRouter.js'; 
import jwt from 'jsonwebtoken';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();

const app = express();

app.use(cors())
app.use(bodyParser.json())

app.use((req, res, next) => {
    const tokenString = req.header("Authorization")
    if(tokenString != null){
        const token = tokenString.replace("Bearer ", "")
        console.log(token)

        jwt.verify(token, "cbc-batch-one#@2025" ,
            (err, decoded) => {
                if(decoded != null){
                    req.user = decoded
                    next()
                }
                else{
                    console.log("invalid token")
                }
            }
        )
    }else
    {
            next()
    }
})
//database connection env
mongoose.connect("process.env.MONGODB_URL")
.then(()=>{
    console.log("Connect to the databases")
}).catch(()=>{
    console.log("database connect failes")
}
)

app.use("/api/product",productsRouter)
app.use("/api/users",userRouter)
app.use("/api/orders", orderRouter);


app.listen(5000,
    ()=>{
        console.log("server is running on port 5000");
    }
 );