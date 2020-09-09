const User= require("../models/user.js");
const jwt=require("jsonwebtoken");
const expressJwt=require('express-jwt'); //For protecting routes
const _=require('lodash') 
const dotenv = require("dotenv");
const formidable=require("formidable")
const fs=require('fs');
const btoa=require('btoa')
const faceapi = require('face-api.js');
const tf = require('@tensorflow/tfjs-node');
const Canvas = require('canvas');
const Image = require('canvas');
const ImageData = require('canvas');

const MODEL_URL = `${__dirname}/weights/`;


exports.userById=(req,res,next,id)=>{
  console.log("userbyid runn");
    User.findById(id)
    .exec((err,user)=>{
    
    if(err || !user){
        return res.status(400).json({
            error:"No User"
        })
    }
    
    req.profile=user;   //add profile object in request with user info
    next();
    
    })
       
    } 
    

exports.signup=async (req,res)=>{
    
    console.log("Function runnnnnninnnnnngg");
    console.log(req.body);
    try{const userExists=await User.findOne({email:req.body.email}) ;//Email will be sent in request 
	if(userExists)                                              //findone() method searches for that one document that matches given criteria
		return res.status(403).json({error:"Email is taken"});

	
const user=await new User(req.body);
await user.save();
res.status(200).json({
	user });

    }              //res to console of server
	 catch(err){
		console.log(err);
	            } 
}

exports.signin=(req,res)=>{       //Invoked when user is trying to login
	//Find user based on email
const {email,password}=req.body
User.findOne({email},(err,user)=>{
//error if user has no email
	if(err || !user){
		return res.status(401).json({
			err:"User with that email doesnt exist"
		})
	}//if user exists,authenticate
	//Generate encrypted password again and compare with stored encrypted password

if(!user.authenticate(password)){
	console.log(password);
	return res.status(401).json({
		error:"Email and password didnt match"
	})
}		

//generate a token with user id and secret Code

const token=jwt.sign({_id:user._id},process.env.JWT_SECRET);
//persist token t in cookies with a expiry date
res.cookie("t",token,{expire:new Date()+9999});
//return response with user id and token to frontend
const {_id,name,email}=user
return res.json({token,user:{_id,email,name}});
}) //findOne function ends

	
}

exports.updateUser=(req,res)=>{
    let form=new formidable.IncomingForm()
    form.keepExtensions=true
    form.parse(req,(err,fields,files)=>{
        if(err){
            return res.status(400).json({
                error:"Photo cant be uploaded"
            })
        }
        let user=req.profile
        user=_.extend(user,fields)
        if(files.photo){
            user.photo.data=fs.readFileSync(files.photo.path)
            user.photo.contentType =files.photo.type
        }
        user.save((err,result)=>{
        if(err){
            return res.status(400).json({
                error:err
            })
        }
      user.hashed_password=undefined
      user.salt=undefined
      res.json({user})  //sends updated user in response
    
        })
    })
    }
    
    exports.phototrial=async(req,res)=>{
        // let form=new formidable.IncomingForm()
        // form.keepExtensions=true
        // form.parse(req,(err,fields,files)=>{
        //     if(err){
        //         return res.status(400).json({
        //             error:"Photo cant be uploaded"
        //         })
        //     }
    //     Promise.all([
    //      faceapi.nets.ssdMobilenetv1.loadFromUri('MODELS_URL'),
    //      faceapi.nets.faceLandmark68Net.loadFromUri("MODELS_URL"),
    //      faceapi.nets.ssdMobilenetv1.loadFromUri("MODELS_URL")
    //     ]).then(()=>console.log("worked")).catch((err)=>console.log(err))
    faceapi.nets.ssdMobilenetv1.loadFromDisk(MODEL_URL)
    .then(faceapi.nets.faceLandmark68Net.loadFromDisk(MODEL_URL))
    .then(faceapi.nets.faceRecognitionNet.loadFromDisk(MODEL_URL))
    .catch(error => {
        console.log(error)
    });
    let user=req.profile
    const str=req.profile.photo.data
    var str1=str.toString().replace(/\r|\n/g, "")
    var str2=str1.replace(/([\da-fA-F]{2}) ?/g, "0x$1 ")
    var str3=str2.replace(/ +$/, "")
   //const img= await btoa(String.fromCharCode.apply(null,str.replace(/\r|\n/g, "").replace(/([\da-fA-F]{2}) ?/g, "0x$1 ").replace(/ +$/, "").split(" ")));
    const img=await btoa(String.fromCharCode.apply(null,str3.split(" ")));
   
   
   var imghtm.src ='data:image/jpeg;base64,'+btoa(img);
    //   const img=await faceapi.bufferToImage(user.photo)
    const detections = await faceapi.detectAllFaces(imghtm).withFaceLandmarks().withFaceDescriptors()
    console.log(detections.length)
    //console.log(detections);
    

            //  if(files.photo){
            //     user.photo.data=fs.readFileSync(files.photo.path)
            //     user.photo.contentType =files.photo.type
            // }
         
           const imagedata=user.photo.data;
            console.log(user.photo);
          res.json({user})  //sends updated user in response
        
            
        }
         