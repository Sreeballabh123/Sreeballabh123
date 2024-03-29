import userModel from "../models/userModel.js";
import { comparePassword, hashPassword } from './../helpers/authHelper.js';
import JWT from "jsonwebtoken";

export const registerController = async (req,res) =>{
    try{
        const{name,email,password,phone,address} = req.body
        if(!name){
            return res.send({error:'name is required'})
        }
        if(!email){
            return res.send({error:'email is required'})
        }
        if(!password){
            return res.send({error:'password is required'})
        }
        if(!phone){
            return res.send({error:'Phone no is required'})
        }
        if(!address){
            return res.send({error:'address is required'})
        }

        //existing user
        const existinguser = await userModel.findOne({email})
        if(existinguser){
            return res.status(200).send({
                success:true,
                message:'Already register please login',
            })
        }

        //register user
        const hashedPassword = await hashPassword(password)
        //save
        const user =  await new userModel({name,email,phone,address,password:hashedPassword}).save();
        
        
        res.status(201).send({
            succes:true,
            message:'User register Successfully',
            user,
        })


    }catch(error){
        console.log(error)
        res.status(500).send({
            success:false,
            message:'Error in registration',
            error,
           });
            
        }
    };

    //POST LOGIN
    export const loginController = async(req,res) =>{
        try{
            const {email,password}= req.body
            //validation
            if(!email || !password){
                return res.status(404).send({
                    success:false,
                    message:'invalid email or password'
                })
            }
            //check user
            const user = await userModel.findOne({email})
            if(!user){
                return res.status(404).send({
                    success:false,
                    message:'Email is not required'
                })
            }
            const match = await comparePassword(password,user.password)
            if(!match){
                return res.status(200).send({
                    success:false,
                    message:'Invalid Password'
                })
            }
            //token
            const token = await JWT.sign({_id:user._id},process.env.JWT_SECRET,{
                expiresIn:'7d',
             });
             res.status(200).send({
                success:true,
                message:'login succesfully',
                user:{
                    name:user.name,
                    email:user.email,
                    phone:user.phone,
                    address:user.address,
                },
                token,
             });

        }catch(error){
            console.log(error)
            res.status(500).send({
             message:'error in login',
             error   
            })
        }
    };
    
    //test controller
    export const testController =(req,res) =>{
        res.send("protected Routes");
    };
