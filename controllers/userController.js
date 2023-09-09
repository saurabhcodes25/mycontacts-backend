const asyncHandler=require('express-async-handler')
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');
const User=require('../models/userModel');
//@desc Register a user
//@route POST /api/users/register
//@access Public

const registerUser = asyncHandler(async(req,res)=>{
    const {username,email,password}=req.body;
    if(!username || !email || !password){
        req.status(400);
        throw new error('All fields are required');
    }
    const usernAvailable =await User.findOne({username});
    if(usernAvailable){
        req.status(400);
        throw new error('User already exists');

    }
    //hash password
    const hashedPassword=await bcrypt.hash(password,10);
    console.log('hashed password:',hashedPassword);

    const user= await User.create({
        username,
        email,
        password:hashedPassword,
    });

    console.log('user created:',user);
    if(user)
    {
        res.status(201).json({  _id:user.id,email:user.email});
    }
    else 
    {
        res.status(400);
        throw new error('Invalid user data');
    }
    res.json({message:"Register the user"});
});

//@desc login a user
//@route POST /api/users/login
//@access Public
const loginUser = asyncHandler(async(req,res)=>{
    const {email,password}=req.body;
    if(!email || !password){
        req.status(400);
        throw new error('All fields are required');
    }
    const user= await User.findOne({email});
    //compare password with hashed password
    if(user && (await bcrypt.compare(password,user.password))){
        const accessToken=jwt.sign({
            user:
            {
                username:user.username,
                email:user.email,
                id:user.id,
            },
        },
        process.env.JWT_SECRET,
        {
            expiresIn:"15m",
        }
        );
        res.status(200).json({accessToken});
    }
    else{
        res.status(401);
        throw new error('Invalid email or password');

    }
});

//@desc Current info of a user
//@route GET api/users/current
//@access private
const currentUser = asyncHandler(async(req,res)=>{
    res.json(req.user);
});
 

module.exports={registerUser,loginUser,currentUser};