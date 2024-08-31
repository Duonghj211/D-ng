import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { logout } from '../../firebase'; // Import logout function from firebase
import './Qlmt.css';
import logo_icon from '../../assets/logo.jpg';
import com_icon from '../../assets/images.jpg';

const Qlmt = () => {
  const [computers] = useState([
    { id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }, { id: 5 },
    { id: 6 }, { id: 7 }, { id: 8 }, { id: 9 }, { id: 10 },
    { id: 11 }, { id: 12 }, { id: 13 }, { id: 14 }, { id: 15 },
    { id: 16 }, { id: 17 }, { id: 18 }, { id: 19 }, { id: 20 },
    { id: 21 }, { id: 22 }, { id: 23 }, { id: 24 }
  ]);

  const getStatus = (id) => (id % 2 === 0 ? 'Close' : 'Open');

  const navigate = useNavigate();

  const handleNavigateToUserManagement = () => {
    navigate('/qlnd');
  };

  const handleLogout = async () => {
    try {
      await logout(); // Call logout function from firebase
      navigate('/'); // Navigate to login page
    } catch (error) {
      console.error("Error during logout:", error.message);
      // Optional: Display user feedback here
    }
  };

  return (
    <div className='qlmt'>
      <div className="left">
        <div className='logo'>
          <img src={logo_icon} alt="Logo" />
          <p>Bùi Hoàng Dương</p>
        </div>
        <ul>
          <li className='key'>Quản lý máy tính</li>
          <li onClick={handleNavigateToUserManagement} role="button" tabIndex="0">Quản lý người dùng</li>
          <li onClick={handleLogout} role="button" tabIndex="0">Đăng xuất</li>
        </ul>
      </div>
      <div className="right">
        {computers.map(computer => (
          <div
            key={computer.id}
            className={`computer ${getStatus(computer.id).toLowerCase()}`}
          >
            <img src={com_icon} alt={`Computer ${computer.id}`} />
            <p>{getStatus(computer.id)}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Qlmt;
