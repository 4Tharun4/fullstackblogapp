import  express  from "express";
import { addpost, deletepost, getposts, getsinglepost, updatepost } from "../Controllers/postcontrollers.js";



const route = express.Router();

route.get("/",getposts)
route.get("/:id",getsinglepost)
route.post("/",addpost)
route.delete("/:id",deletepost)
route.put("/",updatepost)



export default route