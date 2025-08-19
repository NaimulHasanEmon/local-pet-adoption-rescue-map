import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link, useNavigate } from 'react-router-dom';
import { FaGoogle, FaEye, FaEyeSlash, FaEnvelope, FaLock, FaUser, FaArrowLeft, FaPhone, FaMapMarkerAlt, FaUserTag, FaHome, FaUsers, FaPaw, FaIdCard, FaCertificate, FaHeart, FaCamera } from 'react-icons/fa';
import { useAuth } from '../../hooks/useAuth';
import '../../styles/auth.css';

const SignUp = () => {
  const navigate = useNavigate();
  const { signUp, signInWithGoogle } = useAuth();
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    location: '',
    userRole: 'adopter',
    organization: '',
    experience: '',
    // Adopter-specific fields
    housingType: '',
    familySize: '',
    hasOtherPets: '',
    petExperience: '',
    preferredPetType: '',
    workSchedule: '',
    // Rescuer-specific fields
    licenseNumber: '',
    yearsOfExperience: '',
    organizationType: '',
    capacity: '',
    specializations: '',
    // Common fields
    bio: '',
    availability: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 3;

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

  const validateStep = (step) => {
    const newErrors = {};
    
    if (step === 1) {
      // Basic Information
      if (!formData.name.trim()) {
        newErrors.name = 'Name is required';
      } else if (formData.name.trim().length < 2) {
        newErrors.name = 'Name must be at least 2 characters';
      }
      
      if (!formData.email) {
        newErrors.email = 'Email is required';
      } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
        newErrors.email = 'Email is invalid';
      }
      
      if (!formData.password) {
        newErrors.password = 'Password is required';
      } else if (formData.password.length < 6) {
        newErrors.password = 'Password must be at least 6 characters';
      } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.password)) {
        newErrors.password = 'Password must contain at least one uppercase letter, one lowercase letter, and one number';
      }
      
      if (!formData.confirmPassword) {
        newErrors.confirmPassword = 'Please confirm your password';
      } else if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = 'Passwords do not match';
      }

      if (!formData.phone.trim()) {
        newErrors.phone = 'Phone number is required';
      } else if (!/^\+?[\d\s\-\(\)]{10,}$/.test(formData.phone.trim())) {
        newErrors.phone = 'Please enter a valid phone number';
      }

      if (!formData.location.trim()) {
        newErrors.location = 'Location is required';
      }

      if (!formData.userRole) {
        newErrors.userRole = 'Please select your role';
      }
    }

    if (step === 2) {
      // Role-specific Information
      if (formData.userRole === 'rescuer') {
        if (!formData.organization.trim()) {
          newErrors.organization = 'Organization name is required';
        }
        if (!formData.organizationType) {
          newErrors.organizationType = 'Organization type is required';
        }
        if (!formData.licenseNumber.trim()) {
          newErrors.licenseNumber = 'License number is required';
        }
        if (!formData.yearsOfExperience) {
          newErrors.yearsOfExperience = 'Years of experience is required';
        }
        if (!formData.capacity.trim()) {
          newErrors.capacity = 'Capacity information is required';
        }
      } else if (formData.userRole === 'adopter') {
        if (!formData.housingType) {
          newErrors.housingType = 'Housing type is required';
        }
        if (!formData.familySize) {
          newErrors.familySize = 'Family size is required';
        }
        if (!formData.hasOtherPets) {
          newErrors.hasOtherPets = 'Please specify if you have other pets';
        }
        if (!formData.petExperience) {
          newErrors.petExperience = 'Pet experience level is required';
        }
        if (!formData.workSchedule) {
          newErrors.workSchedule = 'Work schedule is required';
        }
      }
    }

    if (step === 3) {
      // Final Details & Terms
      if (!formData.bio.trim()) {
        newErrors.bio = 'Please provide a brief bio';
      } else if (formData.bio.trim().length < 20) {
        newErrors.bio = 'Bio must be at least 20 characters';
      }
      
      if (!acceptTerms) {
        newErrors.terms = 'You must accept the terms and conditions';
      }
    }
    
    return newErrors;
  };

  const validateForm = () => {
    let allErrors = {};
    for (let step = 1; step <= totalSteps; step++) {
      const stepErrors = validateStep(step);
      allErrors = { ...allErrors, ...stepErrors };
    }
    return allErrors;
  };

  const handleNext = () => {
    const stepErrors = validateStep(currentStep);
    
    if (Object.keys(stepErrors).length > 0) {
      setErrors(stepErrors);
      return;
    }
    
    setErrors({});
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrev = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      setErrors({});
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validateForm();
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    
    setIsLoading(true);
    setErrors({});
    
    try {
      // Prepare additional user data
      const additionalData = {
        phone: formData.phone,
        location: formData.location,
        bio: formData.bio,
        availability: formData.availability,
        // Adopter-specific fields
        ...(formData.userRole === 'adopter' && {
          housingType: formData.housingType,
          familySize: formData.familySize,
          hasOtherPets: formData.hasOtherPets,
          petExperience: formData.petExperience,
          preferredPetType: formData.preferredPetType,
          workSchedule: formData.workSchedule
        }),
        // Rescuer-specific fields
        ...(formData.userRole === 'rescuer' && {
          organization: formData.organization,
          organizationType: formData.organizationType,
          licenseNumber: formData.licenseNumber,
          yearsOfExperience: formData.yearsOfExperience,
          capacity: formData.capacity,
          specializations: formData.specializations,
          experience: formData.experience
        })
      };

      const userCredential = await signUp(formData.email, formData.password, formData.name, formData.userRole, additionalData);
      
      navigate('/dashboard');
    } catch (error) {
      console.error('Sign up error:', error);
      setErrors({ general: error.message || 'An unexpected error occurred. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignUp = async () => {
    if (!acceptTerms) {
      setErrors({ terms: 'You must accept the terms and conditions' });
      return;
    }
    
    setIsLoading(true);
    setErrors({});
    
    try {
      await signInWithGoogle();
      navigate('/dashboard');
    } catch (error) {
      console.error('Google sign up error:', error);
      setErrors({ general: error.message || 'Google sign up failed. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Join PetRescue Map - Find Your Perfect Companion</title>
        <meta name="description" content="Create your PetAdopt account and start your journey to find the perfect pet companion" />
      </Helmet>
      
      <div className="auth-container">
        <div className="auth-layout">
          {/* Left Side - Branding & Progress */}
          <div className="auth-brand-side signup-brand">
            <div className="brand-content">
              <div className="brand-logo">
                <div className="logo-icon">
                  <FaPaw className="paw-icon" />
                </div>
                <h2>PetRescue Map</h2>
              </div>
              
              <div className="signup-progress">
                <h3>Join Our Community</h3>
                <p>Start your journey to find the perfect pet companion and make a difference in their lives.</p>
                
                {/* Progress Indicator */}
                <div className="progress-container">
                  <div className="progress-bar">
                    <div 
                      className="progress-fill" 
                      style={{ width: `${(currentStep / totalSteps) * 100}%` }}
                    ></div>
                  </div>
                  <div className="step-indicators">
                    {[1, 2, 3].map((step) => (
                      <div 
                        key={step}
                        className={`step-indicator ${currentStep >= step ? 'active' : ''} ${currentStep === step ? 'current' : ''}`}
                      >
                        <span className="step-number">{step}</span>
                        <span className="step-label">
                          {step === 1 ? 'Basic Info' : step === 2 ? 'Profile Details' : 'Final Steps'}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="signup-benefits">
                <h4>Why Join PetRescue Map?</h4>
                <div className="benefit-list">
                  <div className="benefit-item">
                    <span className="benefit-icon">🔍</span>
                    <span>Browse thousands of pets looking for homes</span>
                  </div>
                  <div className="benefit-item">
                    <span className="benefit-icon">💝</span>
                    <span>Save favorites and get instant notifications</span>
                  </div>
                  <div className="benefit-item">
                    <span className="benefit-icon">🗺️</span>
                    <span>Find pets near you with our interactive map</span>
                  </div>
                  <div className="benefit-item">
                    <span className="benefit-icon">🤝</span>
                    <span>Connect directly with rescue organizations</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Signup Form */}
          <div className="auth-form-side">
            <div className="form-container">

              <div className="form-header">
                <h1>
                  {currentStep === 1 && 'Create Account'}
                  {currentStep === 2 && 'Tell Us About Yourself'}
                  {currentStep === 3 && 'Almost There!'}
                </h1>
                <p>
                  {currentStep === 1 && 'Let\'s get started with your basic information'}
                  {currentStep === 2 && 'Help us personalize your experience'}
                  {currentStep === 3 && 'Complete your profile and join our community'}
                </p>
              </div>

              {errors.general && (
                <div className="error-message">
                  {errors.general}
                </div>
              )}

              <form onSubmit={currentStep === totalSteps ? handleSubmit : (e) => { e.preventDefault(); handleNext(); }} className="modern-form">

            {/* Step 1: Basic Information */}
            {currentStep === 1 && (
              <div className="step-content">

                <div className="form-group">
                  <label htmlFor="name">Full Name</label>
                  <div className="input-wrapper">
                    <FaUser className="input-icon" />
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Enter your full name"
                      className={errors.name ? 'error' : ''}
                    />
                  </div>
                  {errors.name && <span className="field-error">{errors.name}</span>}
                </div>

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
                      placeholder="Enter your email"
                      className={errors.email ? 'error' : ''}
                    />
                  </div>
                  {errors.email && <span className="field-error">{errors.email}</span>}
                </div>

                <div className="form-group">
                  <label htmlFor="phone">Phone Number</label>
                  <div className="input-wrapper">
                    <FaPhone className="input-icon" />
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="Enter your phone number"
                      className={errors.phone ? 'error' : ''}
                    />
                  </div>
                  {errors.phone && <span className="field-error">{errors.phone}</span>}
                </div>

                <div className="form-group">
                  <label htmlFor="location">Location</label>
                  <div className="input-wrapper">
                    <FaMapMarkerAlt className="input-icon" />
                    <input
                      type="text"
                      id="location"
                      name="location"
                      value={formData.location}
                      onChange={handleChange}
                      placeholder="Enter your city/area"
                      className={errors.location ? 'error' : ''}
                    />
                  </div>
                  {errors.location && <span className="field-error">{errors.location}</span>}
                </div>

                <div className="form-group">
                  <label htmlFor="userRole">I am a...</label>
                  <div className="input-wrapper">
                    <FaUserTag className="input-icon" />
                    <select
                      id="userRole"
                      name="userRole"
                      value={formData.userRole}
                      onChange={handleChange}
                      className={errors.userRole ? 'error' : ''}
                    >
                      <option value="adopter">🐾 Pet Adopter - Looking for a furry friend</option>
                      <option value="rescuer">🏥 Rescue Organization - Helping pets find homes</option>
                    </select>
                  </div>
                  {errors.userRole && <span className="field-error">{errors.userRole}</span>}
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
                      placeholder="Create a secure password"
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

                <div className="form-group">
                  <label htmlFor="confirmPassword">Confirm Password</label>
                  <div className="input-wrapper">
                    <FaLock className="input-icon" />
                    <input
                      type={showConfirmPassword ? 'text' : 'password'}
                      id="confirmPassword"
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      placeholder="Confirm your password"
                      className={errors.confirmPassword ? 'error' : ''}
                    />
                    <button
                      type="button"
                      className="password-toggle"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    >
                      {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                    </button>
                  </div>
                  {errors.confirmPassword && <span className="field-error">{errors.confirmPassword}</span>}
                </div>
              </div>
            )}

            {/* Step 2: Role-specific Information */}
            {currentStep === 2 && (
              <div className="step-content">

                {formData.userRole === 'adopter' ? (
                  <>
                    <div className="form-group">
                      <label htmlFor="housingType">Housing Type</label>
                      <div className="input-wrapper">
                        <FaHome className="input-icon" />
                        <select
                          id="housingType"
                          name="housingType"
                          value={formData.housingType}
                          onChange={handleChange}
                          className={errors.housingType ? 'error' : ''}
                        >
                          <option value="">Select your housing type</option>
                          <option value="apartment">🏢 Apartment</option>
                          <option value="house_with_yard">🏡 House with Yard</option>
                          <option value="house_no_yard">🏠 House without Yard</option>
                          <option value="condo">🏘️ Condo/Townhouse</option>
                          <option value="farm">🚜 Farm/Rural Property</option>
                        </select>
                      </div>
                      {errors.housingType && <span className="field-error">{errors.housingType}</span>}
                    </div>

                    <div className="form-group">
                      <label htmlFor="familySize">Family Size</label>
                      <div className="input-wrapper">
                        <FaUsers className="input-icon" />
                        <select
                          id="familySize"
                          name="familySize"
                          value={formData.familySize}
                          onChange={handleChange}
                          className={errors.familySize ? 'error' : ''}
                        >
                          <option value="">Select family size</option>
                          <option value="1">👤 Just me</option>
                          <option value="2">👥 2 people</option>
                          <option value="3-4">👨‍👩‍👧 3-4 people</option>
                          <option value="5+">👨‍👩‍👧‍👦 5+ people</option>
                        </select>
                      </div>
                      {errors.familySize && <span className="field-error">{errors.familySize}</span>}
                    </div>

                    <div className="form-group">
                      <label htmlFor="hasOtherPets">Do you have other pets?</label>
                      <div className="input-wrapper">
                        <FaPaw className="input-icon" />
                        <select
                          id="hasOtherPets"
                          name="hasOtherPets"
                          value={formData.hasOtherPets}
                          onChange={handleChange}
                          className={errors.hasOtherPets ? 'error' : ''}
                        >
                          <option value="">Select an option</option>
                          <option value="no">❌ No, this would be my first pet</option>
                          <option value="dogs">🐕 Yes, I have dogs</option>
                          <option value="cats">🐱 Yes, I have cats</option>
                          <option value="both">🐕🐱 Yes, I have both dogs and cats</option>
                          <option value="other">🐹 Yes, I have other pets</option>
                        </select>
                      </div>
                      {errors.hasOtherPets && <span className="field-error">{errors.hasOtherPets}</span>}
                    </div>

                    <div className="form-group">
                      <label htmlFor="petExperience">Pet Experience Level</label>
                      <div className="input-wrapper">
                        <FaPaw className="input-icon" />
                        <select
                          id="petExperience"
                          name="petExperience"
                          value={formData.petExperience}
                          onChange={handleChange}
                          className={errors.petExperience ? 'error' : ''}
                        >
                          <option value="">Select experience level</option>
                          <option value="first_time">🆕 First-time pet owner</option>
                          <option value="some">📚 Some experience</option>
                          <option value="experienced">⭐ Very experienced</option>
                          <option value="professional">🏆 Professional (vet, trainer, etc.)</option>
                        </select>
                      </div>
                      {errors.petExperience && <span className="field-error">{errors.petExperience}</span>}
                    </div>

                    <div className="form-group">
                      <label htmlFor="preferredPetType">Preferred Pet Type</label>
                      <div className="input-wrapper">
                        <FaHeart className="input-icon" />
                        <select
                          id="preferredPetType"
                          name="preferredPetType"
                          value={formData.preferredPetType}
                          onChange={handleChange}
                        >
                          <option value="">No preference</option>
                          <option value="dogs">🐕 Dogs</option>
                          <option value="cats">🐱 Cats</option>
                          <option value="small_animals">🐰 Small Animals</option>
                          <option value="birds">🐦 Birds</option>
                          <option value="any">💕 Open to any pet</option>
                        </select>
                      </div>
                    </div>

                    <div className="form-group">
                      <label htmlFor="workSchedule">Work Schedule</label>
                      <div className="input-wrapper">
                        <FaUsers className="input-icon" />
                        <select
                          id="workSchedule"
                          name="workSchedule"
                          value={formData.workSchedule}
                          onChange={handleChange}
                          className={errors.workSchedule ? 'error' : ''}
                        >
                          <option value="">Select your schedule</option>
                          <option value="work_from_home">🏠 Work from home</option>
                          <option value="part_time">⏰ Part-time (home often)</option>
                          <option value="full_time">💼 Full-time (away 8+ hours)</option>
                          <option value="retired">🎌 Retired/Stay at home</option>
                          <option value="student">📚 Student</option>
                        </select>
                      </div>
                      {errors.workSchedule && <span className="field-error">{errors.workSchedule}</span>}
                    </div>
                  </>
                ) : (
                  <>
                    <div className="form-group">
                      <label htmlFor="organization">Organization Name</label>
                      <div className="input-wrapper">
                        <FaUser className="input-icon" />
                        <input
                          type="text"
                          id="organization"
                          name="organization"
                          value={formData.organization}
                          onChange={handleChange}
                          placeholder="Enter your organization name"
                          className={errors.organization ? 'error' : ''}
                        />
                      </div>
                      {errors.organization && <span className="field-error">{errors.organization}</span>}
                    </div>

                    <div className="form-group">
                      <label htmlFor="organizationType">Organization Type</label>
                      <div className="input-wrapper">
                        <FaCertificate className="input-icon" />
                        <select
                          id="organizationType"
                          name="organizationType"
                          value={formData.organizationType}
                          onChange={handleChange}
                          className={errors.organizationType ? 'error' : ''}
                        >
                          <option value="">Select organization type</option>
                          <option value="nonprofit">🏥 Non-profit Rescue</option>
                          <option value="shelter">🏢 Animal Shelter</option>
                          <option value="foster">🏠 Foster Network</option>
                          <option value="sanctuary">🌿 Animal Sanctuary</option>
                          <option value="individual">👤 Individual Rescuer</option>
                        </select>
                      </div>
                      {errors.organizationType && <span className="field-error">{errors.organizationType}</span>}
                    </div>

                    <div className="form-group">
                      <label htmlFor="licenseNumber">License/Registration Number</label>
                      <div className="input-wrapper">
                        <FaIdCard className="input-icon" />
                        <input
                          type="text"
                          id="licenseNumber"
                          name="licenseNumber"
                          value={formData.licenseNumber}
                          onChange={handleChange}
                          placeholder="Enter license or registration number"
                          className={errors.licenseNumber ? 'error' : ''}
                        />
                      </div>
                      {errors.licenseNumber && <span className="field-error">{errors.licenseNumber}</span>}
                    </div>

                    <div className="form-group">
                      <label htmlFor="yearsOfExperience">Years of Experience</label>
                      <div className="input-wrapper">
                        <FaCertificate className="input-icon" />
                        <select
                          id="yearsOfExperience"
                          name="yearsOfExperience"
                          value={formData.yearsOfExperience}
                          onChange={handleChange}
                          className={errors.yearsOfExperience ? 'error' : ''}
                        >
                          <option value="">Select experience</option>
                          <option value="less_than_1">🆕 Less than 1 year</option>
                          <option value="1-3">📚 1-3 years</option>
                          <option value="3-5">⭐ 3-5 years</option>
                          <option value="5-10">🏆 5-10 years</option>
                          <option value="10+">👑 10+ years</option>
                        </select>
                      </div>
                      {errors.yearsOfExperience && <span className="field-error">{errors.yearsOfExperience}</span>}
                    </div>

                    <div className="form-group">
                      <label htmlFor="capacity">Current Capacity</label>
                      <div className="input-wrapper">
                        <FaPaw className="input-icon" />
                        <input
                          type="text"
                          id="capacity"
                          name="capacity"
                          value={formData.capacity}
                          onChange={handleChange}
                          placeholder="e.g., 20 dogs, 15 cats"
                          className={errors.capacity ? 'error' : ''}
                        />
                      </div>
                      {errors.capacity && <span className="field-error">{errors.capacity}</span>}
                    </div>

                    <div className="form-group">
                      <label htmlFor="specializations">Specializations (Optional)</label>
                      <div className="input-wrapper">
                        <FaHeart className="input-icon" />
                        <input
                          type="text"
                          id="specializations"
                          name="specializations"
                          value={formData.specializations}
                          onChange={handleChange}
                          placeholder="e.g., Senior pets, Special needs, Specific breeds"
                        />
                      </div>
                    </div>
                  </>
                )}
              </div>
            )}

            {/* Step 3: Final Details */}
            {currentStep === 3 && (
              <div className="step-content">

                <div className="form-group">
                  <label htmlFor="bio">Tell us about yourself</label>
                  <div className="input-wrapper">
                    <FaUser className="input-icon" />
                    <textarea
                      id="bio"
                      name="bio"
                      value={formData.bio}
                      onChange={handleChange}
                      placeholder={formData.userRole === 'adopter' 
                        ? "Share a bit about yourself, your lifestyle, and what you're looking for in a pet companion..."
                        : "Describe your organization's mission, approach to rescue, and what makes you special..."
                      }
                      className={errors.bio ? 'error textarea' : 'textarea'}
                      rows="4"
                    />
                  </div>
                  {errors.bio && <span className="field-error">{errors.bio}</span>}
                </div>

                <div className="form-group">
                  <label htmlFor="availability">Availability for Contact</label>
                  <div className="input-wrapper">
                    <FaPhone className="input-icon" />
                    <select
                      id="availability"
                      name="availability"
                      value={formData.availability}
                      onChange={handleChange}
                    >
                      <option value="">Select availability</option>
                      <option value="anytime">📞 Anytime</option>
                      <option value="business_hours">🕘 Business hours (9-5)</option>
                      <option value="evenings">🌆 Evenings and weekends</option>
                      <option value="weekends">📅 Weekends only</option>
                      <option value="email_preferred">📧 Email preferred</option>
                    </select>
                  </div>
                </div>

                <div className="form-group">
                  <label className="checkbox-wrapper">
                    <input 
                      type="checkbox" 
                      checked={acceptTerms}
                      onChange={(e) => {
                        setAcceptTerms(e.target.checked);
                        if (errors.terms) {
                          setErrors(prev => ({ ...prev, terms: '' }));
                        }
                      }}
                    />
                    <span className="checkmark"></span>
                    I agree to the{' '}
                    <Link to="/terms" className="auth-link">Terms of Service</Link>
                    {' '}and{' '}
                    <Link to="/privacy" className="auth-link">Privacy Policy</Link>
                  </label>
                  {errors.terms && <span className="field-error">{errors.terms}</span>}
                </div>

                <div className="signup-benefits">
                  <h3>🎉 What's next?</h3>
                  <div className="benefits-list">
                    {formData.userRole === 'adopter' ? (
                      <>
                        <div className="benefit-item">
                          <span className="benefit-icon">🔍</span>
                          <span>Browse available pets in your area</span>
                        </div>
                        <div className="benefit-item">
                          <span className="benefit-icon">💝</span>
                          <span>Save favorites and get notifications</span>
                        </div>
                        <div className="benefit-item">
                          <span className="benefit-icon">📋</span>
                          <span>Submit adoption applications</span>
                        </div>
                        <div className="benefit-item">
                          <span className="benefit-icon">🗺️</span>
                          <span>Use our interactive map to find nearby pets</span>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="benefit-item">
                          <span className="benefit-icon">📝</span>
                          <span>List pets available for adoption</span>
                        </div>
                        <div className="benefit-item">
                          <span className="benefit-icon">📊</span>
                          <span>Manage applications and track adoptions</span>
                        </div>
                        <div className="benefit-item">
                          <span className="benefit-icon">🤝</span>
                          <span>Connect with potential adopters</span>
                        </div>
                        <div className="benefit-item">
                          <span className="benefit-icon">📈</span>
                          <span>Access analytics and insights</span>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>
            )}

                {/* Navigation Buttons */}
                <div className="form-navigation">
                  {currentStep > 1 && (
                    <button 
                      type="button" 
                      onClick={handlePrev}
                      className="btn-secondary"
                      disabled={isLoading}
                    >
                      <FaArrowLeft />
                      Previous
                    </button>
                  )}
                  
                  {currentStep < totalSteps ? (
                    <button 
                      type="button" 
                      onClick={handleNext}
                      className="btn-primary"
                      disabled={isLoading}
                    >
                      Continue
                      <FaArrowLeft style={{ transform: 'rotate(180deg)' }} />
                    </button>
                  ) : (
                    <button 
                      type="submit" 
                      className={`btn-primary ${isLoading ? 'loading' : ''}`}
                      disabled={isLoading}
                    >
                      {isLoading ? 'Creating Account...' : `Create Account`}
                    </button>
                  )}
                </div>

                {currentStep === 1 && (
                  <>
                    <div className="divider">
                      <span>or continue with</span>
                    </div>

                    <button 
                      type="button" 
                      className="btn-google"
                      onClick={handleGoogleSignUp}
                      disabled={isLoading}
                    >
                      <FaGoogle />
                      Continue with Google
                    </button>
                  </>
                )}

                {currentStep === 1 && (
                  <div className="form-footer">
                    <p>
                      Already have an account?{' '}
                      <Link to="/login" className="login-link">
                        Sign In
                      </Link>
                    </p>
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignUp; 