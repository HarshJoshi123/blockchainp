const express=require('express');
const app=express();
const morgan=require('morgan');
const mongoose=require('mongoose')
const authRoutes=require('./routes/auth.js');
const userRoute=require('./routes/user.js');
const dotenv=require('dotenv')
dotenv.config();
const uri=process.env.MONGO_URI;
const PORT=process.env.PORT;
const cors=require('cors')
mongoose.connect(uri,{useNewUrlParser: true,useUnifiedTopology:true,useCreateIndex: true});
mongoose.set('useFindAndModify', false);
const connection=mongoose.connection;
connection.once('open',()=>{
	console.log("connected to mongo");
})
mongoose.connection.on("error", (err) => {
        console.log("MongoDB connection error. Please make sure MongoDb is running.", err);
        process.exit();
    });
app.use(cors());
app.use(express.json());  
app.use(morgan("dev"));   
app.use('/',authRoutes); 
app.use('/',userRoute);

app.listen(PORT,()=>{
	console.log(`Listening at port 8080`);  
});    