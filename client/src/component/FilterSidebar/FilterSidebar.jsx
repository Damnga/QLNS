import React from 'react';
import "./FilterSidebar.css";
import { useEffect } from 'react';
const FilterSidebar = (open) => {
  useEffect(() => {
  }, [open]);
      return (
        <div className='filtersidebar'>
          <div className="filtersidebar-title">
              Lọc Theo
          </div>
          <div className='gap' >
            <select className="filtersidebar-select-up">
              <option className='option' value="">Được Giao Cho</option>
            </select>
          </div>
          <div className='gap' >
            <select className="filtersidebar-select-middle">
              <option className='option' value="">Được Tạo Bởi</option>
            </select>
          </div>
          <div className="filtersidebar-title2">
            Chỉnh sửa bộ lọc
          </div>
          <div className='gap' >
            <select className="filtersidebar-select-up">
              <option className='option' value="">Nhãn</option>
            </select>
          </div>
          <div className="filtersidebar-title2">
            Hiện nhãn
          </div>
          <div className="filtersidebar-title">
            Lưu bộ lọc
          </div>
          <div className="filtersidebar-form">
            <form>
              <input className="input"  type="text" placeholder="Tên bộ loc"/>
            </form>
          </div>
        </div>
      );
}

export default FilterSidebar
