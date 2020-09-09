import React from 'react'
import {Link,withRouter } from "react-router-dom"
import {isAuthenticated,signout} from "../auth/index.js"


//isactive is used to indicate whic tab is active
//it takes history from props and path send as parameter
//if current path(history.location.path) and given path matches,it becomes yellow rest same

 const isactive=(history,path)=>{
   if(history.location.pathname===path){ 
return {color:"#ff9900"}
}
   else  return {color:"#ffffff"}

 }




const Menu=({history})=>(       //Extracting history from props
<div>


<ul className="nav nav-tabs bg-dark justify-content-around">
  <li className="nav-item">
    <Link className="nav-link" style={isactive(history,"/")}  to="/"> Home </Link>
  </li>
  
     {!isAuthenticated() ? (
    <>
    <li className="nav-item">
    <Link className="nav-link" style={isactive(history,"/signin")} to="/signin"> SIGNIN </Link>
  </li>
   
  <li className="nav-item" >
<Link className="nav-link" style={isactive(history,"/signup")}  to="/signup"> SIGNUP </Link>    
  </li> </>):null}



  
</ul>

</div>
  ) 
export default withRouter(Menu)


