import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../modals/Users.js';
const router=express.Router();


// post /api/auth/signup


router.post('/signup',async(req,res)=>{
    const {name,email,password}=req.body;
    const exists=await User.findOne({email});
        if(exists){
            return res.status(400).json({message:"User already exists"});
        }
    const hashedPassword= await bcrypt.hash(password,10);
        const newUser=new User({
            name,
            email,
            password:hashedPassword
        });
    await newUser.save();
        const token=jwt.sign({id:newUser._id},process.env.JWT_SECRET,{expiresIn:process.env.JWT_EXPIRES_IN});
        res.status(201).json({token,user:{id:newUser._id,name:newUser.name,email:newUser.email}});

});

// post /api/auth/login
router.post('/login',async(req,res)=>{
    const {email,password}=req.body;
    const user=await User.findOne({ email });
    if(!user){
        return res.status(400).json({message:"Invalid email or password"});
    }
    const isMatch=await bcrypt.compare(password,user.password);
    if(!isMatch){
        return res.status(400).json({message:"Invalid email or password"});
    }
    const token= jwt.sign({id:user._id,email:user.email},process.env.JWT_SECRET,{expiresIn:process.env.JWT_EXPIRES_IN});
    res.json({token,user:{id:user._id,name:user.name,email:user.email}});
})

export default router;