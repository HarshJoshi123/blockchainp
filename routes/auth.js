const express=require('express');
const router=express.Router();
const {userById,updateUser,userPhoto,phototrial}=require('../controllers/auth');
//any route containing userId,userById will be executed first
router.get("/user/:userId",userById)  //userId is used here hence userById is executed 
//router.get("/user/photo/:userId",userPhoto)
router.get("/userss/:userId",phototrial);//******FOR PHOTO */
router.put("/user/:userId",updateUser);//to update we use put
//router.delete("/user/:userId",deleteUser);
router.param("userId",userById);
module.exports=router;