import React, { useEffect } from 'react'
import "./Employee.css";
import FilterSidebar from '../../component/FilterSidebar/FilterSidebar';
import FilterHeader from '../../component/FilterHeader/FilterHeader';
import { useState } from 'react';
import { Filter} from 'lucide-react';
import {Link} from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import Insert from "./Insert/insert";
const API_URL = 'http://localhost:1323/NhanVien';
const Employee = ({open,setOpen,onHeaderClick,clickLink,toggleDialog}) => {
  const navigate = useNavigate();
  const [selectAll, setSelectAll] = useState(false);
  const [selectedItems, setSelectedItems] = useState(null);
  const [insert, setInsert] = useState(false);
  const [edit, setEdit] = useState(false);
  const [editingId, setEditingId] = useState(null); 
  const [employeeData, setEmployeeData] = useState({
    Ten:"", Dem:"", Ho:"",Email:"",ID_LoaiNhanVien:"",ID_CapBac:"",NgayBatDau:"",NgayKetThuc:"",  GioiTinh:"", Sdt:"",DiaChi:"",CCCD:"",NgaySinh:""
  });
  const EMPLOYEETYPE__API_URL ="http://localhost:1323/LoaiNhanVien";
  const LEVEL__API_URL ="http://localhost:1323/CapBac";
  const [employeetype,setEmployeetype]=useState([]);
  const [level,setLevel] =useState([]);
  const [employee,setEmployee]=useState([]);
  useEffect(() => {
    setOpen(true);
    fetchEmployeeType();
    fetchLevel();
    fetchEmployee();
  }, [clickLink]);
  const fetchEmployeeType = async () => {
    try {
      const response = await fetch(EMPLOYEETYPE__API_URL);
      const data = await response.json();
      console.log('Fetched branches:', data); 
      setEmployeetype(data);
    } catch (error) {
      console.error('Error fetching branches:', error);
    }
  };
  const fetchLevel = async () => {
    try {
      const response = await fetch(LEVEL__API_URL);
      const data = await response.json();
      console.log('Fetched branches:', data); 
      setLevel(data);
    } catch (error) {
      console.error('Error fetching branches:', error);
    }
  };
  const fetchEmployee = async () => {
    try {
      const response = await fetch(API_URL);
      const data = await response.json();
      setEmployee(data);
      setSelectedItems(data.map(() => false)); 
      console.log('Rendering EmployeeType component', employee);
    } catch (error) {
      console.error('Error fetching employee types:', error);
    }
  };
  const openInsert = () => {
    setInsert(true);
  };
  const closeInsert = () => {
    setInsert(false);
    setEmployeeData({
      Ten:"", Dem:"", Ho:"",Email:"",ID_LoaiNhanVien:"",ID_CapBac:"",NgayBatDau:"",NgayKetThuc:"",  GioiTinh:"", Sdt:"",DiaChi:"",CCCD:"",NgaySinh:"" }); 
  };

  const openEdit = (id) => {
    const itemToEdit = employee.find(item => item.id === id);
    setEmployeeData(itemToEdit);
    setEditingId(id); 
    setEdit(true);
  };

  const closeEdit = () => {
    setEdit(false);
    setEmployeeData({
      Ten:"", Dem:"", Ho:"",Email:"",ID_LoaiNhanVien:"",ID_CapBac:"",NgayBatDau:"",NgayKetThuc:"",  GioiTinh:"", Sdt:"",DiaChi:"",CCCD:"",NgaySinh:"" }); 
  };

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
    setSelectAll(updatedSelectedItems.every((item) => item));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmployeeData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSave = async () => {
    try {
      const newEmployee = {
        ...employeeData,
      };
      await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newEmployee),
      });
      toast.success('Nhân Viên mới đã được tạo thành công!', {
        position: "top-right",
      });
      fetchEmployee();
      closeInsert();
    } catch (error) {
      toast.error(error.message, {
        position: "top-right",
      });
    }
  };
  const handleEdit =async (id) => {
    if (!editingId) return; 
    try {
        const response = await fetch(`${API_URL}/${id}`, { 
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(employeeData),
        });

        if (!response.ok) {
            const errorMessage = await response.text();
            throw new Error(`Cập nhật không thành công: ${errorMessage}`);
        }

        toast.success('Thông tin nhân viên đã cập nhật', {
            position: "top-right",
        });
        await fetchEmployee(); 
        closeEdit(); 
    } catch (error) {
        toast.error(error.message, {
            position: "top-right",
        });
    }
  };
  const handleRemove = async (id) => {
    if (!id) return; 
    try {
        await fetch(`${API_URL}/${id}`, {
            method: 'DELETE',
        });
        toast.success('Nhân viên đã được xóa thành công!', {
            position: "top-right",
        });
        fetchEmployee(); 
    } catch (error) {
        toast.error(error.message, {
            position: "top-right",
        });
    }
  };
  const getEmployeeTypeNameById = (id) => {
    const emp_type = employeetype.find(emp_type => emp_type.id === id);
    return emp_type ? emp_type.LoaiNhanVien : 'Unknown';
  };
  const getLevelNameById = (id) => {
    const lev = level.find(lev => lev.id === id);
    return lev ? lev.CapBac : 'Unknown';
  };

    const deleteSelectedItems = () => {
      const remainingItems = data.filter((_, index) => !selectedItems[index]);
      setData(remainingItems);
      setSelectedItems([]);
      setSelectAll(false);
    };
  return (
    <div className='employee'>
      <FilterHeader click={onHeaderClick} onClick={deleteSelectedItems}/>
      <FilterSidebar />
      <div className='table'>
        <div className="table-header">
              <div className="search-filter">
                  <input className="search-filter-input" type="text" placeholder='Tìm Kiếm' />
              </div>
              <div className="insert">
                  <button className='insert-button' onClick={openInsert}> + Thêm Nhân Viên</button>
              </div>
              {insert && (
  <div className='overlay'>
    <div className='employee-type-insert'>
      <div className='employee-type-insert-insert'>
        <div className="employee-type-title-insert">
          Thêm Nhân Viên
        </div>
        <div className="employee-type-input-insert">
        <form onSubmit={handleSave}>
          <input type="text" onChange={handleChange} name="Ho" placeholder="Nhập Họ"required />
          <input type="text" onChange={handleChange} name="Dem" placeholder="Nhập Tên Đệm"required />
          <input type="text" onChange={handleChange} name="Ten" placeholder="Nhập Tên"required />
          <input type="text" onChange={handleChange} name="Email" placeholder="Nhập Email"required />
          <select  name="ID_LoaiNhanVien" value={employeeData.ID_LoaiNhanVien} onChange={handleChange} required>
            <option value="">Chọn Loại Nhân Viên</option>
            {employeetype.map(item => (
            <option key={item.id} value={item.id}>{item.LoaiNhanVien}</option>
            ))}
          </select>
          <input type="text" onChange={handleChange} name="GioiTinh" placeholder="Nhập Giới Tính"required />
          <input type="date" onChange={handleChange} name="NgaySinh" placeholder="Nhập Ngày Sinh"required />
          <input type="text" onChange={handleChange} name="Sdt" placeholder="Nhập Số Điện Thoại"required />
          <select  name="ID_CapBac" value={employeeData.ID_CapBac} onChange={handleChange} required>
            <option value="">Chọn Cấp Bậc</option>
            {level.map(item => (
            <option key={item.id} value={item.id}>{item.CapBac}</option>
            ))}
          </select>
          <input type="text" onChange={handleChange} name="DiaChi" placeholder="Nhập Nhập Địa Chỉ"required />
          <input type="date" onChange={handleChange} name="NgayBatDau" placeholder="Nhập Ngày Nhận Việc"required />
          <input type="date" onChange={handleChange} name="NgayKetThuc" placeholder="Nhập Ngày Kết Thúc"/>
          <input type="text" onChange={handleChange} name="CCCD" placeholder="Nhập CCCD"required />
          </form>
        </div>
        <div className="employee-type-save">
          <button onClick={handleSave}>Lưu</button>
          <button onClick={closeInsert}>X</button>
        </div>
      </div>
    </div>
  </div>
)}
  <div className="filter">
   <button className='filter-coponent'><Filter className="filter-icon"/><span>Bộ Lọc</span></button>
   <button className='filter-coponent'><div className="filter-icon"/><span >Tác Vụ</span></button>
              </div>
        </div>
        <div className="table-filter">
        <div className="table-contain">
            <div className="format-title">
            <b><input type="checkbox" checked={selectAll} 
                        onChange={handleSelectAllChange} /></b>
            <b>Mã Nhân Viên</b>
            <b>Tên Đầy Đủ</b>
            <b>Giới Tính</b>
            <b>Ngày Sinh</b>
            <b>Địa Chỉ</b>
            <b>Cấp Bậc</b>
            <b>Sđt</b>
            <b>Loại Nhân Viên</b>
            <b>CCCD</b>
            <b>Ngày Nhận Việc</b>
            <b>Ngày Kết Thúc</b>
        </div>
            {employee.map((item,index) => {
              return (
              <div  className='format' key={item.id}>
                    <div ><input type="checkbox"  checked={selectedItems[index]} 
                            onChange={handleItemChange(index)} /></div>
                    <Link to={`/employee/${item.id}`}><div >{item.id}</div></Link>
                    <Link to={`/employee/${item.id}`}><div >{item.Ho} {item.Dem} {item.Ten}</div></Link>
                    <Link to={`/employee/${item.id}`}><div >{item.GioiTinh}</div></Link>
                    <Link to={`/employee/${item.id}`}><div >{item.NgaySinh}</div></Link>
                    <Link to={`/employee/${item.id}`}><div >{item.DiaChi}</div></Link>
                    <Link to={`/employee/${item.id}`}><div >{getLevelNameById(item.ID_CapBac)}</div></Link>
                    <Link to={`/employee/${item.id}`}><div >{item.Sdt}</div></Link>
                    <Link to={`/employee/${item.id}`}><div >{getEmployeeTypeNameById(item.ID_LoaiNhanVien)}</div></Link>
                    <Link to={`/employee/${item.id}`}><div >{item.CCCD}</div></Link>
                    <Link to={`/employee/${item.id}`}><div >{item.NgayBatDau}</div></Link>
                    <Link to={`/employee/${item.id}`}><div >{item.NgayKetThuc}</div></Link>
              </div>
              );
            })}
        </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default Employee
