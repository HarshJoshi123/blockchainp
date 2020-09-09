const express=require('express');
const { userById,signup,signin,signout,forgotPassword,resetPassword }=require('../controllers/auth.js');
const router=express.Router();  //router object made to handle routing

router.post("/signup",signup);  //**First validator.fn is handled then postcontroller fn
router.post("/signin",signin);                                                                               //if validator fn generates error then postcontroller fn not performed
router.param("userId",userById)
module.exports=router;