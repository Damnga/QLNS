import React, { useEffect } from 'react';
import "./Navbar.css";
import {Link} from "react-router-dom";
import {Bell,ChevronDown,SearchIcon} from "lucide-react";
import Navigation from '../Navigation/Navigation';
const Navbar = ({menu,setMenu,path,setPath,clickLink,setClickLink,pathshortcut,setPathshortcut}) => {
  useEffect(() => {
  }, [clickLink]);
  return (
    <div id='mainnav'>
      <div className='navbar'>
      <div className="navbar-left">
        <div className="navbar-left-logo">
          <Link to="/"><img src="src/assets/logo.png" alt="logo" className='logo' /></Link>
        </div>
        <div className="navbar-left-navigation">
          <Navigation pathshortcut={pathshortcut}setPathshortcut={setPathshortcut} clickLink={clickLink} setClickLink={setClickLink} menu={menu} setMenu={setMenu} path={path} setPath={setPath}/>
        </div>
      </div>
      <div className="navbar-right">
        <div className="navbar-right-search">
          <button>
                <SearchIcon className="search-icon"></SearchIcon><span>Tìm Kiếm Hoặc Gõ Lệnh (Ctrl + G)</span>
          </button>
        </div>
        <div className="navbar-right-bell">
          <Bell className="bell-icon"></Bell>
        </div>
        <div>
          <hr />
        </div>
        <div className="navbar-right-dropdown">
            <span>Trợ giúp </span><ChevronDown className="search-icon"></ChevronDown>
        </div>
        <div className="navbar-right-dot">
            1
        </div>
      </div>
    </div>
    </div>
  )
}

export default Navbar
