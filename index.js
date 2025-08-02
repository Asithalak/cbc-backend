import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';   
import productsRouter from './Routes/productsRouter.js';
import userRouter from './Routes/userRouter.js';
import jwt from 'jsonwebtoken';

const app = express();
app.use(bodyParser.json())
//middleware
//authentication
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
//database
mongoose.connect("mongodb+srv://admin:123@cluster0.ogciv89.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
.then(()=>{
    console.log("Connect to the databases")
}).catch(()=>{
    console.log("database connect failes")
}
)

app.use("/product",productsRouter)
app.use("/users",userRouter)

//mongodb+srv://admin:123@cluster0.ogciv89.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
app.listen(5000,
    ()=>{
        console.log("server is running on port 5000");
    }
 );