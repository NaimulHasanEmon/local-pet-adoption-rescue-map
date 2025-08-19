import React from 'react';
import { Link } from 'react-router-dom';
import { FiHome, FiArrowLeft } from 'react-icons/fi';
import { FaPaw } from 'react-icons/fa';

const Error = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center px-4">
      <div className="text-center max-w-lg mx-auto">
        <div className="mb-8">
          <div className="flex justify-center mb-6">
            <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-4 rounded-full animate-bounce">
              <FaPaw className="h-12 w-12 text-white" />
            </div>
          </div>
          <h1 className="text-6xl font-bold text-gray-900 mb-4">404</h1>
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Oops! This pet ran away!
          </h2>
          <p className="text-gray-600 mb-8">
            The page you're looking for doesn't exist. Don't worry though, 
            there are plenty of adorable pets waiting for you on our homepage!
          </p>
        </div>

        <div className="space-y-4">
          <Link
            to="/"
            className="inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-lg"
          >
            <FiHome className="mr-2 h-5 w-5" />
            Go Home
          </Link>
          
          <div className="flex justify-center">
            <button
              onClick={() => window.history.back()}
              className="inline-flex items-center text-gray-600 hover:text-blue-600 transition-colors duration-300"
            >
              <FiArrowLeft className="mr-2 h-4 w-4" />
              Go Back
            </button>
          </div>
        </div>

        <div className="mt-12 text-center">
          <div className="text-6xl mb-4">🐕‍🦺</div>
          <p className="text-sm text-gray-500">
            Even our search and rescue dog couldn't find this page!
          </p>
        </div>
      </div>
    </div>
  );
};

export default Error; 