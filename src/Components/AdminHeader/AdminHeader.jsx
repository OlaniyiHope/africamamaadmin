import { useState } from "react";
import { FiBell, FiMenu, FiUser } from "react-icons/fi";


const AdminHeader = () => {
  const [openMenu, setOpenMenu] = useState(false);

  const handleToggleMenu = () => {
    setOpenMenu(!openMenu);
  };

  const handleCloseMenu = () => {
    setOpenMenu(false);
  };

  return (
    <header
      className="bg-background shadow-md"
      style={{ backgroundColor: "white" }}
    >
      <div className="px-4 lg:px-[8rem] py-3 flex items-center justify-between">
        {/* Left Section: Logo and Navigation */}
        <div className="flex items-center space-x-6">
          {/* Logo 
          <img
            src={logo}
            alt="logo"
            className="w-[100px] h-[30px] lg:h-[50px] object-contain"
          />*/}
          <a    href="/"
            className="hover:text-primary"
            style={{ color: "black", fontWeight: "900", fontSize: "20px" }}> Africa Mama Put</a>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex space-x-12 text-secondary text-[18px] font-semibold">
          <a
            href="/dashboard"
            className="hover:text-primary"
            style={{ color: "black" }}
          >
            Dashboard
          </a>
          <a
            href="/users"
            className="hover:text-primary"
            style={{ color: "black" }}
          >
            Users
          </a>
          <a
            href="/category"
            className="hover:text-primary"
            style={{ color: "black" }}
          >
            Category
          </a>
         
          <a
            href="/products"
            className="hover:text-primary"
            style={{ color: "black" }}
          >
            Products
          </a>
          <a
            href="/orders"
            className="hover:text-primary"
            style={{ color: "black" }}
          >
            Order
          </a>
      
        </nav>

        {/* Right Section: Notifications and Profile */}
        <div className="flex items-center space-x-4">
          {/* Notifications */}
          <button className="relative text-xl text-gray-600 hover:text-blue-500">
            <FiBell />
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full px-1">
              3
            </span>
          </button>

          {/* Profile Dropdown */}
          <div className="relative">
            <button className="text-xl text-gray-600 hover:text-blue-500">
              <FiUser />
            </button>
          </div>

          {/* Mobile Hamburger Menu */}
          <button
            onClick={handleToggleMenu}
            className="text-[1.5rem] lg:hidden"
          >
            <FiMenu />
          </button>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      <div
        className={`${
          openMenu
            ? "transform translate-x-0 ease-in-out"
            : "transform -translate-x-full ease-in-out"
        } fixed top-[3.4rem] left-0 w-full h-full bg-secondary z-50 transition-transform duration-300`}
        style={{ backgroundColor: "#b90705" }}
      >
        <nav className="text-white text-[18px] font-semibold p-3 pt-[1rem] space-y-3">
          <a href="/dashboard" className=" block" onClick={handleCloseMenu}>
            Dashboard
          </a>
          <a href="/users" className=" block" onClick={handleCloseMenu}>
            Users
          </a>
          <a href="/category" className="block" onClick={handleCloseMenu}>
            Category
          </a>
     
          <a href="/products" className=" block" onClick={handleCloseMenu}>
            Products
          </a>
          <a href="/orders" className="block" onClick={handleCloseMenu}>
            Orders
          </a>
      
        </nav>
      </div>
    </header>
  );
};

export default AdminHeader;
