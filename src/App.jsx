
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Login from './components/Login/Login';
import Qlmt from './components/Quanlymaytinh/Qlmt';
import Qlnd from './components/Quanlynguoidung/Qlnd';

const App = () => {
  return (
    <>
      <ToastContainer />
      <div className="main-content">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/qlmt" element={<Qlmt />} />
          <Route path="/qlnd" element={<Qlnd />} />
        </Routes>
      </div>
    </>
  );
};

export default App;

