import axios from "axios";

// axios.defaults.baseURL = "http://localhost:5173";

const API_URL = "/api/users/";

const register = async (userData: any) => {
  try {
    const { data } = await axios.post(`${API_URL}/register`, userData);

    if (data) {
      localStorage.setItem("user", JSON.stringify(data));
    }

    return data;
  } catch (error: any) {
    if (import.meta.env.VITE_ENV === "development") {
      throw new Error(`Could not Register: ${error}`);
    } else {
      throw new Error("Registration Failed, Try Again");
    }
  }
};

const logout = () => {
  localStorage.removeItem("user");
};

const login = async (userData: any) => {
  try {
    const { data } = await axios.post(`${API_URL}/login`, userData);

    if (data) {
      localStorage.setItem("user", JSON.stringify(data));
      console.log("Local Storage set");
    }

    return data;
  } catch (error: any) {
    if (import.meta.env.VITE_ENV !== "development") {
      throw new Error(`Could not Login: ${error}`);
    } else {
      throw new Error("Incorrect Email/Password, Try Again");
    }
  }
};

const authService = {
  register,
  logout,
  login,
};

export default authService;
