import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="flex m-7 flex-col items-center justify-center h-screen shadow-md border-2 bg-gray-100 h-5 w-3xl rounded-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Welcome</h1>
      <h2 className="font-extralight mb-4">Login in to view the dashboard</h2>
      <div className="flex justify-center items-center gap-4">
        <Link
          to="/login"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Login
        </Link>
        <Link
          to="/register"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Register
        </Link>
      </div>
    </div>
  );
};

export default Home;