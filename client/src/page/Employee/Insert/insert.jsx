import React, { useState } from 'react'
import "./insert.css";
import {ChevronDown,Asterisk} from "lucide-react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const insert = ({onSubmit,onClick,emp_type,level,emply_data}) => {

const [click1,setClick1]=useState(false);
const eventclick1=()=>{
  setClick1(!click1);
}
const [click2,setClick2]=useState(false);
const eventclick2=()=>{
  setClick2(!click2);
}
const [click3,setClick3]=useState(false);
const eventclick3=()=>{
  setClick3(!click3);
}
const [click4,setClick4]=useState(false);
const eventclick4=()=>{
  setClick4(!click4);
}
const [click5,setClick5]=useState(false);
const eventclick5=()=>{
  setClick5(!click5);
}
const [click6,setClick6]=useState(false);
const eventclick6=()=>{
  setClick6(!click6);
}
const [click8,setClick8]=useState(false);
const eventclick8=()=>{
  setClick8(!click8);
}
const [click7,setClick7]=useState(false);
const eventclick7=()=>{
  setClick7(!click7);
}
const [click9,setClick9]=useState(false);
const eventclick9=()=>{
  setClick9(!click9);
}
const [click10,setClick10]=useState(false);
const eventclick10=()=>{
  setClick10(!click10);
}
const [click11,setClick11]=useState(false);
const eventclick11=()=>{
  setClick11(!click11);
}
const [click12,setClick12]=useState(false);
const eventclick12=()=>{
  setClick12(!click12);
}
const [click13,setClick13]=useState(false);
const eventclick13=()=>{
  setClick13(!click13);
}
const [click14,setClick14]=useState(false);
const eventclick14=()=>{
  setClick14(!click14);
}
const [click15,setClick15]=useState(false);
const eventclick15=()=>{
  setClick15(!click15);
}
const [click16,setClick16]=useState(false);
const eventclick16=()=>{
  setClick16(!click16);
}
const [data, setData] = useState([]);

  const handleAddRow = () => {
    const newData = [...data, {
      stt: data.length + 1,
      truong: '',
      bangCap: '',
      capHoc: '',
      namTotNghiep: '',
    }];
    setData(newData);
  };
  const [selectAll, setSelectAll] = useState(false);
  const [selectedItems, setSelectedItems] = useState(data.map(() => false));

  const handleSelectAllChange = (event) => {
      const checked = event.target.checked;
      setSelectAll(checked);
      setSelectedItems(selectedItems.map(() => checked));
  };

  const handleItemChange = (index) => (event) => {
      const checked = event.target.checked;
      const updatedSelectedItems = [...selectedItems];
      updatedSelectedItems[index] = checked;
      setSelectedItems(updatedSelectedItems);
      const allChecked = updatedSelectedItems.every((item) => item);
      setSelectAll(allChecked);
  };
  const handleDeleteSelected = () => {
    const newData = data.filter((_, index) => !selectedItems[index]);
        const updatedData = newData.map((item, index) => ({ ...item, stt: index + 1 }));
        setData(updatedData);
        setSelectedItems(updatedData.map(() => false));
        setSelectAll(false);
};
const [employeeData, setEmployeeData] = useState({
  Ten: '',
  Dem: '',
  Ho: '',
  GioiTinh: '',
  NgaySinh: '',
  CapBac:"",
  ChiNhanh:"",
  Sdt:"",
  DiaChi:"",
  LoaiNhanVien: '',
  NgayNhanViec: '',
  CCCD: '',
  NgayKetThuc: '',
});

const handleChange = (e) => {
  const { name, value } = e.target;
  setEmployeeData(prevData => ({
      ...prevData,
      [name]: value
  }));
};
// const handleSave = () => {
//   try {
//     const newEmployee = {
//       ...employeeData,
//       ID: Math.floor(Math.random() * 10000)
//   };
//   NhanVien.push(newEmployee);
//   toast.success('Nhân viên mới đã được tạo thành công!', {
//   position: "top-right",
//   });
//   } catch (error) {
//     toast.error(error.message(), {
//       position: "top-right",
//       });
//   }
// };
  return (
    <div className='insert_employee'>
        <div className="save">
          <button className="btn-save" onClick={onSubmit}>
            Lưu
          </button>
          <div className="exit">
            <div onClick={onClick}>X</div>
          </div>
        </div>
        <div className="insert-container">
          <div className="personal-infor">
              <div className="title">
                Thông Tin Cá Nhân<ChevronDown className='icon' onClick={eventclick1}/>
              </div>
              {click1 &&(
                <div className="input-content" >
                  <form onSubmit={onSubmit}>
                  <div class="input-group">
                      <div className='input-title'>Họ<Asterisk className='red'/></div>
                      <input className='input-option' type="text" onChange={handleChange} name="Ho" required />
                  </div>
                  <div class="input-group">
                      <div className='input-title'>Tên Đệm<Asterisk className='red'/></div>
                      <input className='input-option' type="text"onChange={handleChange} name="TenDem" required />
                  </div>
                  <div class="input-group">
                      <div className='input-title'>Tên<Asterisk className='red'/></div>
                      <input className='input-option' type="text"onChange={handleChange} name="Ten" required />
                  </div>
                  <div class="input-group">
                      <div className='input-title'>Giới Tính <Asterisk className='red'/></div>
                      <input className='input-option' type="text"onChange={handleChange} name="GioiTinh" required />
                  </div>
                  <div class="input-group">
                      <div className='input-title'>Ngày Sinh<Asterisk className='red'/></div>
                      <input className='input-option' type="date" onChange={handleChange} name="NgaySinh" required />
                  </div>
                  <div class="input-group">
                      <div className='input-title'>Cấp Bậc<Asterisk className='red'/></div>
                      <select name="ID_CapBac" value={emply_data.ID_CapBac} onChange={handleChange} required>
                        <option value="">Chọn Cấp Bậc</option>
                        {level.map(item => (
                        <option key={item.id} value={item.id}>{item.CapBac}</option>
                        ))}
                      </select>
                  </div>
                  <div class="input-group">
                      <div className='input-title'>Sdt<Asterisk className='red'/></div>
                      <input className='input-option' type="text"onChange={handleChange} name="Sdt" required  />
                  </div>
                  <div class="input-group">
                      <div className='input-title'>Địa Chỉ<Asterisk className='red'/></div>
                      <input className='input-option' type="text"onChange={handleChange} name="DiaChi" required />
                  </div>
                  <div class="input-group">
                      <div className='input-title'>Loại Nhân Viên<Asterisk className='red'/></div>
                      <select name="ID_LoaiNhanVien" value={emply_data.ID_LoaiNhanVien} onChange={handleChange} required>
                        <option value="">Chọn Loại Nhân Viên</option>
                        {emp_type.map(item => (
                        <option key={item.id} value={item.id}>{item.LoaiNhanVien}</option>
                        ))}
                      </select>
                  </div>
                  <div class="input-group">
                      <div className='input-title'>Ngày Nhận Việc<Asterisk className='red'/></div>
                      <input className='input-option' type="text"onChange={handleChange} name="NgayNhanViec" required />
                  </div>
                  <div class="input-group">
                      <div className='input-title'>CCCD<Asterisk className='red'/></div>
                      <input className='input-option' type="text"onChange={handleChange} name="CCCD" required />
                  </div>
                  <div class="input-group">
                      <div className='input-title'>Ngày Kết Thúc</div>
                      <input className='input-option' type="text"onChange={handleChange} name="NgayKetThuc" required />
                  </div>
                  </form>
                </div>
              )}
          </div>
          <div className='personal-infor'>
              <div className="title">
                Liên Lạc Khẩn Cấp<ChevronDown className='icon'onClick={eventclick2}/>
              </div>
              {click2 &&(
                <div className="input-content2" >
                  <div class="input-group">
                      <div className='input-title'>Tên Người Liên Lạc Khẩn Cấp</div>
                      <input className='input-option' type="text"  />
                  </div>
                  <div class="input-group">
                      <div className='input-title'>Số Điện Thoại Liên Lạc Khẩn Cấp</div>
                      <input className='input-option' type="text" />
                  </div>
                  <div class="input-group">
                      <div className='input-title'>CCCD Của Người Liên Lạc Khẩn Cấp</div>
                      <input className='input-option' type="text"  />
                  </div>
                  <div class="input-group">
                      <div className='input-title'>Tỉnh Hoặc Thành Phố </div>
                      <input className='input-option' type="text" />
                  </div>
                  <div class="input-group">
                      <div className='input-title'>Mối Quan Hệ Với Người Liên Lạc Khẩn Cấp</div>
                      <input className='input-option' type="text"  />
                  </div>
                  <div class="input-group">
                      <div className='input-title'>Chi Tiết Địa Chỉ Người Liên Lạc Khẩn Cấp</div>
                      <input className='input-option' type="text" />
                  </div>
                </div>
              )}
          </div>
          <div className="personal-infor">
              <div className="title">
                Người Dùng ERPNext<ChevronDown className='icon'onClick={eventclick3}/>
              </div>
              {click3 &&(
                <div className="input-content3" >
                  <div class="input-group">
                      <div className='input-title'>ID Người Dùng</div>
                      <select className='input-option'>
                        <option>HR-EMP-</option>
                      </select>
                  </div>
                  
                </div>
              )}
          </div>
          <div className="personal-infor">
              <div className="title">
                Bộ Phận và Cấp Bậc<ChevronDown className='icon'onClick={eventclick4}/>
              </div>
              {click4 &&(
                <div className="input-content4" >
                  
                  <div class="input-group">
                      <div className='input-title'>Phòng Ban</div>
                      <input className='input-option' type="text"  />
                  </div>
                  <div class="input-group">
                      <div className='input-title'>Cấp Bậc</div>
                      <input className='input-option' type="text" />
                  </div>
                  <div class="input-group">
                      <div className='input-title'>Chức Danh</div>
                      <input className='input-option' type="text"  />
                  </div>
                  <div class="input-group">
                      <div className='input-title'>Chi Nhánh</div>
                      <input className='input-option' type="text" />
                  </div>
                </div>
              )}
          </div>
          <div className='personal-infor'>
              <div className="title">
                Những Người Duyệt<ChevronDown className='icon'onClick={eventclick5}/>
              </div>
              {click5 &&(
                <div className="input-content5" >
                  <div class="input-group">
                      <div className='input-title'>Người Duyệt Chi Phí</div>
                      <input className='input-option' type="text" />
                  </div>
                  <div class="input-group">
                      <div className='input-title'>Người Duyệt Đăng Kí Ca Làm</div>
                      <input className='input-option' type="text"  />
                  </div>
                  <div class="input-group">
                      <div className='input-title'>Người Duyệt Nghỉ Phép</div>
                      <input className='input-option' type="text" />
                  </div>
                </div>
              )}
          </div>
          <div className="personal-infor">
              <div className="title">
                Thông Tin Chấm Công và Nghỉ Phép<ChevronDown className='icon'onClick={eventclick6}/>
              </div>
              {click6 &&(
                <div className="input-content6" >
                  <div class="input-group">
                      <div className='input-title'>ID Thiết Bị Chấm Công</div>
                      <input className='input-option' type="text" />
                  </div>
                  <div class="input-group">
                      <div className='input-title'>Danh Sách Ngày Lễ</div>
                      <input className='input-option' type="text"  />
                  </div>
                  <div class="input-group">
                      <div className='input-title'>Ca Làm Mặc Định</div>
                      <input className='input-option' type="text" />
                  </div>
                </div>
              )}
          </div>
          <div className="personal-infor">
              <div className="title">
                Chi Tiết Thanh Toán<ChevronDown className='icon'onClick={eventclick7}/>
              </div>
              {click7 &&(
                <div className="input-content7" >
                  <div class="input-group">
                      <div className='input-title'>Mức Lương Đóng Bảo Hiểm</div>
                      <input className='input-option' type="text"  />
                  </div>
                  <div class="input-group">
                      <div className='input-title'>Ngân Hàng</div>
                      <input className='input-option' type="text" />
                  </div>
                  <div class="input-group">
                      <div className='input-title'>Hình Thức Trả Lương</div>
                      <input className='input-option' type="text"  />
                  </div>
                  <div class="input-group">
                      <div className='input-title'>Tài Khoản Ngân Hàng</div>
                      <input className='input-option' type="text" />
                  </div>
                  <div class="input-group">
                      <div className='input-title'>Trung Tâm Chi Trả Lương</div>
                      <input className='input-option' type="text"  />
                  </div>
                  <div class="input-group">
                      <div className='input-title'>Ngày Trả Lương</div>
                      <input className='input-option' type="text" />
                  </div>
                </div>
              )}
          </div>
          <div className="personal-infor">
              <div className="title">
                Thông Tin Tiền Lương<ChevronDown className='icon'onClick={eventclick8}/>
              </div>
              {click8 &&(
                <div className="input-content8" >
                  <div class="input-group">
                      <div className='input-title'>Lương Vị Trí</div>
                      <input className='input-option' type="text" />
                  </div>
                  <div class="input-group">
                      <div className='input-title'>Phần Trăm Lương Thử Việc</div>
                      <input className='input-option' type="text"  />
                  </div>
                  <div class="input-group">
                      <div className='input-title'>Tổng Trả</div>
                      <input className='input-option' type="text" />
                  </div>
                  <div class="input-group">
                      <div className='input-title'>Phụ Cấp Ăn Trưa</div>
                      <input className='input-option' type="text"  />
                  </div>
                  <div class="input-group">
                      <div className='input-title'>Phụ Cấp Xăng Xe,Di Chuyển</div>
                      <input className='input-option' type="text" />
                  </div>
                  <div class="input-group">
                      <div className='input-title'>Phụ Cấp Chuyên Cần</div>
                      <input className='input-option' type="text"  />
                  </div>
                  <div class="input-group">
                      <div className='input-title'>Phụ Cấp Điện Thoại</div>
                      <input className='input-option' type="text" />
                  </div>
                </div>
              )}
          </div>
          <div className="personal-infor">
              <div className="title">
                Bảo Hiểm Y Tế<ChevronDown className='icon'onClick={eventclick9}/>
              </div>
              {click9 &&(
                <div className="input-content9" >
                  <div class="input-group">
                      <div className='input-title'>Nhà Cung Cấp Bảo Hiểm Y Tế</div>
                      <input className='input-option' type="text"  />
                  </div>
                  <div class="input-group">
                      <div className='input-title'>Health Insurance File</div>
                      <input className='input-option' type="file" />
                  </div>
                  <div class="input-group">
                      <div className='input-title'>Nơi Đăng Kí Khám Chữa Bệnh</div>
                      <input className='input-option' type="text"  />
                  </div>
                  <div class="input-group">
                      <div className='input-title'>Tỉ Lệ Phí Bảo Hiểm</div>
                      <input className='input-option' type="text" />
                  </div>
                </div>
              )}
          </div>
          <div className="personal-infor">
              <div className="title">
                Thông Tin Liên Lạc<ChevronDown className='icon'onClick={eventclick10}/>
              </div>
              {click10 &&(
                <div className="input-content10" >
                  
                  <div class="input-group">
                      <div className='input-title'>Số Điện Thoại </div>
                      <input className='input-option' type="text"  />
                  </div>
                  <div class="input-group">
                      <div className='input-title'>Email Hay Dùng Để Liên Lạc</div>
                      <input className='input-option' type="text" />
                  </div>
                  <div class="input-group">
                      <div className='input-title'>Email Cá Nhân</div>
                      <input className='input-option' type="text"  />
                  </div>
                  <div class="input-group">
                      <div className='input-title'>Email Công Ty</div>
                      <input className='input-option' type="text" />
                  </div>
                  <div class="input-group">
                      <div className='input-title'>Tỉnh Hoặc Thành Phố Thường Trú</div>
                      <input className='input-option' type="text"  />
                  </div>
                  <div class="input-group">
                      <div className='input-title'>Tỉnh Hoặc Thành Phố Hiện Tại</div>
                      <input className='input-option' type="text" />
                  </div>
                  <div class="input-group">
                      <div className='input-title'>Địa Chỉ Thường Trú</div>
                      <textarea className='area'> gdfghdrefghrehg</textarea>
                  </div>
                  <div class="input-group">
                      <div className='input-title'>Địa Chỉ Hiện Tại</div>
                      <textarea className='area'> gdfghdrefghrehg</textarea>
                  </div>
                </div>
              )}
          </div>
          <div className="personal-infor">
              <div className="title">
                Thông Tin Liên Quan<ChevronDown className='icon'onClick={eventclick11}/>
              </div>
              {click11 &&(
                <div className="input-content11" >
                  <div class="input-group">
                      <div className='input-title'>Số Hộ Chiếu</div>
                      <input className='input-option' type="text"  />
                  </div>
                  
                  <div class="input-group">
                      <div className='input-title'>Ngày Cấp</div>
                      <input className='input-option' type="text"  />
                  </div>
                  <div class="input-group">
                      <div className='input-title'>Có Giá Trị Tới</div>
                      <input className='input-option' type="text" />
                  </div>
                  <div class="input-group">
                      <div className='input-title'>Nơi Cấp</div>
                      <input className='input-option' type="text"  />
                  </div>
                  <div class="input-group">
                      <div className='input-title'>Trình Trạng Hôn Nhân</div>
                      <input className='input-option' type="text"  />
                  </div>
                  <div class="input-group">
                      <div className='input-title'>Nhóm Máu</div>
                      <input className='input-option' type="text" />
                  </div>
                  <div class="input-group">
                      <div className='input-title'>Thông Tin Gia Đình</div>
                      <textarea className='area'>rgherherh </textarea>
                  </div>
                  <div class="input-group">
                      <div className='input-title'>Thông Tin Sức Khỏe</div>
                      <textarea className='area'> gdfghdrefghrehg</textarea>
                  </div>
                </div>
              )}
          </div>
          <div className="personal-infor">
              <div className="title">
                Trình Độ Học Vấn<ChevronDown className='icon'onClick={eventclick12}/>
              </div>
              {click12 &&(
                <div className="input-content15" >
                <table>
                      <tr>
                          <th><input type="checkbox"  checked={selectAll} 
                      onChange={handleSelectAllChange}/>STT</th>
                          <th>Trường/Đại Học</th>
                          <th>Bằng Cấp Chứng Chỉ</th>
                          <th>Cấp Học</th>
                          <th>Năm Tốt Nghiệp</th>
                      </tr>
                      {data.map((item, index) => (
                        <tr key={index}>
                            <td><input  type="checkbox"  checked={selectedItems[index]} 
                          onChange={handleItemChange(index)}/>{item.stt}</td>
                            <td><textarea type="text" value={item.truong} onChange={(e) => {
                                const newData = [...data];
                                newData[index].truong = e.target.value;
                                setData(newData);
                                }} /></td>
                            <td><textarea type="text" value={item.bangCap} onChange={(e) => {
                                const newData = [...data];
                                newData[index].bangCap = e.target.value;
                                setData(newData);
                                }} /></td>
                            <td><textarea type="text" value={item.capHoc} onChange={(e) => {
                                const newData = [...data];
                                newData[index].capHoc = e.target.value;
                                setData(newData);
                                }} /></td>
                            <td><textarea type="text" value={item.namTotNghiep} onChange={(e) => {
                                const newData = [...data];
                                newData[index].namTotNghiep = e.target.value;
                                setData(newData);
                                }} /></td>
                        </tr>
                      ))}
                  </table>
                  <button className='btn-them' onClick={handleAddRow}>Thêm</button>
                  <button className='btn-them' onClick={handleDeleteSelected}>Xóa</button>
              </div>
              )}
          </div>
          <div className="personal-infor">
              <div className="title">
                Lịch Sử Làm Việc<ChevronDown className='icon'onClick={eventclick13}/>
              </div>
              {click13 &&(
                <div className="input-content15" >
                <table>
                      <tr>
                          <th><input type="checkbox"  checked={selectAll} 
                      onChange={handleSelectAllChange}/>STT</th>
                          <th>Trường/Đại Học</th>
                          <th>Bằng Cấp Chứng Chỉ</th>
                          <th>Cấp Học</th>
                          <th>Năm Tốt Nghiệp</th>
                      </tr>
                      {data.map((item, index) => (
                        <tr key={index}>
                            <td><input  type="checkbox"  checked={selectedItems[index]} 
                          onChange={handleItemChange(index)}/>{item.stt}</td>
                            <td><textarea type="text" value={item.truong} onChange={(e) => {
                                const newData = [...data];
                                newData[index].truong = e.target.value;
                                setData(newData);
                                }} /></td>
                            <td><textarea type="text" value={item.bangCap} onChange={(e) => {
                                const newData = [...data];
                                newData[index].bangCap = e.target.value;
                                setData(newData);
                                }} /></td>
                            <td><textarea type="text" value={item.capHoc} onChange={(e) => {
                                const newData = [...data];
                                newData[index].capHoc = e.target.value;
                                setData(newData);
                                }} /></td>
                            <td><textarea type="text" value={item.namTotNghiep} onChange={(e) => {
                                const newData = [...data];
                                newData[index].namTotNghiep = e.target.value;
                                setData(newData);
                                }} /></td>
                        </tr>
                      ))}
                  </table>
                  <button className='btn-them' onClick={handleAddRow}>Thêm</button>
                  <button className='btn-them' onClick={handleDeleteSelected}>Xóa</button>
              </div>
              )}
          </div>
          <div className="personal-infor">
              <div className="title">
                Thông Tin Hợp Đồng<ChevronDown className='icon'onClick={eventclick14}/>
              </div>
              {click14 &&(
                <div className="input-content15" >
                <table>
                      <tr>
                          <th><input type="checkbox"  checked={selectAll} 
                      onChange={handleSelectAllChange}/>STT</th>
                          <th>Trường/Đại Học</th>
                          <th>Bằng Cấp Chứng Chỉ</th>
                          <th>Cấp Học</th>
                          <th>Năm Tốt Nghiệp</th>
                      </tr>
                      {data.map((item, index) => (
                        <tr key={index}>
                            <td><input  type="checkbox"  checked={selectedItems[index]} 
                          onChange={handleItemChange(index)}/>{item.stt}</td>
                            <td><textarea type="text" value={item.truong} onChange={(e) => {
                                const newData = [...data];
                                newData[index].truong = e.target.value;
                                setData(newData);
                                }} /></td>
                            <td><textarea type="text" value={item.bangCap} onChange={(e) => {
                                const newData = [...data];
                                newData[index].bangCap = e.target.value;
                                setData(newData);
                                }} /></td>
                            <td><textarea type="text" value={item.capHoc} onChange={(e) => {
                                const newData = [...data];
                                newData[index].capHoc = e.target.value;
                                setData(newData);
                                }} /></td>
                            <td><textarea type="text" value={item.namTotNghiep} onChange={(e) => {
                                const newData = [...data];
                                newData[index].namTotNghiep = e.target.value;
                                setData(newData);
                                }} /></td>
                        </tr>
                      ))}
                  </table>
                  <button className='btn-them' onClick={handleAddRow}>Thêm</button>
                  <button className='btn-them' onClick={handleDeleteSelected}>Xóa</button>
              </div>
              )}
          </div>
          <div className="personal-infor">
              <div className="title">
                Phụ Lục Hợp Đồng<ChevronDown className='icon'onClick={eventclick15}/>
              </div>
              {click15 &&(
                <div className="input-content15" >
                  <table>
                        <tr>
                            <th><input type="checkbox"  checked={selectAll} 
                        onChange={handleSelectAllChange}/>STT</th>
                            <th>Trường/Đại Học</th>
                            <th>Bằng Cấp Chứng Chỉ</th>
                            <th>Cấp Học</th>
                            <th>Năm Tốt Nghiệp</th>
                        </tr>
                        {data.map((item, index) => (
                          <tr key={index}>
                              <td><input  type="checkbox"  checked={selectedItems[index]} 
                            onChange={handleItemChange(index)}/>{item.stt}</td>
                              <td><textarea type="text" value={item.truong} onChange={(e) => {
                                  const newData = [...data];
                                  newData[index].truong = e.target.value;
                                  setData(newData);
                                  }} /></td>
                              <td><textarea type="text" value={item.bangCap} onChange={(e) => {
                                  const newData = [...data];
                                  newData[index].bangCap = e.target.value;
                                  setData(newData);
                                  }} /></td>
                              <td><textarea type="text" value={item.capHoc} onChange={(e) => {
                                  const newData = [...data];
                                  newData[index].capHoc = e.target.value;
                                  setData(newData);
                                  }} /></td>
                              <td><textarea type="text" value={item.namTotNghiep} onChange={(e) => {
                                  const newData = [...data];
                                  newData[index].namTotNghiep = e.target.value;
                                  setData(newData);
                                  }} /></td>
                          </tr>
                        ))}
                    </table>
                    <button className='btn-them' onClick={handleAddRow}>Thêm</button>
                    <button className='btn-them' onClick={handleDeleteSelected}>Xóa</button>
                </div>
              )}
          </div>
          <div className="personal-infor">
              <div className="title">
                Nghỉ Việc<ChevronDown className='icon'onClick={eventclick16}/>
              </div>
              {click16 &&(
                <div className="input-content16" >
                  <div class="input-group">
                      <div className='input-title'>Ngày Nộp Đơn Nghỉ Việc</div>
                      <input className='input-option' type="text" />
                  </div>
                  <div class="input-group">
                      <div className='input-title'>Phỏng Vấn Nghỉ Việc Vào Ngày</div>
                      <input className='input-option' type="text"  />
                  </div>
                  <div class="input-group">
                      <div className='input-title'>Ngày Nghỉ Việc</div>
                      <input className='input-option' type="text" />
                  </div>
                  <div class="input-group">
                      <div className='input-title'>Nơi Làm Việc Mới</div>
                      <input className='input-option' type="text"  />
                  </div>
                  <div class="input-group">
                      <div className='input-title'>Lý Do Nghỉ Việc</div>
                      <textarea className='area'> gdfghdrefghrehg</textarea>
                  </div>
                  <div class="input-group">
                      <div className='input-title'>Nhận Xét</div>
                      <textarea className='area'> gdfghdrefghrehg</textarea>
                  </div>
                  <div class="input-group">
                      <div className='input-title'>Nhận Lương Từ Những Ngày Nghỉ Có Lương</div>
                      <input className='input-option' type="text" />
                  </div>
                </div>
              )}
          </div>
        </div>
    </div>
  )
}

export default insert
