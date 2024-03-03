 import db from '../db.js'
 import bcrypt from "bcryptjs";
 import jwt from "jsonwebtoken";
import cookieParser from 'cookie-parser';

export const Register = (req,res)=>{
    

    //check existance

    const quer = "SELECT * FROM user WHERE email = ? OR username = ?"

    db.query(quer,[req.body.email,req.body.username],(err,data)=>{
        if(err) return res.json(err)
        if(data.length) return res.status(409).json("User Already exists");
 

        //hash pass 
    var salt = bcrypt.genSaltSync(10);
        var hash = bcrypt.hashSync(req.body.password, salt);


       let quer =  "INSERT INTO user (`username`,`email`,`userpassword`) VALUES(?) "

       const values = [
        req.body.username,
        req.body.email,
        hash
       ]

       db.query(quer,[values],(err,data)=>{
        if(err) return res.json(err)
         return res.status(200).json("User created");


       })

    });

    

    
};

export const Login = (req,res)=>{

    const query = "SELECT * FROM user WHERE username = ?";

    db.query(query, [req.body.username], (err, data) => {

           


      if (err) return res.status(500).json(err);
      if (data.length === 0) return res.status(404).json("User not found!");
  
      //Check password
      const isPasswordCorrect = bcrypt.compareSync(
        req.body.password,
        data[0].userpassword
      );


  
      if (!isPasswordCorrect)
        return res.status(400).json("Wrong username or password!");
      const token =  jwt.sign({ id:data[0].id }, "jwtkey",);
      const { userpassword, ...other } = data[0];
  return(
      res
        .cookie("access_token", token, {
        })
        .status(200)
        .json(other,)

  );
    });
    };
  
export const Logut = (req,res)=>{
  res.clearCookie("Access_token",{
    sameSite: 'none',
    httpOnly:false,
    secure:true,
  }).status(200).json("User has been logout")
    
}