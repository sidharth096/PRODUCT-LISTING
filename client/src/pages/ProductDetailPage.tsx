import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import Axios from "../utils/Axios";
import api from "../common/api";
import { FaStar } from "react-icons/fa6";

const ProductDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>(); // Get Product ID from URL

  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await Axios({
          method: "GET",
          url: `${api.fetchProductById.url}/${id}`,
        });
        setProduct(response.data);
      } catch (error) {
        console.error("Error fetching product details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen ">
        <p className="text-lg font-semibold">Loading product details...</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-lg font-semibold text-secondary-light">
          Product not found.
        </p>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6 flex flex-col lg:flex-row gap-10 bg-white shadow-lg rounded-lg border border-gray-200 mt-6 ">
      {/* Product Image - Left Side */}
      <div className="lg:w-1/2 h-[600px] flex justify-center">
        <img
          src={product.image}
          alt={product.title}
          className="w-full max-w-md h-auto object-contain rounded-lg shadow-md"
        />
      </div>

      {/* Product Details - Right Side */}
      <div className="lg:w-1/2 flex flex-col justify-center p-4">
        <h2 className="text-2xl font-bold text-secondary-dark">
          {product.title}
        </h2>
        <p className="text-secondary-light mt-2">{product.description}</p>
        <p className="text-xl font-semibold text-secondary-dark mt-4">
          ${product.price}
        </p>
        <p className="text-secondary-light mt-2">
          Category: {product.category}
        </p>
        <div className="flex items-center text-yellow-500 font-semibold mt-2">
          <FaStar className="mr-1" />
          {product.rating?.rate} ({product.rating?.count} reviews)
        </div>
        <button className="mt-6 bg-prirmary-dark text-white px-6 py-3 rounded-lg hover:bg-prirmary-light transition cursor-pointer">
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductDetailPage;
