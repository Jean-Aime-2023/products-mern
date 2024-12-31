import { create } from 'zustand';

export const useProductStore = create((set) => ({
  products: [],
  setProducts: (products) => set({ products }),
  createProduct: async (newProduct) => {
    if (!newProduct.name || !newProduct.image || !newProduct.price) {
      return { success: false, message: 'Please fill in all the fields' };
    }
    try {
      const res = await fetch('/api/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newProduct),
      });

      if (!res.ok) {
        const error = await res.text();
        return { success: false, message: `Error: ${res.status} - ${error}` };
      }

      const data = await res.json();
      set((state) => ({ products: [...state.products, data] }));
      return { success: true, message: 'Product created successfully!' };
    } catch (err) {
      return { success: false, message: `Request failed: ${err.message}` };
    }
  },
  fetchProducts: async () => {
    try {
      const res = await fetch('/api/products'); // Correct the endpoint
      if (!res.ok) {
        throw new Error(`Error: ${res.status} - ${await res.text()}`);
      }
      const data = await res.json();
      set({ products: data.data });
    } catch (err) {
      console.error(`Failed to fetch products: ${err.message}`);
    }
  },
  deleteProduct: async (id) => {
    try {
      const res = await fetch(`/api/products/${id}`, {
        method: 'DELETE',
      });

      if (!res.ok) {
        const error = await res.text();
        return { success: false, message: `Error: ${res.status} - ${error}` };
      }

      set((state) => ({
        products: state.products.filter((product) => product._id !== id),
      }));

      return { success: true, message: 'Product deleted successfully!' };
    } catch (err) {
      return { success: false, message: `Request failed: ${err.message}` };
    }
  },
  updateProduct: async (id, editedProduct) => {
    try {
      const res = await fetch(`/api/products/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(editedProduct),
      });
  
      if (!res.ok) {
        const error = await res.text();
        return { success: false, message: `Error: ${res.status} - ${error}` };
      }
  
      const data = await res.json();  // Assuming the response has the updated product data
      set((state) => ({
        products: state.products.map((product) =>
          product._id === id ? data.data : product // Use data returned from the API to update the product
        ),
      }));
  
      return { success: true, message: 'Product updated successfully!' };
    } catch (err) {
      return { success: false, message: `Request failed: ${err.message}` };
    }
  },
  
}));
