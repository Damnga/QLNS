import React from 'react';
import { FaEnvelope, FaLock } from 'react-icons/fa';
import './Login.css';
import { useState } from 'react';
const Login = ({isLoginOpen, setIsLoginOpen}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('Email:', email);   

    console.log('Password:', password);
  };
  return (
    <div className='login-container'>
      <div className='login-box'>
        <div className='login-icon'>
          <img src="src/assets/logo.png" alt="logo" className='logo' />
        </div>
        <div className='login-text'>
          <span>Đăng Nhập</span>
        </div>
        <div className='login-form'>
          <form onSubmit={handleSubmit} >
            <div className="input-wrapper">
              <FaEnvelope className="input-icon" />
              <input type="email" placeholder="abc@gmail.com" />
            </div>
            <div className="input-wrapper">
              <FaLock className="input-icon" />
              <input type="password" placeholder="Password" />
            </div>
          </form>
        </div>
        <div className="login-pass-miss">
          <span>Quên Mật Khẩu?</span>
        </div>
        <div className="login-button">
          <button onClick={()=>setIsLoginOpen(false)}>Đăng Nhập</button>
        </div>
      </div>
    </div>
  );
};

export default Login;

