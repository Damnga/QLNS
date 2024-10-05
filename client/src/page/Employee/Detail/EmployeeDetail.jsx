
import React from 'react'
import "./EmployeeDetail.css";
import { useParams } from 'react-router-dom';
import { useState } from 'react';
import { AlignJustify,ChevronLeft,ChevronRight,Ellipsis,UserRound,Paperclip,Star,UserPen,Tag,ChevronDown,Asterisk} from 'lucide-react';
import CustomHeatmap from '../../../component/CustomHeatmap/CustomHeatmap';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const EMPLOYEE_API_URL = 'http://localhost:1323/NhanVien';
const EMPLOYEE_TYPE_API_URL="http://localhost:1323/LoaiNhanVien";
const LEVEL__API_URL ="http://localhost:1323/CapBac";
const RELATIVE_API_URL="http://localhost:1323/NguoiThanNhanVien";
const EmployeeDetail = () => {
const {id} =useParams();
const navigate = useNavigate();
const [employeeInfor, setEmployeeInfo] = useState({});
const [level,setLevel] =useState([]);
const [employeetype,setEmployeetype]=useState([]);
// const [employeeRelative, setEmployeeRelative] = useState([]);
const [erelativeData,setErelativeData]=useState({
    IDNhanVien: id,
    TenNguoiThan: "",
    SDTNguoiThan: "",
    QuanHe: "",
    DiaChiNguoiThan: ""});
useEffect(() => {
    fetchEmployee();
    fetchEmployeeType();
    fetchLevel();
    fetchRelative();
}, []);
const fetchRelative = async () => {
  try {
    const response = await fetch(`${RELATIVE_API_URL}?IDNhanVien=${id}`);
    const data = await response.json();
    if (data && data.length > 0) {
      setErelativeData(data[0]);
    }
  } catch (error) {
    console.error('Error fetching relatives:', error);
  }
};

const fetchEmployeeType = async () => {
    try {
      const response = await fetch(EMPLOYEE_TYPE_API_URL);
      const data = await response.json();
      setEmployeetype(data);
    } catch (error) {
      console.error('Error fetching branches:', error);
    }
};
const fetchLevel = async () => {
    try {
      const response = await fetch(LEVEL__API_URL);
      const data = await response.json();
      setLevel(data);
    } catch (error) {
      console.error('Error fetching branches:', error);
    }
};
const fetchEmployee = async () => {
    try {
      const response = await fetch(EMPLOYEE_API_URL);
      const data = await response.json();
      const employee = data.find((e) => e.id === id); 
      if (employee) {
        setEmployeeInfo(employee);
      } else {
        console.error('Employee not found');
      }
    } catch (error) {
      console.error('Error fetching employees:', error);
    }
};
const [click1,setClick1]=useState(false);
const eventclick1=()=>{
  setClick1(!click1);
};
const [click2,setClick2]=useState(false);
const eventclick2=()=>{
  setClick2(!click2);
};
const [click3,setClick3]=useState(false);
const eventclick3=()=>{
  setClick3(!click3);
};
const [click4,setClick4]=useState(false);
const eventclick4=()=>{
  setClick4(!click4);
};
const [click5,setClick5]=useState(false);
const eventclick5=()=>{
  setClick5(!click5);
};
const [click6,setClick6]=useState(false);
const eventclick6=()=>{
  setClick6(!click6);
};
const [click8,setClick8]=useState(false);
const eventclick8=()=>{
  setClick8(!click8);
};
const [click7,setClick7]=useState(false);
const eventclick7=()=>{
  setClick7(!click7);
};
const [click9,setClick9]=useState(false);
const eventclick9=()=>{
  setClick9(!click9);
};
const [click10,setClick10]=useState(false);
const eventclick10=()=>{
  setClick10(!click10);
};
const [click11,setClick11]=useState(false);
const eventclick11=()=>{
  setClick11(!click11);
};
const [click12,setClick12]=useState(false);
const eventclick12=()=>{
  setClick12(!click12);
};
const [click13,setClick13]=useState(false);
const eventclick13=()=>{
  setClick13(!click13);
};
const [click14,setClick14]=useState(false);
const eventclick14=()=>{
  setClick14(!click14);
};
const [click15,setClick15]=useState(false);
const eventclick15=()=>{
  setClick15(!click15);
};
const [click16,setClick16]=useState(false);
const eventclick16=()=>{
  setClick16(!click16);
};
const [click17,setClick17]=useState(false);
const eventclick17=()=>{
  setClick17(!click17);
};
const [click18,setClick18]=useState(false);
const eventclick18=()=>{
  setClick18(!click18);
};
const [click19,setClick19]=useState(false);
const eventclick19=()=>{
  setClick19(!click19);
};
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
const handleChange = (e) => {
    const { name, value } = e.target;
    setEmployeeInfo(prevData => ({
        ...prevData,
        [name]: value
    }));
};
const handleSave = async () => {
    try {
        const response = await fetch(`${EMPLOYEE_API_URL}/${id}`, {
            method: 'PUT', // Hoặc 'PATCH' nếu bạn chỉ muốn cập nhật một số trường
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(employeeInfor), // Chuyển đổi dữ liệu thành JSON
        });

        if (!response.ok) {
            throw new Error('Failed to update employee information');
        }

        toast.success('Thông tin nhân viên đã được cập nhật');
        navigate('/app/employee'); // Chuyển hướng về danh sách nhân viên
    } catch (error) {
        toast.error(error.message);
        console.log("Error updating employee:", error);
    }
};
const [dropdown,setDropdown]= useState(false);
const drop =()=>{
  setDropdown(!dropdown);
};
const handleDelete = async () => {
  try {
      const response = await fetch(`${EMPLOYEE_API_URL}/${id}`, {
          method: 'DELETE',
      });

      if (!response.ok) {
          throw new Error('Failed to delete employee');
      }

      toast.success('Nhân viên đã được xóa thành công');
      navigate('/app/employee'); // Chuyển hướng về danh sách nhân viên
  } catch (error) {
      toast.error(error.message);
      console.log("Error deleting employee:", error);
  }
};
const handleChangeER = (e) => {
  const { name, value } = e.target;
  setErelativeData(prevData => ({
      ...prevData,
      [name]: value
  }));
};
const handleSaveER = async (e) => {
  e.preventDefault();
  if (erelativeData.IDNhanVien === id) {
    await handleEditER();
  } else {
    await handleAddER();
  }
};

const handleAddER = async () => {
  try {
    const newNhomnhanvien = { ...erelativeData };
    await fetch(`${RELATIVE_API_URL}/${erelativeData.IDNhanVien}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newNhomnhanvien),
    });
    toast.success('Nhóm Nhân viên mới đã được tạo thành công!', {
      position: "top-right",
    });
    fetchRelative(); 
  } catch (error) {
    toast.error(error.message, {
      position: "top-right",
    });
  }
};

const handleEditER = async () => {
  try {
    const response = await fetch(`${RELATIVE_API_URL}/${erelativeData.IDNhanVien}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(erelativeData),
    });

    if (!response.ok) {
      throw new Error('Failed to update employee relative information');
    }

    toast.success('Thông tin người thân nhân viên đã được cập nhật', {
      position: "top-right",
    });

    fetchRelative();
  } catch (error) {
    toast.error(error.message, {
      position: "top-right",
    });
  }
};
  return (
    <div className='employee-detail'>
      <div className="header">
          <div className="header-left">
              <AlignJustify/> Nhân Viên <ChevronRight/> {employeeInfor.Ho} {employeeInfor.Dem} {employeeInfor.Ten}
          </div>
          <div className="header-right">
              <div className="arrow-left">
                  <ChevronLeft className='icon-left'/>
              </div>
              <div className="arrow-left">
                  <ChevronRight className='icon-left'/>
              </div>
              <div onClick={drop} className="arrow-left">
                  <Ellipsis className='icon-left'/>
              </div>
              <div className={`dropdown-menu ${dropdown ? 'show' : ''}`}>
              {dropdown?<button onClick={handleDelete} className='remove-part'>Xóa</button>:""}
              </div>
          </div>
      </div>
      <div className="sidebar">
          <div className="image">
                {employeeInfor.Ten}
          </div>
          <div className="giao">
            <div className="giao-content">
              <UserRound className='icon-giao'/>Được Giao Cho
            </div>
            <button className="giao-button">+</button>
          </div>
          <div className="giao">
            <div className="giao-content">
              <Paperclip className='icon-giao'/>File Đính Kèm
            </div>
            <button className="dinh-button">Tập Tin Đính Kèm +</button>
          </div>
          <div className="giao">
            <div  className="giao-content">
              <Star className='icon-giao'/>Nhận Xét
            </div>
            <button className="giao-button">+</button>
          </div>
          <div className="giao">
            <div className="giao-content">
              <UserPen className='icon-giao'/>Chia sẻ 
            </div>
            <button className="giao-button">+</button>
          </div>
          <div className="nhan">
            <div >
              <Tag/>Nhãn
            </div >
            <input className='nhan-input' type="text" placeholder='Thêm Một Đánh Dấu...'/>
          </div>
      </div>
      <div className="component">
        <div className="insert-container">
        <div className="personal-infor">
              <div className="title">
                Tổng Quát<ChevronDown className='icon' onClick={eventclick17}/>
              </div>
              {click17 &&(
                <div className="input-content17" >
                  <CustomHeatmap/>
                </div>
              )}
          </div>
          <div className="personal-infor">
              <div className="title">
                Liên Kết<ChevronDown className='icon' onClick={eventclick19}/>
              </div>
              {click19 &&(
                <div className="input-content17" >
                  <button className='save-part'>Lưu</button>
                </div>
              )}
          </div>
          <div className="personal-infor">
  <div className="title">
    Thông Tin Cá Nhân<ChevronDown className='icon' onClick={eventclick1} />
  </div>
  {click1 && (
    <div>
      <form onSubmit={handleSave}>
      <div className="input-content">
        <div className="input-group">
          <div className='input-title'>Họ</div>
          <input className='input-option' type="text" name="Ho" value={employeeInfor.Ho} onChange={handleChange} />
        </div>
        <div className="input-group">
          <div className='input-title'>Tên Đệm</div>
          <input className='input-option' type="text" name="Dem" value={employeeInfor.Dem} onChange={handleChange} />
        </div>
        <div className="input-group">
          <div className='input-title'>Tên</div>
          <input className='input-option' type="text" name="Ten" value={employeeInfor.Ten} onChange={handleChange} />
        </div>
        <div className="input-group">
          <div className='input-title'>Giới Tính</div>
          <input className='input-option' type="text" name="GioiTinh" value={employeeInfor.GioiTinh} onChange={handleChange} />
        </div>
        <div className="input-group">
          <div className='input-title'>Ngày Sinh</div>
          <input className='input-option' type="date" name="NgaySinh" value={employeeInfor.NgaySinh} onChange={handleChange} />
        </div>
        <div className="input-group">
          <div className='input-title'>Cấp Bậc</div>
          <select name="ID_CapBac" value={employeeInfor.ID_CapBac} onChange={handleChange}>
                  <option value="">Chọn Cấp Bậc</option>
                  {level.map(item => (
                    <option key={item.id} value={item.id}>{item.CapBac}</option>
                  ))}
                </select>
        </div>
        <div className="input-group">
          <div className='input-title'>Sdt</div>
          <input className='input-option' type="text" name="Sdt" value={employeeInfor.Sdt} onChange={handleChange} />
        </div>
        <div className="input-group">
          <div className='input-title'>Địa Chỉ</div>
          <input className='input-option' type="text" name="DiaChi" value={employeeInfor.DiaChi} onChange={handleChange} />
        </div>
        <div className="input-group">
          <div className='input-title'>Loại Nhân Viên</div>
          <select name="ID_LoaiNhanVien" value={employeeInfor.ID_LoaiNhanVien} onChange={handleChange}>
                  <option value="">Chọn Loại Nhân Viên</option>
                  {employeetype.map(item => (
                    <option key={item.id} value={item.id}>{item.LoaiNhanVien}</option>
                  ))}
                </select>
        </div>
        <div className="input-group">
          <div className='input-title'>Ngày Nhận Việc</div>
          <input className='input-option' type="date" name="NgayBatDau" value={employeeInfor.NgayBatDau} onChange={handleChange} />
        </div>
        <div className="input-group">
          <div className='input-title'>CCCD</div>
          <input className='input-option' type="text" name="CCCD" value={employeeInfor.CCCD} onChange={handleChange} />
        </div>
        <div className="input-group">
          <div className='input-title'>Ngày Kết Thúc</div>
          <input className='input-option' type="date" name="NgayKetThuc" value={employeeInfor.NgayKetThuc} onChange={handleChange} />
        </div>
      </div>
      <button type="submit" className='save-part' >Lưu</button>
      </form>
    </div>
  )}
          </div>
          <div className='personal-infor'>
              <div className="title">
                Liên Lạc Khẩn Cấp <ChevronDown className='icon' onClick={eventclick2}/>
              </div>
              {click2 &&(
                <form onSubmit={handleSaveER}>
                <div className="input-content2" >
                  <div class="input-group">
                      <div className='input-title'>Tên Người Liên Lạc Khẩn Cấp</div>
                      <input className='input-option' name="TenNguoiThan" onChange={handleChangeER} value={erelativeData.TenNguoiThan}  type="text"  />
                  </div>
                  <div class="input-group">
                      <div className='input-title'>Số Điện Thoại Liên Lạc Khẩn Cấp</div>
                      <input className='input-option' name="SDTNguoiThan"  onChange={handleChangeER} value={erelativeData.SDTNguoiThan} type="text" />
                  </div>
                  <div class="input-group">
                      <div className='input-title'>Địa Chỉ  Người Liên Lạc Khẩn Cấp </div>
                      <input className='input-option' name="DiaChiNguoiThan" onChange={handleChangeER} value={erelativeData.DiaChiNguoiThan} type="text" />
                  </div>
                  <div class="input-group">
                      <div className='input-title'>Mối Quan Hệ Với Người Liên Lạc Khẩn Cấp</div>
                      <input className='input-option' name="QuanHe"  onChange={handleChangeER} value={erelativeData.QuanHe} type="text"  />
                  </div>
                  <button type="submit" className='save-part'>Lưu</button>
                </div>
                </form>
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
                  <button className='save-part'>Lưu</button>
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
                  <button className='save-part'>Lưu</button>
                </div>
              )}
          </div>
          <div className='personal-infor'>
              <div className="title">
                Những Người Duyệt<ChevronDown className='icon'onClick={eventclick5}/>
              </div>
              {click5 &&(
                <div>
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
                <button className='save-part'>Lưu</button>
                </div>
              )}
          </div>
          <div className="personal-infor">
              <div className="title">
                Thông Tin Chấm Công và Nghỉ Phép<ChevronDown className='icon'onClick={eventclick6}/>
              </div>
              {click6 &&(
                <div>
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
                <button className='save-part'>Lưu</button>
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
                      <div className='input-title'>Mức Lương Đóng Bảo Hiểm<Asterisk className='red'/></div>
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
                  <button className='save-part'>Lưu</button>
                </div>
              )}
          </div>
          <div className="personal-infor">
              <div className="title">
                Thông Tin Tiền Lương<ChevronDown className='icon'onClick={eventclick8}/>
              </div>
              {click8 &&(
                <div>
                <div className="input-content8" >
                  <div class="input-group">
                      <div className='input-title'>Lương Vị Trí<Asterisk className='red'/></div>
                      <input className='input-option' type="text" />
                  </div>
                  <div class="input-group">
                      <div className='input-title'>Phần Trăm Lương Thử Việc<Asterisk className='red'/></div>
                      <input className='input-option' type="text"  />
                  </div>
                  <div class="input-group">
                      <div className='input-title'>Tổng Trả<Asterisk className='red'/></div>
                      <input className='input-option' type="text" />
                  </div>
                  <div class="input-group">
                      <div className='input-title'>Phụ Cấp Ăn Trưa<Asterisk className='red'/></div>
                      <input className='input-option' type="text"  />
                  </div>
                  <div class="input-group">
                      <div className='input-title'>Phụ Cấp Xăng Xe,Di Chuyển<Asterisk className='red'/></div>
                      <input className='input-option' type="text" />
                  </div>
                  <div class="input-group">
                      <div className='input-title'>Phụ Cấp Chuyên Cần<Asterisk className='red'/></div>
                      <input className='input-option' type="text"  />
                  </div>
                  <div class="input-group">
                      <div className='input-title'>Phụ Cấp Điện Thoại<Asterisk className='red'/></div>
                      <input className='input-option' type="text" />
                  </div>
                 
                </div>
                <button className='save-part'>Lưu</button>
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
                  <button className='save-part'>Lưu</button>
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
                  <button className='save-part'>Lưu</button>
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
                  <button className='save-part'>Lưu</button>
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
                  <button className='save-part'>Lưu</button>
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
                  <button className='save-part'>Lưu</button>
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
                  <button className='save-part'>Lưu</button>
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
                    <button className='save-part'>Lưu</button>
                </div>
              )}
          </div>
          <div className="personal-infor">
              <div className="title">
                Nghỉ Việc<ChevronDown className='icon'onClick={eventclick16}/>
              </div>
              {click16 &&(
                <div>
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
                <button className='save-part'>Lưu</button>
                </div>
              )}
          </div>
          <div className="personal-infor">
              <div className="title">
                Thêm Bình Luận<ChevronDown className='icon' onClick={eventclick18}/>
              </div>
              {click18 &&(
                <div className="input-content18" >
                    <textarea className='textarea'></textarea><br/>
                    <button className='save-part'>Lưu</button>
                </div>
                
              )}
          </div>
        </div>
    </div>
      </div>
  )
}

export default EmployeeDetail

