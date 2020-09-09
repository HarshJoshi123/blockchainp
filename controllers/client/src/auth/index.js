
export const isAuthenticated=()=>{
if(typeof window=="undefined"){
  return false;
}
if(localStorage.getItem("jwt")){

  return JSON.parse(localStorage.getItem("jwt"));
}
else{
 
  return false
}

}

export const authenticate=(jwt,next)=>{
if(typeof window!=="undefined"){   //to check if headers are loaded
  localStorage.setItem("jwt",JSON.stringify(jwt));  //response is stored in cookies which is a token and user
  next(); //argument fn is called
}


}

export const signin=user=>{
	
  return fetch(`http://localhost:8080/signin`,{            //Return fetch is imp.
  method:"POST",
  headers:{
  	Accept:"application/json",
  	"Content-type":"application/json"
  },
  body:JSON.stringify(user)

}).then(response=>{
	
  return response.json();
	
}).catch(err=> console.log("errooooorr"))

}

export const signup=user=>{
	return fetch(`http://localhost:8080/signup`,{            //Return fetch is imp.
  method:"POST",
  headers:{
  	Accept:"application/json",
  	"Content-type":"application/json"
  },
  body:JSON.stringify(user)

}).then(response=>{
	return response.json();
	
}).catch(err=>console.log('Bh'))

}

