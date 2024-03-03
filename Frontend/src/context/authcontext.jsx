import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";


export const AuthContext = createContext();




export const AuthContexProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem("user")) || false
  );


  const login = async (inputs) => {
    const res = await axios.post("http://localhost:3000/api/auth/login", inputs);
    setCurrentUser(res.data);
    console.log(res.data);
  };

  const logout = async (inputs) => {
    await axios.post("http://localhost:3000/api/auth/logout");
    setCurrentUser(false);
    swal("Good job!", " Logout Sucessful", "success");
  };

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(currentUser));
  }, [currentUser]);        

  return (
    <AuthContext.Provider value={{ currentUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContexProvider