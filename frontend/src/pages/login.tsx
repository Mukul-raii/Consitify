/* import {getAuth,TwitterAuthProvider,signInWithPopup,} from "firebase/auth";
import {twitterLogin,twitterLogout} from '../../services/authService';
import { useGlobalContext } from "../../context/AuthContext";
import { useEffect } from "react";


const LoginUser = () => {
    const { status, setStatus } = useGlobalContext();
console.log(status);

  
  const handleLogin = async () => {
    const auth = getAuth();
    const provider = new TwitterAuthProvider();
  
    signInWithPopup(auth, provider)
      .then((result) => {
        const credential = TwitterAuthProvider.credentialFromResult(result);
        
        twitterLogin(credential,result, status, setStatus, auth)
      })
      .catch((error) => {
    
        const errorCode = error.code;
        const errorMessage = error.message;
        const email = error.customData.email;
        const credential = TwitterAuthProvider.credentialFromError(error);
        console.log({errorCode, errorMessage, email, credential});
        
      });
  };



  const handleLogout = async () => {
    twitterLogout()
  }

  return (
    <div className="flex justify-between">
      <button onClick={handleLogin}>Login</button>
      <button onClick={handleLogout}>logout</button>
    </div>
  );
};

export default LoginUser;
 */