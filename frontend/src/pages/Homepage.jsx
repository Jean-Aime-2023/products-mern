import { useEffect } from "react"
import Hero from "../components/Hero"
import { useProductStore } from "../store/product"
import ProductCard from "../components/ProductCard"

const Homepage = () => {
  const { fetchProducts, products } = useProductStore()
  useEffect(() => {
    fetchProducts()
  }, [fetchProducts])

  console.log(products);

  return (
    <div className="flex flex-col gap-7 justify-center items-center">
      <Hero />
      <p className="text-2xl font-semibold mt-10 mb-7">Recent Products 🚀</p>
      {!products && <img src="https://qfautomation.b-cdn.net/uploads/no-product-found.png" alt="not-found" className="w-96" />}

      <div className="grid gap-5 grid-cols-4 max-lg:grid-cols-3 max-md:grid-cols-2 max-sm:grid-cols-1 mb-10">
        {products.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </div>
  )
}

export default Homepage