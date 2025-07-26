import React from 'react';
import { useNavigate } from 'react-router-dom';
import './UserProfilePage.css';
import { useAppSelector, useAppDispatch } from '../../../hooks/hooks';
import { logout } from '../slices/authSlice';

const UserProfilePage: React.FC = () => {
  const user = useAppSelector((state) => state.auth.user);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  if (!user) return <div className="loading">Loading user info...</div>;

  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    navigate('/login');
  };

  return (
    <div className="user-profile-container">
      {user.coverImage && (
        <div
          className="user-cover"
          style={{ backgroundImage: `url(${user.coverImage})` }}
        />
      )}

      <div className="user-info-card">
        <img
          src={user.avatar}
          alt={`${user.fullName} avatar`}
          className="user-avatar"
        />
        <div className="user-details">
          <h1>{user.fullName}</h1>
          <p><strong>Username:</strong> @{user.username}</p>
          <p><strong>Email:</strong> {user.email}</p>
        </div>
        <button className="btn logout-btn" onClick={handleLogout}>Logout</button>
      </div>

      <div className="practice-section">
        <h2>Practice Modules</h2>
        <div className="practice-buttons">
          <button className="btn btn-subjects" onClick={() => navigate('/subjects')}>Go to Subjects</button>
          <button className="btn btn-addition" onClick={() => navigate('/additionquiz')}>Addition Practice</button>
          <button className="btn btn-subtraction" onClick={() => navigate('/subtractionquiz')}>Subtraction Practice</button>
          <button className="btn btn-multiplication" onClick={() => navigate('/multiplicationquiz')}>Multiplication Practice</button>
          <button className="btn btn-division" onClick={() => navigate('/fractionquizconverter')}>Fraction Practice</button>
          <button className="btn btn-series" onClick={() => navigate('/additionquiz')}>Number Series Practice</button>
          <button className="btn btn-series" onClick={() => navigate('/alphabet')}>Alphabet Practice</button>
          <button className="btn btn-series" onClick={() => navigate('/pattern')}>Alphabet Practice</button>
        </div>
      </div>
    </div>
  );
};

export default UserProfilePage;
