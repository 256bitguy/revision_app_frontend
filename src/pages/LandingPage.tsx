import { Link } from 'react-router-dom';
import './LandingPage.css'; // Import the CSS file
import axiosInstance from '../services/axiosInstance';

const LandingPage = () => {
  const value = axiosInstance.post('/users/allusers');
  return(
  <div className="landing-container">
    <div className="landing-box">
      <h1>Welcome to Our App</h1>
      <div className="landing-links">
        <Link to="/login" className="landing-button">Login</Link>
        <Link to="/register" className="landing-button">Register</Link>
        <Link to="/subjects" className="landing-button">Subjects</Link>
      </div>
    </div>
  </div>
  )
}

export default LandingPage;
