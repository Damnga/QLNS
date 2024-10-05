import React, { useState, useEffect } from 'react';
import "./EmployeeHealthInsurance.css";
import FilterHeader from '../../../component/FilterHeader/FilterHeader';
import FilterSidebar from '../../../component/FilterSidebar/FilterSidebar';
import { Filter } from 'lucide-react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const API_URL = 'http://localhost:1323/BaoHiemNhanVien'; 

const EmployeeHealthInsurance = () => {
  const [selectAll, setSelectAll] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);
  const [insert, setInsert] = useState(false);
  const [edit, setEdit] = useState(false);
  const [editingId, setEditingId] = useState(null); 
  const [baohiemData, setBaoHiemData] = useState({
    BaoHiem: ""
  });
  const [baohiem, setBaoHiem] = useState([]);

  useEffect(() => {
    fetchHealthInsurance();
  }, []);

  const fetchHealthInsurance = async () => {
    try {
      const response = await fetch(API_URL);
      const data = await response.json();
      setBaoHiem(data);
      setSelectedItems(data.map(() => false)); 
      console.log('Fetched health insurances:', data);
    } catch (error) {
      console.error('Error fetching health insurances:', error);
    }
  };

  const openInsert = () => {
    setInsert(true);
  };

  const closeInsert = () => {
    setInsert(false);
    setBaoHiemData({ BaoHiem: "" });
  };

  const openEdit = (id) => {
    const itemToEdit = baohiem.find(item => item.id === id);
    setBaoHiemData(itemToEdit);
    setEditingId(id); 
    setEdit(true);
  };

  const closeEdit = () => {
    setEdit(false);
    setBaoHiemData({ BaoHiem: "" }); 
    setEditingId(null); 
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
    setBaoHiemData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSave = async (e) => {
    e.preventDefault();  // Ngăn chặn việc submit form mặc định
    try {
      const newHealthInsurance = {
        ...baohiemData,
      };
      await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newHealthInsurance),
      });
      toast.success('Bảo Hiểm Nhân viên mới đã được tạo thành công!', {
        position: "top-right",
      });
      fetchHealthInsurance(); 
      closeInsert();
    } catch (error) {
      toast.error(error.message, {
        position: "top-right",
      });
    }
  };

  const handleEdit = async (id) => {
    try {
      const response = await fetch(`${API_URL}/${id}`, { 
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(baohiemData),
      });

      if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(`Cập nhật không thành công: ${errorMessage}`);
      }

      toast.success('Thông tin bảo hiểm nhân viên đã cập nhật', {
        position: "top-right",
      });
      await fetchHealthInsurance();
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
      toast.success('Bảo Hiểm Nhân viên đã được xóa thành công!', {
        position: "top-right",
      });
      fetchHealthInsurance(); 
    } catch (error) {
      toast.error(error.message, {
        position: "top-right",
      });
    }
  };

  return (
    <div className='branch'>
      <FilterHeader />
      <FilterSidebar />
      <div className='branch-table'>
        <div className="branch-table-header">
          <div className="branch-search-filter">
            <input className="branch-search-filter-input" type="text" placeholder='Tìm Kiếm' />
          </div>
          <div className="branch-insert">
            <button className='branch-insert-button' onClick={openInsert}> + Thêm Bảo Hiểm</button>
          </div>
          {insert && (
            <div className='overlay'>
              <div className='employee-type-insert'>
                <div className='employee-type-insert-insert'>
                  <div className="employee-type-title-insert">
                    Thêm Bảo Hiểm Nhân Viên
                  </div>
                  <div className="employee-type-input-insert">
                    <form onSubmit={handleSave}>
                      <input
                        type="text"
                        onChange={handleChange}
                        name="BaoHiem"
                        placeholder="Nhập Bảo Hiểm nhân viên"
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
            <button className='branch-filter-coponent'><Filter className="filter-icon" /><span>Bộ Lọc</span></button>
            <button className='branch-filter-coponent'><div className="filter-icon" /><span>Tác Vụ</span></button>
          </div>
        </div>
        <div className="branch-table-filter">
          <div className="branch-table-contain">
            <div className="branch-format-title">
              <b><input type="checkbox" checked={selectAll} onChange={handleSelectAllChange} /></b>
              <b>ID</b>
              <b>Bảo Hiểm</b>
            </div>
            {baohiem.map((item, index) => (
              <div className='employee-type-format' key={item.id}>
                <div>
                  <input type="checkbox" checked={selectedItems[index]} onChange={handleItemChange(index)} />
                </div>
                <div onClick={() => openEdit(item.id)}>{item.id}</div>
                <div onClick={() => openEdit(item.id)}>{item.BaoHiem}</div>
                {edit && editingId === item.id && (
                  <div className='overlay'>
                    <div className='insert'>
                      <div className='insert-insert'>
                        <div className="title-insert">
                          Cập Nhật Bảo Hiểm Nhân Viên
                        </div>
                        <form onSubmit={handleEdit}>
                          <div className="input-insert">
                            <input
                              type="text"
                              onChange={handleChange}
                              value={baohiemData.BaoHiem}
                              name="BaoHiem"
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

export default EmployeeHealthInsurance;
