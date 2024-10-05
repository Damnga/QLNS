import React, { useState, useEffect } from 'react';
import "./Sidebar.css";
import { Link, useLocation } from "react-router-dom";
import {
  User, BrickWall, Blocks, Atom, PackageCheck, ShoppingBasket, ShoppingBag, ShieldCheck, Projector, Orbit,
  SlidersHorizontal, Wrench, Plug, AppWindow, Cylinder, Contact, Notebook, Scroll, Scale, Package, Pyramid, PersonStanding
} from 'lucide-react';

const partner = [
  { path: "/", label: "Trang Chủ", icon: <AppWindow /> },
  { path: "/counter", label: "Kế toán", icon: <Notebook /> },
  { path: "/talent", label: "Tài Sản", icon: <Scale /> },
  { path: "/build", label: "Build", icon: <Pyramid /> },
  { path: "/purchase", label: "Mua Hàng", icon: <ShoppingBasket /> },
  { path: "/crm", label: "CRM", icon: <Cylinder /> },
  { path: "/employee", label: "Nhân Sự", icon: <PersonStanding /> },
  { path: "/loan", label: "Khoản vay", icon: <Contact /> },
  { path: "/payroll", label: "Bảng Lương", icon: <Scroll /> },
  { path: "/project", label: "Dự Án", icon: <Projector /> },
  { path: "/quality", label: "Chất Lượng", icon: <ShieldCheck /> },
  { path: "/buy", label: "Bán Hàng", icon: <ShoppingBag /> },
  { path: "/warehouse", label: "Kho", icon: <Package /> },
  { path: "/support", label: "Hỗ Trợ", icon: <Plug /> },
  { path: "/website", label: "Website", icon: <Orbit /> },
  { path: "/setting", label: "Cài Đặt", icon: <Wrench /> },
  { path: "/utilities", label: "Tiện Ích", icon: <SlidersHorizontal /> },
];

const dns = [
  { path: "/product", label: "Sản Xuất", icon: <PackageCheck /> },
];

const admin = [
  { path: "/customization", label: "Tùy Biến", icon: <Atom /> },
  { path: "/integration", label: "Tích Hợp", icon: <Blocks /> },
  { path: "/labour", label: "Công Cụ", icon: <BrickWall /> },
  { path: "/user", label: "Người Sử Dụng", icon: <User /> },
];

const getLabelByPath = (path) => {
  const allMenus = [...partner, ...dns, ...admin];
  const menu = allMenus.find(item => item.path === path);
  return menu ? menu.label : '';
};

const Sidebar = ({ menu, setMenu, click, setClick,path,setPath }) => {
  const [activeLink, setActiveLink] = useState("/");
  const location = useLocation();

  useEffect(() => {
    setActiveLink(location.pathname);
    setMenu(getLabelByPath(location.pathname));
  }, [location.pathname, setMenu]);

  const handleLinkClick = (path, label,pathname) => {
    setActiveLink(path);
    setMenu(label);
    setPath(pathname);
  };

  return (
    <div className='sidebar'>
      <div className='sidebar-component'>
        <div className='sidebar-content'>
          <span>BỘ PHẬN</span>
        </div>
        <div className='sidebar-content-item'>
          {partner.map(item => (
            <Link
              onClick={() => handleLinkClick(item.path, item.label,item.path)}
              to={item.path}
              className={`sidebar-item ${activeLink === item.path ? 'active' : ''}`}
              key={item.path}
            >
              <div className='icon'>{item.icon}</div>
              <div className='text'>{item.label}</div>
            </Link>
          ))}
        </div>
      </div>
      <div className='sidebar-component'>
        <div className='sidebar-content'>
          <span>TÊN MIỀN</span>
        </div>
        <div className='sidebar-content-item'>
          {dns.map(item => (
            <Link
              onClick={() => handleLinkClick(item.path, item.label)}
              to={item.path}
              className={`sidebar-item ${activeLink === item.path ? 'active' : ''}`}
              key={item.path}
            >
              <div className='icon'>{item.icon}</div>
              <div className='text'>{item.label}</div>
            </Link>
          ))}
        </div>
      </div>
      <div className='sidebar-component'>
        <div className='sidebar-content'>
          <span>QUẢN TRỊ</span>
        </div>
        <div className='sidebar-content-item'>
          {admin.map(item => (
            <Link
              onClick={() => handleLinkClick(item.path, item.label)}
              to={item.path}
              className={`sidebar-item ${activeLink === item.path ? 'active' : ''}`}
              key={item.path}
            >
              <div className='icon'>{item.icon}</div>
              <div className='text'>{item.label}</div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
