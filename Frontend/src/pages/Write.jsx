import React, { useContext, useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import moment from 'moment';
import { AuthContext } from "../context/authcontext";
import swal from 'sweetalert'

const Write = () => {

  const state = useLocation().state;
       const [value,setvalue] = useState(state?.desc||'');
       const [title,setTitle] = useState(state?.title||'');
       const [img,setImge] = useState(null);
       const [cat,setCat] = useState(state?.cat ||'');

       const { currentUser } = useContext(AuthContext);
 let set  = currentUser.id;

 const navigate = useNavigate()


       const upload = async () =>{
        try {
          const formData = new FormData();
          formData.append("file", img);
          const res = await axios.post("http://localhost:3000/api/upload", formData);
          return res.data;
          
        } catch (err) {
          console.log(err);
        }
      };
       const handlesubmit = async  e =>{
              e.preventDefault()
             const imgurl = await  upload()
             
             try{

                state? await axios.put(`http://localhost:3000/api/posts/${state.id}`,{
                  set,title,desc:value,cat,img:file ? imgurl :""
                }): await axios.post(`http://localhost:3000/api/posts/`,{
                 set, title,desc:value,cat,img:file ? imgurl :"",
                  date : moment(Date.now()).format("YYYY-MM-DD HH:mm:ss")
              });
              
              swal("Good job!", "Uploaded Sucessfull", "success");
              navigate("/")
             

             }catch(err){

             }
       }

  return (
    <div className='Write'>
      <div className="content">
       <input type="text" placeholder='Title' value={title}  onChange={e=>setTitle(e.target.value)} />
       <div className="editcontainer">
        <ReactQuill theme='snow' className='edi' value={value} onChange={setvalue} ></ReactQuill>
       </div>
      </div> 
      <div className="menu">
        <div className="item">
          <h1>Publish</h1>
          <span>
            <b>Status:</b>Draft
          </span>
          <span>
            <b>Visibility:</b>Public
          </span>
          <input  style={{display:'none'}}   type="file" name="file" id="file" onChange={e=>setImge(e.target.files[0])} />
          <label className="file"htmlFor="file">Upload Image</label>
          <div className="buttons">
            <button >Save</button>
            <button onClick={handlesubmit}>Upload</button>
          </div>
        </div>
        <div className="item">
          <h1>Category</h1>
          <div className="cat">
          <input type="radio"  name='cat' checked={cat ==="politics"}  Value="politics" id='politics' onChange={e=>setCat(e.target.value)}/>
          <label htmlFor="art">Politics</label>
          </div>
             <div className="cat">
          <input type="radio"  name='cat'  checked={cat==="International_News"} Value="International_News" id='International News' onChange={e=>setCat(e.target.value)}/>
          <label htmlFor="Science">International News</label> 
          </div>
            <div className="cat">
          <input type="radio"  name='cat'  checked={cat==="Technology"} Value="Technology" id='Technology' onChange={e=>setCat(e.target.value)}/>
          <label htmlFor="Technology">Technology</label>
          </div>
          <div className="cat">
          <input type="radio"  name='cat'   checked={cat==="Cenima"} Value="Cenima" id='Cenima' onChange={e=>setCat(e.target.value)}/>
          <label htmlFor="Cenima">Cenima</label>
          </div>
          <div className="cat">
          <input type="radio"  name='cat'  checked={cat==="Today_news"} Value="Today_news" id='Today_news' onChange={e=>setCat(e.target.value)}/>
          <label htmlFor="Food">Today news</label>
          </div>
          <div className="cat">
          <input type="radio"  name='cat'  checked={cat==="Gaming"} Value="Gaming" id='Gaming' onChange={e=>setCat(e.target.value)}/>
          <label htmlFor="Design">Gaming</label>
          </div>
        </div>
      </div>
     
    </div>
  )
}

export default Write
