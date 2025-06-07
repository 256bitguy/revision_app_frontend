import { useEffect, useState } from 'react';
import axiosInstance from '../../services/axiosInstance';
import './AllUsers.css';

interface User {
  _id: string;
  username: string;
  fullName: string;
  avatar: string;
  createdAt: string;
}

const AllUsers: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axiosInstance.get('/users/allusers'); // Adjust if needed
        setUsers(res.data);
      } catch (err) {
        console.error('Failed to fetch users:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  if (loading) return <p className="loading">Loading users...</p>;

  return (
    <div className="users-container">
      {users.map((user) => (
        <div className="user-card" key={user._id}>
          <img src={user.avatar} alt={user.username} className="user-avatar" />
          <div className="user-info">
            <h3>{user.fullName}</h3>
            <p>@{user.username}</p>
            <p className="created-at">Joined on {new Date(user.createdAt).toLocaleDateString()}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AllUsers;
