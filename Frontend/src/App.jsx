import {
  createBrowserRouter,
  Outlet,
  RouterProvider,
} from "react-router-dom";
import './App.css'
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Single from "./pages/Single";
import Write from "./pages/Write";
import Notfoundpage from "./pages/Notfoundpage";
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";

import '../src/Style.scss'


 const  All = ()=>{
     return(
      <>
      <Navbar/>
      <Outlet/>
      <Footer/>
      
      </>
     )
}

function App() {
   const router =createBrowserRouter([
    {
      path:'/',

      element:<All/>,
      children:[
        {
          path:'/',
          element:<Home/>
        },
        {
          path:'/Page/:id',
          element:<Single/>
        },
        {
          path:'/Write',
          element:<Write/>
        }
      ]

    },
    {
      path:'/Register',
      element:<Register/>
    },
    {
      path:'/Login',
      element:<Login/>
    },
    {
      path:'*',
      element:<Notfoundpage/>
    },
   ])

  return (
    <div className="app">
      <div className="container">
      <RouterProvider router={router} />
      </div>
    </div>
  )
}

export default App
