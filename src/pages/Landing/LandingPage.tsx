import { Link, useNavigate } from 'react-router-dom';
import './LandingPage.css';
import { useAppSelector } from '../../hooks/hooks';
import { useEffect, useState } from 'react';

const goodThoughts = [
  "Every expert was once a beginner.",
  "Small steps every day lead to big results.",
  "You're one step closer to your goal!",
  "Learning never exhausts the mind.",
  "Consistency is the key to mastery."
];

const LandingPage = () => {
  const navigate = useNavigate();
  const user = useAppSelector((state) => state.auth.user);
  const token = useAppSelector((state) => state.auth.token);

  const [showGreeting, setShowGreeting] = useState(true);
  const [thought, setThought] = useState('');

  useEffect(() => {
    setThought(goodThoughts[Math.floor(Math.random() * goodThoughts.length)]);

    const timer = setTimeout(() => {
      setShowGreeting(false);
      if (token && user) {
        navigate(`/profile/${user.username}`);
      } else {
        navigate('/login');
      }
    }, 5000);

    return () => clearTimeout(timer);
  }, [token, user, navigate]);

  if (showGreeting) {
    return (
      <div className="greeting-container">
        <div className="greeting-card">
          <h2>
            Welcome back,{" "}
            <span className="username">{user?.fullName || "USER"}</span> 👋
          </h2>
          <p className="thought">"{thought}"</p>
        </div>
      </div>
    );
  }

  return (
    <div className="landing-container">
      <div className="landing-box">
        <h5 className="app-name">Revision App</h5>
        <h1 className="welcome-heading">Welcome to Our App</h1>
        <div className="landing-links">
          <Link to="/login" className="landing-button">Login</Link>
          <Link to="/users" className="landing-button">See Others</Link>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
