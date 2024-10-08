import React, { useEffect, useState } from 'react';
import "./Branch.css";
import FilterHeader from '../../component/FilterHeader/FilterHeader';
import FilterSidebar from '../../component/FilterSidebar/FilterSidebar';
import { Filter } from 'lucide-react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

const API_URL = 'http://localhost:1323/ChiNhanh';
const DEPARTMENT_API_URL="http://localhost:1323/PhongBan";
const Branch = () => {
    const navigate = useNavigate();
    const [selectAll, setSelectAll] = useState(false);
    const [selectedItems, setSelectedItems] = useState([]); 
    const [insert, setInsert] = useState(false);
    const [edit, setEdit] = useState(false);
    const [editingId, setEditingId] = useState(null);
    const [branchData, setBranchData] = useState({ ChiNhanh: "" });
    const [branch, setBranch] = useState([]);
    const [phongban,setPhongban]=useState([]);
    useEffect(() => {
        fetchBranch();
    }, []);
    const fetchDepartment = async () => {
        try {
          const response = await fetch(DEPARTMENT_API_URL);
          const data = await response.json();
          setPhongban(data);
        } catch (error) {
          console.error('Error fetching branches:', error);
        }
      };
    const fetchBranch = async () => {
        try {
            const response = await fetch(API_URL);
            const data = await response.json();
            setBranch(data); 
            setSelectedItems(Array(data.length).fill(false)); 
            console.log('Rendering Branch component', branch);
        } catch (error) {
            console.error('Error fetching branches:', error);
        }
    };

    const openInsert = () => {
        setInsert(true);
    };

    const closeInsert = () => {
        setInsert(false);
        setBranchData({ ChiNhanh: "" });
    };

    const openEdit = (id) => {
        const itemToEdit = branch.find(item => item.id === id);
        setBranchData({ ...itemToEdit }); 
        setEditingId(id);
        setEdit(true);
    };

    const closeEdit = () => {
        setEdit(false);
        setBranchData({ ChiNhanh: "" });
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
        setBranchData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSave = async (e) => {
        e.preventDefault();
        const isDuplicate = branch.some(item => item.ChiNhanh === branchData.ChiNhanh);
        if (isDuplicate) {
            toast.error('Chi nhánh đã tồn tại!', {
                position: "top-right",
            });
            return;
        }
        try {
            const newBranch = {
                ...branchData,
            };
            const response = await fetch(API_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newBranch),
            });

            if (!response.ok) {
                throw new Error('Failed to create new branch');
            }

            const createdBranch = await response.json();
            setBranch((prevBranches) => [...prevBranches, createdBranch]);
            toast.success('Chi Nhánh mới đã được tạo thành công!', {
                position: "top-right",
            });
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
            body: JSON.stringify(branchData),
          });
    
          if (!response.ok) {
            const errorMessage = await response.text();
            throw new Error(`Cập nhật không thành công: ${errorMessage}`);
          }
    
          toast.success('Thông tin nhóm nhân viên đã cập nhật', {
            position: "top-right",
          });
          fetchBranch(); // Đảm bảo fetch lại dữ liệu
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
            setBranch(prevBranches => prevBranches.filter(item => item.id !== id));
            toast.success('Chi nhánh đã được xóa thành công!', {
                position: "top-right",
            });
            handleRemoveDepartment(id);
            fetchBranch();

        } catch (error) {
            toast.error(error.message, {
                position: "top-right",
            });
        }
    };
    const handleRemoveDepartment = async (id) => {
        if (!id) return; 
        try {
            await fetch(`${API_URL}/?ID_ChiNhanh=${id}`, {
                method: 'DELETE',
            });
            toast.success('Phòng Ban thuộc chi nhánh này đã được xóa thành công!', {
                position: "top-right",
            });
            fetchDepartment();
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
                        <button className='branch-insert-button' onClick={openInsert}> + Thêm Chi Nhánh </button>
                    </div>
                    {insert && (
                        <div className='overlay'>
                            <div className='employee-type-insert'>
                                <div className='employee-type-insert-insert'>
                                    <div className="employee-type-title-insert">
                                        Thêm Chi Nhánh
                                    </div>
                                    <div className="employee-type-input-insert">
                                    <form onSubmit={handleSave}>
                                            <input
                                                type="text"
                                                onChange={handleChange}
                                                name="ChiNhanh"
                                                value={branchData.ChiNhanh}
                                                placeholder="Nhập Chi Nhánh"
                                                required
                                            />
                                        </form>
                                    </div>
                                    <div className="employee-type-save">
                                        <button className="employee-type-save-save" onClick={handleSave}>Lưu</button>
                                        <button className="employee-type-save-exit" onClick={closeInsert}>X</button>
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
                            <b>Tên Chi Nhánh</b>
                        </div>
                        {branch.map((item, index) => (
                            <div className='employee-type-format' key={item.id}>
                                <div>
                                    <input type="checkbox" checked={selectedItems[index]} onChange={handleItemChange(index)} />
                                </div>
                                <div onClick={() => openEdit(item.id)}>{item.id}</div>
                                <div onClick={() => openEdit(item.id)}>{item.ChiNhanh}</div>
                                {edit && editingId === item.id && (
                                    <div className='overlay'>
                                        <div className='insert'>
                                            <div className='insert-insert'>
                                                <div className="title-insert">
                                                    Cập Nhật Chi Nhánh
                                                </div>
                                                <form onSubmit={handleEdit}>
                                                    <div className="input-insert">
                                                        <input
                                                            type="text"
                                                            onChange={handleChange}
                                                            value={branchData.ChiNhanh}
                                                            name="ChiNhanh" 
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
            </div>
            <ToastContainer />
        </div>
    );
}

export default Branch;
