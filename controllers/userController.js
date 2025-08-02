import User from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export function createUser(req, res) {
    if(req.user.role == "admin"){
        if(req.user.role != null){
          if(req.user.role != "admin"){
            res.status(403).json({
                message : "you are not allowed to create an admin account"
            })
            return
          }  

        }else{
            res.status(403).json({
                message : "you are not allowed to create an admin account. Please login as an admin."
            })
            return
        }
    }
    const hashedPassword = bcrypt.hashSync(req.body.password, 10);
// database eke thula user save karanna
    // user save karanna
    const user = new User({
        email : req.body.email,
        firstName : req.body. firstName,
        lastName : req.body.lastName,
        password : hashedPassword,
        role : req.body.role,
    }
)
    //save u vita postman wala response ekak denawa

    user.save().then(() => {
        res.json({
            message : "user save details"
        })
    }).catch((
    ) => {
        res.json({

            message : "failed to details"
        })
    })
}

export function loginUser(req, res) {
    const email = req.body.email
    const password = req.body.password

    User.findOne({ email : email }).then(
        (user) =>{
            if(user == null){
                res.status(400).json({
                    message : "user not found"
                })
            }
            else{
                const isPasswordCoorrect = bcrypt.compareSync(password, user.password)
                if(isPasswordCoorrect){
                    const token = jwt.sign(
                      {
                            email : user.email,
                            firstName : user.firstName,
                            lastName : user.lastName,
                            role : user.role,
                            img : user.img
                        },
                        "cbc-batch-one#@2025" // secret key
                    )
                    res.json({
                        message : "login success",
                        token : token
                    })
                }
                else{
                    res.status(400).json({
                        error,
                       message : "invalid password"
                   })
                }
            }
        }
    )
}


export function isAdmin(req) {

    if(req.user == null){
        return false; // early return if user is not authenticated
    }
    if(req.user.role != "Admin") {
        return false; // early return if user is not admin
    }
    return true; // user is admin
}
