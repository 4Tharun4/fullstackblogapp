import  express  from "express";
import { Login, Logut, Register } from "../Controllers/Authcontroller.js";



const RouterAuth = express.Router();

RouterAuth.post("/register",Register)
RouterAuth.post("/login",Login)
RouterAuth.post("/logout",Logut)




export default RouterAuth