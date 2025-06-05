import LoginForm from '../components/LoginForm';
import './LoginPage.css'; // Add this line

const LoginPage = () => (
  <div className="login-container">
    <div className="login-box">
      <h2>Login</h2>
      <LoginForm />
    </div>
  </div>
);

export default LoginPage;
