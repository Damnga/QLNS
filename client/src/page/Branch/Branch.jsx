import React, { useEffect, useState } from 'react';
import "./Branch.css";
import FilterHeader from '../../component/FilterHeader/FilterHeader';
import FilterSidebar from '../../component/FilterSidebar/FilterSidebar';
import { Filter } from 'lucide-react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

const API_URL = 'http://localhost:1323/ChiNhanh';

const Branch = () => {
    const navigate = useNavigate();
    const [selectAll, setSelectAll] = useState(false);
    const [selectedItems, setSelectedItems] = useState([]); 
    const [insert, setInsert] = useState(false);
    const [edit, setEdit] = useState(false);
    const [editingId, setEditingId] = useState(null);
    const [branchData, setBranchData] = useState({ ChiNhanh: "" });
    const [branch, setBranch] = useState([]);

    useEffect(() => {
        fetchBranch();
    }, []);

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

    const handleSave = async () => {
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
            setBranch((prevBranches) => [...prevBranches, createdBranch]); // Cập nhật trạng thái mà không cần fetch lại
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

    const handleEdit = async () => {
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

            setBranch((prevBranches) =>
                prevBranches.map(item => item.id === editingId ? { ...item, ...branchData } : item)
            ); // Cập nhật danh sách mà không cần fetch lại
            toast.success('Thông tin chi nhánh đã cập nhật', {
                position: "top-right",
            });
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
            setBranch(prevBranches => prevBranches.filter(item => item.id !== id)); // Cập nhật danh sách mà không cần fetch lại
            toast.success('Chi nhánh đã được xóa thành công!', {
                position: "top-right",
            });
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
                                        <button onClick={handleSave}>Lưu</button>
                                        <button onClick={closeInsert}>X</button>
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

export default Branch;
