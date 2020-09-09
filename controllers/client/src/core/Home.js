import React,{Component} from 'react'
import {isAuthenticated} from "../auth/index"
import {readphoto} from "../user/apiUser"
//   <img style={{borderRadius:"50%",border:'1px solid  black',objectFit:"cover" }} width="130px" className="float-left mr-2" height="130px"  src={`${process.env.REACT_APP_API_URL}${UserphotoId}`} onError={i=>(i.target.src =`${DefaultImage}`)}  />

class Home extends Component{

 handleclick=()=>{
     
    const token=isAuthenticated().token
     const userId=isAuthenticated().user._id
    readphoto(userId,token).then(data=>{
        if(data.error){
            console.log("photo fn error")
            
        }
        else{            //data is setstated after read from mongo 
        console.log("photo fn success")
        }
    })  

}

render(){
const UserphotoId= isAuthenticated().user ? `/user/photo/${isAuthenticated().user._id}` : ""  
const Username= isAuthenticated().user ? isAuthenticated().user.name : ""  

return(
<div >

 <div className="jumbotron d-flex " style={{textAlign:"center"}}>

  <h2 style={{alignSelf:"center",marginRight:"auto",marginLeft:"auto"}}>Welcome {Username}</h2>
    <button onClick={this.handleclick} > PRESS</button>  

 </div>


 </div>

);

}
}
export default Home;