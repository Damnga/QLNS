import React from 'react';
import "./Personal.css";
import Shortcut from '../../component/Shortcut/Shortcut';
import Report from '../../component/Report/Report';
import SalaryChart from '../../component/SalaryChart/SalaryChart';
import { useEffect } from 'react';
const Personal = ({click,setClick,clickLink,setClickLink,pathshortcut,setPathshortcut}) => {
  const data=[
    {path:"/app/employee",name:"Nhân Viên"},
    {name:"Xin Nghỉ Phép"},
    {name:"Chấm Công"},
    {name:"Ứng Viên Xin Việc"},
    {name:"Bảng Chấm Công Hàng Tháng"},
    {name:"Bảng Thông Tin Tổng Hợp"},
  ];
  const employee = [
    { id: 1, name: "Nhân Viên", path: "/app/employee" },
    { id: 2, name: "Loại Nhân Viên", path: "/app/employee_type" },
    { id: 3, name: "Chi Nhánh", path: "/app/branch" },
    { id: 4, name: "Phòng Ban", path: "/app/departments" },
    { id: 5, name: "Chức Danh", path: "/app/employee_title" },
    { id: 6, name: "Cấp Bậc Nhân Viên", path: "/app/employee_level" },
    { id: 7, name: "Nhóm Nhân Viên", path: "/app/employee_group" },
    { id: 8, name: "Bảo Hiểm Sức Khỏe Nhân Viên", path: "/app/employee_HealthInsurance" },
  ];
  const employee_life_cycle=[
    {id: 1,name:"Đào Tạo Nhân Viên Mới", path: "/app/trainning_new_employee"},
    {id: 2,name:"Bản Đồ Kĩ Năng Nhân Viên", path: "/app/employee_skill_map"},
    {id: 3,name:"Đề Bạt Nhân Viên", path: "/app/employee_promotion"},
    {id: 4,name:"Điều Chuyển Nhân Viên", path: "/app/employee_transfer"},
    {id: 5,name:"Loại Khiếu Nại", path: "/app/type_of_talent"},
    {id: 6,name:"Khiếu Nại", path: "/app/talents"},
    {id: 7,name:"Tách Nhân Viên", path: "/app/employee_separation"},
    {id: 8,name:"Mẫu Đào Tạo Nhân Viên Mới", path: "/app/trainning_new_employee_prototype"},
    {id: 9,name:"Mẫu Tách Nhân Viên", path: "/app/employee_separation_prototype"},
  ];
  const shift_management=[
    {name:"Loại Ca Làm"},
    {name:"Đăng Ký Ca Làm"},
    {name:"Sắp Xếp Ca Làm"},
  ];
  const on_leave =[
    {name:"Danh Sách Ngày Lễ"},
    {name:"Loại Nghỉ Phép"},
    {name:"Thời Gian Nghỉ Phép"},
    {name:"Chính Sách Nghỉ Phép"},
    {name:"Thiết Lập Chính Sách Nghỉ Phép"},
    {name:"Xin Nghỉ Phép"},
    {name:"Phân Bố Số Ngày Nghỉ Phép"},
    {name:"Nghỉ Phép Hưởng Lương"},
    {name:"Danh Sách Hạn Chế Nghỉ Phép"},
    {name:"Yêu Cầu Nghỉ Bù"},
  ];
  const timekeeping=[
    {name:"Công Cụ Chấm Công Nhân Viên"},
    {name:"Chấm Công"},
    {name:"Yêu Cầu Chấm Công"},
    {name:"Tải Lên Chấm Công"},
    {name:"Check in Nhân Viên"},
  ];
  const Payment_Request=[
    {name:"Yêu Cầu Thanh Toán"},
    {name:"Tạm Ứng Nhân Viên"},
    {name:"Yêu Cầu Đi Công Tác"},
  ];
  const setting =[
    {name:"Cài Đặt Nhân Sự"},
    {name:"Tổng Hợp Công Việc Hằng Ngày"},
    {name:"Cập Nhật Nhóm"},
  ];
  const Driver_Managemt=[
    {name:"Tài Xế"},
    {name:"Phương Tiện"},
    {name:"Nhật Ký Phương Tiện"},
    {name:"Chi Phí Phương Tiện"},
  ];
  const hr=[
    {name:"Cơ Hội Việc Làm"},
    {name:"Nhân Viên Giới Thiệu"},
    {name:"Ứng Viên Xin Việc"},
    {name:"Lời Mời Làm Việc"},
    {name:"Kế Hoạch Tuyển Dụng"},
    {name:"Giấy Bổ Nhiệm"},
    {name:"Mẫu Giấy Bôe Nhiệm"},
    {name:"Interview Type"},
    {name:"Vòng Phỏng Vấn"},
    {name:"Phỏng Vấn"},
    {name:"Đánh Giá Phỏng Vấn"},
  ];
  const loan=[
    {name:"Đơn Xin Vay"},
    {name:"Khoản Vay"},
    {name:"Loại Khoản Vay"},
  ];
  const trainning=[
    {name:"Chương Trình Đào Tạo"},
    {name:"Sự Kiện Đào Tạo"},
    {name:"Kết Quả Đào Tạo"},
    {name:"Nhận Xét Sau Đào Tạo"},
  ];
  const Work_Results=[
    {name:"Đánh Giá Nhân Viên"},
    {name:"Mẫu Đánh Giá Nhân Viên"},
    {name:"Quy Tắc Điểm Năng Lượng"},
    {name:"Nhật Ký Năng Lượng"},
  ];
  const report=[
    {name:"Bảng Chấm Công Hàng Tháng"},
    {name:"Phân Tích Tuyển Dụng"},
    {name:"Thông Số Nhân Viên"},
    {name:"Ngày Nghỉ Còn Lại"},
    {name:"Tóm Tắt Ngày Nghỉ Còn Lại"},
    {name:"Tóm Tắt Tạm Ứng Nhân Viên"},
  ];
  const another_report=[
    {name:"Thông Tin Nhân Viên"},
    {name:"Sinh Nhật Nhân Viên"},
    {name:"Nhân Viên Làm Việc Vào Ngày Lễ"},
    {name:"Phản Hồi Tóm Tắt Công Việc"},
  ];
  const document =[
    {name:"Public Administration City Province"},
    {name:"Public Administration District"},
    {name:"Public Administration Ward"},
  ];
  useEffect(() => {
  }, [clickLink]);
  return (
    <div className='personal'>
      <div className='chart'>
        <SalaryChart />
      </div>
      <Shortcut pathshortcut={pathshortcut}setPathshortcut={setPathshortcut} clickLink={clickLink} setClickLink={setClickLink} data={data}click={click} setClick={setClick}/>
      <div className="personal-title">
        Báo Cáo & Tính Năng Chính 
      </div>
      <div className="home-up-component">
        < Report title="Nhân Viên" items={employee}/>
        < Report title="Vòng Đời Nhân Viên" items={employee_life_cycle} />
        < Report title="Quản Lý Ca Làm" items={shift_management} />
        < Report title="Nghỉ Phép" items={on_leave} />
        < Report title="Chấm Công" items={timekeeping} />
        < Report title="Yêu Cầu Thanh Toán" items={Payment_Request} />
        < Report title="Cài Đặt" items={setting} />
        < Report title="Quản Lý Đọi Xe" items={Driver_Managemt} />
        < Report title="Tuyển Dụng" items={hr} />
        < Report title="Khoản Vay" items={loan} />
        < Report title="Đào Tạo" items={trainning} />
        < Report title="Hiệu Quả Công Việc" items={Work_Results} />
        < Report title="Báo Cáo Chính" items={report} />
        < Report title="Báo Cáo Khác" items={another_report} />
        < Report title="Tài Liệu Tùy Chỉnh" items={document} />
      </div>
    </div>

  )
}

export default Personal
