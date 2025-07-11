import { useState } from 'react';
import './LoginForm.css';

import { useAppDispatch, useAppSelector } from '../../../hooks/hooks';
import { loginUser } from '../slices/authAPI';
import { Link, useNavigate } from 'react-router-dom';
 

interface LoginFormData {
  username: string;
  password: string;
}
interface Value {
  type: string,
  payload :any,
  meta:any
}
const LoginForm: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { loading, error } = useAppSelector((state) => state.auth);

  const [formData, setFormData] = useState<LoginFormData>({
    username: '',
    password: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const value:Value = await dispatch(loginUser(formData));
    const username =value.payload.data.user.username
   
    if (value) {
     
    navigate(`/profile/${username}`);
    }
  };

  return (
    <>
      <form className="login-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            name="username"
            id="username"
            value={formData.username}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            id="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit" className="login-submit" disabled={loading}>
          {loading ? 'Logging in...' : 'Login'}
        </button>

        {error && <p className="error-message">{error}</p>}
      </form>

      <div style={{ marginTop: '12px', textAlign: 'center' }}>
        <button
          type="button"
          className="register-button"
          onClick={() => navigate('/register')}
          style={{
            background: 'transparent',
            border: 'none',
            color: '#007bff',
            cursor: 'pointer',
            fontSize: '0.9rem',
            textDecoration: 'underline',
            padding: 0,
          }}
        >
          Don't have an account? Register
        </button>

      </div>
      <div className='others'>

              <Link to="/users" className="landing-button">See Others</Link>
      </div>
    </>
  );
};

export default LoginForm;
