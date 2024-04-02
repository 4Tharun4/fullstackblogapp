import  express  from "express";
import 'dotenv/config';
import cors from 'cors'
import mysql from 'mysql'
import RouterAuth from './Routes/auth.js'   
import cookieParser from "cookie-parser";
import route from "./Routes/posts.js";
import multer from 'multer'
import bodyParser from "body-parser";





const server = express();
server.use(cors({
  origin:["http://localhost:5173"],
  methods:["GET","POST"],
  credentials:true
}))
server.use(cookieParser());
server.use(express.json());
server.use(bodyParser.urlencoded({extended:true}));
server.use(bodyParser.json())


server.use("/api/auth",RouterAuth);
server.use("/api/posts",route);

//deploy message
 

server.get("/",(req,res)=>{
  res.json("Deploy Backend")
})



// const upload = multer({ dest: './uploads/' })

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, '../Frontend/public/upload')
    },
    filename: function (req, file, cb) {
      cb(null, Date.now()+file.originalname)
    }
  })
  
  const upload = multer({ storage: storage })


server.post('/api/upload', upload.single('file'), function (req, res) {
    const file = req.file;
 return res.status(200).json(file.filename)
  })

let port = process.env.PORT || 3000;
server.listen(port,()=>{
    console.log(`server is running in ${port}`)
})