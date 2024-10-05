import React, { useState } from 'react';
import "./Shortcut.css";
import {Link} from "react-router-dom";
import { useEffect } from 'react';
const Shortcut = ({data,setClick,clickLink,setClickLink,setPathshortcut}) => {
  useEffect(() => {
  }, [clickLink]);
  return (
    <div className="shortcut">
          <div className="shortcut-content">
              Lối Tắt
          </div>
          <div className="shortcut-component">
              {data.map((item,index)=>(
                <Link  onClick={()=>{setClick(true),setClickLink(true),setPathshortcut(item.name)}} to={item.path}><div className="shortcut-item">{item.name}</div></Link> 
              )
              )}
          </div>
      </div>
  )
}

export default Shortcut
