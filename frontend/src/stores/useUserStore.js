import { create } from "zustand";
import axios from "../lib/axios";
import { toast } from "react-hot-toast";
import { Check } from "lucide-react";

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  FacebookAuthProvider,
  GoogleAuthProvider,
  signOut,
} from "firebase/auth";

export const useUserStore = create((set, get) => ({
  user: null,
  loading: false,
  checkingAuth: true,

  signup: async ({ name, email, password, confirmPassword }) => {
    set({ loading: true });
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      set({ loading: false });
      return;
    }
    try {
      const res = await axios.post("/auth/signup", { name, email, password });
      set({ user: res.data.user, loading: false });
      toast.success("Account created successfully!");
    } catch (error) {
      set({ loading: false });
      toast.error(
        error.response?.data?.message || "Signup failed. Please try again.",
      );
    }
  },

  socialLogin: async (providerName = "google") => {
    try {
      set({ loading: true });

      // Get auth using helper function
      const { auth } = await import("../lib/firebase");

      let authProvider;
      if (providerName === "google") {
        authProvider = new GoogleAuthProvider();
      } else if (providerName === "facebook") {
        authProvider = new FacebookAuthProvider();
      } else {
        throw new Error("Unsupported provider");
      }

      const result = await signInWithPopup(auth, authProvider);
      const idToken = await result.user.getIdToken();

      const res = await axios.post("/auth/social-login", { idToken });
      set({ user: res.data.user, loading: false });
      toast.success("Login successful!");
    } catch (error) {
      set({ loading: false });
      console.error("Social login error:", error);
      toast.error(error.message || "Social login failed. Please try again.");
    }
  },

  login: async (email, password) => {
    set({ loading: true });
    try {
      const res = await axios.post("/auth/login", { email, password });
      set({ user: res.data.user, loading: false });
      toast.success("Login successful!");
    } catch (error) {
      set({ loading: false });
      toast.error(
        error.response?.data?.message || "Login failed. Please try again.",
      );
    }
  },

  checkAuth: async () => {
    set({ checkingAuth: true });
    try {
      const response = await axios.get("/auth/profile");
      set({ user: response.data, checkingAuth: false });
    } catch (error) {
      set({ checkingAuth: false, user: null });
      if (error.response?.status !== 401) {
        console.log("Auth check failed:", error);
      }
    }
  },

  logout: async () => {
    try {
      await axios.post("/auth/logout");
      set({ user: null });
      toast.success("Logged out successfully!");
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Logout failed. Please try again.",
      );
    }
  },
}));
