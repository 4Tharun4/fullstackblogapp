import React, { useState } from 'react'
import { Link, useNavigate,  } from 'react-router-dom'
import swal from 'sweetalert'

import axios from 'axios';

const Register = () => {



  const [input , setinputs]= useState({
    username:"",
    password:"",
    email:""
  })

  const [err,seterror]=useState(null);
  const navigate = useNavigate(); 

  const handlefunction=  (e) =>{
    setinputs(prev=>({...prev,[e.target.name]:e.target.value}))
  }
  const handlesubmit= async (e) =>{
    e.preventDefault();
    try{
      await axios.post("http://localhost:3000/api/auth/register",input);
      swal("Good job!", "Registation Sucessfull", "success");
         navigate("/Login")
    }catch(err){
      console.log(err);
seterror(err.response.data)
      
    }
    
  
  }
  return (
    <div className='auth'>
        <h1> Register</h1>

      <form>
      <input type="text" placeholder='Username' required name='username' onChange={handlefunction} />
      <input type="Email" placeholder='Email' required name='email' onChange={handlefunction}   />
        <input type="password" placeholder='Password' name='password' onChange={handlefunction}  required />
        <button onClick={handlesubmit}>Register</button>
        { 
           err &&
          <p>{err}</p>}
        <span>Don you have an Account? <Link to="/Login">Login</Link></span>
      </form>
    </div>
  )
}

export default Register
