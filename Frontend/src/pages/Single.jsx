import React, { useContext, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Menu from "./Menu";
import moment from "moment";
import { AuthContext } from "../context/authcontext";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Single = () => {
  const [post, setpost] = useState({});

  const location = useLocation();

  const postid = location.pathname.split("/")[2];

  const { currentUser } = useContext(AuthContext);
  const navigate = useNavigate(); 
  const getText = (html) =>{
    const doc = new DOMParser().parseFromString(html, "text/html")
    return doc.body.textContent
  }
   

  useEffect(() => {
    const feathdata = async () => {
      try {
        const res = await axios.get(
          `http://localhost:3000/api/posts/${postid}`
        );
        setpost(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    feathdata();
  }, [postid]);

  const handlesubmit= async ()=>{
    try {
     await axios.delete(
        `http://localhost:3000/api/posts/${postid}`
      );
      navigate("/")
    } catch (err) {
      console.log(err);
    }

  }
  return (
    <div className="singlepage">
      <div className="content">
        <img src={`../upload/${post?.img}`} alt="postimage" />
        <div className="user">
          {post.userimg && <img src={post.userimg} alt="user`image" />}
          <div className="info">
            <span>{post.username}</span>
            
      
            <p>Posted {moment(post.date).fromNow()}</p>
          </div>

          {currentUser.username === post.username && (
            <div className="edits">
              <Link to={`/write?edit=2`} state={post}>
                <span className="material-symbols-outlined">edit</span>
              </Link>
              <Link onClick={handlesubmit}>
                <span className="material-symbols-outlined">delete</span>
              </Link>
            </div>
          )}
        </div>
        <h1>{post.title}</h1>
        <p>{getText(post.desc)}</p>
      </div>

      <Menu cat={post.cat} />
    </div>
  );
};

export default Single;
