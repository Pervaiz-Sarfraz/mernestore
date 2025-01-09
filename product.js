import { create } from "zustand";
import { loginurl, mainUrl, productsList, registerurl } from "../utls";

export const useProductStore = create((set) => ({
  products: [],
  user: null,
  token: null,

  setUser: (user, token) => set({ user, token }),
  register: async (userData) => {
    const res = await fetch(registerurl, {
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

  login: async (credentials) => {
    const res = await fetch(loginurl, {
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

  fetchProducts: async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      return { success: false, message: "Please login to view products." };
    }
    console.log('token frontend', token);
    
    try {
      const res = await fetch(productsList, {
        headers: { "Authorization": `Bearer ${token}`},
      });
      const data = await res.json();
      console.log('res of fetching data', data);

      set({ products: data.data });
    } catch (err) {
      console.log(`error in fetch${err}`);
      
      console.log('',);
    }
    },

  // Create product
  createProduct: async (newProduct) => {
    const token = localStorage.getItem("token");
    if (!token) {
      return { success: false, message: "Please login to create a product." };
    }
    console.log('newProductnewProduct', data);

    const res = await fetch(productsList, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
      body: JSON.stringify(newProduct),
    });
    const data = await res.json();
    console.log('datadatadata', data);
    if (data.success) {
      set((state) => ({ products: [...state.products, data.data] }));
    }
    return data;
  },

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
    console.log('datadatadata', data);

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

    const res = await fetch(`${mainUrl}/${pid}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
      body: JSON.stringify(updatedProduct),
    });
    const data = await res.json();
    console.log('datadatadata', data);

    if (data.success) {
      set((state) => ({
        products: state.products.map((product) => (product._id === pid ? data.data : product)),
      }));
    }
    return data;
  },
}));
