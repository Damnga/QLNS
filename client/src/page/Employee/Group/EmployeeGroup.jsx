import React, { useState, useEffect } from 'react';
import "./EmployeeGroup.css";
import FilterHeader from '../../../component/FilterHeader/FilterHeader';
import FilterSidebar from '../../../component/FilterSidebar/FilterSidebar';
import { Filter,Pencil,CircleX } from 'lucide-react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const API_URL = 'http://localhost:1323/Nhom';
const GROUP_EMPLOYEE_API_URL="http://localhost:1323/NhomNhanVien";
const NHANVIEN_API_URL="http://localhost:1323/NhanVien";
const EmployeeGroup = () => {
const [selectAll, setSelectAll] = useState(false);
const [selectedItems, setSelectedItems] = useState([]);
const [insert, setInsert] = useState(false);
const [insertGE, setInsertGE] = useState(false);
const [edit, setEdit] = useState(false);
const [editingId, setEditingId] = useState(null); 
const [editGE, setEditGE] = useState(false);
const [editingIdGE, setEditingIdGE] = useState(null); 
const [nhomnhanvienData, setNhomnhanvienData] = useState({ TenNhom: "" });
const [nhomnhanvien, setNhomnhanvien] = useState([]);
const [nhanvien,setNhanvien]=useState([]);
const [group_empData, setGroup_empData] = useState({ IDNhanVien:"",IDNhom:""});
const [group_emp, setGroup_emp] = useState([]);
useEffect(() => {
  fetchGroup();
  fetchGroup_Employee();
  fetchGEmployee();
  }, []);
const fetchGEmployee = async () => {
    try {
      const response = await fetch(NHANVIEN_API_URL);
      const data = await response.json();
      setNhanvien(data);
    } catch (error) {
      console.error('Error fetching employee types:', error);
    }
}; 
const fetchGroup_Employee = async () => {
    try {
      const response = await fetch(GROUP_EMPLOYEE_API_URL);
      const data = await response.json();
      setGroup_emp(data);
    } catch (error) {
      console.error('Error fetching employee types:', error);
    }
}; 
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
const openInsertGE = () => {
    setInsertGE(true);
};
const closeInsert = () => {
    setInsert(false);
    setNhomnhanvienData({ TenNhom: "" });
};
const closeInsertGE = () => {
    setInsertGE(false);
    setGroup_empData({ IDNhanVien:"",IDNhom:""});
};
const openEdit = (id) => {
    const itemToEdit = nhomnhanvien.find(item => item.id === id);
    setNhomnhanvienData(itemToEdit);
    setEditingId(id); 
    setEdit(true);
};
const closeEdit = () => {
    setEdit(false);
    setNhomnhanvienData({ TenNhom: "" }); 
};
const openEditGE = (id) => {
    setEditingIdGE(id);
    const employeesInGroup = group_emp.filter(item => item.IDNhom === id);
    setGroup_empData({ ...group_empData, employeesInGroup });
    setEditGE(true);
};
const closeEditGE = () => {
    setEditGE(false);
    setGroup_empData({ IDNhanVien:"",IDNhom:""});
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
const getEmployeeNameById = (id) => {
    const employee = nhanvien.find(item => item.id === id);
    return employee ? `${employee.Ho} ${employee.Dem} ${employee.Ten}` : '';
};
const handleChangeGE = (e) => {
    const { name, value } = e.target;
    setGroup_empData(prevData => ({
      ...prevData,
      [name]: value
    }));
};
const handleSave = async (e) => {
    e.preventDefault();
    const isDuplicate = nhomnhanvien.some(item => item.TenNhom === nhomnhanvienData.TenNhom);
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
const handleSaveGE = async (e) => {
    e.preventDefault();
    const isDuplicate = group_emp.some(item => item.IDNhanVien === group_empData.IDNhanVien && item.IDNhom === group_empData.IDNhom);
        if (isDuplicate) {
            toast.error(' Nhân Viên đã thuộc nhóm này!', {
                position: "top-right",
            });
            return;
        }
    try {
      const newNhomnhanvien = { ...group_empData };
      await fetch(GROUP_EMPLOYEE_API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newNhomnhanvien),
      });
      toast.success('Nhóm Nhân viên mới đã được tạo thành công!', {
        position: "top-right",
      });
      fetchGroup_Employee(); 
      closeInsertGE();
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
const handleRemoveGE = async (id) => {
    if (!id) return; 
    try {
      await fetch(`${GROUP_EMPLOYEE_API_URL}/${id}`, {
        method: 'DELETE',
      });
      toast.success('Nhân viên đã được xóa ra khỏi nhóm thành công!', {
        position: "top-right",
      });
      fetchGroup_Employee(); 
      closeEditGE(); 
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
            <button className='branch-insert-button' onClick={openInsertGE}> + Thêm Nhóm Nhân Viên </button>
          </div>
          {insert && (
            <div className='overlay'>
              <div className='employee-type-insert'>
                <div className='employee-type-insert-insert'>
                  <div className="employee-type-title-insert">
                    Thêm Nhóm
                  </div>
                  <div className="employee-type-input-insert">
                    <form onSubmit={handleSave}>
                      <input
                        type="text"
                        onChange={handleChange}
                        name="TenNhom"
                        placeholder="Nhập Nhóm nhân viên"
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
          {insertGE && (
            <div className='overlay'>
              <div className='employee-type-insert'>
                <div className='employee-type-insert-insert'>
                  <div className="employee-type-title-insert">
                    Thêm Nhóm Nhân Viên
                  </div>
                  <div className="employee-type-input-insert">
                    <form onSubmit={handleSaveGE}>
                    <div>Tên Nhóm</div>
                    <select name="IDNhom" onChange={handleChangeGE} value={group_empData.IDNhom}>
                      <option value="">Chọn Nhóm</option>
                      {nhomnhanvien.map(item => (
                      <option key={item.id}  value={item.id}>{item.NhomNhanVien}</option>
                      ))}
                    </select>
                    <div>Nhân Viên</div>
                    <select name="IDNhanVien" onChange={handleChangeGE} value={group_empData.IDNhanVien}>
                      <option value="">Chọn Nhân Viên</option>
                      {nhanvien.map(item => (
                      <option key={item.id} value={item.id}>{item.Ho} {item.Dem} {item.Ten}</option>
                      ))}
                    </select>
                      <div className="employee-type-save">
                        <button className="employee-type-save-save" type="submit">Lưu</button>
                        <button className="employee-type-save-exit" type="button" onClick={closeInsertGE}>X</button>
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
          <div className="gropup-table-contain">
            <div className="group-format-title">
              <b><input type="checkbox" checked={selectAll} onChange={handleSelectAllChange} /></b>
              <b>ID</b>
              <b>Nhóm Nhân Viên</b>
            </div>
            {nhomnhanvien.map((item, index) => (
              <div className='group-format' key={item.id}>
                <div>
                  <input type="checkbox" checked={selectedItems[index]} onChange={handleItemChange(index)} />
                </div>
                <div onClick={() => openEditGE(item.id)}>{item.id}</div>
                <div onClick={() => openEditGE(item.id)}>{item.NhomNhanVien}</div>
                <div onClick={() => openEdit(item.id)}><Pencil/></div>
                {edit && editingId === item.id && (
                  <div className='overlay'>
                    <div className='insert'>
                      <div className='insert-insert'>
                        <div className="title-insert">
                          Cập Nhật Nhóm Nhân Viên
                        </div>
                        <form onSubmit={handleEdit}>
                          <div className="input-insert">
                            <input  type="text"  onChange={handleChange}  value={nhomnhanvienData.NhomNhanVien}  name="NhomNhanVien"  required/>
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
                {editGE && editingIdGE === item.id && (
                <div className='overlay'>
                  <div className='insert-group-employee'>
                    <div className='insert-insert-group-employee'>
                      <div className="title-insert-group-employee">
                          Danh sách nhân viên thuộc nhóm
                      </div>
                      <table>
                        <thead>
                          <tr>
                          <th>STT</th>
                          <th>Tên Nhân Viên</th>
                          <th>Xóa</th>
                          </tr>
                        </thead>
                      <tbody>
                      {group_emp
                      .filter(emp => emp.IDNhom === editingIdGE)
                      .map((item, index) => (
                      <tr key={item.id}>
                        <td>{index + 1}</td>
                        <td>{getEmployeeNameById(item.IDNhanVien)}</td>
                        <td><CircleX onClick={() => handleRemoveGE(item.id)} /></td>
                      </tr>
                      ))}
                      </tbody>
                    </table>
                      <button className="employee-type-save-exit" type="button" onClick={closeEditGE}>X</button>
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
