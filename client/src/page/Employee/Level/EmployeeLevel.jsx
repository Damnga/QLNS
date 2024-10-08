import React, { useState, useEffect } from 'react';
import "./EmployeeLevel.css";
import FilterHeader from '../../../component/FilterHeader/FilterHeader';
import FilterSidebar from '../../../component/FilterSidebar/FilterSidebar';
import { Filter } from 'lucide-react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

const API_URL = 'http://localhost:1323/CapBac'; 

const EmployeeLevel = () => {
  const navigate = useNavigate();
  const [selectAll, setSelectAll] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);
  const [insert, setInsert] = useState(false);
  const [edit, setEdit] = useState(false);
  const [editingId, setEditingId] = useState(null); 
  const [capbacData, setCapBacData] = useState({
    CapBac: "",
    CauTrucLuong: "",
  });
  const [capbac, setCapbac] = useState([]);

  useEffect(() => {
    fetchLevel();
  }, []);

  const fetchLevel = async () => {
    try {
      const response = await fetch(API_URL);
      const data = await response.json();
      setCapbac(data);
      setSelectedItems(data.map(() => false)); 
    } catch (error) {
      console.error('Error fetching employee levels:', error);
    }
  };

  const openInsert = () => {
    setInsert(true);
  };

  const closeInsert = () => {
    setInsert(false);
    setCapBacData({ CapBac: "", CauTrucLuong: "" }); 
  };

  const openEdit = (id) => {
    const itemToEdit = capbac.find(item => item.id === id);
    setCapBacData(itemToEdit);
    setEditingId(id); 
    setEdit(true);
  };

  const closeEdit = () => {
    setEdit(false);
    setCapBacData({ CapBac: "", CauTrucLuong: "" }); 
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
    setCapBacData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSave = async (e) => {
    e.preventDefault();
    const isDuplicate = capbac.some(item => item.CapBac === capbacData.CapBac);
        if (isDuplicate) {
            toast.error('Cấp Bậc Nhân Viên đã tồn tại!', {
                position: "top-right",
            });
            return;
        }
    try {
      const newCapbac = { ...capbacData };
      await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newCapbac),
      });
      toast.success('Cấp Bậc mới đã được tạo thành công!', {
        position: "top-right",
      });
      fetchLevel(); 
      closeInsert();
    } catch (error) {
      toast.error(error.message, {
        position: "top-right",
      });
    }
  };

  const handleEdit = async (e) => {
    e.preventDefault(); // Ngăn chặn reload trang
    if (!editingId) return; 
    try {
      const response = await fetch(`${API_URL}/${editingId}`, { 
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(capbacData),
      });

      if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(`Cập nhật không thành công: ${errorMessage}`);
      }

      toast.success('Thông tin cấp bậc nhân viên đã được cập nhật', {
        position: "top-right",
      });
      fetchLevel(); 
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
      toast.success('Cấp Bậc Nhân viên đã được xóa thành công!', {
        position: "top-right",
      });
      fetchLevel(); 
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
      <FilterSidebar />
      <div className='branch-table'>
        <div className="branch-table-header">
          <div className="branch-search-filter">
            <input className="branch-search-filter-input" type="text" placeholder='Tìm Kiếm' />
          </div>
          <div className="branch-insert">
            <button className='branch-insert-button' onClick={openInsert}> + Thêm Cấp Bậc</button>
          </div>
          {insert && (
            <div className='overlay'>
              <div className='employee-type-insert'>
                <div className='employee-type-insert-insert'>
                  <div className="employee-type-title-insert">
                    Thêm Cấp Bậc Nhân Viên
                  </div>
                  <div className="employee-type-input-insert">
                    <form onSubmit={handleSave}>
                      <input
                        type="text"
                        onChange={handleChange}
                        name="CapBac"
                        value={capbacData.CapBac}
                        placeholder="Nhập cấp bậc nhân viên"
                        required
                      />
                      <input
                        type="text"
                        onChange={handleChange}
                        name="CauTrucLuong"
                        value={capbacData.CauTrucLuong}
                        placeholder="Nhập cấu trúc lương"
                        required
                      />
                      <div className="employee-type-save">
                        <button className="employee-type-save-save" type="submit">Lưu</button>
                        <button className="employee-type-save-exit" type="button" onClick={closeInsert}>X</button>
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
              <b>Cấp Bậc</b>
              <b>Cấu Trúc Lương</b>
            </div>
            {capbac.map((item, index) => (
              <div className='employee-type-format' key={item.id}>
                <div>
                  <input type="checkbox" checked={selectedItems[index]} onChange={handleItemChange(index)} />
                </div>
                <div onClick={() => openEdit(item.id)}>{item.CapBac}</div>
                <div onClick={() => openEdit(item.id)}>{item.CauTrucLuong}</div>
                {edit && editingId === item.id && (
                  <div className='overlay'>
                    <div className='insert'>
                      <div className='insert-insert'>
                        <div className="title-insert">
                          Cập Nhật Cấp Bậc Nhân Viên
                        </div>
                        <form onSubmit={handleEdit}>
                          <div className="input-insert">
                            <input
                              type="text"
                              onChange={handleChange}
                              value={capbacData.CapBac}
                              name="CapBac"
                              required
                            />
                            <input
                              type="text"
                              onChange={handleChange}
                              value={capbacData.CauTrucLuong}
                              name="CauTrucLuong"
                              required
                            />
                          </div>
                          <div className="save">
                            <button className="employee-type-save-save" type="submit">Cập Nhật</button>
                            <button className="employee-type-save-exit" type="button" onClick={closeEdit}>X</button>
                            <button className="employee-type-save-remove" type="button" onClick={() => handleRemove(item.id)}>Xóa</button>
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
        <ToastContainer />
      </div>
    </div>
  );
};

export default EmployeeLevel;
