import { MdEdit, MdDelete } from 'react-icons/md';
import { useProductStore } from '../store/product';
import toast, { Toaster } from 'react-hot-toast';
import { useState } from 'react';

const ProductCard = ({ product }) => {
  const { deleteProduct, updateProduct } = useProductStore();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editedProduct, setEditedProduct] = useState({ ...product });

  const handleDelete = async () => {
    if (product._id) {
      const { success, message } = await deleteProduct(product._id);
      if (success) {
        toast.success(message);
      } else {
        toast.error(message);
      }
    }
  };

  const handleEdit = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { success, message } = await updateProduct(product._id, editedProduct);

    if (success) {
      toast.success(message);
    } else {
      toast.error(message);
    }

    handleCloseModal();
  };

  return (
    <div className="w-fit flex flex-col justify-center items-center gap-5 p-5 rounded-xl shadow-md border">
      <Toaster position="top-right" reverseOrder={false} />
      <img src={product.image} alt="img" className="rounded-xl w-72 h-52" />
      <div className="flex w-full justify-between items-center">
        <button onClick={handleEdit} className="p-2 rounded-full border border-gray-400">
          <MdEdit size={25} className="cursor-pointer" />
        </button>
        <div className="flex flex-col items-center justify-center">
          <p>{product.name}</p>
          <p className="font-semibold text-xl">$ {product.price}</p>
        </div>
        <button onClick={handleDelete} className="p-2 rounded-full border border-gray-400">
          <MdDelete size={25} className="cursor-pointer" />
        </button>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed top-0 left-0 w-full h-full bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white lg:w-[30%] lg:p-10 max-lg:w-[60%] max-md:w-[80%] p-7 py-9 rounded-lg w-1/3">
            <form onSubmit={handleSubmit} className="w-full flex flex-col gap-3">
              <h1 className="text-2xl font-semibold">Edit Product</h1>
              <div className="flex flex-col gap-2">
                <label htmlFor="name" className="block">Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={editedProduct.name}
                  onChange={(e) => setEditedProduct({ ...editedProduct, name: e.target.value })}
                  className="border px-3 py-3 rounded-xl focus:border-gray-500 outline-none"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="price" className="block">Price</label>
                <input
                  type="number"
                  id="price"
                  name="price"
                  value={editedProduct.price}
                  onChange={(e) => setEditedProduct({ ...editedProduct, price: e.target.value })}
                  className="border px-3 py-3 rounded-xl focus:border-gray-500 outline-none"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="image" className="block">Image URL</label>
                <input
                  type="text"
                  id="image"
                  name="image"
                  value={editedProduct.image}
                  onChange={(e) => setEditedProduct({ ...editedProduct, image: e.target.value })}
                  className="border px-3 py-3 rounded-xl focus:border-gray-500 outline-none"
                />
              </div>
              <div className="flex justify-between">
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="self-end mt-5 px-5 py-2 rounded-full border border-transparent hover:bg-transparent hover:border-gray-600 bg-slate-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="self-end mt-5 px-5 py-2 rounded-full border border-transparent hover:bg-transparent hover:border-blue-600 bg-blue-600 text-white hover:text-blue-600"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductCard;
