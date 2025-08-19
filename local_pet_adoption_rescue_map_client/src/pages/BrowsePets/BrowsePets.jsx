import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { FiHeart, FiSearch, FiFilter, FiMapPin, FiDollarSign } from 'react-icons/fi';
import { FaPaw } from 'react-icons/fa';
import { searchAPI, petAPI } from '../../services/api';

const BrowsePets = () => {
  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    type: 'All',
    size: 'All',
    age: 'All',
    gender: 'All',
    energyLevel: 'All'
  });
  const [showFilters, setShowFilters] = useState(false);
  const [sortBy, setSortBy] = useState('newest');
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalPets: 0,
    hasNext: false
  });

  // Filter options
  const filterOptions = {
    type: ["All", "Dog", "Cat", "Rabbit", "Bird", "Other"],
    size: ["All", "Small", "Medium", "Large"],
    age: ["All", "Puppy/Kitten", "Young", "Adult", "Senior"],
    gender: ["All", "Male", "Female"],
    energyLevel: ["All", "Low", "Medium", "High"]
  };

  // Helper function to categorize age
  const categorizeAge = (ageString) => {
    if (ageString.includes('month') || ageString === '1 year') {
      return 'Puppy/Kitten';
    } else if (ageString === '2 years' || ageString === '3 years') {
      return 'Young';
    } else if (ageString === '4 years' || ageString === '5 years') {
      return 'Adult';
    } else {
      return 'Senior';
    }
  };

  // Fetch pets from database
  const fetchPets = async (page = 1, resetPets = true) => {
    try {
      setLoading(true);
      setError(null);

      // Build search parameters
      const searchParams = {
        page,
        limit: 20,
        status: 'Available'
      };

      // Add search term
      if (searchTerm.trim()) {
        searchParams.q = searchTerm.trim();
      }

      // Add filters (only non-'All' values)
      if (filters.type !== 'All') searchParams.type = filters.type;
      if (filters.size !== 'All') searchParams.size = filters.size;
      if (filters.gender !== 'All') searchParams.gender = filters.gender;
      if (filters.energyLevel !== 'All') searchParams.energyLevel = filters.energyLevel;

      // Use advanced search API
      const response = await searchAPI.advancedSearch(searchParams);

      if (response.success) {
        const newPets = response.pets || [];
        
        if (resetPets) {
          setPets(newPets);
        } else {
          setPets(prev => [...prev, ...newPets]);
        }

        if (response.pagination) {
          setPagination(response.pagination);
        }
      } else {
        setError('Failed to fetch pets');
      }
    } catch (err) {
      console.error('Error fetching pets:', err);
      setError('Failed to load pets. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Initial fetch
  useEffect(() => {
    fetchPets(1, true);
  }, []);

  // Fetch when search/filters change (debounced)
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      fetchPets(1, true);
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [searchTerm, filters]);

  // Client-side sorting of already fetched pets
  const sortedPets = useMemo(() => {
    const petsToSort = [...pets];
    
    switch (sortBy) {
      case 'newest':
        return petsToSort.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      case 'oldest':
        return petsToSort.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
      case 'price-low':
        return petsToSort.sort((a, b) => a.adoptionFee - b.adoptionFee);
      case 'price-high':
        return petsToSort.sort((a, b) => b.adoptionFee - a.adoptionFee);
      case 'name':
        return petsToSort.sort((a, b) => a.name.localeCompare(b.name));
      default:
        return petsToSort;
    }
  }, [pets, sortBy]);

  const handleFilterChange = (filterType, value) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: value
    }));
  };

  const clearFilters = () => {
    setFilters({
      type: 'All',
      size: 'All',
      age: 'All',
      gender: 'All',
      energyLevel: 'All'
    });
    setSearchTerm('');
  };

  const loadMorePets = () => {
    if (pagination.hasNext && !loading) {
      fetchPets(pagination.currentPage + 1, false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Find Your <span className="gradient-text">Perfect Companion</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Browse through our amazing pets waiting for their forever homes
          </p>
        </div>

        {/* Search and Filter Bar */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search Bar */}
            <div className="flex-1 relative">
              <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                placeholder="Search by name, breed, or location..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Filter Toggle */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center justify-center px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors duration-300"
            >
              <FiFilter className="h-5 w-5 mr-2" />
              Filters
            </button>

            {/* Sort Dropdown */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="name">Name: A to Z</option>
            </select>
          </div>

          {/* Filter Options */}
          {showFilters && (
            <div className="mt-6 pt-6 border-t border-gray-200">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                {Object.entries(filterOptions).map(([filterType, options]) => (
                  <div key={filterType}>
                    <label className="block text-sm font-medium text-gray-700 mb-2 capitalize">
                      {filterType === 'energyLevel' ? 'Energy Level' : filterType}
                    </label>
                    <select
                      value={filters[filterType]}
                      onChange={(e) => handleFilterChange(filterType, e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      {options.map(option => (
                        <option key={option} value={option}>{option}</option>
                      ))}
                    </select>
                  </div>
                ))}
              </div>
              
              <div className="mt-4 flex justify-between items-center">
                <button
                  onClick={clearFilters}
                  className="text-gray-600 hover:text-gray-800 font-medium"
                >
                  Clear All Filters
                </button>
                <span className="text-sm text-gray-600">
                  {loading ? 'Loading...' : `${pagination.totalPets || pets.length} pets found`}
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Results */}
        {loading && pets.length === 0 ? (
          // Loading skeletons
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {Array.from({ length: 8 }).map((_, index) => (
              <div key={index} className="bg-white rounded-2xl shadow-lg overflow-hidden animate-pulse">
                <div className="w-full h-64 bg-gray-200"></div>
                <div className="p-6">
                  <div className="h-6 bg-gray-200 rounded mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded mb-4 w-3/4"></div>
                  <div className="h-16 bg-gray-200 rounded mb-4"></div>
                  <div className="flex justify-between mb-4">
                    <div className="h-4 bg-gray-200 rounded w-1/3"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                  </div>
                  <div className="h-8 bg-gray-200 rounded"></div>
                </div>
              </div>
            ))}
          </div>
        ) : error ? (
          // Error state
          <div className="text-center py-16">
            <div className="text-6xl mb-4">😿</div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Unable to load pets</h3>
            <p className="text-gray-600 mb-6">{error}</p>
            <button
              onClick={() => fetchPets(1, true)}
              className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-3 rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-300"
            >
              Try Again
            </button>
          </div>
        ) : sortedPets.length === 0 ? (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">🐕‍🦺</div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">No pets found</h3>
            <p className="text-gray-600 mb-6">
              Try adjusting your search criteria or filters
            </p>
            <button
              onClick={clearFilters}
              className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-3 rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-300"
            >
              Clear Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {sortedPets.map((pet) => (
              <div key={pet._id} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:scale-105 group">
                <div className="relative overflow-hidden">
                  <img
                    src={pet.images?.[0] || 'https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=500'}
                    alt={pet.name}
                    className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-300"
                    onError={(e) => {
                      e.target.src = 'https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=500';
                    }}
                  />
                  <div className="absolute top-3 right-3 bg-white rounded-full p-2 shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 cursor-pointer hover:bg-red-50">
                    <FiHeart className="h-4 w-4 text-red-500" />
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
                      <span className="text-sm mr-1">৳</span>
                      <span className="font-bold">{pet.adoptionFee}</span>
                    </div>
                    <div className="flex items-center space-x-1 text-xs text-gray-500">
                      {pet.vaccinated && <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full">Vaccinated</span>}
                      {pet.spayedNeutered && <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full">Fixed</span>}
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-2 mb-4 text-xs">
                    <div className="text-center">
                      <div className="text-gray-500">Size</div>
                      <div className="font-medium">{pet.size}</div>
                    </div>
                    <div className="text-center">
                      <div className="text-gray-500">Energy</div>
                      <div className="font-medium">{pet.energyLevel}</div>
                    </div>
                    <div className="text-center">
                      <div className="text-gray-500">Kids</div>
                      <div className="font-medium">{pet.goodWithKids ? '✓' : '✗'}</div>
                    </div>
                  </div>
                  
                  <Link
                    to={`/pet/${pet._id}`}
                    className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 px-4 rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-300 text-center block font-medium"
                  >
                    Learn More
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Load More Button (for pagination) */}
        {pagination.hasNext && !loading && (
          <div className="text-center mt-12">
            <button 
              onClick={loadMorePets}
              className="bg-white text-gray-700 px-8 py-3 rounded-lg border-2 border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition-all duration-300 font-medium"
            >
              Load More Pets
            </button>
          </div>
        )}

        {/* Loading more indicator */}
        {loading && pets.length > 0 && (
          <div className="text-center mt-8">
            <div className="inline-flex items-center px-4 py-2 text-gray-600">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-500 mr-2"></div>
              Loading more pets...
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BrowsePets; 