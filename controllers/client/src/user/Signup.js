import React,{Component} from 'react'
import {signup} from "../auth/index.js"
import {Link} from "react-router-dom"
class Signup extends Component{
constructor(props){
super(props);
this.state={
email:"",
password:"",
name:"",
err:"",
open:false
}
this.handlechange=this.handlechange.bind(this);

}
handlechange= name=>e=>{    //Exactly in same order
console.log(this.state.name)
this.setState({err:""})
this.setState({
	[name]:e.target.value
});


}
handleclick=(event)=>{

event.preventDefault();
const {name,email,password}=this.state
const user={
   name:name,
   email:email,
   password:password

}
console.log(user);
signup(user).then(data=>{
	if(data.error){
		this.setState({err:data.error})}
    else if(data.err){
		this.setState({err:data.err})}
     
    else{
    	this.setState({
    		name:"",
    		email:"",
    		password:"",
    		err:"",
    		open:true
    	})
    }
})


};



signupform=()=>(
<form>
     <div className="form-group">
      <label className=" text-white">Name </label>
      <input type="text"   onChange={this.handlechange("name")} value={this.state.name} className="form-control"/>
      </div>
<div className="form-group">
      <label className=" text-white">Email </label>
      <input  type="email" onChange={this.handlechange("email")} value={this.state.email} className="form-control"/>
      </div>
<div className="form-group">
      <label className=" text-white">Password </label>
      <input type="password" className="form-control"  value={this.state.password} onChange={this.handlechange("password")}/>
      </div>

<button onClick={this.handleclick} className="btn btn-raised btn-primary"> Submit </button>


   </form>

		)


render(){
return(

<div className="container-fluid" style={{width:'100%',height:'650px',paddingTop:'10px',margin:'0'}}> 
<h2 className="mt-5 mb-5 text-white" style={{textShadow:" 1px 1px #ffffff, 1px 1px #ffffff, 1px 1px #ffffff",letterSpacing: "5px"}}>Signup</h2>
 <div className="alert alert-danger" style={{display:this.state.err? "":"none"}}> {this.state.err}</div>
  
<div className="alert alert-info" style={{display:this.state.open? "":"none"}}> New account has been created .Please <Link to="/signin">Sign In</Link></div>
 

   {this.signupform()}

</div>
	)
}



}

export default Signup;