import axios from "axios";
import toast from "react-hot-toast";
import { create } from "zustand";
export const useAuthStore = create((set) => ({
  user: null,
  isSigninUp: false,
  isAuthCheck: true,
  isLoggingOut: false,
  isLogginIn: false,
  signup: async (creadentials) => {
    set({ isSigninUp: true });
    try {
      const response = await axios.post("/api/v1/auth/signup", creadentials);
      set({ user: response.data.user, isSigninUp: false });
      toast.success("Account created Successfully");
    } catch (error) {
      toast.error(error.response.data.message || "Signin failed");
      set({ isSigninUp: false, user: null });
    }
  },
  login: async (creadentials) => {
    set({ isLogginIn: true });
    try {
      const response = await axios.post("/api/v1/auth/login" , creadentials);
      set({ user: response.data.user, isLogginIn: false });
      toast.success("Logged in Successfully");
    } catch (error) {
      toast.error(error.response.data.message || "Login failed");
      set({ isLogginIn: false, user: null });
    }
  },
  logout: async () => {
    set({ isLoggingOut: true });
    try {
      await axios.post("/api/v1/auth/logout");
      set({ user: null, isLoggingOut: false });
      toast.success("Logged out Successfully")
    } catch (error) {
      set({ isLoggingOut: false });
      toast.error(error.response.data.message || "logout failed");
    }
  },
  authCheck: async () => {
    set({ isAuthCheck: true });
    try {
      const response = await axios.get("/api/v1/auth/check");
      set({ user: response.data.user, isAuthCheck: false });
    } catch (error) {
      set({ isAuthCheck: false, user: null });
    }
  },
}));
