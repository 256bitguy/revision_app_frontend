import React from 'react';
import './UserProfilePage.css';

interface User {
  fullName: string;
  avatar: string;
  coverImage?: string;
  email: string;
  username: string;
}

const mockUser: User = {
  fullName: "John Doe",
  avatar: "https://i.pravatar.cc/150?img=3",
  coverImage: "https://picsum.photos/800/200",
  email: "john.doe@example.com",
  username: "johndoe",
};

const UserProfilePage: React.FC = () => {
  const user = mockUser;

  return (
    <div className="user-profile-container">
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
