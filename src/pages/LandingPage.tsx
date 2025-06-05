import { Link } from 'react-router-dom';
import './LandingPage.css'; // Import the CSS file

const LandingPage = () => (
  <div className="landing-container">
    <div className="landing-box">
      <h1>Welcome to Our App</h1>
      <div className="landing-links">
        <Link to="/login" className="landing-button">Login</Link>
        <Link to="/register" className="landing-button">Register</Link>
      </div>
    </div>
  </div>
);

export default LandingPage;
