const { verify } = require("jsonwebtoken");
const blackTokenModel = require("../models/blackToken.model");
const userModel = require("../models/user.model");


const userAuth = (roles)=>{
    const adminAuth = async (req, res, next)=>{
        try{
            let token = req.headers.authorization?.split(' ')[1] || req.headers.authorization
            if(!token) return res.status(400).send({msg: 'Token Not Found'});
            let exists = await blackTokenModel.findOne({token});
            if(exists) return res.status(400).send({msg: 'Login Again'});
            let decode = verify(token, process.env.JWT_SECRET_KEY);
            let userExists = await userModel.findById({_id: decode.userId});
            if(!userExists) return res.status(400).send({msg: 'Login Again'});
            req.body.user = userExists;
            if(!roles.includes(userExists.role)) return res.status(400).send({msg: 'You are not authorized enough to make this request'});
            next();
        }catch(err){
            res.status(500).send({error: err.message});
        }
    }
    return adminAuth
}

module.exports = userAuth;