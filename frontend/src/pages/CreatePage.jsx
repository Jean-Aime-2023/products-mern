import { useState } from "react";
import { useProductStore } from "../store/product";
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const CreatePage = () => {
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    image: ""
  });

  const { createProduct } = useProductStore();
  const navigate = useNavigate();  // To handle redirection

  const handleCreateProduct = async (e) => {
    e.preventDefault();
    const { success, message } = await createProduct(newProduct);
    if (success) {
      toast.success(message);
      // Clear the form after successful creation
      setNewProduct({ name: "", price: "", image: "" });
      // Redirect to the homepage after product creation
      navigate("/");
    } else {
      toast.error(message);
    }
  };

  const isFormValid = newProduct.name && newProduct.price && newProduct.image;

  return (
    <div className="w-[70%] max-md:w-[85%]">
      <Toaster position="top-right" reverseOrder={false} />
      <form className="w-full flex flex-col gap-3">
        <h1 className="text-2xl font-semibold">Create a new product</h1>
        <div className="flex flex-col gap-2">
          <label htmlFor="name">Name</label>
          <input 
            type="text" 
            className="border px-3 py-3 rounded-xl focus:border-gray-500 outline-none" 
            placeholder="Product name" 
            name="name" 
            id="name" 
            value={newProduct.name} 
            onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })} 
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="price">Price</label>
          <input 
            type="number" 
            className="border px-3 py-3 rounded-xl focus:border-gray-500 outline-none" 
            placeholder="Product Price" 
            name="price" 
            id="price" 
            value={newProduct.price} 
            onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })} 
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="image">Image</label>
          <input 
            className="border px-3 py-3 rounded-xl focus:border-gray-500 outline-none" 
            placeholder="Product image" 
            name="image" 
            id="image" 
            value={newProduct.image} 
            onChange={(e) => setNewProduct({ ...newProduct, image: e.target.value })} 
          />
        </div>
        <button 
          type="submit" 
          onClick={handleCreateProduct} 
          className="px-5 py-2 rounded-full border border-transparent hover:bg-transparent hover:border-blue-600 bg-blue-600 text-white hover:text-blue-600 self-end mt-5"
          disabled={!isFormValid}  // Disable the button if the form is incomplete
        >
          Create
        </button>
      </form>
    </div>
  );
};

export default CreatePage;
