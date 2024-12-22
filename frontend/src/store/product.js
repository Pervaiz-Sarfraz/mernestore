import { create } from "zustand";

export const useProductStore = create((set) => ({
  products: [],
  user: null,
  token: null,

  // Set user info (after login/register)
  setUser: (user, token) => set({ user, token }),

  // Register user
  register: async (userData) => {
    const res = await fetch("/api/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });
    const data = await res.json();
    if (data.token) {
      set({ user: data.user, token: data.token });
      localStorage.setItem("token", data.token);
    }
    return data;
  },

  // Login user
  login: async (credentials) => {
    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    });
    const data = await res.json();
    if (data.token) {
      set({ user: data.user, token: data.token });
      localStorage.setItem("token", data.token);
    }
    return data;
  },

  // Logout user
  logout: () => {
    set({ user: null, token: null });
    localStorage.removeItem("token");
  },

  // Fetch products (only if authenticated)
  fetchProducts: async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      return { success: false, message: "Please login to view products." };
    }

    const res = await fetch("/api/products", {
      headers: { "Authorization": `Bearer ${token}` },
    });
    const data = await res.json();
    set({ products: data.data });
  },

  // Create product
  createProduct: async (newProduct) => {
    const token = localStorage.getItem("token");
    if (!token) {
      return { success: false, message: "Please login to create a product." };
    }

    const res = await fetch("/api/products", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
      body: JSON.stringify(newProduct),
    });
    const data = await res.json();
    if (data.success) {
      set((state) => ({ products: [...state.products, data.data] }));
    }
    return data;
  },

  // Delete product
  deleteProduct: async (pid) => {
    const token = localStorage.getItem("token");
    if (!token) {
      return { success: false, message: "Please login to delete a product." };
    }

    const res = await fetch(`/api/products/${pid}`, {
      method: "DELETE",
      headers: { "Authorization": `Bearer ${token}` },
    });
    const data = await res.json();
    if (data.success) {
      set((state) => ({ products: state.products.filter((product) => product._id !== pid) }));
    }
    return data;
  },

  // Update product
  updateProduct: async (pid, updatedProduct) => {
    const token = localStorage.getItem("token");
    if (!token) {
      return { success: false, message: "Please login to update a product." };
    }

    const res = await fetch(`/api/products/${pid}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
      body: JSON.stringify(updatedProduct),
    });
    const data = await res.json();
    if (data.success) {
      set((state) => ({
        products: state.products.map((product) => (product._id === pid ? data.data : product)),
      }));
    }
    return data;
  },
}));
