
import React, { useEffect, useState } from 'react';
import FilterHeader from '../../../component/FilterHeader/FilterHeader';
import FilterSidebar from '../../../component/FilterSidebar/FilterSidebar';
import { Filter } from 'lucide-react';
import "./EmployeeType.css";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
const API_URL = 'http://localhost:1323/LoaiNhanVien'; 
const EmployeeType = () => {
const navigate = useNavigate();
const [selectAll, setSelectAll] = useState(false);
const [selectedItems, setSelectedItems] = useState([]);
const [insert, setInsert] = useState(false);
const [edit, setEdit] = useState(false);
const [editingId, setEditingId] = useState(null); 
const [employeeTypeData, setEmployeeTypeData] = useState({LoaiNhanVien: "" });
const [employeeTypes, setEmployeeTypes] = useState([]);
  useEffect(() => {
    fetchEmployeeTypes();
  }, []);

  const fetchEmployeeTypes = async () => {
    try {
      const response = await fetch(API_URL);
      const data = await response.json();
      setEmployeeTypes(data);
      setSelectedItems(data.map(() => false)); 
      console.log('Rendering EmployeeType component', employeeTypes);
    } catch (error) {
      console.error('Error fetching employee types:', error);
    }
  };

  const openInsert = () => {
    setInsert(true);
  };

  const closeInsert = () => {
    setInsert(false);
    setEmployeeTypeData({ LoaiNhanVien: "" });
  };

  const openEdit = (id) => {
    const itemToEdit = employeeTypes.find(item => item.id === id);
    setEmployeeTypeData(itemToEdit);
    setEditingId(id); 
    setEdit(true);
  };

  const closeEdit = () => {
    setEdit(false);
    setEmployeeTypeData({ LoaiNhanVien: "" }); 
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
    setEmployeeTypeData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSave = async () => {
    try {
      const newEmployeeType = {
        ...employeeTypeData,
      };
      await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newEmployeeType),
      });
      toast.success('Loại Nhân viên mới đã được tạo thành công!', {
        position: "top-right",
      });
      fetchEmployeeTypes(); 
      closeInsert();
    } catch (error) {
      toast.error(error.message, {
        position: "top-right",
      });
    }
  };

  const handleEdit = async (id) => {
    if (!editingId) return; 
    try {
        const response = await fetch(`${API_URL}/${id}`, { 
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(employeeTypeData),
        });

        if (!response.ok) {
            const errorMessage = await response.text();
            throw new Error(`Cập nhật không thành công: ${errorMessage}`);
        }

        toast.success('Thông tin loại nhân viên đã cập nhật', {
            position: "top-right",
        });
        await fetchEmployeeTypes(); // Đảm bảo fetch lại dữ liệu
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
      toast.success('Loại Nhân viên đã được xóa thành công!', {
          position: "top-right",
      });
      fetchEmployeeTypes(); 
  } catch (error) {
      toast.error(error.message, {
          position: "top-right",
      });
  }
};

return (
  <div className='employeetype'>
      <FilterHeader />
      <FilterSidebar />
      <div className='employee-type-table'>
          <div className="employee-type-table-header">
              <div className="employee-type-search-filter">
                  <input className="employee-type-search-filter-input" type="text" placeholder='Tìm Kiếm' />
              </div>
              <div className="employee-type-insert">
                  <button className='employee-type-insert-button' onClick={openInsert}> + Thêm Loại Nhân Viên </button>
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
                                          name="LoaiNhanVien"
                                          placeholder="Nhập loại nhân viên"
                                          required
                                      />
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
              <div className="employee-type-filter">
                  <button className='employee-type-filter-coponent'>
                      <Filter className="filter-icon" /><span>Bộ Lọc</span>
                  </button>
                  <button className='employee-type-filter-coponent'>
                      <div className="filter-icon" /><span>Tác Vụ</span>
                  </button>
              </div>
          </div>
          <div className="employee-type-table-filter">
              <div className="employee-type-table-contain">
                  <div className="employee-type-format-title">
                      <b><input type="checkbox" checked={selectAll} onChange={handleSelectAllChange} /></b>
                      <b>ID</b>
                      <b>Loại Nhân Viên</b>
                  </div>
                  {employeeTypes.map((item, index) => (
                      <div className='employee-type-format' key={item.id}>
                          <div>
                              <input type="checkbox" checked={selectedItems[index]} onChange={handleItemChange(index)} />
                          </div>
                          <div onClick={() => openEdit(item.id)}>{item.id}</div>
                          <div onClick={() => openEdit(item.id)}>{item.LoaiNhanVien}</div>
                          {edit && editingId === item.id && (
                              <div className='overlay'>
                                  <div className='insert'>
                                      <div className='insert-insert'>
                                          <div className="title-insert">
                                              Cập Nhật Loại Nhân Viên
                                          </div>
                                          <form onSubmit={handleEdit}>
                                              <div className="input-insert">
                                                  <input
                                                      type="text"
                                                      onChange={handleChange}
                                                      value={employeeTypeData.LoaiNhanVien}
                                                      name="LoaiNhanVien"
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
export default EmployeeType;

