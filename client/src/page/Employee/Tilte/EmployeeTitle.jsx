import React, { useState, useEffect } from 'react';
import "./EmployeeTitle.css";
import FilterHeader from '../../../component/FilterHeader/FilterHeader';
import FilterSidebar from '../../../component/FilterSidebar/FilterSidebar';
import { Filter } from 'lucide-react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

const API_URL = 'http://localhost:1323/ChucDanh';

const EmployeeTitle = () => {
  const navigate = useNavigate();
  const [selectAll, setSelectAll] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);
  const [insert, setInsert] = useState(false);
  const [edit, setEdit] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [chucdanhData, setChucdanhData] = useState({ TenChucDanh: "" });
  const [chucdanh, setChucDanh] = useState([]);

  useEffect(() => {
    fetchTitle();
  }, []);

  const fetchTitle = async () => {
    try {
      const response = await fetch(API_URL);
      const data = await response.json();
      setChucDanh(data);
      setSelectedItems(data.map(() => false));
    } catch (error) {
      console.error('Error fetching employee titles:', error);
    }
  };

  const openInsert = () => {
    setInsert(true);
  };

  const closeInsert = () => {
    setInsert(false);
    setChucdanhData({ TenChucDanh: "" });
  };

  const openEdit = (id) => {
    const itemToEdit = chucdanh.find(item => item.id === id);
    setChucdanhData(itemToEdit);
    setEditingId(id);
    setEdit(true);
  };

  const closeEdit = () => {
    setEdit(false);
    setChucdanhData({ TenChucDanh: "" });
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
    setChucdanhData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSave = async (e) => {
    e.preventDefault(); // Ngăn chặn reload trang
    const isDuplicate = chucdanh.some(item => item.TenChucDanh === chucdanhData.TenChucDanh);
        if (isDuplicate) {
            toast.error('Chức Danh Nhân Viên đã tồn tại!', {
                position: "top-right",
            });
            return;
        }
    try {
      const newChucDanh = { ...chucdanhData };
      await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newChucDanh),
      });
      toast.success('Chức Danh mới đã được tạo thành công!', {
        position: "top-right",
      });
      fetchTitle(); 
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
        body: JSON.stringify(chucdanhData),
      });

      if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(`Cập nhật không thành công: ${errorMessage}`);
      }

      toast.success('Thông tin chức danh đã được cập nhật', {
        position: "top-right",
      });
      fetchTitle(); 
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
      toast.success('Chức Danh đã được xóa thành công!', {
        position: "top-right",
      });
      fetchTitle(); 
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
      <FilterHeader handleRemoveSelected={handleRemoveSelected} />
      <FilterSidebar />
      <div className='branch-table'>
        <div className="branch-table-header">
          <div className="branch-search-filter">
            <input className="branch-search-filter-input" type="text" placeholder='Tìm Kiếm' />
          </div>
          <div className="branch-insert">
            <button className='branch-insert-button' onClick={openInsert}> + Thêm Chức Danh</button>
          </div>
          {insert && (
            <div className='overlay'>
              <div className='employee-type-insert'>
                <div className='employee-type-insert-insert'>
                  <div className="employee-type-title-insert">
                    Thêm Chức Danh
                  </div>
                  <div className="employee-type-input-insert">
                    <form onSubmit={handleSave}>
                      <input
                        type="text"
                        onChange={handleChange}
                        name="TenChucDanh"
                        value={chucdanhData.ChucDanh}
                        placeholder="Nhập chức danh"
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
            <button className='branch-filter-coponent'><Filter className="filter-icon" /><span>Bộ Lọc</span></button>
            <button className='branch-filter-coponent'><div className="filter-icon" /><span>Tác Vụ</span></button>
          </div>
        </div>
        <div className="branch-table-filter">
          <div className="branch-table-contain">
            <div className="branch-format-title">
              <b><input type="checkbox" checked={selectAll} onChange={handleSelectAllChange} /></b>
              <b>ID</b>
              <b>Chức Danh</b>
            </div>
            {chucdanh.map((item, index) => (
              <div className='employee-type-format' key={item.id}>
                <div>
                  <input type="checkbox" checked={selectedItems[index]} onChange={handleItemChange(index)} />
                </div>
                <div onClick={() => openEdit(item.id)}>{item.id}</div>
                <div onClick={() => openEdit(item.id)}>{item.ChucDanh}</div>
                {edit && editingId === item.id && (
                  <div className='overlay'>
                    <div className='insert'>
                      <div className='insert-insert'>
                        <div className="title-insert">
                          Cập Nhật Chức Danh
                        </div>
                        <form onSubmit={handleEdit}>
                          <div className="input-insert">
                            <input
                              type="text"
                              onChange={handleChange}
                              value={chucdanhData.ChucDanh}
                              name="TenChucDanh"
                              required
                            />
                          </div>
                          <div className="save">
                            <button className="employee-type-save-save" type="submit">Cập Nhật</button>
                            <button className="employee-type-save-exit" type="button" onClick={closeEdit}>X</button>
                            <button className="employee-type-save-remove"type="button" onClick={() => handleRemove(item.id)}>Xóa</button>
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

export default EmployeeTitle;
