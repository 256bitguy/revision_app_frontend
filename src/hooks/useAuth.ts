import { useSelector } from "react-redux";
import type { RootState } from "../store/rootReducer";
 
const useAuth = () => {
  const { user, token: storedToken } = useSelector((state: RootState) => state.auth);

  // fallback to localStorage token if not in state (optional)
  const token = storedToken || localStorage.getItem("accessToken");

  return {
    user,
    token,
    isAuthenticated: Boolean(user && token),
  };
};

export default useAuth;
