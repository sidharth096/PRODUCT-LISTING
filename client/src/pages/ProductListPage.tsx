import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../app/store";
import {
  setProducts,
  setFilteredProducts,
} from "../features/product/productSlice";
import api from "../common/api";
import Axios from "../utils/Axios";
import { FaStar } from "react-icons/fa6";
import { useNavigate } from "react-router";

const ProductListPage: React.FC = () => {
  const filteredProducts = useSelector(
    (state: RootState) => state.product.filteredProducts
  );
  const dispatch = useDispatch<AppDispatch>();
 const navigate = useNavigate()
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [loading, setLoading] = useState<boolean>(false);

  // Pagination State
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 6;

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await Axios(api.fetchCategories);
        const data = response.data;
        dispatch(setProducts(data));
        setCategories(data);
      } catch (error) {
        console.error("Failed to fetch categories:", error);
      }
    };

    fetchCategories();
    fetchProducts("all");
  }, []);

  const fetchProducts = async (category: string) => {
    setLoading(true);
    try {
      const url =
        category === "all"
          ? api.fetchProducts.url
          : api.fetchProductByCategory.url.replace(":category", category);

      const response = await Axios({ method: "GET", url });

      if (Array.isArray(response.data)) {
        dispatch(setProducts(response.data));
        dispatch(setFilteredProducts(response.data));
      } else {
        dispatch(setProducts([]));
        dispatch(setFilteredProducts([]));
      }
    } catch (error) {
      console.error("Failed to fetch products:", error);
      dispatch(setProducts([]));
      dispatch(setFilteredProducts([]));
    } finally {
      setLoading(false);
      setCurrentPage(1);
    }
  };

  // Pagination Logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredProducts.slice(
    indexOfFirstItem,
    indexOfLastItem
  );
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

  return (
    <div className="container mx-auto p-4 flex flex-col lg:flex-row gap-6 mt-6">
      {/* Sidebar */}
      <aside className="lg:w-1/4 w-full bg-white p-4 rounded-lg shadow-md">
        <h3 className="text-xl font-semibold mb-4">Filter by Category</h3>
        <ul className="space-y-2">
          <li>
            <button
              className={`w-full text-left p-2 rounded-md ${
                selectedCategory === "all"
                  ? "bg-prirmary-dark text-white"
                  : "hover:bg-secondary-extra-lightlight"
              }`}
              onClick={() => {
                setSelectedCategory("all");
                fetchProducts("all");
              }}
            >
              All Products
            </button>
          </li>
          {categories.map((category) => (
            <li key={category}>
              <button
                className={`w-full text-left p-2 rounded-md ${
                  selectedCategory === category
                    ? "bg-prirmary-dark text-white"
                    : "hover:bg-secondary-extra-light"
                }`}
                onClick={() => {
                  setSelectedCategory(category);
                  fetchProducts(category);
                }}
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </button>
            </li>
          ))}
        </ul>
      </aside>

      {/* Product List */}
      <div className="lg:w-3/4 w-full">
        {loading && (
          <div className="flex justify-center items-center h-[50vh] w-full">
            <p className="text-xl font-semibold text-secondary-dark">
              Loading products...
            </p>
          </div>
        )}

        {!loading && currentItems.length === 0 && (
          <div className="flex justify-center items-center h-[50vh] w-full">
            <p className="text-lg font-semibold text-gray-500">
              No products available.
            </p>
          </div>
        )}

        {!loading && currentItems.length > 0 && (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {currentItems.map((product) => (
                <div
                  key={product.id}
                  role="button"
                  className="bg-white rounded-lg shadow-lg p-4 flex flex-col items-center border border-secondary-extra-light cursor-pointer hover:border-prirmary-light transition-shadow duration-300"
                  onClick={() => navigate(`/product/${product.id}`)}  >
                  <img
                    src={product.image}
                    alt={product.title}
                    className="w-40 h-40 object-contain mb-4"
                  />
                  <h3 className="text-lg font-semibold text-secondary-dark text-center">
                    {product.title}
                  </h3>
                  <p className="text-secondary-light text-sm text-center">
                    {product?.description?.slice(0, 80)}
                  </p>
                  <p className="text-lg font-bold text-secondary-dark mt-2">
                    ${product.price}
                  </p>
                  <p className="text-sm text-secondary-light">
                    {product.category}
                  </p>
                  <p className="text-yellow-500 font-semibold mt-1 flex items-center">
                    <FaStar className="mr-1" />
                    {product?.rating?.rate} ({product?.rating?.count} reviews)
                  </p>
                  <button className="mt-4 bg-prirmary-dark text-white px-4 py-2 rounded hover:bg-prirmary-light cursor-pointer transition">
                    Add to cart
                  </button>
                </div>
              ))}
            </div>

            {/* Pagination Controls */}
            <div className="flex justify-center items-center space-x-4 mt-6">
              <button
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="px-4 py-2 bg-secondary-light rounded disabled:opacity-50 hover:shadow-2xl transition cursor-pointer"
              >
                Previous
              </button>
              <span className="font-semibold">
                Page {currentPage} of {totalPages}
              </span>
              <button
                onClick={() =>
                  setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                }
                disabled={currentPage === totalPages}
                className="px-4 py-2 bg-secondary-light rounded disabled:opacity-50 hover:shadow-2xl transition cursor-pointer"
              >
                Next
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ProductListPage;
