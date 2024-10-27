
import axios from "axios";
import {signOut} from 'firebase/auth'
import {auth} from '../firebase/firebaseConfig'


export const twitterLogin= async(credential,result,status,setStatus)=>{
    const user = result.user;
    console.log("usre",user);
 

        console.log({result});

        const token =result._tokenResponse.idToken;
        if(!token){
            return console.log("no token");
        }

        const response=await axios.post("http://localhost:3000/api/v0/user/login",{result},{
            headers:{'Authorization':`bearer ${token}`},
            withCredentials:true
        })

        console.log("LOGINSUCCESS",response);
    

 

}


export const twitterLogout= async()=>{

    await axios.post("http://localhost:3000/api/v0/user/logout",{},
        {withCredentials:true}).then((result) => {
       console.log({result});
       
        signOut(auth).catch((err) => {
            console.log("error logging out",err);
            
        });
        
    }).catch((err) => {
        console.log("error logging out",err);

    }

  
    )

}



