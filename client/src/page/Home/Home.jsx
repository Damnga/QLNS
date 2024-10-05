import React from 'react'
import "./Home.css";
import { File,Dot } from 'lucide-react';
const shortcut=[
  {name:"Sản Phẩm"},
  {name:"Danh Sách Khách Hàng"},
  {name:"Nhà Cung Cấp"},
  {name:"Hóa Đơn Bán Hàng"},
  {name:"Bảng Thành Tích"}
];
const couter =[
  {name:"Biểu Đồ Tài Khoản"},
  {name:"Công Ty"},
  {name:"Danh Sách Khách Hàng"},
  {name:"Nhà Cung Cấp"},
];
const warehouse=[
  {name:"Sản Phẩm"},
  {name:"Kho Hàng"},
  {name:"Nhãn"},
  {name:"Unit of Measure(UOM)"},
  {name:"Kiểm Kê,Chốt Kho"},
];
const core =[
  {name:"Nhân Viên"},
  {name:"Công Cụ Chấm Công Nhân Viên"},
  {name:"Cơ Cấu Tiền Lương"},
];
const crm =[
  {name:"Khách Hàng Tiềm Năng"},
  {name:"Nhóm Khách Hàng"},
  {name:"Quốc Gia"},
];
const setting =[
  {name:"Nhập Dữ Liệu"},
  {name:"Mở Công Cụ Hóa Đơn"},
  {name:"Biểu Đồ Của Nhà Nhập Tài Khoản"},
  {name:"Tiêu Đề"},
  {name:"Tài Khoản Email"},
];
const Home = () => {
  return (
    <div className='home'>
      <div className="home-up">
          <div className="home-up-content">
              Lối Tắt
          </div>
          <div className="home-up-component">
              {shortcut.map(item=>(
                <div className="home-up-item">{item.name}</div>
              ))}
          </div>
      </div>
      <div className="home-down">
          <div className="home-up-content">
              Báo Cáo & Tính Năng Chính 
          </div>
          <div className="home-up-component">
            <div className="home-dowm-container">
              <div className="home-down-content">
                <div className='home-down-content-icon'><File/></div>
                <div className='home-down-content-text'>Kế Toán</div>
              </div>
              <div className="home-down-container-item">
                {couter.map((item, index) => (
                  <div className='home-down-container-item-flex' key={index}>
                    <div className="home-down-container-dot">
                      <Dot/>
                    </div>
                    <div className="home-down-container-content">
                      {item.name}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="home-dowm-container">
              <div className="home-down-content">
                <div className='home-down-content-icon'><File/></div>
                <div className='home-down-content-text'>Kho</div>
              </div>
              <div className="home-down-container-item">
                {warehouse.map((item, index) => (
                  <div className='home-down-container-item-flex' key={index}>
                    <div className="home-down-container-dot">
                      <Dot/>
                    </div>
                    <div className="home-down-container-content">
                      {item.name}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="home-dowm-container">
              <div className="home-down-content">
                <div className='home-down-content-icon'><File/></div>
                <div className='home-down-content-text'>Nhân Sự</div>
              </div>
              <div className="home-down-container-item">
                {core.map((item, index) => (
                  <div className='home-down-container-item-flex' key={index}>
                    <div className="home-down-container-dot">
                      <Dot/>
                    </div>
                    <div className="home-down-container-content">
                      {item.name}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="home-dowm-container">
              <div className="home-down-content">
                <div className='home-down-content-icon'><File/></div>
                <div className='home-down-content-text'>CRM</div>
              </div>
              <div className="home-down-container-item">
                {crm.map((item, index) => (
                  <div className='home-down-container-item-flex' key={index}>
                    <div className="home-down-container-dot">
                      <Dot/>
                    </div>
                    <div className="home-down-container-content">
                      {item.name}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="home-dowm-container">
              <div className="home-down-content">
                <div className='home-down-content-icon'><File/></div>
                <div className='home-down-content-text'>Nhập và cài đặt dữ liệu</div>
              </div>
              <div className="home-down-container-item">
                {setting.map((item, index) => (
                  <div className='home-down-container-item-flex' key={index}>
                    <div className="home-down-container-dot">
                      <Dot/>
                    </div>
                    <div className="home-down-container-content">
                      {item.name}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
      </div>
    </div>
  )
}

export default Home
