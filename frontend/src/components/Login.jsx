// File: frontend/src/components/Login.jsx
import React from 'react'
import { useState } from 'react'
import authService from '../service/authService'
import { useAuth } from '../Context/authContext'
import { Link, useNavigate } from 'react-router-dom'
import styled from 'styled-components'
const Login = () => {
  const { login } = useAuth(); //using authContext to get login function
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError([]);
    try {
      const result = await login(formData.email, formData.password); 
      console.log("The user is", result);
      if (result.success) {
        if (result.user && result.user.role === 'admin') {
          window.location.href = `http://localhost:5174/?token=${result.token}`;
        }
        else {
          navigate('/')
        }
      }
      else {
        setError(result.message);
      }
    } catch (error) {
      setError('login failed.Please try again later');

    }
    finally {
      setLoading(false);
    }
  };
  return (
    <LoginContainer className='loginContainer'>
      <form action="" onSubmit={handleSubmit}>
        <h2>Login to your account</h2>
        {error && <div className='error-message'>{error}</div>}
        <div className="formGroup">
          <input type="text" name='email' placeholder='Enter Email or Username' value={formData.email} onChange={handleChange} />
        </div>
        <div className="formGroup">
          <input type="password" name='password' placeholder='Enter password' value={formData.password} onChange={handleChange} />
        </div>
       
        <div>
          <button type='submit' className='btn' disabled={loading}>{loading ? 'Logging in...' : 'Login'}</button>
        </div>
        <p>doesn't have an account <Link to='/signup'><span>create account</span></Link></p>
      </form>
    </LoginContainer>
  )
}

export default Login;
const LoginContainer = styled.div`
.loginContainer{
  display:flex;
  align-items:center;
  justify-content:center;
  }

  // h2{
  // color:bleach;
  // }
  .error-message{
  color:red;
  }
  form{
  display:flex;
  flex-direction:column;
  justify-content:center;
  align-items:center;
gap:15px;
  }
`; 