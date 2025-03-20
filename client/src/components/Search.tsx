import { useRef, useState, useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import { Link } from "react-router";
import { TypeAnimation } from "react-type-animation";
import { IoMdArrowRoundBack } from "react-icons/io";
import useMobile from "../hooks/useMobile";
import { useSelector, useDispatch } from "react-redux";
import { setFilteredProducts } from "../features/product/productSlice";

const Search = () => {
  const [isMobile] = useMobile();
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [searchTerm, setSearchTerm] = useState(""); // Search input state
  const inputRef = useRef<HTMLInputElement | null>(null);
  const dispatch = useDispatch();

  // Get all products from Redux
  const products = useSelector((state: any) => state.product.products || []);
  const filteredProducts = useSelector(
    (state: any) => state.product.filteredProducts
  );

  // Focus on input when search is activated
  const handleFocus = () => {
    setIsSearchActive(true);
    inputRef.current?.focus();
  };

  // Filter products whenever searchTerm changes
  useEffect(() => {
    if (searchTerm.trim()) {
      const results = products.filter((product: any) =>
        product.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
      dispatch(setFilteredProducts(results));
    } else {
      dispatch(setFilteredProducts(products)); // Restore all products
    }
  }, [searchTerm, products, dispatch]);

  return (
    <div
      className="relative min-w-[300px] lg:min-w-[420px] h-11 lg:h-12 rounded-lg border overflow-hidden flex items-center text-neutral-500 bg-slate-50 group focus-within:border-primary-dark gap-1"
      onClick={handleFocus}
    >
      <div>
        <button className="flex justify-center items-center h-full p-3 group-focus-within:text-primary-dark">
          <FaSearch size={22} />
        </button>
      </div>

      <div className="w-full h-full">
        {!isSearchActive ? (
          <button
            className="w-full h-full flex items-center"
            onClick={handleFocus}
          >
            <TypeAnimation
              sequence={[
                'Search "" ',
                1000,
                'Search "bread" ',
                1000,
                'Search "sugar" ',
                1000,
                'Search "biscuit" ',
                1000,
                'Search "chocolate" ',
                1000,
                'Search "paneer" ',
              ]}
              wrapper="span"
              speed={50}
              repeat={Infinity}
            />
          </button>
        ) : (
          <div className="w-full h-full">
            <input
              ref={inputRef}
              type="text"
              placeholder="Search..."
              className="w-full h-full bg-transparent outline-none border-none px-2"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        )}
      </div>

      {/* Dropdown for search results */}
      {isSearchActive && searchTerm && (
        <div className="absolute top-12 left-0 w-full bg-white border border-gray-200 rounded-lg shadow-md max-h-60 overflow-auto z-50">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product: any) => (
              <Link
                key={product.id}
                to={`/product/${product.id}`}
                className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
              >
                {product.title}
              </Link>
            ))
          ) : (
            <p className="px-4 py-2 text-gray-500">No products found</p>
          )}
        </div>
      )}
    </div>
  );
};

export default Search;
