import { useState } from "react";
 
import type { RootState } from "../../../store/rootReducer";
import { register, type RegisterPayload } from "../slices/authSlice";
import { useAppDispatch, useAppSelector } from "../../../hooks/hooks";
import { useNavigate } from "react-router-dom";
// your root state type

const RegisterForm: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { loading, error } = useAppSelector((state: RootState) => state.auth);

  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<RegisterPayload>({
    email: "",
    password: "",
    avatar: null as File | null,
    coverImage: null as File | null,
    username: "",
    fullName: "",
  });

  const handleChange = (e: any) => {
    const { name, value, files } = e.target;
    if (files && (name === "avatar" || name === "coverImage")) {
      setFormData((prev) => ({ ...prev, [name]: files[0] }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const nextStep = () => setStep((prev) => Math.min(prev + 1, 3));
  const prevStep = () => setStep((prev) => Math.max(prev - 1, 1));

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const success = await dispatch(register(formData));
    console.log(success,"dekhe jara")
    if(success.payload == 200 ){
      navigate('/login')
    }
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
            {formData.coverImage && (
              <small>Selected: {formData.coverImage.name}</small>
            )}
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
          <button type="button" onClick={nextStep} className="btn-primary">
            Next
          </button>
        ) : (
          <button type="submit" className="btn-primary" disabled={loading}>
            {loading ? "Registering..." : "Submit"}
          </button>
        )}
      </div>

      {error && <p className="error-message">{error}</p>}
    </form>
  );
};

export default RegisterForm;
