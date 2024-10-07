import React, { useState, useEffect } from 'react';
import "./EmployeeGroup.css";
import FilterHeader from '../../../component/FilterHeader/FilterHeader';
import FilterSidebar from '../../../component/FilterSidebar/FilterSidebar';
import { Filter } from 'lucide-react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const API_URL = 'http://localhost:1323/Nhom';

const EmployeeGroup = () => {
  const [selectAll, setSelectAll] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);
  const [insert, setInsert] = useState(false);
  const [edit, setEdit] = useState(false);
  const [editingId, setEditingId] = useState(null); 
  const [nhomnhanvienData, setNhomnhanvienData] = useState({ NhomNhanVien: "" });
  const [nhomnhanvien, setNhomnhanvien] = useState([]);

  useEffect(() => {
    fetchGroup();
  }, []);

  const fetchGroup = async () => {
    try {
      const response = await fetch(API_URL);
      const data = await response.json();
      setNhomnhanvien(data);
      setSelectedItems(data.map(() => false)); 
    } catch (error) {
      console.error('Error fetching employee types:', error);
    }
  };

  const openInsert = () => {
    setInsert(true);
  };

  const closeInsert = () => {
    setInsert(false);
    setNhomnhanvienData({ NhomNhanVien: "" });
  };

  const openEdit = (id) => {
    const itemToEdit = nhomnhanvien.find(item => item.id === id);
    setNhomnhanvienData(itemToEdit);
    setEditingId(id); 
    setEdit(true);
  };

  const closeEdit = () => {
    setEdit(false);
    setNhomnhanvienData({ NhomNhanVien: "" }); 
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
    setNhomnhanvienData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSave = async (e) => {
    e.preventDefault();
    const isDuplicate = nhomnhanvien.some(item => item.NhomNhanVien === nhomnhanvienData.NhomNhanVien);
        if (isDuplicate) {
            toast.error('Nhóm hiểm Nhân Viên đã tồn tại!', {
                position: "top-right",
            });
            return;
        }
    try {
      const newNhomnhanvien = { ...nhomnhanvienData };
      await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newNhomnhanvien),
      });
      toast.success('Nhóm Nhân viên mới đã được tạo thành công!', {
        position: "top-right",
      });
      fetchGroup(); 
      closeInsert();
    } catch (error) {
      toast.error(error.message, {
        position: "top-right",
      });
    }
  };

  const handleEdit = async (e) => {
    e.preventDefault();
    if (!editingId) return; 
    try {
      const response = await fetch(`${API_URL}/${editingId}`, { 
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(nhomnhanvienData),
      });

      if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(`Cập nhật không thành công: ${errorMessage}`);
      }

      toast.success('Thông tin nhóm nhân viên đã cập nhật', {
        position: "top-right",
      });
      fetchGroup(); 
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
      toast.success('Nhóm Nhân viên đã được xóa thành công!', {
        position: "top-right",
      });
      fetchGroup(); 
      closeEdit(); 
    } catch (error) {
      toast.error(error.message, {
        position: "top-right",
      });
    }
  };
  const handleRemoveSelected = async () => {
    const selectedIds = employeeTypes
        .filter((_, index) => selectedItems[index])
        .map(item => item.id);
  
    if (selectedIds.length === 0) {
        toast.warning('Không có mục nào được chọn để xóa!', {
            position: "top-right",
        });
        return;
    }
  
    try {
        await Promise.all(selectedIds.map(id =>
            fetch(`${API_URL}/${id}`, {
                method: 'DELETE',
            })
        ));
        toast.success('Các loại nhân viên đã được xóa thành công!', {
            position: "top-right",
        });
        fetchEmployeeTypes(); 
    } catch (error) {
        toast.error('Xóa không thành công: ' + error.message, {
            position: "top-right",
        });
    }
  };
  return (
    <div className='branch'>
      <FilterHeader handleRemoveSelected={handleRemoveSelected}/>
      <FilterSidebar/>
      <div className='branch-table'>
        <div className="branch-table-header">
          <div className="branch-search-filter">
            <input className="branch-search-filter-input" type="text" placeholder='Tìm Kiếm' />
          </div>
          <div className="branch-insert">
            <button className='branch-insert-button' onClick={openInsert}> + Thêm Nhóm </button>
          </div>
          {insert && (
            <div className='overlay'>
              <div className='employee-type-insert'>
                <div className='employee-type-insert-insert'>
                  <div className="employee-type-title-insert">
                    Thêm Loại Nhân Viên
                  </div>
                  <div className="employee-type-input-insert">
                    <form onSubmit={handleSave}>
                      <input
                        type="text"
                        onChange={handleChange}
                        name="NhomNhanVien"
                        placeholder="Nhập Nhóm nhân viên"
                        required
                      />
                      <div className="employee-type-save">
                        <button type="submit">Lưu</button>
                        <button type="button" onClick={closeInsert}>X</button>
                      </div>
                    </form>
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
              <b><input type="checkbox" checked={selectAll} onChange={handleSelectAllChange} /></b>
              <b>ID</b>
              <b>Nhóm Nhân Viên</b>
            </div>
            {nhomnhanvien.map((item, index) => (
              <div className='employee-type-format' key={item.id}>
                <div>
                  <input type="checkbox" checked={selectedItems[index]} onChange={handleItemChange(index)} />
                </div>
                <div onClick={() => openEdit(item.id)}>{item.id}</div>
                <div onClick={() => openEdit(item.id)}>{item.NhomNhanVien}</div>
                {edit && editingId === item.id && (
                  <div className='overlay'>
                    <div className='insert'>
                      <div className='insert-insert'>
                        <div className="title-insert">
                          Cập Nhật Nhóm Nhân Viên
                        </div>
                        <form onSubmit={handleEdit}>
                          <div className="input-insert">
                            <input
                              type="text"
                              onChange={handleChange}
                              value={nhomnhanvienData.NhomNhanVien}
                              name="NhomNhanVien"
                              required
                            />
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

export default EmployeeGroup;
