import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { FiHeart, FiMap, FiSearch, FiUser, FiCalendar, FiStar, FiArrowRight, FiBell, FiSettings, FiActivity } from 'react-icons/fi';
import { FaPaw, FaHeart } from 'react-icons/fa';
import { mockPets, mockFavorites } from '../../data/mockData';

const AdopterDashboard = () => {
  const { currentUser, logout } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');
  const favoritePets = mockPets.filter(pet => mockFavorites.includes(pet.id));

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('Failed to log out:', error);
    }
  };

  const stats = [
    {
      label: 'Favorites',
      value: favoritePets.length,
      icon: FiHeart,
      color: 'text-rose-600',
      bgColor: 'bg-rose-50',
      borderColor: 'border-rose-200',
      change: '+2 this week',
      changeType: 'positive'
    },
    {
      label: 'Applications',
      value: 2,
      icon: FiUser,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200',
      change: '1 pending',
      changeType: 'neutral'
    },
    {
      label: 'Visits Scheduled',
      value: 1,
      icon: FiCalendar,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
      borderColor: 'border-purple-200',
      change: 'Tomorrow 2PM',
      changeType: 'positive'
    },
    {
      label: 'Profile Views',
      value: 28,
      icon: FiActivity,
      color: 'text-emerald-600',
      bgColor: 'bg-emerald-50',
      borderColor: 'border-emerald-200',
      change: '+5 today',
      changeType: 'positive'
    }
  ];

  const quickActions = [
    {
      title: 'Browse Available Pets',
      description: 'Discover your perfect companion',
      icon: FiSearch,
      link: '/browse',
      gradient: 'from-blue-500 via-blue-600 to-indigo-600',
      count: '150+ pets available',
      emoji: '🔍'
    },
    {
      title: 'Explore Map View',
      description: 'Find pets in your neighborhood',
      icon: FiMap,
      link: '/map',
      gradient: 'from-emerald-500 via-green-600 to-teal-600',
      count: '25+ locations nearby',
      emoji: '🗺️'
    },
    {
      title: 'My Saved Pets',
      description: 'Review your favorite matches',
      icon: FiHeart,
      link: '/favorites',
      gradient: 'from-rose-500 via-pink-600 to-red-600',
      count: `${favoritePets.length} saved pets`,
      emoji: '💝'
    }
  ];

  const recentActivity = [
    {
      action: 'Added Buddy to favorites',
      time: '2 hours ago',
      icon: FaHeart,
      color: 'text-rose-500',
      bgColor: 'bg-rose-50'
    },
    {
      action: 'Submitted application for Luna',
      time: '1 day ago',
      icon: FiUser,
      color: 'text-blue-500',
      bgColor: 'bg-blue-50'
    },
    {
      action: 'Scheduled visit with Max',
      time: '2 days ago',
      icon: FiCalendar,
      color: 'text-purple-500',
      bgColor: 'bg-purple-50'
    },
    {
      action: 'Searched for cats in downtown',
      time: '3 days ago',
      icon: FiSearch,
      color: 'text-emerald-500',
      bgColor: 'bg-emerald-50'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        
        {/* Header Section */}
        <div className="mb-8">
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-white/20 p-8">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
              <div className="flex items-center space-x-6">
                <div className="relative">
                  <div className="bg-gradient-to-r from-blue-500 via-purple-600 to-indigo-600 p-4 rounded-2xl shadow-lg">
                    <FaPaw className="h-10 w-10 text-white" />
                  </div>
                  <div className="absolute -top-1 -right-1 bg-emerald-500 rounded-full p-1.5">
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                  </div>
                </div>
                <div>
                  <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                    Welcome back, {currentUser?.displayName?.split(' ')[0] || 'Friend'}! 👋
                  </h1>
                  <p className="text-gray-600 mt-2 text-lg">
                    Ready to find your furry soulmate? Let's make some magic happen! ✨
                  </p>
                </div>
              </div>
              <div className="mt-6 lg:mt-0 flex items-center space-x-4">
                <button className="bg-white/80 hover:bg-white border border-gray-200 rounded-xl px-4 py-2 flex items-center space-x-2 transition-all duration-300 hover:shadow-md">
                  <FiBell className="h-4 w-4 text-gray-600" />
                  <span className="text-sm font-medium text-gray-700">Notifications</span>
                  <span className="bg-red-500 text-white text-xs rounded-full px-2 py-0.5">3</span>
                </button>
                <button className="bg-gray-100 hover:bg-gray-200 rounded-xl p-2 transition-all duration-300">
                  <FiSettings className="h-5 w-5 text-gray-600" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <div key={index} className={`bg-white/80 backdrop-blur-sm rounded-2xl p-6 border ${stat.borderColor} hover:shadow-xl transition-all duration-300 transform hover:scale-105 group`}>
              <div className="flex items-center justify-between mb-4">
                <div className={`${stat.bgColor} p-3 rounded-xl group-hover:scale-110 transition-transform duration-300`}>
                  <stat.icon className={`h-6 w-6 ${stat.color}`} />
                </div>
                <div className="text-right">
                  <div className="text-3xl font-bold text-gray-900">{stat.value}</div>
                  <div className="text-sm text-gray-500">{stat.label}</div>
                </div>
              </div>
              <div className={`text-xs px-3 py-1 rounded-full inline-block ${
                stat.changeType === 'positive' ? 'bg-emerald-50 text-emerald-700' : 'bg-gray-50 text-gray-600'
              }`}>
                {stat.change}
              </div>
            </div>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Quick Actions</h2>
            <div className="text-sm text-gray-500">Choose your next adventure</div>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {quickActions.map((action, index) => (
              <Link
                key={index}
                to={action.link}
                className="group block relative overflow-hidden"
              >
                <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 border border-white/20 hover:shadow-2xl transition-all duration-500 transform hover:scale-105 relative overflow-hidden">
                  <div className={`absolute inset-0 bg-gradient-to-br ${action.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}></div>
                  
                  <div className="relative z-10">
                    <div className="flex items-center justify-between mb-6">
                      <div className={`bg-gradient-to-br ${action.gradient} p-4 rounded-2xl shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                        <action.icon className="h-7 w-7 text-white" />
                      </div>
                      <div className="text-3xl">{action.emoji}</div>
                    </div>
                    
                    <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-gray-700 transition-colors duration-300">
                      {action.title}
                    </h3>
                    <p className="text-gray-600 mb-4 leading-relaxed">{action.description}</p>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-500">{action.count}</span>
                      <FiArrowRight className="h-5 w-5 text-gray-400 group-hover:text-gray-600 group-hover:translate-x-1 transition-all duration-300" />
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Favorite Pets Section */}
          {favoritePets.length > 0 && (
            <div className="lg:col-span-2">
              <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-white/20 p-8">
                <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center space-x-3">
                    <div className="bg-gradient-to-r from-rose-500 to-pink-600 p-3 rounded-xl">
                      <FaHeart className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900">Your Favorite Pets</h2>
                      <p className="text-gray-500 text-sm">Pets that caught your heart ❤️</p>
                    </div>
                  </div>
                  <Link
                    to="/favorites"
                    className="bg-gradient-to-r from-rose-500 to-pink-600 text-white px-6 py-3 rounded-xl hover:from-rose-600 hover:to-pink-700 transition-all duration-300 font-medium shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center space-x-2"
                  >
                    <span>View All</span>
                    <FiArrowRight className="h-4 w-4" />
                  </Link>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {favoritePets.slice(0, 4).map((pet) => (
                    <div key={pet.id} className="group bg-gray-50/50 rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                      <div className="relative">
                        <img
                          src={pet.images[0]}
                          alt={pet.name}
                          className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm rounded-full p-2 shadow-lg">
                          <FaHeart className="h-4 w-4 text-rose-500" />
                        </div>
                      </div>
                      <div className="p-6">
                        <div className="flex items-center justify-between mb-3">
                          <h3 className="text-xl font-bold text-gray-900">{pet.name}</h3>
                          <span className="text-2xl">{pet.type === 'Dog' ? '🐕' : '🐱'}</span>
                        </div>
                        <p className="text-gray-600 text-sm mb-2">{pet.breed} • {pet.age}</p>
                        <p className="text-gray-700 text-sm mb-4 line-clamp-2">{pet.description}</p>
                        <Link
                          to={`/pet/${pet.id}`}
                          className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-3 px-4 rounded-xl hover:from-blue-600 hover:to-indigo-700 transition-all duration-300 text-center block font-medium shadow-lg hover:shadow-xl transform hover:scale-105"
                        >
                          View Details
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Recent Activity Sidebar */}
          <div className={favoritePets.length > 0 ? 'lg:col-span-1' : 'lg:col-span-3'}>
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-white/20 p-8">
              <div className="flex items-center space-x-3 mb-8">
                <div className="bg-gradient-to-r from-emerald-500 to-teal-600 p-3 rounded-xl">
                  <FiActivity className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">Recent Activity</h2>
                  <p className="text-gray-500 text-sm">Your latest interactions</p>
                </div>
              </div>
              
              <div className="space-y-4">
                {recentActivity.map((activity, index) => (
                  <div key={index} className={`flex items-center space-x-4 p-4 ${activity.bgColor} rounded-2xl hover:shadow-md transition-all duration-300 group`}>
                    <div className="bg-white p-2.5 rounded-xl shadow-sm group-hover:scale-110 transition-transform duration-300">
                      <activity.icon className={`h-5 w-5 ${activity.color}`} />
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold text-gray-900 mb-1">{activity.action}</p>
                      <p className="text-sm text-gray-500">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Call to Action */}
              <div className="mt-8 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-6 border border-blue-100">
                <div className="text-center">
                  <div className="text-4xl mb-3">🎯</div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">Ready to Adopt?</h3>
                  <p className="text-gray-600 text-sm mb-4">
                    Take the next step and schedule a visit with your favorite pet!
                  </p>
                  <Link
                    to="/browse"
                    className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-6 py-3 rounded-xl hover:from-blue-600 hover:to-indigo-700 transition-all duration-300 font-medium shadow-lg hover:shadow-xl transform hover:scale-105 inline-flex items-center space-x-2"
                  >
                    <span>Start Browsing</span>
                    <FiArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdopterDashboard; 