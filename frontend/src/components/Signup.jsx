import React from 'react'
import styled from 'styled-components'
import authService from '../service/authService'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
const Signup = () => {
    const [formData, setFormData] = useState({
        username: '', name: '', email: '', password: ''
    });
    const [errors, setErrors] = useState([]);
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
        setErrors([]);

        try {
            const result = await authService.signup(formData);
            if (result.success) {
                navigate('/menu');
            }
            else {
                if (result.errors) {
                    setErrors(result.errors);
                } else {
                    setErrors([result.message]);
                }
            }
        } catch (error) {
            setErrors(['Signup failed. Please try again.']);
        } finally {
            setLoading(false);
        }
    };
    return (
        <SignupContainer className='signupContainer'>
            <form action="" onSubmit={handleSubmit}>
                <h2>Create Account</h2>
                {errors.length > 0 && (
                    <div className="error-messages">
                        {errors.map((error, index) => (
                            <div key={index} className='error-message'>{error}</div>
                        ))}
                    </div>
                )}

                <div className='form-group'>
                    <input type="text" name='name' placeholder='Enter your full name' value={formData.name} onChange={handleChange} required />
                </div>
                <div className='form-group'>
                    <input type="username" name='username' placeholder='Enter username' value={formData.username} onChange={handleChange} required />
                </div>
                <div className='form-group'>
                    <input type="email" name='email' placeholder='Enter your email' value={formData.email} onChange={handleChange} required />
                </div>
                <div className='form-group'>
                    <input type="password" name='password' placeholder='Enter password' value={formData.password} onChange={handleChange} required minLength="6" />
                </div>
                <div>
                    <button type="submit" disabled={loading} className='btn'>{loading ? 'Creating account' : 'signup'}</button>
                </div>
            </form>
        </SignupContainer>
    )
}

export default Signup
const SignupContainer = styled.div`
.signupContainer{
// display:flex;
}
form{
    display:flex;
    flex-direction:column;
    // justify-content:space-between;
    align-items:center;
    gap:30px;
        // background-color: rgb(242 240 230);
    border-radius:10px;
}
input{
padding:8px;
width:300px;
}
`;