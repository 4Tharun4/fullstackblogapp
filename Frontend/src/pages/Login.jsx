import axios from 'axios';
import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/authcontext.jsx';

const Login = () => {
  const [input , setinputs]= useState({
    username:"",
    password:"",
  });
  

  const navigate = useNavigate(); 

  const {login} = useContext(AuthContext);

  const handlefunction=(e) =>{

    setinputs((prev)=>({...prev,[e.target.name]:e.target.value}));
  }
  const handlesubmit= async(e)=>{
    e.preventDefault();
    try{
   await login(input)
       navigate('/')

    }catch(err){
      console.log(err);

    }
    
  
  }

  return (
    <div className='auth'>
        <h1> login</h1>
      <form method=''>
        <input type="text" placeholder='Username' name='username' onChange={handlefunction} />
        <input type="password" placeholder='Password' name='password' onChange={handlefunction}  />
        <button onClick={handlesubmit}>Login</button>
        <p>This is an Error Msg!</p>
        <span>Don't have an Account? <Link to="/Register">Register</Link></span>
      </form>
    </div>
  )
}



export default Login
