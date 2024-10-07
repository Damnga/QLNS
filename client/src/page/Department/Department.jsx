import React from 'react'
import "./Department.css";
import FilterHeader from '../../component/FilterHeader/FilterHeader';
import FilterSidebar from '../../component/FilterSidebar/FilterSidebar';
import { useState } from 'react';
import { Filter} from 'lucide-react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
const Department = () => {
  const navigate = useNavigate();
const API_URL = 'http://localhost:1323/PhongBan';
const [selectAll, setSelectAll] = useState(false);
const [selectedItems, setSelectedItems] = useState([]);
const [insert, setInsert] = useState(false);
  const [edit, setEdit] = useState(false);
  const [editingId, setEditingId] = useState(null); 
  const [phongbanData, setPhongBanData] = useState({
    PhongBan: "",
    ID_ChiNhanh:"",
  });
const BRANCH_API_URL = 'http://localhost:1323/ChiNhanh';
const [branches, setBranches] = useState([]);
  const [phongban,setPhongban]=useState([]);
  useEffect(() => {
    fetchDepartment();
    fetchBranches();
  }, []);
  const fetchBranches = async () => {
    try {
      const response = await fetch(BRANCH_API_URL);
      const data = await response.json();
      console.log('Fetched branches:', data); 
      setBranches(data);
    } catch (error) {
      console.error('Error fetching branches:', error);
    }
  };
  const fetchDepartment = async () => {
    try {
      const response = await fetch(API_URL);
      const data = await response.json();
      setPhongban(data);
      setSelectedItems(data.map(() => false)); 
      console.log('Rendering EmployeeType component', phongban);
    } catch (error) {
      console.error('Error fetching employee types:', error);
    }
  };

  const openInsert = () => {
    setInsert(true);
  };

  const closeInsert = () => {
    setInsert(false);
    setPhongBanData({  PhongBan: "",ID_ChiNhanh:"" }); 
  };

  const openEdit = (id) => {
    const itemToEdit = phongban.find(item => item.id === id);
    setPhongBanData(itemToEdit);
    setEditingId(id); 
    setEdit(true);
  };

  const closeEdit = () => {
    setEdit(false);
    setPhongBanData({  PhongBan: "",ID_ChiNhanh:"" });  
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
    setPhongBanData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };
  const handleSave = async () => {
    try {
      const newDepartment = {
        ...phongbanData,
      };
      await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newDepartment),
      });
      toast.success('Phòng ban mới đã được tạo thành công!', {
        position: "top-right",
      });
      fetchDepartment();
      closeInsert();
    } catch (error) {
      toast.error(error.message, {
        position: "top-right",
      });
    }
  };

  const handleEdit =async (e) => {
    e.preventDefault();
    if (!editingId) return; 
    try {
      const response = await fetch(`${API_URL}/${editingId}`, { 
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(phongbanData),
      });

      if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(`Cập nhật không thành công: ${errorMessage}`);
      }

      toast.success('Thông tin phòng ban đã cập nhật', {
        position: "top-right",
      });
      fetchDepartment(); // Đảm bảo fetch lại dữ liệu
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
        toast.success('Phòng Ban đã được xóa thành công!', {
            position: "top-right",
        });
        fetchDepartment(); 
    } catch (error) {
        toast.error(error.message, {
            position: "top-right",
        });
    }
  };
  const getBranchNameById = (id) => {
    const branch = branches.find(branch => branch.id === id);
    return branch ? branch.ChiNhanh : 'Unknown';
  };
  return (
    <div className='branch'>
      <FilterHeader/>
      <FilterSidebar/>
      <div className='branch-table'>
        <div className="branch-table-header">
              <div className="branch-search-filter">
                  <input className="branch-search-filter-input" type="text" placeholder='Tìm Kiếm' />
              </div>
              <div className="branch-insert">
                  <button className='branch-insert-button' onClick={openInsert}> + Thêm Phòng Ban </button>
              </div>
              {insert && (
  <div className='overlay'>
    <div className='employee-type-insert'>
      <div className='employee-type-insert-insert'>
        <div className="employee-type-title-insert">
          Thêm Phòng Ban
        </div>
        <div className="employee-type-input-insert">
        <form onSubmit={handleSave}>
            <input
              type="text"
              onChange={handleChange}
              name="PhongBan"
              placeholder="Nhập Phòng Ban"
              required
            />
            <select
              name="ID_ChiNhanh"
              value={phongbanData.ID_ChiNhanh}
              onChange={handleChange}
              required
            >
              <option value="">Chọn Chi Nhánh</option>
              {branches.map(branch => (
                <option key={branch.id} value={branch.id}>{branch.ChiNhanh}</option>
              ))}
            </select>
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
              <div className="branch-filter">
                  <button className='branch-filter-coponent'><Filter className="filter-icon"/><span>Bộ Lọc</span></button>
                  <button className='branch-filter-coponent'><div className="filter-icon"/><span>Tác Vụ</span></button>
              </div>
        </div>
        <div className="branch-table-filter">
        <div className="branch-table-contain">
            <div className="branch-format-title">
            <b><input type="checkbox" checked={selectAll} 
                        onChange={handleSelectAllChange} /></b>
            <b>Phòng Ban</b>
            <b>Chi Nhánh</b>
        </div>
        {phongban.map((item, index) => (
  <div className='employee-type-format' key={item.id}>
    <div>
      <input type="checkbox" checked={selectedItems[index]} onChange={handleItemChange(index)} />
    </div>
    <div onClick={() => openEdit(item.id)}>{item.PhongBan}</div>
    <div onClick={() => openEdit(item.id)}>{getBranchNameById(item.ID_ChiNhanh)}</div>
    {edit && editingId === item.id && (
      <div className='overlay'>
        <div className='insert'>
          <div className='insert-insert'>
            <div className="title-insert">
              Cập Nhật Phòng Ban
            </div>
            <form onSubmit={handleEdit}>
              <div className="input-insert">
                <input
                  type="text"
                  onChange={handleChange}
                  value={phongbanData.PhongBan}
                  name="PhongBan"
                  required
                />
                <select name="ID_ChiNhanh" value={phongbanData.ID_ChiNhanh} onChange={handleChange}>
                  <option value="">Chọn Chi Nhánh</option>
                  {branches.map(branch => (
                    <option key={branch.id} value={branch.id}>{branch.ChiNhanh}</option>
                  ))}
                </select>
              </div>
              <div className="save">
                <button type="submit">Cập Nhật</button>
                <button type="button" onClick={closeEdit}>X</button>
                <button type="button" onClick={() => handleRemove(item.id)}>Xóa</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    )}
  </div>
        ))}
        </div>
          </div>
      </div>
      <ToastContainer />
  </div>
);
}

export default Department
