import { useState  } from 'react';
import './RegisterForm.css';

interface RegisterFormData {
  email: string;
  password: string;
  avatar: File | null;
  coverImage: File | null;
  username: string;
  fullName: string;
}

const RegisterForm: React.FC = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<RegisterFormData>({
    email: '',
    password: '',
    avatar: null,
    coverImage: null,
    username: '',
    fullName: '',
  });

  const handleChange = (e: any) => {
    const { name, value, files } = e.target;

    if (files && (name === 'avatar' || name === 'coverImage')) {
      setFormData(prev => ({ ...prev, [name]: files[0] }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const nextStep = () => setStep((prev) => Math.min(prev + 1, 3));
  const prevStep = () => setStep((prev) => Math.max(prev - 1, 1));

  const handleSubmit = (e: any) => {
    e.preventDefault();

    // Prepare payload
    const payload = {
      email: formData.email,
      password: formData.password,
      avatar: formData.avatar,       // You may need to upload this file separately
      coverImage: formData.coverImage || null,
      username: formData.username.toLowerCase(),
      fullName: formData.fullName,
    };

    console.log('Register with:', payload);

    // TODO: handle form submission here, e.g. send API request
  };

  return (
    <form className="register-form" onSubmit={handleSubmit}>
      {step === 1 && (
        <>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              id="email"
              value={formData.email}
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
        </>
      )}

      {step === 2 && (
        <>
          <div className="form-group">
            <label htmlFor="avatar">Upload Avatar Image</label>
            <input
              type="file"
              name="avatar"
              id="avatar"
              accept="image/*"
              onChange={handleChange}
              required
            />
            {formData.avatar && <small>Selected: {formData.avatar.name}</small>}
          </div>

          <div className="form-group">
            <label htmlFor="coverImage">Upload Cover Image (optional)</label>
            <input
              type="file"
              name="coverImage"
              id="coverImage"
              accept="image/*"
              onChange={handleChange}
            />
            {formData.coverImage && <small>Selected: {formData.coverImage.name}</small>}
          </div>
        </>
      )}

      {step === 3 && (
        <>
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
            <label htmlFor="fullName">Full Name</label>
            <input
              type="text"
              name="fullName"
              id="fullName"
              value={formData.fullName}
              onChange={handleChange}
              required
            />
          </div>
        </>
      )}

      <div className="form-navigation">
        {step > 1 && (
          <button type="button" onClick={prevStep} className="btn-secondary">
            Previous
          </button>
        )}

        {step < 3 ? (
          <button
            type="button"
            onClick={nextStep}
            className="btn-primary"
          >
            Next
          </button>
        ) : (
          <button type="submit" className="btn-primary">
            Submit
          </button>
        )}
      </div>
    </form>
  );
};

export default RegisterForm;
