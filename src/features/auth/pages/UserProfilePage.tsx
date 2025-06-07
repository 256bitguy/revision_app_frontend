import React from 'react';
import { useNavigate } from 'react-router-dom';
import './UserProfilePage.css';
import { useAppSelector, useAppDispatch } from '../../../hooks/hooks';
import { logout } from '../slices/authSlice';
 
const UserProfilePage: React.FC = () => {
  const user = useAppSelector((state) => state.auth.user);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  if (!user) return <div>Loading user info...</div>;

  const handleLogout = () => {
    dispatch(logout());
    // If you store tokens in localStorage/sessionStorage, clear them here as well
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    navigate('/login'); // or wherever your login page is
  };

  return (
    <div className="user-profile-container">
      <div className="action-buttons">
        <button className="btn btn-primary" onClick={() => navigate('/subjects')}>
          Go to Subjects
        </button>
        <button className="btn btn-secondary" onClick={handleLogout}>
          Logout
        </button>
      </div>

      {user.coverImage && (
        <div
          className="user-cover"
          style={{ backgroundImage: `url(${user.coverImage})` }}
        />
      )}

      <div className="user-info-section">
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
      </div>
    </div>
  );
};

export default UserProfilePage;
