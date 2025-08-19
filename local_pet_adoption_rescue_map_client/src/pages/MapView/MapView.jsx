import React, { useState } from 'react';
import { FiMapPin, FiHeart, FiInfo, FiNavigation } from 'react-icons/fi';
import { FaPaw } from 'react-icons/fa';
import { mockPets } from '../../data/mockData';

const MapView = () => {
  const [selectedPet, setSelectedPet] = useState(null);
  const [userLocation, setUserLocation] = useState(null);

  // Mock map center (you would use a real map library like Leaflet or Google Maps)
  // const mapCenter = { lat: 40.7128, lng: -74.0060 }; // New York City

  const handleGetLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
        },
        (error) => {
          console.error('Error getting location:', error);
          alert('Unable to get your location. Please enable location services.');
        }
      );
    } else {
      alert('Geolocation is not supported by this browser.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="bg-gradient-to-r from-green-500 to-blue-600 p-3 rounded-full">
              <FiMapPin className="h-8 w-8 text-white" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Pet <span className="bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">Location</span> Map
          </h1>
          <p className="text-xl text-gray-600">
            Find pets near you and discover local rescue organizations
          </p>
        </div>

        {/* Controls */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={handleGetLocation}
                className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-300"
              >
                <FiNavigation className="h-4 w-4 mr-2" />
                Find My Location
              </button>
              {userLocation && (
                <span className="text-sm text-green-600 font-medium">
                  📍 Location found!
                </span>
              )}
            </div>
            
            <div className="flex items-center space-x-4 text-sm">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                <span>Dogs</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                <span>Cats</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <span>Your Location</span>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Mock Map Container */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
              <div className="relative h-96 bg-gradient-to-br from-green-100 to-blue-100 flex items-center justify-center">
                {/* Mock Map Interface */}
                <div className="inset-4 bg-gray-100 rounded-lg relative overflow-hidden">
                  {/* Mock streets/grid */}
                  <div className="absolute inset-0 opacity-20">
                    <div className="grid grid-cols-8 grid-rows-6 h-full">
                      {Array.from({ length: 48 }).map((_, i) => (
                        <div key={i} className="border border-gray-300"></div>
                      ))}
                    </div>
                  </div>
                  
                  {/* Mock pet markers */}
                  {mockPets.slice(0, 6).map((pet, index) => (
                    <div
                      key={pet.id}
                      className={`absolute cursor-pointer transform -translate-x-1/2 -translate-y-1/2 transition-all duration-300 hover:scale-125 ${
                        selectedPet?.id === pet.id ? 'scale-125 z-10' : ''
                      }`}
                      style={{
                        left: `${20 + (index % 3) * 30}%`,
                        top: `${20 + Math.floor(index / 3) * 30}%`
                      }}
                      onClick={() => setSelectedPet(pet)}
                    >
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center shadow-lg ${
                        pet.type === 'Dog' ? 'bg-blue-500' : 'bg-purple-500'
                      }`}>
                        <FaPaw className="h-4 w-4 text-white" />
                      </div>
                      {selectedPet?.id === pet.id && (
                        <div className="absolute top-10 left-1/2 transform -translate-x-1/2 bg-white rounded-lg shadow-xl p-3 min-w-48 z-20">
                          <div className="text-center">
                            <img
                              src={pet.images[0]}
                              alt={pet.name}
                              className="w-16 h-16 rounded-full mx-auto mb-2 object-cover"
                            />
                            <h3 className="font-bold text-gray-900">{pet.name}</h3>
                            <p className="text-sm text-gray-600">{pet.breed}</p>
                            <p className="text-xs text-gray-500 mt-1">{pet.location}</p>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                  
                  {/* User location marker */}
                  {userLocation && (
                    <div
                      className="absolute transform -translate-x-1/2 -translate-y-1/2 animate-pulse"
                      style={{ left: '50%', top: '50%' }}
                    >
                      <div className="w-4 h-4 bg-red-500 rounded-full shadow-lg"></div>
                      <div className="w-8 h-8 bg-red-500 opacity-30 rounded-full absolute -top-2 -left-2 animate-ping"></div>
                    </div>
                  )}
                </div>
                
                <div className="absolute top-4 left-4 bg-white rounded-lg shadow-md p-3">
                  <div className="text-center">
                    <FiMapPin className="h-6 w-6 text-gray-600 mx-auto mb-1" />
                    <p className="text-xs text-gray-600">Interactive Map</p>
                    <p className="text-xs text-gray-500">(Demo Mode)</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-4 text-center">
              <p className="text-sm text-gray-600">
                💡 In the full version, this would be an interactive map powered by Leaflet.js or Google Maps
              </p>
            </div>
          </div>

          {/* Pet List Sidebar */}
          <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                <FaPaw className="h-5 w-5 mr-2 text-blue-500" />
                Nearby Pets ({mockPets.length})
              </h2>
              
              <div className="space-y-4 max-h-96 overflow-y-auto">
                {mockPets.slice(0, 6).map((pet) => (
                  <div
                    key={pet.id}
                    className={`p-4 border rounded-lg cursor-pointer transition-all duration-300 hover:shadow-md ${
                      selectedPet?.id === pet.id 
                        ? 'border-blue-500 bg-blue-50 shadow-md' 
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                    onClick={() => setSelectedPet(pet)}
                  >
                    <div className="flex items-center space-x-3">
                      <img
                        src={pet.images[0]}
                        alt={pet.name}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <h3 className="font-semibold text-gray-900">{pet.name}</h3>
                          <div className={`w-3 h-3 rounded-full ${
                            pet.type === 'Dog' ? 'bg-blue-500' : 'bg-purple-500'
                          }`}></div>
                        </div>
                        <p className="text-sm text-gray-600">{pet.breed}</p>
                        <p className="text-xs text-gray-500 flex items-center">
                          <FiMapPin className="h-3 w-3 mr-1" />
                          {pet.location}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Selected Pet Details */}
            {selectedPet && (
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                  <FiInfo className="h-5 w-5 mr-2 text-green-500" />
                  Pet Details
                </h3>
                
                <div className="space-y-3">
                  <img
                    src={selectedPet.images[0]}
                    alt={selectedPet.name}
                    className="w-full h-32 object-cover rounded-lg"
                  />
                  
                  <div>
                    <h4 className="font-bold text-gray-900">{selectedPet.name}</h4>
                    <p className="text-sm text-gray-600">
                      {selectedPet.breed} • {selectedPet.age} • {selectedPet.gender}
                    </p>
                  </div>
                  
                  <p className="text-sm text-gray-700 line-clamp-3">
                    {selectedPet.description}
                  </p>
                  
                  <div className="flex items-center justify-between pt-2">
                    <span className="text-green-600 font-bold">
                      ${selectedPet.adoptionFee}
                    </span>
                    <button className="text-red-500 hover:text-red-600 transition-colors duration-300">
                      <FiHeart className="h-5 w-5" />
                    </button>
                  </div>
                  
                  <button className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-2 px-4 rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-300 text-sm font-medium">
                    View Full Profile
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MapView; 