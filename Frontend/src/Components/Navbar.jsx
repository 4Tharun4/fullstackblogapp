import React, { useContext } from 'react'
import logo from '../assets/logo.png'
import { Link, useLocation } from 'react-router-dom'
import { AuthContext } from '../context/authcontext'

const Navbar = () => {

  const{currentUser , logout } = useContext(AuthContext)
  return (
   <div className="navbar">
    <div className="container">
      <div className="logo">
        <Link to="/">
        <img src={logo} alt="logo"/>
        </Link>
      </div>
        <div className="links">
          <Link className='link' to='/?cat=Politics'>politics</Link>
          <Link className='link' to='/?cat=Gaming'>Gaming</Link>
          <Link className='link' to='/?cat=Technology'>Technology</Link>
          <Link className='link' to='/?cat=Cenima'>Cenima</Link>
          <Link className='link' to='/?cat=International_News'>International News</Link>
          <Link className='link' to='/?cat=Today_news'>Today news</Link>
          <span>{currentUser?.username}</span>
          { currentUser ? <span onClick={logout} >Logout</span>:<Link className='link'to="/login">Login</Link>}
          <span className='write'>
            <Link className='link' to='/Write'>Write</Link>
          </span>
        </div>
    </div>
   </div>
  )
}

export default Navbar
