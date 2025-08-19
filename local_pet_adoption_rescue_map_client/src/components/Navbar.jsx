import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { FiMenu, FiX, FiHeart, FiMap, FiLogOut, FiHome, FiInfo, FiPhone } from 'react-icons/fi';
import { FaPaw } from 'react-icons/fa';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [userRole, setUserRole] = useState('adopter');
  const { currentUser, getUserRole, logout, userData } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // Load user role when component mounts or user changes
  useEffect(() => {
    const loadUserRole = async () => {
      if (currentUser) {
        try {
          const role = await getUserRole(currentUser.uid);
          setUserRole(role);
        } catch (error) {
          console.error('Error loading user role:', error);
          setUserRole('adopter');
        }
      }
    };

    loadUserRole();
  }, [currentUser, getUserRole]);

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  const isActiveLink = (path) => {
    return location.pathname === path;
  };

  const publicLinks = [
    { to: '/', label: 'Home', icon: FiHome },
    { to: '/browse', label: 'Browse Pets', icon: FaPaw },
    { to: '/map', label: 'Map View', icon: FiMap },
    { to: '/about', label: 'About', icon: FiInfo },
    { to: '/contact', label: 'Contact', icon: FiPhone },
  ];

  const getDashboardLink = () => {
    if (!currentUser) return '/dashboard';
    if (userRole === 'admin') return '/admin-dashboard';
    if (userRole === 'rescuer') return '/rescuer-dashboard';
    return '/adopter-dashboard';
  };

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 group">
            <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-2 rounded-lg group-hover:scale-110 transition-transform duration-300">
              <FaPaw className="h-6 w-6 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              PetRescue Map
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-6">
            {publicLinks.map(({ to, label, icon: IconComponent }) => (
              <Link
                key={to}
                to={to}
                className={`flex items-center space-x-1 px-2 py-2 rounded-md text-sm font-medium transition-all duration-300 hover:scale-105 whitespace-nowrap ${
                  isActiveLink(to)
                    ? 'text-blue-600 bg-blue-50 border-b-2 border-blue-600'
                    : 'text-gray-700 hover:text-blue-600 hover:bg-blue-50'
                }`}
              >
                <IconComponent className="h-4 w-4 flex-shrink-0" />
                <span className="hidden xl:inline">{label}</span>
              </Link>
            ))}
          </div>

          {/* Desktop Auth Section */}
          <div className="hidden lg:flex items-center space-x-3">
            {currentUser ? (
              <div className="flex items-center space-x-3">
                <Link
                  to="/favorites"
                  className={`flex items-center justify-center p-2 rounded-md transition-all duration-300 hover:scale-105 ${
                    isActiveLink('/favorites')
                      ? 'text-red-600 bg-red-50'
                      : 'text-gray-700 hover:text-red-600 hover:bg-red-50'
                  }`}
                  title="Favorites"
                >
                  <FiHeart className="h-5 w-5" />
                </Link>

                <Link to={getDashboardLink()} className="relative group">
                  <div className={`flex items-center justify-center p-2 rounded-md cursor-pointer transition-all duration-300 hover:scale-105 ${
                    location.pathname.includes('dashboard')
                      ? 'bg-blue-100 ring-2 ring-blue-500'
                      : 'bg-gray-100 hover:bg-gray-200'
                  }`}>
                    {currentUser.photoURL ? (
                      <img
                        src={currentUser.photoURL}
                        alt="Profile"
                        className="h-6 w-6 rounded-full object-cover"
                        onError={(e) => {
                          e.target.style.display = 'none';
                          e.target.nextSibling.style.display = 'block';
                        }}
                      />
                    ) : null}
                    <div 
                      className={`h-6 w-6 rounded-full flex items-center justify-center text-xs font-semibold text-white ${
                        currentUser.photoURL ? 'hidden' : 'block'
                      }`}
                      style={{
                        background: `linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)`
                      }}
                    >
                      {(currentUser.displayName || currentUser.email || 'U').charAt(0).toUpperCase()}
                    </div>
                  </div>
                  {/* Tooltip */}
                  <div className="absolute right-0 top-full mt-2 px-3 py-2 bg-gray-800 text-white text-xs rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap z-10">
                    {currentUser.displayName || currentUser.email?.split('@')[0]}
                  </div>
                </Link>

                <button
                  onClick={handleLogout}
                  className="flex items-center justify-center p-2 rounded-md text-red-600 hover:text-red-700 hover:bg-red-50 transition-all duration-300 hover:scale-105"
                  title="Logout"
                >
                  <FiLogOut className="h-5 w-5" />
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <Link
                  to="/login"
                  className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-all duration-300 hover:scale-105"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:from-blue-600 hover:to-purple-700 transition-all duration-300 hover:scale-105 shadow-md"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>

          {/* Medium screen navigation (tablets) */}
          <div className="hidden md:flex lg:hidden items-center space-x-2">
            {currentUser ? (
              <div className="flex items-center space-x-2">
                <Link to="/favorites" className="p-2 text-gray-700 hover:text-red-600 rounded-md" title="Favorites">
                  <FiHeart className="h-5 w-5" />
                </Link>
                <Link to={getDashboardLink()} className={`p-1 rounded-md transition-colors duration-300 ${
                  location.pathname.includes('dashboard') 
                    ? 'bg-blue-100 ring-2 ring-blue-500' 
                    : 'hover:bg-gray-100'
                }`} title="Dashboard">
                  {currentUser.photoURL ? (
                    <img
                      src={currentUser.photoURL}
                      alt="Profile"
                      className="h-6 w-6 rounded-full object-cover"
                      onError={(e) => {
                        e.target.style.display = 'none';
                        e.target.nextSibling.style.display = 'block';
                      }}
                    />
                  ) : null}
                  <div 
                    className={`h-6 w-6 rounded-full flex items-center justify-center text-xs font-semibold text-white ${
                      currentUser.photoURL ? 'hidden' : 'block'
                    }`}
                    style={{
                      background: `linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)`
                    }}
                  >
                    {(currentUser.displayName || currentUser.email || 'U').charAt(0).toUpperCase()}
                  </div>
                </Link>
                <button onClick={handleLogout} className="p-2 text-red-600 hover:text-red-700 rounded-md" title="Logout">
                  <FiLogOut className="h-5 w-5" />
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Link to="/login" className="text-sm px-3 py-1 text-gray-700 hover:text-blue-600">Login</Link>
                <Link to="/signup" className="text-sm px-3 py-1 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-md">Sign Up</Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden">
            <button
              onClick={toggleMenu}
              className="text-gray-700 hover:text-blue-600 focus:outline-none focus:text-blue-600 transition-colors duration-300"
            >
              {isOpen ? <FiX className="h-6 w-6" /> : <FiMenu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      <div className={`lg:hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}`}>
        <div className="px-2 pt-2 pb-3 space-y-1 bg-white border-t border-gray-200">
          {publicLinks.map(({ to, label, icon: IconComponent }) => (
            <Link
              key={to}
              to={to}
              onClick={closeMenu}
              className={`flex items-center space-x-2 px-3 py-2 rounded-md text-base font-medium transition-all duration-300 ${
                isActiveLink(to)
                  ? 'text-blue-600 bg-blue-50 border-l-4 border-blue-600'
                  : 'text-gray-700 hover:text-blue-600 hover:bg-blue-50'
              }`}
            >
              <IconComponent className="h-5 w-5" />
              <span>{label}</span>
            </Link>
          ))}

          {currentUser ? (
            <>
              <Link
                to="/favorites"
                onClick={closeMenu}
                className={`flex items-center space-x-2 px-3 py-2 rounded-md text-base font-medium transition-all duration-300 ${
                  isActiveLink('/favorites')
                    ? 'text-red-600 bg-red-50 border-l-4 border-red-600'
                    : 'text-gray-700 hover:text-red-600 hover:bg-red-50'
                }`}
              >
                <FiHeart className="h-5 w-5" />
                <span>Favorites</span>
              </Link>
              
              <div className="px-3 py-2 border-t border-gray-200 mt-2">
                <Link 
                  to={getDashboardLink()}
                  onClick={closeMenu}
                  className={`flex items-center space-x-2 mb-2 p-2 rounded-md transition-all duration-300 ${
                    location.pathname.includes('dashboard')
                      ? 'bg-blue-100 ring-2 ring-blue-500'
                      : 'hover:bg-gray-100'
                  }`}
                >
                  <div className="relative">
                    {currentUser.photoURL ? (
                      <img
                        src={currentUser.photoURL}
                        alt="Profile"
                        className="h-8 w-8 rounded-full object-cover"
                        onError={(e) => {
                          e.target.style.display = 'none';
                          e.target.nextSibling.style.display = 'block';
                        }}
                      />
                    ) : null}
                    <div 
                      className={`h-8 w-8 rounded-full flex items-center justify-center text-sm font-semibold text-white ${
                        currentUser.photoURL ? 'hidden' : 'block'
                      }`}
                      style={{
                        background: `linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)`
                      }}
                    >
                      {(currentUser.displayName || currentUser.email || 'U').charAt(0).toUpperCase()}
                    </div>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-700">
                      {currentUser.displayName || currentUser.email?.split('@')[0]}
                    </p>
                    <p className="text-xs text-gray-500">Go to Dashboard</p>
                  </div>
                </Link>
                <button
                  onClick={() => {
                    handleLogout();
                    closeMenu();
                  }}
                  className="flex items-center space-x-2 w-full px-3 py-2 rounded-md text-base font-medium text-red-600 hover:text-red-700 hover:bg-red-50 transition-all duration-300"
                >
                  <FiLogOut className="h-5 w-5" />
                  <span>Logout</span>
                </button>
              </div>
            </>
          ) : (
            <div className="px-3 py-2 border-t border-gray-200 mt-2 space-y-2">
              <Link
                to="/login"
                onClick={closeMenu}
                className="block w-full text-center px-4 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50 transition-all duration-300"
              >
                Login
              </Link>
              <Link
                to="/signup"
                onClick={closeMenu}
                className="block w-full text-center bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-2 rounded-md text-base font-medium hover:from-blue-600 hover:to-purple-700 transition-all duration-300"
              >
                Sign Up
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar; 