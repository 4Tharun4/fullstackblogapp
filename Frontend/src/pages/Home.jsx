import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import axios from 'axios'
const Home = () => {

  const [posts,setposts] = useState([]);

 const cat = useLocation().search;


 
   
  useEffect(()=>{
    const feathdata = async ()=>{
      try{
      const res = await axios.get(`http://localhost:3000/api/posts/${cat}`);
      setposts(res.data);
      }catch(err){
        console.log(err);
      }
    };feathdata()

  },[cat])

  const getText = (html) =>{
    const doc = new DOMParser().parseFromString(html, "text/html")
    return doc.body.textContent
  }
   return (
    <div className="home">
      <div className="posts">
        {
          posts.map(post=>(
            <div className="post" key={post.id}>
              <div className="images">
               <img src={`../upload/${post.img}`} alt="posts"  />
              </div>
              <div className="content">
              <h1 className='title'>{post.title}</h1>
                <Link to={`/Page/${post.id}`}>
            
                <button>Read More</button>
                </Link>
               
              </div>
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default Home


