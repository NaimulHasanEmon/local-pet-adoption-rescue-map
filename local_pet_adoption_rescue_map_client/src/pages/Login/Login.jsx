import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { FaGoogle, FaEye, FaEyeSlash, FaEnvelope, FaLock, FaArrowLeft, FaHeart, FaPaw, FaShieldAlt } from 'react-icons/fa';
import { useAuth } from '../../hooks/useAuth';
import '../../styles/auth.css';

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { signIn, signInWithGoogle } = useAuth();
  
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const from = location.state?.from?.pathname || '/dashboard';

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Form submitted'); // Debug log
    
    const newErrors = validateForm();
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    
    setIsLoading(true);
    setErrors({});
    
    try {
      console.log('Attempting sign in...'); // Debug log
      await signIn(formData.email, formData.password);
      console.log('Sign in successful'); // Debug log
      navigate(from, { replace: true });
    } catch (error) {
      console.error('Sign in error:', error);
      setErrors({ general: error.message || 'An unexpected error occurred. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    console.log('Google sign in clicked'); // Debug log
    setIsLoading(true);
    setErrors({});
    
    try {
      console.log('Attempting Google sign in...'); // Debug log
      await signInWithGoogle();
      console.log('Google sign in successful'); // Debug log
      navigate(from, { replace: true });
    } catch (error) {
      console.error('Google sign in error:', error);
      setErrors({ general: error.message || 'Google sign in failed. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Sign In - PetRescue Map</title>
        <meta name="description" content="Sign in to your PetAdopt account and continue your pet adoption journey" />
      </Helmet>
      
      <div className="auth-container">
        <div className="auth-layout">
          {/* Left Side - Branding & Features */}
          <div className="auth-brand-side">
            <div className="brand-content">
              <div className="brand-logo">
                <div className="logo-icon">
                  <FaPaw className="paw-icon" />
                </div>
                <h2>PetRescue Map</h2>
              </div>
              
              <div className="brand-tagline">
                <h3>Welcome Back!</h3>
                <p>Continue your journey to find the perfect pet companion and make a difference in their lives.</p>
              </div>

              <div className="feature-highlights">
                <div className="feature-item">
                  <div className="feature-icon">
                    <FaHeart />
                  </div>
                  <div className="feature-text">
                    <h4>Find Love</h4>
                    <p>Discover your perfect furry companion</p>
                  </div>
                </div>
                <div className="feature-item">
                  <div className="feature-icon">
                    <FaPaw />
                  </div>
                  <div className="feature-text">
                    <h4>Trusted Network</h4>
                    <p>Connect with verified rescue organizations</p>
                  </div>
                </div>
                <div className="feature-item">
                  <div className="feature-icon">
                    <FaShieldAlt />
                  </div>
                  <div className="feature-text">
                    <h4>Safe & Secure</h4>
                    <p>Your data is protected with us</p>
                  </div>
                </div>
              </div>

              <div className="stats-row">
                <div className="stat">
                  <span className="stat-number">10K+</span>
                  <span className="stat-label">Happy Adoptions</span>
                </div>
                <div className="stat">
                  <span className="stat-number">500+</span>
                  <span className="stat-label">Rescue Partners</span>
                </div>
                <div className="stat">
                  <span className="stat-number">24/7</span>
                  <span className="stat-label">Support</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Login Form */}
          <div className="auth-form-side">
            <div className="form-container">

              <div className="form-header">
                <h1>Sign In</h1>
                <p>Welcome back! Please sign in to your account.</p>
              </div>

              {errors.general && (
                <div className="error-message">
                  {errors.general}
                </div>
              )}

              <form onSubmit={handleSubmit} className="modern-form">
                <div className="form-group">
                  <label htmlFor="email">Email Address</label>
                  <div className="input-wrapper">
                    <FaEnvelope className="input-icon" />
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Enter your email address"
                      className={errors.email ? 'error' : ''}
                    />
                  </div>
                  {errors.email && <span className="field-error">{errors.email}</span>}
                </div>

                <div className="form-group">
                  <label htmlFor="password">Password</label>
                  <div className="input-wrapper">
                    <FaLock className="input-icon" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      id="password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      placeholder="Enter your password"
                      className={errors.password ? 'error' : ''}
                    />
                    <button
                      type="button"
                      className="password-toggle"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </button>
                  </div>
                  {errors.password && <span className="field-error">{errors.password}</span>}
                </div>

                <div className="form-options">
                  <label className="checkbox-wrapper">
                    <input type="checkbox" />
                    <span className="checkmark"></span>
                    Remember me
                  </label>
                  <Link to="/forgot-password" className="forgot-link">
                    Forgot password?
                  </Link>
                </div>

                <button 
                  type="submit" 
                  className={`btn-primary ${isLoading ? 'loading' : ''}`}
                  disabled={isLoading}
                  onClick={(e) => {
                    console.log('Submit button clicked');
                    // Don't prevent default here as it's a form submit
                  }}
                >
                  {isLoading ? (
                    <>
                      <div className="loading-spinner"></div>
                      Signing In...
                    </>
                  ) : (
                    <>
                      Sign In
                    </>
                  )}
                </button>

                <div className="divider">
                  <span>or continue with</span>
                </div>

                <button 
                  type="button" 
                  className={`btn-google ${isLoading ? 'loading' : ''}`}
                  onClick={(e) => {
                    console.log('Google button clicked');
                    handleGoogleSignIn();
                  }}
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <div className="loading-spinner"></div>
                      Connecting...
                    </>
                  ) : (
                    <>
                      <FaGoogle />
                      Continue with Google
                    </>
                  )}
                </button>

                <div className="form-footer">
                  <p>
                    Don't have an account?{' '}
                    <Link to="/signup" className="signup-link">
                      Create Account
                    </Link>
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login; 