import React from 'react';
import { Link } from 'react-router-dom';
import { FiHeart, FiMapPin, FiDollarSign, FiTrash2 } from 'react-icons/fi';
import { FaPaw } from 'react-icons/fa';
import { mockPets, mockFavorites } from '../../data/mockData';

const Favorites = () => {
  const favoritePets = mockPets.filter(pet => mockFavorites.includes(pet.id));

  const handleRemoveFavorite = (petId) => {
    // In a real app, this would update the backend/state
    console.log('Remove from favorites:', petId);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-pink-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="bg-gradient-to-r from-red-500 to-pink-600 p-3 rounded-full">
              <FiHeart className="h-8 w-8 text-white" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Your <span className="bg-gradient-to-r from-red-600 to-pink-600 bg-clip-text text-transparent">Favorite</span> Pets
          </h1>
          <p className="text-xl text-gray-600">
            Keep track of the pets that have captured your heart
          </p>
        </div>

        {favoritePets.length === 0 ? (
          /* Empty State */
          <div className="text-center py-16">
            <div className="text-6xl mb-6">💔</div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">No favorites yet</h3>
            <p className="text-gray-600 mb-8 max-w-md mx-auto">
              Start browsing pets and click the heart icon to add them to your favorites!
            </p>
            <Link
              to="/browse"
              className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-red-500 to-pink-600 text-white font-semibold rounded-xl hover:from-red-600 hover:to-pink-700 transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              <FaPaw className="mr-2 h-5 w-5" />
              Browse Pets
            </Link>
          </div>
        ) : (
          <>
            {/* Stats */}
            <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                <div>
                  <div className="text-3xl font-bold text-red-600 mb-1">{favoritePets.length}</div>
                  <div className="text-gray-600">Favorite Pets</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-blue-600 mb-1">
                    {favoritePets.filter(pet => pet.type === 'Dog').length}
                  </div>
                  <div className="text-gray-600">Dogs</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-purple-600 mb-1">
                    {favoritePets.filter(pet => pet.type === 'Cat').length}
                  </div>
                  <div className="text-gray-600">Cats</div>
                </div>
              </div>
            </div>

            {/* Favorites Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {favoritePets.map((pet) => (
                <div key={pet.id} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:scale-105 group">
                  <div className="relative overflow-hidden">
                    <img
                      src={pet.images[0]}
                      alt={pet.name}
                      className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    <div className="absolute top-3 right-3 flex space-x-2">
                      <button
                        onClick={() => handleRemoveFavorite(pet.id)}
                        className="bg-white rounded-full p-2 shadow-lg hover:bg-red-50 transition-colors duration-300 group"
                      >
                        <FiTrash2 className="h-4 w-4 text-red-500 group-hover:text-red-600" />
                      </button>
                      <div className="bg-red-500 rounded-full p-2 shadow-lg">
                        <FiHeart className="h-4 w-4 text-white fill-current" />
                      </div>
                    </div>
                    <div className="absolute bottom-3 left-3 bg-black/50 backdrop-blur-sm rounded-full px-3 py-1">
                      <span className="text-white text-sm font-medium flex items-center">
                        <FiMapPin className="h-3 w-3 mr-1" />
                        {pet.location}
                      </span>
                    </div>
                    <div className="absolute top-3 left-3 bg-blue-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                      {pet.type}
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-xl font-bold text-gray-900">{pet.name}</h3>
                      <span className="text-2xl">
                        {pet.type === 'Dog' ? '🐕' : '🐱'}
                      </span>
                    </div>
                    
                    <p className="text-gray-600 text-sm mb-3">
                      {pet.breed} • {pet.age} • {pet.gender}
                    </p>
                    
                    <p className="text-gray-700 text-sm mb-4 line-clamp-2">
                      {pet.description}
                    </p>
                    
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center text-green-600">
                        <FiDollarSign className="h-4 w-4 mr-1" />
                        <span className="font-bold">${pet.adoptionFee}</span>
                      </div>
                      <div className="flex items-center space-x-2 text-xs">
                        {pet.vaccinated && (
                          <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full">
                            Vaccinated
                          </span>
                        )}
                        {pet.spayedNeutered && (
                          <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                            Fixed
                          </span>
                        )}
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-3 gap-2 mb-4 text-xs text-center">
                      <div>
                        <div className="text-gray-500">Size</div>
                        <div className="font-medium">{pet.size}</div>
                      </div>
                      <div>
                        <div className="text-gray-500">Energy</div>
                        <div className="font-medium">{pet.energyLevel}</div>
                      </div>
                      <div>
                        <div className="text-gray-500">Kids</div>
                        <div className="font-medium">{pet.goodWithKids ? '✓' : '✗'}</div>
                      </div>
                    </div>
                    
                    <div className="flex space-x-2">
                      <Link
                        to={`/pet/${pet.id}`}
                        className="flex-1 bg-gradient-to-r from-blue-500 to-purple-600 text-white py-2 px-4 rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-300 text-center text-sm font-medium"
                      >
                        View Details
                      </Link>
                      <button className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors duration-300 text-sm font-medium">
                        Apply
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="text-center mt-12 space-y-4">
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  to="/browse"
                  className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-xl hover:from-blue-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-lg"
                >
                  <FaPaw className="mr-2 h-5 w-5" />
                  Find More Pets
                </Link>
                <Link
                  to="/map"
                  className="inline-flex items-center px-8 py-4 bg-white text-gray-700 font-semibold rounded-xl border-2 border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition-all duration-300 transform hover:scale-105 shadow-md"
                >
                  <FiMapPin className="mr-2 h-5 w-5" />
                  View on Map
                </Link>
              </div>
              
              <p className="text-sm text-gray-500">
                💡 Tip: Contact rescue organizations directly to learn more about your favorite pets!
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Favorites; 