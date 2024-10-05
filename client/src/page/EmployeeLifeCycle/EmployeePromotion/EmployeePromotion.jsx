import React from 'react'
import "./EmployeePromotion.css";
import FilterHeader from '../../../component/FilterHeader/FilterHeader';
import FilterSidebar from '../../../component/FilterSidebar/FilterSidebar';
import { useState } from 'react';
import { Filter} from 'lucide-react';
const EmployeePromotion = () => {
  const data = [
    {id:'1', ma: 'HR-LPOL-2024-00007',name:"dam thi nga",status:"thực tập",ngay_nhan_viec:"19/05/2003",phongban:"bán hàng",chucdanh:"nhân viên"},
    {id:'2', ma: 'HR-LPOL-2024-00007',name:"dam thi nga",status:"thực tập",ngay_nhan_viec:"19/05/2003",phongban:"bán hàng",chucdanh:"nhân viên" },
    {id:'3', ma: 'HR-LPOL-2024-00007',name:"dam thi nga",status:"thực tập",ngay_nhan_viec:"19/05/2003",phongban:"bán hàng",chucdanh:"nhân viên" },
    {id:'4', ma: 'HR-LPOL-2024-00007',name:"dam thi nga",status:"thực tập",ngay_nhan_viec:"19/05/2003",phongban:"bán hàng",chucdanh:"nhân viên" },
    {id:'5', ma: 'HR-LPOL-2024-00007',name:"dam thi nga",status:"thực tập",ngay_nhan_viec:"19/05/2003",phongban:"bán hàng" ,chucdanh:"nhân viên"},
    {id:'6', ma: 'HR-LPOL-2024-00007',name:"dam thi nga",status:"thực tập",ngay_nhan_viec:"19/05/2003",phongban:"bán hàng" ,chucdanh:"nhân viên"},
    {id:'7', ma: 'HR-LPOL-2024-00007',name:"dam thi nga",status:"thực tập",ngay_nhan_viec:"19/05/2003",phongban:"bán hàng" ,chucdanh:"nhân viên"},
    {id:'8', ma: 'HR-LPOL-2024-00007',name:"dam thi nga",status:"thực tập",ngay_nhan_viec:"19/05/2003",phongban:"bán hàng" ,chucdanh:"nhân viên"},
    {id:'9', ma: 'HR-LPOL-2024-00007',name:"dam thi nga",status:"thực tập" ,ngay_nhan_viec:"19/05/2003",phongban:"bán hàng",chucdanh:"nhân viên"},
    {id:'10', ma: 'HR-LPOL-2024-00007',name:"dam thi nga",status:"thực tập",ngay_nhan_viec:"19/05/2003",phongban:"bán hàng",chucdanh:"nhân viên" },
    {id:'11', ma: 'HR-LPOL-2024-00007',name:"dam thi nga",status:"thực tập",ngay_nhan_viec:"19/05/2003",phongban:"bán hàng",chucdanh:"nhân viên" },
    {id:'12', ma: 'HR-LPOL-2024-00007',name:"dam thi nga",status:"thực tập" ,ngay_nhan_viec:"19/05/2003",phongban:"bán hàng",chucdanh:"nhân viên"},
    {id:'13', ma: 'HR-LPOL-2024-00007',name:"dam thi nga",status:"thực tập" ,ngay_nhan_viec:"19/05/2003",phongban:"bán hàng",chucdanh:"nhân viên"},
    {id:'14', ma: 'HR-LPOL-2024-00007',name:"dam thi nga",status:"thực tập" ,ngay_nhan_viec:"19/05/2003",phongban:"bán hàng",chucdanh:"nhân viên"},
    {id:'15', ma: 'HR-LPOL-2024-00007',name:"dam thi nga",status:"thực tập",ngay_nhan_viec:"19/05/2003",phongban:"bán hàng",chucdanh:"nhân viên" },
    {id:'16', ma: 'HR-LPOL-2024-00007',name:"dam thi nga",status:"thực tập",ngay_nhan_viec:"19/05/2003",phongban:"bán hàng" ,chucdanh:"nhân viên"},
    {id:'17', ma: 'HR-LPOL-2024-00007',name:"dam thi nga",status:"thực tập",ngay_nhan_viec:"19/05/2003",phongban:"bán hàng" ,chucdanh:"nhân viên"},
    {id:'18', ma: 'HR-LPOL-2024-00007',name:"dam thi nga",status:"thực tập",ngay_nhan_viec:"19/05/2003",phongban:"bán hàng" ,chucdanh:"nhân viên"},
    {id:'19', ma: 'HR-LPOL-2024-00007',name:"dam thi nga",status:"thực tập",ngay_nhan_viec:"19/05/2003",phongban:"bán hàng",chucdanh:"nhân viên" },
    {id:'20', ma: 'HR-LPOL-2024-00007',name:"dam thi nga",status:"thực tập",ngay_nhan_viec:"19/05/2003",phongban:"bán hàng" ,chucdanh:"nhân viên"},
    {id:'21', ma: 'HR-LPOL-2024-00007',name:"dam thi nga",status:"thực tập" ,ngay_nhan_viec:"19/05/2003",phongban:"bán hàng",chucdanh:"nhân viên"},
    {id:'22', ma: 'HR-LPOL-2024-00007',name:"dam thi nga",status:"thực tập" ,ngay_nhan_viec:"19/05/2003",phongban:"bán hàng",chucdanh:"nhân viên"},
    {id:'23', ma: 'HR-LPOL-2024-00007',name:"dam thi nga",status:"thực tập" ,ngay_nhan_viec:"19/05/2003",phongban:"bán hàng",chucdanh:"nhân viên"},
    {id:'24', ma: 'HR-LPOL-2024-00007',name:"dam thi nga",status:"thực tập",ngay_nhan_viec:"19/05/2003",phongban:"bán hàng" ,chucdanh:"nhân viên"},
    {id:'25', ma: 'HR-LPOL-2024-00007',name:"dam thi nga",status:"thực tập" ,ngay_nhan_viec:"19/05/2003",phongban:"bán hàng",chucdanh:"nhân viên"},
]
const [selectAll, setSelectAll] = useState(false);
const [selectedItems, setSelectedItems] = useState(data.map(() => false));


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
      const allChecked = updatedSelectedItems.every((item) => item);
      setSelectAll(allChecked);
  };
  return (
    <div className='employee-promotion'>
        <FilterHeader/>
        <FilterSidebar/>
        <div className='employee-promotion-table'>
        <div className="employee-promotion-table-header">
              <div className="employee-promotion-search-filter">
                  <input className="employee-promotion-search-filter-input" type="text" placeholder='Tìm Kiếm' />
              </div>
              <div className="employee-promotion-insert">
                  <button className='employee-promotion-insert-button'> + Thêm Đề Bạt </button>
              </div>
              <div className="employee-promotion-filter">
                  <button className='employee-promotion-filter-coponent'><Filter className="filter-icon"/><span>Bộ Lọc</span></button>
                  <button className='employee-promotion-filter-coponent'><div className="filter-icon"/><span>Tác Vụ</span></button>
              </div>
        </div>
        <div className="employee-promotion-table-filter">
        <div className="employee-promotion-table-contain">
            <div className="employee-promotion-format-title">
            <b><input type="checkbox" checked={selectAll} 
                        onChange={handleSelectAllChange} /></b>
            <b>Mã</b>
            <b>Tên</b>
            <b>Trạng Thái</b>
            <b>Ngày Nhận Việc</b>
            <b>Phòng Ban</b>
            <b>Chức Danh</b>
        </div>
            {data.map((item,index) => {
              return (
              <div  className='employee-promotion-format' key={item.id}>
                    <td ><input type="checkbox"  checked={selectedItems[index]} 
                            onChange={handleItemChange(index)} /></td>
                    <td >{item.id}</td>
                    <td >{item.name}</td>
                    <td >{item.status}</td>
                    <td >{item.ngay_nhan_viec}</td>
                    <td >{item.phongban}</td>
                    <td >{item.chucdanh}</td>
              </div>
              );
            })}
        </div>
        </div>
      </div>
    </div>
  )
}

export default EmployeePromotion