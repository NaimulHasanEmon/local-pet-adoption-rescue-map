import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { FiPlus, FiEdit, FiEye, FiUsers, FiHeart, FiCheckCircle, FiArrowRight, FiBell, FiSettings, FiTrendingUp, FiAward } from 'react-icons/fi';
import { FaPaw, FaHeart } from 'react-icons/fa';
import { mockPets, mockApplications } from '../../data/mockData';

const RescuerDashboard = () => {
  const { currentUser, logout } = useAuth();
  const [activeFilter, setActiveFilter] = useState('all');
  
  // Mock data for rescuer's pets and applications
  const myPets = mockPets.slice(0, 4); // Simulate rescuer's pets
  const recentApplications = mockApplications;

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('Failed to log out:', error);
    }
  };

  const stats = [
    {
      label: 'Active Listings',
      value: myPets.length,
      icon: FaPaw,
      color: 'text-emerald-600',
      bgColor: 'bg-emerald-50',
      borderColor: 'border-emerald-200',
      change: '+2 this month',
      changeType: 'positive'
    },
    {
      label: 'New Applications',
      value: recentApplications.length,
      icon: FiUsers,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200',
      change: '3 pending review',
      changeType: 'neutral'
    },
    {
      label: 'Successful Adoptions',
      value: 12,
      icon: FiCheckCircle,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
      borderColor: 'border-purple-200',
      change: '+4 this year',
      changeType: 'positive'
    },
    {
      label: 'Total Favorites',
      value: 45,
      icon: FiHeart,
      color: 'text-rose-600',
      bgColor: 'bg-rose-50',
      borderColor: 'border-rose-200',
      change: '+12 this week',
      changeType: 'positive'
    }
  ];

  const quickActions = [
    {
      title: 'List New Pet',
      description: 'Add a new pet ready for adoption',
      icon: FiPlus,
      link: '/submit-pet',
      gradient: 'from-emerald-500 via-green-600 to-teal-600',
      emoji: '➕',
      priority: 'high'
    },
    {
      title: 'Manage Listings',
      description: 'Edit and update your pet profiles',
      icon: FiEdit,
      link: '/manage-pets',
      gradient: 'from-blue-500 via-indigo-600 to-purple-600',
      emoji: '✏️',
      priority: 'medium'
    },
    {
      title: 'Review Applications',
      description: 'Check new adoption requests',
      icon: FiEye,
      link: '/applications',
      gradient: 'from-amber-500 via-orange-600 to-red-600',
      emoji: '📋',
      priority: 'high',
      badge: recentApplications.length
    }
  ];

  const recentActivity = [
    {
      action: 'New application for Buddy',
      time: '1 hour ago',
      icon: FiUsers,
      color: 'text-blue-500',
      bgColor: 'bg-blue-50',
      priority: 'high'
    },
    {
      action: 'Luna was added to favorites',
      time: '3 hours ago',
      icon: FaHeart,
      color: 'text-rose-500',
      bgColor: 'bg-rose-50',
      priority: 'medium'
    },
    {
      action: 'Max\'s profile was updated',
      time: '1 day ago',
      icon: FiEdit,
      color: 'text-emerald-500',
      bgColor: 'bg-emerald-50',
      priority: 'low'
    },
    {
      action: 'Charlie found his forever home! 🎉',
      time: '2 days ago',
      icon: FiCheckCircle,
      color: 'text-purple-500',
      bgColor: 'bg-purple-50',
      priority: 'celebration'
    }
  ];

  const tips = [
    {
      title: 'High-Quality Photos',
      description: 'Great photos increase adoption chances by 60%! Show your pet\'s personality.',
      icon: '📸',
      category: 'Photography'
    },
    {
      title: 'Detailed Descriptions',
      description: 'Include personality traits, energy level, and special needs for perfect matches.',
      icon: '📝',
      category: 'Content'
    },
    {
      title: 'Quick Response Time',
      description: 'Respond to applications within 24 hours to keep adopters engaged.',
      icon: '⚡',
      category: 'Communication'
    },
    {
      title: 'Regular Updates',
      description: 'Keep pet profiles current with recent photos and behavioral updates.',
      icon: '🔄',
      category: 'Maintenance'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-teal-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        
        {/* Header Section */}
        <div className="mb-8">
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-white/20 p-8">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
              <div className="flex items-center space-x-6">
                <div className="relative">
                  <div className="bg-gradient-to-r from-emerald-500 via-green-600 to-teal-600 p-4 rounded-2xl shadow-lg">
                    <FaPaw className="h-10 w-10 text-white" />
                  </div>
                  <div className="absolute -top-1 -right-1 bg-amber-500 rounded-full p-1.5">
                    <FiAward className="w-3 h-3 text-white" />
                  </div>
                </div>
                <div>
                  <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                    Welcome, {currentUser?.displayName?.split(' ')[0] || 'Hero'}! 🌟
                  </h1>
                  <p className="text-gray-600 mt-2 text-lg">
                    Thank you for helping pets find their forever homes! You're making a difference ❤️
                  </p>
                </div>
              </div>
              <div className="mt-6 lg:mt-0 flex items-center space-x-4">
                <button className="bg-white/80 hover:bg-white border border-gray-200 rounded-xl px-4 py-2 flex items-center space-x-2 transition-all duration-300 hover:shadow-md">
                  <FiBell className="h-4 w-4 text-gray-600" />
                  <span className="text-sm font-medium text-gray-700">Notifications</span>
                  <span className="bg-emerald-500 text-white text-xs rounded-full px-2 py-0.5">{recentApplications.length}</span>
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
            <div className="text-sm text-gray-500">Manage your rescue operations</div>
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
                  
                  {action.badge && (
                    <div className="absolute top-4 right-4 bg-red-500 text-white text-xs font-bold rounded-full px-2 py-1 animate-pulse">
                      {action.badge}
                    </div>
                  )}
                  
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
                      <span className={`text-xs px-3 py-1 rounded-full font-medium ${
                        action.priority === 'high' ? 'bg-red-100 text-red-700' : 
                        action.priority === 'medium' ? 'bg-yellow-100 text-yellow-700' : 
                        'bg-green-100 text-green-700'
                      }`}>
                        {action.priority} priority
                      </span>
                      <FiArrowRight className="h-5 w-5 text-gray-400 group-hover:text-gray-600 group-hover:translate-x-1 transition-all duration-300" />
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* My Pet Listings */}
          <div className="lg:col-span-2">
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-white/20 p-8">
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center space-x-3">
                  <div className="bg-gradient-to-r from-blue-500 to-indigo-600 p-3 rounded-xl">
                    <FaPaw className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">My Pet Listings</h2>
                    <p className="text-gray-500 text-sm">{myPets.length} pets waiting for homes</p>
                  </div>
                </div>
                <Link
                  to="/submit-pet"
                  className="bg-gradient-to-r from-emerald-500 to-green-600 text-white px-6 py-3 rounded-xl hover:from-emerald-600 hover:to-green-700 transition-all duration-300 font-medium shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center space-x-2"
                >
                  <FiPlus className="h-4 w-4" />
                  <span>Add New Pet</span>
                </Link>
              </div>
              
              <div className="space-y-4">
                {myPets.map((pet) => (
                  <div key={pet.id} className="group bg-gray-50/50 rounded-2xl p-6 hover:bg-white hover:shadow-lg transition-all duration-300">
                    <div className="flex items-center space-x-6">
                      <div className="relative">
                        <img
                          src={pet.images[0]}
                          alt={pet.name}
                          className="w-20 h-20 rounded-2xl object-cover group-hover:scale-110 transition-transform duration-300"
                        />
                        <div className="absolute -top-2 -right-2 bg-emerald-500 text-white text-xs font-bold rounded-full px-2 py-1">
                          {pet.status || 'Available'}
                        </div>
                      </div>
                      
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="text-xl font-bold text-gray-900">{pet.name}</h3>
                          <span className="text-2xl">{pet.type === 'Dog' ? '🐕' : '🐱'}</span>
                        </div>
                        <p className="text-gray-600 mb-1">{pet.breed} • {pet.age}</p>
                        <p className="text-sm text-gray-500">Posted {pet.datePosted || '2 weeks ago'}</p>
                        <div className="flex items-center space-x-4 mt-3">
                          <div className="flex items-center space-x-1 text-rose-500">
                            <FaHeart className="h-4 w-4" />
                            <span className="text-sm font-medium">12</span>
                          </div>
                          <div className="flex items-center space-x-1 text-blue-500">
                            <FiEye className="h-4 w-4" />
                            <span className="text-sm font-medium">45 views</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex flex-col space-y-2">
                        <Link
                          to={`/pet/${pet.id}/edit`}
                          className="bg-blue-100 hover:bg-blue-200 text-blue-700 p-3 rounded-xl transition-colors duration-300 group/btn"
                        >
                          <FiEdit className="h-4 w-4 group-hover/btn:scale-110 transition-transform duration-300" />
                        </Link>
                        <Link
                          to={`/pet/${pet.id}`}
                          className="bg-gray-100 hover:bg-gray-200 text-gray-700 p-3 rounded-xl transition-colors duration-300 group/btn"
                        >
                          <FiEye className="h-4 w-4 group-hover/btn:scale-110 transition-transform duration-300" />
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Recent Activity */}
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-white/20 p-8">
              <div className="flex items-center space-x-3 mb-8">
                <div className="bg-gradient-to-r from-purple-500 to-indigo-600 p-3 rounded-xl">
                  <FiTrendingUp className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">Recent Activity</h2>
                  <p className="text-gray-500 text-sm">Latest updates</p>
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
                    {activity.priority === 'high' && (
                      <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Applications Summary */}
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-white/20 p-8">
              <div className="flex items-center space-x-3 mb-6">
                <div className="bg-gradient-to-r from-amber-500 to-orange-600 p-3 rounded-xl">
                  <FiUsers className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-900">Applications</h2>
                  <p className="text-gray-500 text-sm">{recentApplications.length} pending</p>
                </div>
              </div>
              
              <div className="space-y-3">
                {recentApplications.slice(0, 3).map((application) => (
                  <div key={application.id} className="p-4 bg-gray-50/50 rounded-2xl hover:bg-white hover:shadow-md transition-all duration-300">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold text-gray-900">{application.applicantName}</h4>
                      <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                        application.status === 'Pending' 
                          ? 'bg-yellow-100 text-yellow-800' 
                          : 'bg-green-100 text-green-800'
                      }`}>
                        {application.status}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mb-1">For: {application.petName}</p>
                    <p className="text-xs text-gray-500">{application.submittedDate}</p>
                  </div>
                ))}
              </div>
              
              <Link
                to="/applications"
                className="w-full mt-4 bg-gradient-to-r from-amber-500 to-orange-600 text-white py-3 px-4 rounded-xl hover:from-amber-600 hover:to-orange-700 transition-all duration-300 text-center block font-medium shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                Review All Applications
              </Link>
            </div>
          </div>
        </div>

        {/* Tips Section */}
        <div className="mt-8 bg-gradient-to-r from-emerald-50 via-blue-50 to-purple-50 rounded-3xl p-8 border border-white/20">
          <div className="flex items-center space-x-3 mb-8">
            <div className="text-4xl">💡</div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Pro Rescuer Tips</h2>
              <p className="text-gray-600">Expert advice to increase adoption success</p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {tips.map((tip, index) => (
              <div key={index} className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 hover:shadow-lg transition-all duration-300 transform hover:scale-105">
                <div className="flex items-start space-x-4">
                  <div className="text-3xl">{tip.icon}</div>
                  <div>
                    <div className="flex items-center space-x-2 mb-2">
                      <h3 className="font-bold text-gray-900">{tip.title}</h3>
                      <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                        {tip.category}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 leading-relaxed">{tip.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RescuerDashboard; 