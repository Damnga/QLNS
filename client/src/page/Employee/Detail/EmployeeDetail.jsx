
import React from 'react'
import "./EmployeeDetail.css";
import { useParams } from 'react-router-dom';
import { useState } from 'react';
import { AlignJustify,ChevronLeft,ChevronRight,Ellipsis,UserRound,Paperclip,Star,UserPen,Tag,ChevronDown,Asterisk,Cog} from 'lucide-react';
import CustomHeatmap from '../../../component/CustomHeatmap/CustomHeatmap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

const EMPLOYEE_API_URL = 'http://localhost:1323/NhanVien';
const EMPLOYEE_TYPE_API_URL="http://localhost:1323/LoaiNhanVien";
const LEVEL__API_URL ="http://localhost:1323/CapBac";
const RELATIVE_API_URL="http://localhost:1323/NguoiThanNhanVien";
const DEPARTMENT_API_URL="http://localhost:1323/PhongBan";
const TITLE_API_URL="http://localhost:1323/ChucDanh";
const BRANCH_API_URL="http://localhost:1323/ChiNhanh";
const TITLE_EMPLOYEE_API_URL ="http://localhost:1323/ChucDanhNhanVien";
const EDUCATION_EMPLOYEE_API_URL="http://localhost:1323/HocVanNhanVien";
const HEALTH_INSURANCE_EMPLOYEE_API_URL="http://localhost:1323/BaoHiemNhanVien";
const HEALTH_INSURANCE="http://localhost:1323/BaoHiem";

const EmployeeDetail = () => {
const {id} =useParams();
const navigate = useNavigate();
const [dropdown,setDropdown]= useState(false);
const [edit, setEdit] = useState(false);
const [insert, setInsert] = useState(false);
const [editingId, setEditingId] = useState(null);
const [editTE, setEditTE] = useState(false);
const [insertTE, setInsertTE] = useState(false);
const [editingIdTE, setEditingIdTE] = useState(null);
const [editHE, setEditHE] = useState(false);
const [insertHE, setInsertHE] = useState(false);
const [editingIdHE, setEditingIdHE] = useState(null); 
const [employeeInfor, setEmployeeInfo] = useState({});
const [level,setLevel] =useState([]);
const [branch,setBranch]=useState([]);
const [title,setTitle]=useState([]);
const [department,setDepartment]=useState([]);
const [heatlh,setHealth]=useState([]);
const [employeetype,setEmployeetype]=useState([]);
const [selectbranch,setSelectbranch]=useState("");
const [selecthealth,setSelecthealth]=useState("");
const [selectedDepartment, setSelectedDepartment] = useState("");
const [erelativeData,setErelativeData]=useState({
    IDNhanVien: id,
    TenNguoiThan: "",
    SDTNguoiThan: "",
    QuanHe: "",
    DiaChiNguoiThan: ""
});
const [title_employee,setTitle_employee]=useState([]);
const [title_employeeData,setTitle_employeeData]=useState({
    IDNhanVien: id,
    IDChucDanh: "",
    IDPhongBan: "",
    NgayBatDau: "",
    NgayKetThuc: "",
});
const [education_employee,setEducation_Employee]=useState([]);
const [education_employeeData,setEducation_EmployeeData]=useState({
  IDNhanVien:id,
  Truong:"",
  BangCap:"",
  CapHoc:"",
  NamTotNghiep:""
});
const [hi_employ,setHi_employ]=useState([]);
const [hi_employData,setHi_employData]=useState({
    IDNhanVien:id,IDBaoHiem:"",NgayDong:"",NgayHetHan:""
});
useEffect(() => {
    fetchEmployee();
    fetchEmployeeType();
    fetchLevel();
    fetchRelative();
    fetchBranches();
    fetchTitle();
    fetchTitle_Employee();
    fetchEducation_Employee();
    handleItemChange();
    fetchHealth_Employee();
    fetchHealth();
},[]);
useEffect(() => {
  if (selectbranch) {
    fetchDepartment(selectbranch);
  } else {
    setDepartment([]); 
    setSelectedDepartment("");
  }
},[selectbranch]);
const fetchHealth = async () => {
  try {
    const response = await fetch(HEALTH_INSURANCE);
    const data = await response.json();
    setHealth(data);
  } catch (error) {
    console.error('Error fetching branches:', error);
  }
};
const fetchHealth_Employee = async () => {
  try {
    const response = await fetch(`${HEALTH_INSURANCE_EMPLOYEE_API_URL}?IDNhanVien=${id}`);
    const data = await response.json();
    if (Array.isArray(data)) {
      setHi_employ(data);
    } else {
      setHi_employ([]);
    }
  } catch (error) {
    console.error('Error fetching relatives:', error);
  }
};
const fetchEducation_Employee = async () => {
  try {
    const response = await fetch(`${EDUCATION_EMPLOYEE_API_URL}?IDNhanVien=${id}`);
    const data = await response.json();
    if (Array.isArray(data)) {
        setEducation_Employee(data);
      } else {
        setEducation_Employee([]);
      }
  } catch (error) {
    console.error('Error fetching relatives:', error);
  }
};
const fetchTitle_Employee = async () => {
  try {
    const response = await fetch(`${TITLE_EMPLOYEE_API_URL}?IDNhanVien=${id}`);
    const data = await response.json();
    if (Array.isArray(data)) {
      setTitle_employee(data);
    } else {
      setTitle_employee([]);
    }
  } catch (error) {
    console.error('Error fetching relatives:', error);
  }
};
const fetchDepartment = async (ID_ChiNhanh) => {
  try {
    const response = await fetch(`${DEPARTMENT_API_URL}?ID_ChiNhanh=${ID_ChiNhanh}`);
    const data = await response.json();
    setDepartment(data);
  } catch (error) {
    console.error('Error fetching branches:', error);
  }
};
const fetchTitle = async () => {
  try {
    const response = await fetch(TITLE_API_URL);
    const data = await response.json();
    setTitle(data);
  } catch (error) {
    console.error('Error fetching branches:', error);
  }
};
const fetchBranches = async () => {
  try {
    const response = await fetch(BRANCH_API_URL);
    const data = await response.json();
    setBranch(data);
  } catch (error) {
    console.error('Error fetching branches:', error);
  }
};
const fetchRelative = async () => {
  try {
    const response = await fetch(`${RELATIVE_API_URL}?IDNhanVien=${id}`);
    const data = await response.json();
    if (data && data.length > 0) {
      setErelativeData({ ...data[0], IDNhanVien: id });
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
    const neweducaton_employeeData = [...education_employee, {
      Truong: "",
      BangCap: "",
      CapHoc: "",
      NamTotNghiep: "",
    }];
    setEducation_Employee(neweducaton_employeeData);
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
    const newData = educaton_employee.filter((_, index) => !selectedItems[index]);
        const updatedData = newData.map((item, index) => ({ ...item, stt: index + 1 }));
        setEducation_Employee(updatedData);
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
const handleSave = async (e) => {
  e.preventDefault();
    try {
        const response = await fetch(`${EMPLOYEE_API_URL}/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(employeeInfor),
        });

        if (!response.ok) {
            throw new Error('Failed to update employee information');
        }

        toast.success('Thông tin nhân viên đã được cập nhật');
    } catch (error) {
        toast.error(error.message);
        console.log("Error updating employee:", error);
    }
};
const drop =()=>{
  setDropdown(!dropdown);
};
const handleDelete = async (e) => {
  e.preventDefault();
  try {
      const employeeResponse = await fetch(`${EMPLOYEE_API_URL}/${id}`, {
          method: 'DELETE',
      });
      await handleDeleteER();
      if (!employeeResponse.ok) {
          throw new Error('Failed to delete employee');
      }
      toast.success('Nhân viên đã được xóa thành công');
      handleDeleteTE(id);
      handleDeleteER(id);
      handleRemoveEE(id);
      navigate("/app/employee");
  } catch (error) {
      toast.error(error.message);
      console.log("Error deleting employee:", error);
  }
};
const handleBranchChange = (e) => {
  setSelectbranch(e.target.value);
  setSelectedDepartment(""); 
  setTitle_employeeData({...title_employeeData,IDChiNhanh: e.target.value})
};
const handleHealthChange = (e) => {
  setHi_employData({...hi_employData,IDBaoHiem:e.target.value})
  setSelecthealth(e.target.value);
};
const handleDepartmentChange = (e) => {
  if (!selectbranch) {
    toast.error('Vui lòng chọn chi nhánh trước!');
    e.target.value = "";
    return;
  }
  setTitle_employeeData({...title_employeeData,IDPhongBan:e.target.value})
  setSelectedDepartment(e.target.value);
};
const getBranchNameById = (id) => {
  const branc = branch.find(item => item.id === id);
  return branc ? branc.ChiNhanh : '';
};
const getDepartmenthNameById = (id) => {
  const branch = department.find(branch => branch.id === id);
  return branch ? branch.PhongBan : '';
};
const getTitleNameById = (id) => {
  const branch = title.find(branch => branch.id === id);
  return branch ? branch.ChucDanh : '';
};
const getHealthNameById = (id) => {
  const branch = heatlh.find(branch => branch.id === id);
  return branch ? branch.TenBaoHiem : '';
};
const getHealthLePhiById = (id) => {
  const branch = heatlh.find(branch => branch.id === id);
  return branch ? branch.TiLePhi : '';
};

const handleChangeER = (e) => {
  const { name, value } = e.target;
  setTitle_employeeData(prevData => ({
      ...prevData,
      [name]: value
  }));
};
const handleSaveER = async (e) => {
  e.preventDefault();
  if (erelativeData.id) {
    await handleEditER();
  } else {
    await handleAddER();
  }
};
const handleAddER = async () => {
  try {
    const newerelativeData = { ...erelativeData };
    await fetch(`${RELATIVE_API_URL}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newerelativeData),
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
    const response = await fetch(`${RELATIVE_API_URL}/${erelativeData.id}`, {
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
const handleDeleteER = async () => {
  if (!erelativeData.id) { 
      toast.error('ID người thân không hợp lệ');
      return;
  }
  try {
      const response = await fetch(`${RELATIVE_API_URL}/${erelativeData.id}`, {
          method: 'DELETE',
      });

      if (!response.ok) {
          throw new Error('Xóa người thân không thành công');
      }
      toast.success('Người Thân Nhân viên đã được xóa thành công');
      fetchRelative();
  } catch (error) {
      toast.error(error.message);
      console.log("Error deleting relative:", error);
  }
};

const openEditTE = (id) => {
  const itemToEdit = title_employee.find(item => item.id === id);
  setTitle_employeeData(itemToEdit);
  setEditingIdTE(id); 
  setEditTE(true);
};
const closeEditTE = () => {
  setEditTE(false);
  setTitle_employeeData({IDChucDanh: "",
    IDPhongBan: "",
    NgayBatDau: "",
    NgayKetThuc: "",});  
};
const openInsertTE = () => {
  setInsertTE(true);
};
const closeInsertTE = () => {
  setInsertTE(false);
  setTitle_employeeData({IDChucDanh: "",
    IDPhongBan: "",
    NgayBatDau: "",
    NgayKetThuc: "",});  
};
const handleChangeTE = (e) => {
  const { name, value } = e.target;
  setTitle_employeeData(prevData => ({
      ...prevData,
      [name]: value
  }));
};
const handleSaveTE = async (e) => {
  e.preventDefault();
  if (title_employeeData.id) {
    await handleEditTE();
  } else {
    await handleAddTE();
  }
};
const handleAddTE = async (e) => {
  e.preventDefault();
  try {
    const newtitle_employeeData = { ...title_employeeData };
    await fetch(`${TITLE_EMPLOYEE_API_URL}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newtitle_employeeData),
    });
    toast.success('Chức Danh Nhân viên mới đã được tạo thành công!', {
      position: "top-right",
    });
    fetchTitle_Employee(); 
    closeInsertTE();
  } catch (error) {
    toast.error(error.message, {
      position: "top-right",
    });
    console.log("them",error);
  }
};
const handleEditTE = async (e) => {
  e.preventDefault();
  try {
    const response = await fetch(`${TITLE_EMPLOYEE_API_URL}/${title_employeeData.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(title_employeeData),
    });

    if (!response.ok) {
      throw new Error('Failed to update title employee information');
    }
    toast.success('Thông tin chức danh nhân viên đã được cập nhật', {
      position: "top-right",
    });
    fetchTitle_Employee();
    closeEditTE();
  } catch (error) {
    toast.error(error.message, {
      position: "top-right",
    });
    console.log("them",error);
  }
};
const handleDeleteTE = async (id) => {
  if (!id) return; 
  try {
      await fetch(`${TITLE_EMPLOYEE_API_URL}/${id}`, {
          method: 'DELETE',
      });
      toast.success('bộ phận và cấp bậc đã được xóa thành công!', {
          position: "top-right",
      });
      fetchTitle_Employee(); 
      closeEditTE();
  } catch (error) {
      toast.error(error.message, {
          position: "top-right",
      });
  }
};

const openEditHE = (id) => {
  const itemToEdit = hi_employ.find(item => item.id === id);
  setHi_employData(itemToEdit);
  setEditingIdHE(id); 
  setEditHE(true);
};
const closeEditHE = () => {
  setEditHE(false);
  setHi_employData({IDNhanVien:"",IDBaoHiem:"",NgayDong:"",NgayHetHan:""});  
};
const openInsertHE = () => {
  setInsertHE(true);
};
const closeInsertHE = () => {
  setInsertHE(false);
  setHi_employData({IDNhanVien:"",IDBaoHiem:"",NgayDong:"",NgayHetHan:""}); 
};
const handleAddHE = async (e) => {
  e.preventDefault();
  try {
    const newtitle_employeeData = { ...hi_employData };
    await fetch(`${HEALTH_INSURANCE_EMPLOYEE_API_URL}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newtitle_employeeData),
    });
    toast.success('Bảo Hiểm Nhân viên mới đã được tạo thành công!', {
      position: "top-right",
    });
    fetchHealth_Employee(); 
    closeInsertHE();
  } catch (error) {
    toast.error(error.message, {
      position: "top-right",
    });
    console.log("them",error);
  }
};
const handleEditHE = async (e) => {
  e.preventDefault();
  try {
    const response = await fetch(`${HEALTH_INSURANCE_EMPLOYEE_API_URL}/${hi_employData.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(hi_employData),
    });

    if (!response.ok) {
      throw new Error('Failed to update title employee information');
    }
    toast.success('Thông tin bảo hiểm nhân viên đã được cập nhật', {
      position: "top-right",
    });
    fetchHealth_Employee();
    closeEditHE();
  } catch (error) {
    toast.error(error.message, {
      position: "top-right",
    });
    console.log("them",error);
  }
};
const handleDeleteHE = async (id) => {
  if (!id) return; 
  try {
      await fetch(`${HEALTH_INSURANCE_EMPLOYEE_API_URL}/${id}`, {
          method: 'DELETE',
      });
      toast.success('bảo hiểm nhân viên đã được xóa thành công!', {
          position: "top-right",
      });
      fetchHealth_Employee();
    closeEditHE();
  } catch (error) {
      toast.error(error.message, {
          position: "top-right",
      });
  }
};

const openEdit = (id) => {
  const itemToEdit = education_employee.find(item => item.id === id);
  setEducation_EmployeeData(itemToEdit);
  setEditingId(id); 
  setEdit(true);
};
const closeEdit = () => {
  setEdit(false);
  setEducation_EmployeeData({Truong:"",BangCap:"",CapHoc:"",NamTotNghiep:""});  
};
const openInsert = () => {
  setInsert(true);
};
const closeInsert = () => {
  setInsert(false);
  setEducation_EmployeeData({Truong:"",
    BangCap:"",
    CapHoc:"",
    NamTotNghiep:""}); 
};
const handleChangeEE = (e) => {
  const { name, value } = e.target;
  setEducation_EmployeeData(prevData => ({
      ...prevData,
      [name]: value
  }));
};
const handleAddEE = async (e) => {
  e.preventDefault();
  try {
    const response = await fetch(`${EDUCATION_EMPLOYEE_API_URL}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(education_employeeData),
    });

    if (!response.ok) {
      throw new Error('Failed to save education data');
    }
    fetchEducation_Employee();
    closeInsert();
    toast.success('Dữ liệu học vấn đã được lưu thành công');
  } catch (error) {
    toast.error(error.message);
    console.log('Error saving education data:', error);
  }
};
const handleRemoveEE = async (id) => {
  if (!id) return; 
  try {
      await fetch(`${EDUCATION_EMPLOYEE_API_URL}/${id}`, {
          method: 'DELETE',
      });
      toast.success('Học Vấn đã được xóa thành công!', {
          position: "top-right",
      });
      fetchEducation_Employee(); 
  } catch (error) {
      toast.error(error.message, {
          position: "top-right",
      });
  }
};
const handleEditEE = async (e) => {
  e.preventDefault();
  if (!editingId) {
    return; 
  }
  try {
    const response = await fetch(`${EDUCATION_EMPLOYEE_API_URL}/${editingId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(education_employeeData),
    });
    if (!response.ok) {
      const errorMessage = await response.text();
      throw new Error(`Cập nhật không thành công: ${errorMessage}`);
    }

    toast.success('Thông tin học vấn nhân viên đã cập nhật', {
      position: "top-right",
    });
    fetchEducation_Employee();
    closeEdit();
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
              <AlignJustify/><Link to="/app/employee"> Nhân Viên</Link><ChevronRight/> {employeeInfor.Ho} {employeeInfor.Dem} {employeeInfor.Ten}
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
                <div>
                <form onSubmit={handleSaveER}>
                <div className="input-content2" >
                  <div class="input-group">
                      <div className='input-title'>Tên Người Liên Lạc Khẩn Cấp</div>
                      <input className='input-option' name="TenNguoiThan" onChange={(e) => setErelativeData({ ...erelativeData, TenNguoiThan: e.target.value })} value={erelativeData.TenNguoiThan}  type="text"  />
                  </div>
                  <div class="input-group">
                      <div className='input-title'>Số Điện Thoại Liên Lạc Khẩn Cấp</div>
                      <input className='input-option' name="SDTNguoiThan"  onChange={(e) => setErelativeData({ ...erelativeData, SDTNguoiThan: e.target.value })} value={erelativeData.SDTNguoiThan} type="text" />
                  </div>
                  <div class="input-group">
                      <div className='input-title'>Địa Chỉ  Người Liên Lạc Khẩn Cấp </div>
                      <input className='input-option' name="DiaChiNguoiThan" onChange={(e) => setErelativeData({ ...erelativeData, DiaChiNguoiThan: e.target.value })} value={erelativeData.DiaChiNguoiThan} type="text" />
                  </div>
                  <div class="input-group">
                      <div className='input-title'>Mối Quan Hệ Với Người Liên Lạc Khẩn Cấp</div>
                      <input className='input-option' name="QuanHe"  onChange={(e) => setErelativeData({ ...erelativeData, QuanHe: e.target.value })} value={erelativeData.QuanHe} type="text"  />
                  </div>
                  <button type="submit" className='save-part'>Lưu</button>
                </div>
                </form>
                <button onClick={handleDeleteER} className='remove-btn'>Xóa</button>
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
                  <button className='save-part'>Lưu</button>
                </div>
              )}
          </div>
          <div className="personal-infor">
              <div className="title">
                Bộ Phận và Cấp Bậc<ChevronDown className='icon'onClick={eventclick4}/>
              </div>
              {click4 &&(
                <div className="input-content15" >
                  <form >
                    <table>
                      <tr>
                          <th>STT</th>
                          <th>Phòng Ban</th>
                          <th>Chức Danh</th>
                          <th>Ngày Bắt Đầu</th>
                          <th>Ngày Kết Thúc</th>
                      </tr>
                      {title_employee.map((item, index) => (
                        <tr key={item.id}>
                            <td>{index+1}</td>
                            <td>{getDepartmenthNameById(item.IDPhongBan)}</td>
                            <td>{getTitleNameById(item.IDChucDanh)}</td>
                            <td>{item.NgayBatDau}</td>
                            <td>{item.NgayKetThuc}</td>
                            <td><Cog onClick={()=>openEditTE(item.id)}/></td>
                            {editTE && editingIdTE === item.id && (
                        <div className='overlay'>
                          <div className='insert'>
                            <div className='insert-insert'>
                              <div className="title-insert">
                                Cập Nhật Bộ Phận và Cấp Bậc
                              </div>
                              <form >
                                <div className="input-insert">
                                  <div>Chi Nhánh</div>
                                  <select name="IDChiNhanh" onChange={handleBranchChange} value={title_employeeData.IDChiNhanh}>
                                    <option value="">Chọn Chi Nhánh</option>
                                    {branch.map(item => (
                                    <option key={item.id} value={item.id}>{item.ChiNhanh}</option>
                                    ))}
                                  </select>

                                  <div>Phòng Ban</div>
                                  <select name="IDPhongBan" value={selectedDepartment} onChange={handleDepartmentChange } >
                                    <option value="">Chọn Phòng Ban</option>
                                    {department.map(item => (
                                    <option key={item.id} value={item.id}>{item.PhongBan}</option>
                                    ))}
                                  </select>

                                  <div>Chức Danh</div>
                                  <select name="IDChucDanh" onChange={(e)=>setTitle_employeeData({...title_employeeData,IDChucDanh:e.target.value})} value={title_employeeData.IDChucDanh} >
                                    <option value="">Chọn Chức Danh</option>
                                    {title.map(item => (
                                    <option key={item.id} value={item.id}>{item.ChucDanh}</option>
                                    ))}
                                  </select>

                                  <div>Ngày Bắt Đầu</div>
                                  <input className='input-option' type="date" onChange={(e)=>setTitle_employeeData({...title_employeeData,NgayBatDau:e.target.value})} value={title_employeeData.NgayBatDau} />
                                  <div>Ngày Kết Thúc</div>
                                  <input className='input-option' type="date" onChange={(e)=>setTitle_employeeData({...title_employeeData,NgayKetThuc:e.target.value})} value={title_employeeData.NgayKetThuc} />
                                </div>
                                <div className="save">
                                  <button  onClick={handleEditTE}>Cập Nhật</button>
                                  <button type="button" onClick={closeEditTE}>X</button>
                                  <button type="button" onClick={() =>handleDeleteTE(item.id)}>Xóa</button>
                                </div>
                              </form>
                            </div>
                          </div>
                        </div>
                            )}
                        </tr>
                      ))}
                    </table>
                    <button type="button" className='btn-them' onClick={openInsertTE}>Thêm</button>
                  </form>
              </div>
              )}
              {insertTE && (
              <div className='overlay'>
                  <div className='employee-type-insert'>
                      <div className='employee-type-insert-insert'>
                        <div className="employee-type-title-insert">
                            Thêm Bộ Phận và Cấp Bậc
                        </div>
                        <div className="employee-type-input-insert">
                            <form >
                              <div className='input-title'>Chức Danh</div>
                              <select name="IDChucDanh" onChange={(e)=>setTitle_employeeData({...title_employeeData,IDChucDanh:e.target.value})} value={title_employeeData.IDChucDanh} >
                                <option value="">Chọn Chức Danh</option>
                                  {title.map(item => (
                                  <option key={item.id} value={item.id}>{item.ChucDanh}</option>
                                  ))}
                              </select>
                              
                              <div className='input-title'>Chi Nhánh</div>
                              <select name="IDChiNhanh" onChange={handleBranchChange} value={title_employeeData.IDChiNhanh}>
                                <option value="">Chọn Chi Nhánh</option>
                                {branch.map(item => (
                                <option key={item.id} value={item.id}>{item.ChiNhanh}</option>
                                ))}
                              </select>

                              <div className='input-title'>Phòng Ban</div>
                              <select name="IDPhongBan" value={selectedDepartment} onChange={handleDepartmentChange } >
                                <option value="">Chọn Phòng Ban</option>
                                {department.map(item => (
                                <option key={item.id} value={item.id}>{item.PhongBan}</option>
                                ))}
                              </select>

                              <div className='input-title'>Ngày Bắt Đầu </div>
                              <input className='input-option' type="date" onChange={(e)=>setTitle_employeeData({...title_employeeData,NgayBatDau:e.target.value})} value={title_employeeData.NgayBatDau} />
                            
                              <div className='input-title'>Ngày Kết Thúc</div>
                              <input className='input-option' type="date" onChange={(e)=>setTitle_employeeData({...title_employeeData,NgayKetThuc:e.target.value})} value={title_employeeData.NgayKetThuc} />
                            </form>
                        </div>
                        <div className="employee-type-save">
                          <button onClick={handleAddTE}>Lưu</button>
                          <button onClick={closeInsertTE}>X</button>
                        </div>
                      </div>
                  </div>
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
                <button className='save-part'>Lưu</button>
                </div>
              )}
          </div>
          <div className="personal-infor">
              <div className="title">
                Bảo Hiểm Nhân Viên<ChevronDown className='icon'onClick={eventclick9}/>
              </div>
              {click9 &&(
                <div className="input-content9" >
                  <form>
                    <table>
                      <tr>
                          <th>STT</th>
                          <th>Tên Bảo Hiểm</th>
                          <th>Lệ Phí Đóng Bảo Hiểm</th>
                          <th>Ngày Đóng</th>
                          <th>Ngày Hết Hạn</th>
                      </tr>
                      {hi_employ.map((item, index) => (
                        <tr key={item.id}>
                            <td>{index+1}</td>
                            <td>{getHealthNameById(item.IDBaoHiem)}</td>
                            <td>{getHealthLePhiById(item.IDBaoHiem)}</td>
                            <td>{item.NgayDong}</td>
                            <td>{item.NgayHetHan}</td>
                            <td><Cog onClick={()=>openEditHE(item.id)}/></td>
                            {editHE && editingIdHE === item.id && (
                        <div className='overlay'>
                          <div className='insert'>
                            <div className='insert-insert'>
                              <div className="title-insert">
                                Cập Nhật Bảo Hiểm
                              </div>
                              <form >
                                <div className="input-insert">
                                  <div>Bảo Hiểm</div>
                                  <select name="IDBaoHiem" onChange={handleHealthChange} value={hi_employData.IDBaoHiem}>
                                    <option value="">Chọn Bảo Hiểm</option>
                                    {heatlh.map(item => (
                                    <option key={item.id} value={item.id}>{item.TenBaoHiem}</option>
                                    ))}
                                  </select>
                                  <div>Ngày Đóng</div>
                                  <input className='input-option' type="date" onChange={(e)=>setHi_employData({...hi_employData,NgayDong:e.target.value})} value={hi_employData.NgayDong} />
                                  <div>Ngày Hết Hạn</div>
                                  <input className='input-option' type="date" onChange={(e)=>setHi_employData({...hi_employData,NgayHetHan:e.target.value})} value={hi_employData.NgayHetHan} />
                                </div>
                                <div className="save">
                                  <button  onClick={handleEditHE} >Cập Nhật</button>
                                  <button type="button"onClick={closeEditHE} >X</button>
                                  <button type="button"onClick={() =>handleDeleteHE(item.id)}>Xóa</button>
                                </div>
                              </form>
                            </div>
                          </div>
                        </div>
                            )}
                        </tr>
                      ))}
                    </table>
                    <button type="button" className='btn-them' onClick={openInsertHE}>Thêm</button>
                  </form>
                </div>
              )}
              {insertHE && (
              <div className='overlay'>
                  <div className='employee-type-insert'>
                      <div className='employee-type-insert-insert'>
                        <div className="employee-type-title-insert">
                            Thêm Bảo Hiểm
                        </div>
                        <div className="employee-type-input-insert">
                            <form >
                              <div className='input-title'>Tên Bảo Hiểm</div>
                              <select name="IDBaoHiem" onChange={(e)=>setHi_employData({...hi_employData,IDBaoHiem:e.target.value})} value={hi_employData.IDBaoHiem} >
                                <option value="">Chọn Bảo Hiểm</option>
                                  {heatlh.map(item => (
                                  <option key={item.id} value={item.id}>{item.TenBaoHiem}</option>
                                  ))}
                              </select>
                              <div className='input-title'>Ngày Đóng </div>
                              <input className='input-option' type="date" onChange={(e)=>setHi_employData({...hi_employData,NgayDong:e.target.value})} value={hi_employData.NgayDong} />
                            
                              <div className='input-title'>Ngày Hết Hạn</div>
                              <input className='input-option' type="date" onChange={(e)=>setHi_employData({...hi_employData,NgayHetHan:e.target.value})} value={hi_employData.NgayHetHan} />
                            </form>
                        </div>
                        <div className="employee-type-save">
                          <button onClick={handleAddHE} >Lưu</button>
                          <button onClick={closeInsertHE}>X</button>
                        </div>
                      </div>
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
                  <form onSubmit={handleAddEE}>
                <table>
                      <tr>
                          <th>STT</th>
                          <th>Trường/Đại Học</th>
                          <th>Bằng Cấp Chứng Chỉ</th>
                          <th>Cấp Học</th>
                          <th>Năm Tốt Nghiệp</th>
                      </tr>
                      {education_employee.map((item, index) => (
                        <tr key={item.id}>
                            <td>{index+1}</td>
                            <td>{item.Truong}</td>
                            <td>{item.BangCap}</td>
                            <td>{item.CapHoc}</td>
                            <td>{item.NamTotNghiep}</td>
                            <td><Cog onClick={()=>openEdit(item.id)}/></td>
                            {edit && editingId === item.id && (
                        <div className='overlay'>
                          <div className='insert'>
                            <div className='insert-insert'>
                              <div className="title-insert">
                                Cập Nhật Học Vấn Nhân Viên
                              </div>
                              <form >
                                <div className="input-insert">
                                  <div>Tên Trường</div>
                                  <input type="text" onChange={handleChangeEE} value={education_employeeData.Truong} name="Truong"  required/>
                                  <div>Tên Tên Bằng Cấp</div>
                                  <input type="text" onChange={handleChangeEE} value={education_employeeData.BangCap} name="BangCap"  required/>
                                  <div>Tên Cấp Hoc</div>
                                  <input type="text" onChange={handleChangeEE} value={education_employeeData.CapHoc} name="CapHoc"  required/>
                                  <div>Tên Năm Tốt Nghiệp</div>
                                  <input type="text" onChange={handleChangeEE} value={education_employeeData.NamTotNghiep} name="NamTotNghiep" required/>
                                </div>
                                <div className="save">
                                  <button  onClick={handleEditEE}>Cập Nhật</button>
                                  <button type="button" onClick={closeEdit}>X</button>
                                  <button type="button" onClick={() =>handleRemoveEE(item.id)}>Xóa</button>
                                </div>
                              </form>
                            </div>
                          </div>
                        </div>
                            )}
                        </tr>
                      ))}
                  </table>
                  <button type="button" className='btn-them' onClick={openInsert}>Thêm</button>
                  </form>
              </div>
              )}
              {insert && (
              <div className='overlay'>
                  <div className='employee-type-insert'>
                      <div className='employee-type-insert-insert'>
                        <div className="employee-type-title-insert">
                            Thêm Học Vấn
                        </div>
                        <div className="employee-type-input-insert">
                            <form onSubmit={handleAddEE}>
                                <input type="text"onChange={handleChangeEE} placeholder="Nhập Tên Trường" name="Truong" required/>
                                <input type="text"onChange={handleChangeEE} placeholder="Nhập Tên Bằng Cấp" name="BangCap" required/>
                                <input type="text"onChange={handleChangeEE} placeholder="Nhập Tên Cấp Học" name="CapHoc" required/>
                                <input type="text"onChange={handleChangeEE} placeholder="Nhập Năm Tốt Nghiệp" name="NamTotNghiep" required/>
                            </form>
                        </div>
                        <div className="employee-type-save">
                          <button onClick={handleAddEE}>Lưu</button>
                          <button onClick={closeInsert}>X</button>
                        </div>
                      </div>
                  </div>
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
                      {educaton_employee.map((item, index) => (
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
      <ToastContainer />
    </div>
  )
}

export default EmployeeDetail

