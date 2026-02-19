import React from "react";
import { FaUserAlt, FaLock } from "react-icons/fa";
import { Link } from "react-router-dom";

const Login = () => {
  return (
    <>
    
    <div className="min-h-screen flex items-center justify-center lg:bg-gray-100">
 
      <div className="w-full max-w-md p-6 bg-white lg:shadow-lg rounded-md">
        
        <h2 className="text-2xl font-bold text-center text-gray-700">Admin Login</h2>
        <form className="mt-6 space-y-6">
          {/* Username */}
          <div className="relative">
            <label htmlFor="username" className="sr-only">
              Username
            </label>
            <div className="flex items-center bg-gray-100 rounded-md">
              <span className="px-3 text-gray-500">
                <FaUserAlt />
              </span>
              <input
                type="text"
                id="username"
                className="w-full p-3 text-sm bg-transparent border-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 rounded-md"
                placeholder="Enter your username"
              />
            </div>
          </div>

          {/* Password */}
          <div className="relative">
            <label htmlFor="password" className="sr-only">
              Password
            </label>
            <div className="flex items-center bg-gray-100 rounded-md">
              <span className="px-3 text-gray-500">
                <FaLock />
              </span>
              <input
                type="password"
                id="password"
                className="w-full p-3 text-sm bg-transparent border-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 rounded-md"
                placeholder="Enter your password"
              />
            </div>
          </div>

          {/* Submit Button */}
          <div className="text-center">
            <Link to ="/dashboard"
              type="submit"
              className="w-full p-3 block text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none"
            >
              Login
            </Link>
          </div>
        </form>

        {/* Footer */}
        <div className="mt-6 text-sm text-center text-gray-500">
          Forgot your password?{" "}
          <a href="#" className="text-blue-600 hover:underline">
            Reset it
          </a>
        </div>
      </div>
    </div>
    </>
  );
};

export default Login;