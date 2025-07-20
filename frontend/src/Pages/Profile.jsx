import React, { useContext, useState } from 'react';
import styled from 'styled-components';
import { useAuth } from '../Context/authContext';
import { Link } from 'react-router-dom';
import { assets } from '../assets/assets';

const Profile = () => {
  const { user, isAuthenticated, loading, logout } = useAuth();

  if (loading) return <Loading>Loading...</Loading>;
  if (!isAuthenticated) return <Message>Please log in to view your profile.</Message>;

  return (
    <ProfileContainer>
      <WelcomeText>Welcome, <span>{user.name}</span> <span><img src={assets.welcome} alt='' height={40} width={40} /></span> </WelcomeText>
      <ProfileCard>
        <ProfileImage src={assets.food_icon} alt="User Icon" />
        <Details>
          <h3>{user.name}</h3>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Role:</strong> {user.role}</p>
          <StyledButton onClick={logout}>Logout</StyledButton>
        </Details>
      </ProfileCard>
    </ProfileContainer>
  );
};

export default Profile;

const ProfileContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 3rem 1rem;
  min-height: 100vh;
  color: #fff;
`;

const WelcomeText = styled.h2`
  font-size: 2rem;
  margin-bottom: 1rem;
  color: rgb(244, 178, 65);
  text-align: center;
`;

const ProfileCard = styled.div`
  // background-color: rgba(255, 255, 255, 0.1);
    background-color: #ff9472;

  backdrop-filter: blur(8px);
  border-radius: 20px;
  padding: 2rem;
  max-width: 400px;
  width: 100%;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.3);
  text-align: center;
`;

const ProfileImage = styled.img`
  border-radius: 50%;
  border: 3px solid #fff;
  width: 80px;
  height: 80px;
  object-fit: cover;
  margin-bottom: 1rem;
`;

const Details = styled.div`
  h3 {
    font-size: 1.5rem;
    margin-bottom: 0.5rem;
  }

  p {
    margin: 0.3rem 0;
    font-size: 1rem;
    color: #f1f1f1;
  }
`;

const StyledButton = styled.button`
  background: #ff6b6b;
  border: none;
  padding: 0.8rem 1.5rem;
  border-radius: 50px;
  color: #fff;
  font-size: 1rem;
  margin-top: 1rem;
  cursor: pointer;
  transition: background 0.3s ease, transform 0.2s ease;

  &:hover {
    background: #ff4757;
    transform: translateY(-2px);
  }
`;

const Loading = styled.div`
  text-align: center;
  padding: 3rem;
  font-size: 1.5rem;
  color: #555;
`;

const Message = styled.div`
  text-align: center;
  padding: 3rem;
  font-size: 1.2rem;
  color: #333;
`;
