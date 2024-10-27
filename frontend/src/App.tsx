/* import { MyGlobalContext } from '../context/AuthContext'
import './App.css'
import LoginUser from './pages/login';
import {firebaseConfig,initializeApp, getAnalytics,getAuth} from '../firebase/firebaseConfig';
import { useState } from 'react';


function App() {
  const [status,setStatus]=useState<boolean>(false)

  return (
   
    <MyGlobalContext.Provider value={{status,setStatus}}>
      <h1>Hello wordl</h1>
      <LoginUser/>
    </MyGlobalContext.Provider>

  )
}

export default App
 */