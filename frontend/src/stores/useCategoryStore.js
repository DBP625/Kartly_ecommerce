import { create } from "zustand";
import toast from "react-hot-toast";
import axios from "../lib/axios";

export const useCategoryStore = create((set, get) => ({
  categories: [],
  loading: false,

  setCategories: (categories) => set({ categories }),

  fetchCategories: async () => {
    set({ loading: true });
    try {
      const response = await axios.get("/categories");
      set({ categories: response.data, loading: false });
    } catch (error) {
      set({ loading: false });
      toast.error(
        error.response?.data?.message || "Failed to fetch categories",
      );
    }
  },

  createCategory: async (categoryData) => {
    set({ loading: true });
    try {
      const response = await axios.post("/categories", categoryData);
      set((state) => ({
        categories: [...state.categories, response.data.category],
        loading: false,
      }));
      toast.success("Category created successfully");
    } catch (error) {
      set({ loading: false });
      toast.error(error.response?.data?.message || "Failed to create category");
    }
  },
}));
