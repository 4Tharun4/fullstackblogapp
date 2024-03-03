import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
const Menu = ({cat}) => {
  const [posts,setposts] = useState([]);
   useEffect(()=>{
     const feathdata = async ()=>{
       try{
       const res = await axios.get(`http://localhost:3000/api/posts/?cat=${cat}`);
       setposts(res.data);
       }catch(err){
         console.log(err);
       }
     };feathdata()
   },[cat])
    
  return (
    <div className='menu'>
        <h1>Other Posts You Like</h1>
        {
            posts.map(post=>(
                <div className="post" key={post.id}>
                    <img src={`../upload/${post.img}`} alt="" />
                    <h2>{post.title}</h2>
                 <div className="lonk">
                
                 <Link to={`/Page/${post.id}`}>
            
            <button>Read More</button>
            </Link>

                 </div>
                </div>
            ))
        }
      
    </div>
  )
}

export default Menu
