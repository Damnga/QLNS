import React from 'react';
import { File, Dot } from 'lucide-react';
import { Link } from 'react-router-dom';

const Report = ({ title, items}) => {
  return (
    <div className="home-dowm-container">
      <div className="home-down-content">
        <div className='home-down-content-icon'><File /></div>
        <div className='home-down-content-text'>{title}</div>
      </div>
      <div className="home-down-container-item">
        {items.map((item) => (
          <Link  to={item.path} className='home-down-container-item-flex' key={item.id}>
            <div className="home-down-container-dot">
              <Dot />
            </div>
            <div className="home-down-container-content">
              {item.name}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Report;
