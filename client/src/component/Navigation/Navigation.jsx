import React from 'react';
import { Link } from 'react-router-dom';
import "./Navigation.css";
import { ChevronRight } from 'lucide-react';
import { useEffect } from 'react';
function Navigation({menu,path,setPath,clickLink,setClickLink,pathshortcut,setPathshortcut}) {
    return (
        <nav>
      <ul>
        <li className='chevron'><ChevronRight/></li>
        <li><Link to={path}>{menu}</Link></li>
        {clickLink && (
          <>
            <li className='chevron'><ChevronRight/></li>
            <li><Link to="/">{pathshortcut}</Link></li>
          </>
        )}
      </ul>
    </nav>
    );
}

export default Navigation;