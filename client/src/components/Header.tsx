
import { Link, useLocation } from "react-router";
import { FaRegCircleUser } from "react-icons/fa6";
import { FaCartShopping } from "react-icons/fa6";
import useMobile from '../hooks/useMobile'
import Search from "./Search";

const Header = () => {
  const [isMobile]  = useMobile();
  const location = useLocation();



  const isSerachPage = location.pathname === "/search";
  return (
    <header className="h-28 lg:20  shadow-md sticky top-0 flex items-center justify-center flex-col bg-white px-2">
  
      {!(isMobile && isSerachPage) && (
        <div className="container mx-auto   items-center flex justify-between p-2">
          <Link to="/" className="flex justify-between items-center h-full ">
            <h2 className="text-2xl font-bold">Product List </h2>
          </Link>
          {/* search  */}
          <div className="hidden lg:block">
            <Search />
          </div>
          {/* login */}
          <div>
            {/* user icon to display mobile version */}
            <div className="lg:hidden">
              <FaRegCircleUser size={25} />
            </div>
            {/* Desktop */}
            <div className="hidden lg:flex items-center gap-10">
              <button className="flex items-center gap-2 bg-prirmary-dark hover:bg-prirmary-light px-3 py-3 text-white rounded cursor-pointer">
                <div className="animate-bounce">
                  <FaCartShopping size={25} />
                </div>
                <div className="font-semibold">
                  <p>My Cart</p>
                </div>
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="container mx-auto px-2 lg:hidden">
        <Search />
      </div>
    </header>
  );
};

export default Header;
