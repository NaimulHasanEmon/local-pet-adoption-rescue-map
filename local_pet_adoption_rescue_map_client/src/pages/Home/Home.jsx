import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiHeart, FiMap, FiUsers, FiShield, FiSearch, FiStar } from 'react-icons/fi';
import { FaPaw, FaDog, FaCat } from 'react-icons/fa';
import { petAPI, enhancedStatsAPI } from '../../services/api';

const Home = () => {
  const [featuredPets, setFeaturedPets] = useState([]);
  const [stats, setStats] = useState({
    totalPets: 0,
    totalOrganizations: 0
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Success stories (keeping static for now as they're less frequently updated)
  const successStories = [
    {
      id: 1,
      petName: "Shuvo",
      adopterName: "Ahmed Family",
      story: "Shuvo found his forever home in Uttara after 6 months in care. He now enjoys daily walks and lots of love.",
      image: "https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=500",
      adoptionDate: "2023-12-15"
    },
    {
      id: 2,
      petName: "Lili",
      adopterName: "Samira Hossain", 
      story: "Lili was a shy kitten from Sylhet who blossomed in Samira's peaceful flat. She now loves sunbathing and cuddles.",
      image: "https://images.unsplash.com/photo-1573865526739-10659fec78a5?w=500",
      adoptionDate: "2023-11-20"
    }
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        // Fetch featured pets (first 3 available pets)
        const petsResponse = await petAPI.getPets({ 
          status: 'Available', 
          limit: 3,
          page: 1
        });
        
        if (petsResponse.success && petsResponse.pets) {
          setFeaturedPets(petsResponse.pets);
        }

        // Fetch statistics for the hero section
        try {
          const statsResponse = await enhancedStatsAPI.getDashboardStats();
          if (statsResponse.success && statsResponse.stats) {
            setStats({
              totalPets: statsResponse.stats.availablePets || 0,
              totalOrganizations: statsResponse.stats.totalOrganizations || 0
            });
          }
        } catch (statsError) {
          console.warn('Could not fetch stats:', statsError);
          // Continue without stats
        }

      } catch (err) {
        console.error('Error fetching home page data:', err);
        setError('Failed to load pets data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-50 via-white to-purple-50 py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <h1 className="text-4xl md:text-6xl font-bold leading-tight">
                  <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    Find Your
                  </span>
                  <br />
                  <span className="text-gray-900">Perfect Pet</span>
                  <br />
                  <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                    Companion
                  </span>
                </h1>
                <p className="text-xl text-gray-600 leading-relaxed">
                  Connect with local rescue organizations and find loving pets waiting for their forever homes. 
                  Our interactive map makes it easy to discover pets near you.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  to="/browse"
                  className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-xl hover:from-blue-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                >
                  <FiSearch className="mr-2 h-5 w-5" />
                  Browse Pets
                </Link>
                <Link
                  to="/map"
                  className="inline-flex items-center justify-center px-8 py-4 bg-white text-gray-700 font-semibold rounded-xl border-2 border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-lg"
                >
                  <FiMap className="mr-2 h-5 w-5" />
                  View Map
                </Link>
              </div>

              <div className="flex items-center space-x-8 text-sm text-gray-600">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span>{stats.totalPets}+ Pets Available</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                  <span>{stats.totalOrganizations}+ Rescue Partners</span>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-4">
                  <div className="bg-white rounded-2xl p-6 shadow-lg transform rotate-3 hover:rotate-0 transition-transform duration-300">
                    <img
                      src="https://images.unsplash.com/photo-1552053831-71594a27632d?w=300&h=200&fit=crop"
                      alt="Happy dog"
                      className="w-full h-32 object-cover rounded-lg mb-4"
                    />
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-gray-800">Buddy</span>
                      <FiHeart className="h-5 w-5 text-red-500" />
                    </div>
                  </div>
                  <div className="bg-white rounded-2xl p-6 shadow-lg transform -rotate-2 hover:rotate-0 transition-transform duration-300">
                    <img
                      src="https://images.unsplash.com/photo-1574158622682-e40e69881006?w=300&h=200&fit=crop"
                      alt="Cute cat"
                      className="w-full h-32 object-cover rounded-lg mb-4"
                    />
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-gray-800">Luna</span>
                      <FiHeart className="h-5 w-5 text-red-500" />
                    </div>
                  </div>
                </div>
                <div className="space-y-4 mt-8">
                  <div className="bg-white rounded-2xl p-6 shadow-lg transform -rotate-1 hover:rotate-0 transition-transform duration-300">
                    <img
                      src="https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=300&h=200&fit=crop"
                      alt="Playful puppy"
                      className="w-full h-32 object-cover rounded-lg mb-4"
                    />
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-gray-800">Bella</span>
                      <FiHeart className="h-5 w-5 text-red-500" />
                    </div>
                  </div>
                  <div className="bg-white rounded-2xl p-6 shadow-lg transform rotate-2 hover:rotate-0 transition-transform duration-300">
                    <img
                      src="https://images.unsplash.com/photo-1592194996308-7b43878e84a6?w=300&h=200&fit=crop"
                      alt="Gentle cat"
                      className="w-full h-32 object-cover rounded-lg mb-4"
                    />
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-gray-800">Whiskers</span>
                      <FiHeart className="h-5 w-5 text-red-500" />
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Floating elements */}
              <div className="absolute -top-4 -right-4 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full p-3 animate-bounce">
                <FaPaw className="h-6 w-6 text-white" />
              </div>
              <div className="absolute bottom-4 -left-4 bg-gradient-to-r from-pink-400 to-red-500 rounded-full p-3 animate-pulse">
                <FiHeart className="h-6 w-6 text-white" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Choose <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">PetRescue Map</span>?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We make pet adoption simple, transparent, and accessible for everyone
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="group text-center p-6 rounded-2xl hover:bg-blue-50 transition-all duration-300 transform hover:scale-105">
              <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-full p-4 w-16 h-16 mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <FiMap className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Interactive Map</h3>
              <p className="text-gray-600">
                Find pets near you with our interactive map showing rescue locations and available pets
              </p>
            </div>

            <div className="group text-center p-6 rounded-2xl hover:bg-purple-50 transition-all duration-300 transform hover:scale-105">
              <div className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-full p-4 w-16 h-16 mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <FiShield className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Verified Rescues</h3>
              <p className="text-gray-600">
                All rescue organizations are verified and committed to animal welfare and ethical practices
              </p>
            </div>

            <div className="group text-center p-6 rounded-2xl hover:bg-green-50 transition-all duration-300 transform hover:scale-105">
              <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-full p-4 w-16 h-16 mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <FiUsers className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Community Support</h3>
              <p className="text-gray-600">
                Join a community of pet lovers and get support throughout your adoption journey
              </p>
            </div>

            <div className="group text-center p-6 rounded-2xl hover:bg-red-50 transition-all duration-300 transform hover:scale-105">
              <div className="bg-gradient-to-r from-red-500 to-red-600 rounded-full p-4 w-16 h-16 mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <FiHeart className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Perfect Matches</h3>
              <p className="text-gray-600">
                Advanced filtering helps you find pets that match your lifestyle and preferences
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Pets Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Meet Some <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Amazing Pets</span>
            </h2>
            <p className="text-xl text-gray-600">
              These adorable companions are looking for their forever homes
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {loading ? (
              // Loading skeletons
              Array.from({ length: 3 }).map((_, index) => (
                <div key={index} className="bg-white rounded-2xl shadow-lg overflow-hidden animate-pulse">
                  <div className="w-full h-64 bg-gray-200"></div>
                  <div className="p-6">
                    <div className="h-6 bg-gray-200 rounded mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded mb-4 w-3/4"></div>
                    <div className="h-16 bg-gray-200 rounded mb-4"></div>
                    <div className="flex justify-between">
                      <div className="h-4 bg-gray-200 rounded w-1/3"></div>
                      <div className="h-8 bg-gray-200 rounded w-1/4"></div>
                    </div>
                  </div>
                </div>
              ))
            ) : error ? (
              // Error state
              <div className="col-span-full text-center py-12">
                <div className="text-6xl mb-4">😿</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Unable to load pets
                </h3>
                <p className="text-gray-600 mb-4">{error}</p>
                <button
                  onClick={() => window.location.reload()}
                  className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-2 rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-300"
                >
                  Try Again
                </button>
              </div>
            ) : featuredPets.length === 0 ? (
              // No pets available
              <div className="col-span-full text-center py-12">
                <div className="text-6xl mb-4">🐾</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  No pets available right now
                </h3>
                <p className="text-gray-600">
                  Check back soon for new furry friends looking for homes!
                </p>
              </div>
            ) : (
              featuredPets.map((pet) => (
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
                    <div className="absolute top-4 right-4 bg-white rounded-full p-2 shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <FiHeart className="h-5 w-5 text-red-500" />
                    </div>
                    <div className="absolute bottom-4 left-4 bg-black/50 backdrop-blur-sm rounded-full px-3 py-1">
                      <span className="text-white text-sm font-medium">{pet.location}</span>
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-xl font-bold text-gray-900">{pet.name}</h3>
                      <span className="text-2xl">
                        {pet.type === 'Dog' ? '🐕' : '🐱'}
                      </span>
                    </div>
                    <p className="text-gray-600 mb-4">{pet.breed} • {pet.age} • {pet.gender}</p>
                    <p className="text-gray-700 text-sm mb-4 line-clamp-2">{pet.description}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <span className="text-sm text-gray-500">Adoption Fee:</span>
                        <span className="text-lg font-bold text-green-600">৳{pet.adoptionFee}</span>
                      </div>
                      <Link
                        to={`/pet/${pet._id}`}
                        className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-2 rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105"
                      >
                        Learn More
                      </Link>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          <div className="text-center">
            <Link
              to="/browse"
              className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-xl hover:from-blue-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
            >
              View All Pets
              <FiSearch className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Success Stories Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              <span className="bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">Success Stories</span>
            </h2>
            <p className="text-xl text-gray-600">
              Happy endings that warm our hearts
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {successStories.map((story) => (
              <div key={story.id} className="bg-gradient-to-br from-green-50 to-blue-50 rounded-2xl p-8 hover:shadow-lg transition-all duration-300">
                <div className="flex items-start space-x-4">
                  <img
                    src={story.image}
                    alt={story.petName}
                    className="w-20 h-20 rounded-full object-cover shadow-lg"
                  />
                  <div className="flex-1">
                    <div className="flex items-center mb-2">
                      <h3 className="text-xl font-bold text-gray-900">{story.petName}</h3>
                      <div className="ml-2 flex text-yellow-400">
                        {[...Array(5)].map((_, i) => (
                          <FiStar key={i} className="h-4 w-4 fill-current" />
                        ))}
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">Adopted by {story.adopterName}</p>
                    <p className="text-gray-700 italic">"{story.story}"</p>
                    <p className="text-sm text-gray-500 mt-3">
                      Adopted on {new Date(story.adoptionDate).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Ready to Find Your Perfect Companion?
            </h2>
            <p className="text-xl text-blue-100 mb-8">
              Join thousands of happy families who found their perfect pets through our platform
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/signup"
                className="inline-flex items-center justify-center px-8 py-4 bg-white text-blue-600 font-semibold rounded-xl hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
              >
                <FiUsers className="mr-2 h-5 w-5" />
                Get Started Today
              </Link>
              <Link
                to="/browse"
                className="inline-flex items-center justify-center px-8 py-4 bg-transparent text-white font-semibold rounded-xl border-2 border-white hover:bg-white hover:text-blue-600 transition-all duration-300 transform hover:scale-105"
              >
                <FaPaw className="mr-2 h-5 w-5" />
                Browse Pets Now
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home; 