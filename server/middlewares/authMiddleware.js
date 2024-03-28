import JWT from "jsonwebtoken";
import userModel from "../models/userModel.js";

export const requireSignin = (req, res, next) => {
    try {
        const decode = JWT.verify(
            req.headers.authorization,
            process.env.JWT_SECRET_KEY
        );
        req.user = decode;
        console.log(decode);
        next();
    } catch (error) {
        console.log(error);
    }
};

export const isAdmin = async(req, res, next) => {
    try{
        const user = await userModel.findById(req.user.userId);
        console.log(user);
        if(user.isAdmin !== true){
            return res.status(400).send({
                success: false,
                message: "Only admins are allowed"
            })
        }
    }catch(error){
        console.log(error);
    }
    next();
}