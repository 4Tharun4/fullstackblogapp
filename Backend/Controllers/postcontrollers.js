
import db from '../db.js'
import jwt from 'jsonwebtoken'
export const getposts = (req,res)=>{
    const query = req.query.cat ? "SELECT * FROM posts WHERE cat=?":"SELECT * FROM posts"

    db.query(query,[req.query.cat],(err,data)=>{
        if(err) return res.send(err)

        return res.status(200).json(data)
    

    })
}

export const getsinglepost = (req,res)=>{
    const query =  "SELECT  p.id `username`,`title`,`desc`,p.img, u.img AS userimg,`cat`,`date` FROM user u JOIN posts p ON u.id=p.uid WHERE p.id = ? ";
    db.query(query,[req.params.id],(err,data)=>{
        if(err) return res.send(err)
        return res.status(200).json(data[0])
    })
   
}

export const addpost = (req,res)=>{

  const q = "INSERT INTO posts (`title`,`desc`,`img`, `date`, `cat`,`uid`) VALUES (?)"

  const values  =[
    req.body.title,
    req.body.desc,
    req.body.img,
    req.body.date,
    req.body.cat,
    req.body.set,
   
  ];
  console.log(req.body.set);

  db.query(q,[values],(err,data)=>{
    if(err)  return res.status(500).json(err);
    
    return res.json("created")
  });
};
export const deletepost = (req,res)=>{
   
        const postId = req.params.id

        const query = "DELETE FROM posts WHERE `id` = ? "

        db.query(query,[postId],(err,data)=>{
            if(err)  return res.status(403).json("error");
          
            return res.json("post has been delete")

        })
    
}
export const updatepost = (req,res)=>{

    const posid  = req.params.id;
    const q = "UPDATE posts SET `title`=?,desc`=?,`img`=?,  `cat`=? WHERE `id`=?"

  const values  =[
    req.body.title,
    req.body.desc,
    req.body.img,
    req.body.cat,
  ];

  db.query(q,[...values,posid],(err,data)=>{
    if(err) return res.status(500).json(err);
    console.log(err);
    return res.json("updated")
  });
}
