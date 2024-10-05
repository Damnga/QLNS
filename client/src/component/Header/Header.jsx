import React, { useState } from 'react';
import "./Header.css";
import { AlignJustify, Ellipsis} from 'lucide-react';
const Header = ({isDialogInsertOpen,menu,setMenu,onHeaderClick }) => {
  
  return (
    <div className="header">
        <div className="header-left">
            <div>
              <AlignJustify onClick={onHeaderClick}  className='header-left-icon'/>
            </div>
            <span>{menu}</span>
        </div>
        <div className="header-right">
            <div className='header-right-dot'>
              <Ellipsis className='header-right-icon'/>
            </div>
            <div>
              <button className='header-right-button'>Tùy Chỉnh</button>
            </div>
        </div>
    </div>
  )
}

export default Header
