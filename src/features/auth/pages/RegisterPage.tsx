import RegisterForm from '../components/RegisterForm';
import './RegisterPage.css';

const RegisterPage: React.FC = () => (
  <div className="register-container">
    <div className="register-box">
      <h2>Register</h2>
      <RegisterForm />
    </div>
  </div>
);

export default RegisterPage;
