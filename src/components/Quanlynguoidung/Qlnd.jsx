import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getDocs, collection } from 'firebase/firestore';
import { db, logout } from '../../firebase';
import './Qlnd.css';
import logo_icon from '../../assets/logo.jpg';

const Qlnd = () => {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  // Fetch user data from Firestore
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const userCollection = await getDocs(collection(db, 'users'));
        const userList = userCollection.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setUsers(userList);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  // Handle logout
  const handleLogout = async () => {
    try {
      await logout();
      navigate('/');
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  // Navigate to Qlmt page
  const handleNavigateToQlmt = () => {
    navigate('/qlmt');
  };


  return (
    <div className='qlnd'>
      <div className="left">
        <div className='logo'>
          <img src={logo_icon} alt="Logo" />
          <p>Bùi Hoàng Dương</p>
        </div>
        <ul>
          <li onClick={handleNavigateToQlmt}>Quản lý máy tính</li>
          <li className='active'>Quản lý người dùng</li>
          <li onClick={handleLogout}>Đăng xuất</li>
        </ul>
      </div>
      <div className="right">
        <h2>Danh sách người dùng</h2>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Họ và tên</th>
              <th>Email</th>
              <th>Thời gian sử dụng</th>
              <th>Hành động</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user.id}>
                <td>{user.uid}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.usageTime} giờ</td>
                <td>
                  <button>Edit</button>
                  <button>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Qlnd;
