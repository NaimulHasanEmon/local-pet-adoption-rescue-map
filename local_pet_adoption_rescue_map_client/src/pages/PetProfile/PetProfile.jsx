import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import {
  FiHeart,
  FiMapPin,
  FiPhone,
  FiMail,
  FiUser,
  FiCalendar,
  FiCheck,
  FiX,
  FiShare2,
  FiArrowLeft,
} from "react-icons/fi";
import { FaPaw } from "react-icons/fa";
import { petAPI, favoritesAPI, applicationAPI } from "../../services/api";
import { useAuth } from "../../hooks/useAuth";
import { fallbackData } from "../../utils/fallbackData";

const PetProfile = () => {
  const { id } = useParams();
  const { currentUser } = useAuth();
  const [pet, setPet] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isFavorited, setIsFavorited] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showApplicationForm, setShowApplicationForm] = useState(false);
  const [applicationSubmitting, setApplicationSubmitting] = useState(false);

  // Fetch pet data with fallback
  useEffect(() => {
    const fetchPet = async () => {
      try {
        setLoading(true);
        setError(null);
        
        let response;
        
        // Check if running locally
        if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
          console.log('Running locally, using fallback data for pet');
          response = await fallbackData.getPetById(id);
        } else {
          try {
            response = await petAPI.getPetById(id);
          } catch (serverError) {
            console.warn('Server unavailable, using fallback data for pet:', serverError);
            response = await fallbackData.getPetById(id);
          }
        }
        
        if (response.success && response.pet) {
          setPet(response.pet);
          
          // Check if pet is favorited (if user is logged in)
          if (currentUser) {
            try {
              const favoritesResponse = await favoritesAPI.getUserFavorites(currentUser.uid);
              if (favoritesResponse.success && favoritesResponse.favorites) {
                const isFav = favoritesResponse.favorites.some(fav => fav.petId === id);
                setIsFavorited(isFav);
              }
            } catch (favError) {
              console.warn('Could not fetch favorites:', favError);
            }
          }
        } else {
          setError('Pet not found');
        }
      } catch (err) {
        console.error('Error fetching pet:', err);
        // Try fallback data as last resort
        try {
          const fallbackResponse = await fallbackData.getPetById(id);
          if (fallbackResponse.success && fallbackResponse.pet) {
            setPet(fallbackResponse.pet);
          } else {
            setError('Pet not found in both server and fallback data');
          }
        } catch (fallbackError) {
          console.error('Fallback data also failed:', fallbackError);
          setError('Failed to load pet information from both server and fallback');
        }
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchPet();
    }
  }, [id, currentUser]);

  // Loading state
  if (loading) {
    return (
      <div className='min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8'>
          <div className='grid grid-cols-1 lg:grid-cols-2 gap-12'>
            {/* Image skeleton */}
            <div className='space-y-4'>
              <div className='bg-white rounded-2xl shadow-lg overflow-hidden animate-pulse'>
                <div className='w-full h-96 bg-gray-200'></div>
              </div>
              <div className='grid grid-cols-4 gap-2'>
                {Array.from({ length: 4 }).map((_, i) => (
                  <div key={i} className='w-full h-20 bg-gray-200 rounded-lg'></div>
                ))}
              </div>
            </div>
            {/* Info skeleton */}
            <div className='space-y-8'>
              <div className='bg-white rounded-2xl shadow-lg p-8 animate-pulse'>
                <div className='h-8 bg-gray-200 rounded mb-4'></div>
                <div className='h-6 bg-gray-200 rounded mb-6 w-3/4'></div>
                <div className='grid grid-cols-4 gap-4 mb-6'>
                  {Array.from({ length: 4 }).map((_, i) => (
                    <div key={i} className='h-16 bg-gray-200 rounded-lg'></div>
                  ))}
                </div>
                <div className='h-20 bg-gray-200 rounded mb-6'></div>
                <div className='h-12 bg-gray-200 rounded'></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Error state
  if (error || !pet) {
    return (
      <div className='min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center'>
        <div className='text-center'>
          <div className='text-6xl mb-4'>🐕‍🦺</div>
          <h2 className='text-2xl font-bold text-gray-900 mb-2'>
            {error || 'Pet not found'}
          </h2>
          <p className='text-gray-600 mb-6'>
            The pet you're looking for doesn't exist or couldn't be loaded.
          </p>
          <Link
            to='/browse'
            className='inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-300'
          >
            <FiArrowLeft className='mr-2 h-4 w-4' />
            Back to Browse
          </Link>
        </div>
      </div>
    );
  }

  const handleFavoriteToggle = async () => {
    if (!currentUser) {
      alert('Please log in to add favorites');
      return;
    }

    try {
      if (isFavorited) {
        await favoritesAPI.removeFromFavorites(currentUser.uid, pet._id);
        setIsFavorited(false);
      } else {
        await favoritesAPI.addToFavorites(currentUser.uid, pet._id);
        setIsFavorited(true);
      }
    } catch (error) {
      console.error('Error toggling favorite:', error);
      alert('Failed to update favorites. Please try again.');
    }
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `Meet ${pet.name}`,
        text: `Check out ${pet.name}, a ${pet.breed} looking for a forever home!`,
        url: window.location.href,
      });
    } else {
      // Fallback for browsers that don't support Web Share API
      navigator.clipboard.writeText(window.location.href);
      alert("Link copied to clipboard!");
    }
  };

  return (
    <div className='min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8'>
        {/* Back Button */}
        <div className='mb-6'>
          <Link
            to='/browse'
            className='inline-flex items-center text-gray-600 hover:text-blue-600 transition-colors duration-300'
          >
            <FiArrowLeft className='mr-2 h-4 w-4' />
            Back to Browse
          </Link>
        </div>

        <div className='grid grid-cols-1 lg:grid-cols-2 gap-12'>
          {/* Pet Images */}
          <div className='space-y-4'>
            <div className='relative bg-white rounded-2xl shadow-lg overflow-hidden'>
              <img
                src={pet.images?.[currentImageIndex] || 'https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=500'}
                alt={pet.name}
                className='w-full h-96 object-cover'
                onError={(e) => {
                  e.target.src = 'https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=500';
                }}
              />
              <div className='absolute top-4 right-4 flex space-x-2'>
                <button
                  onClick={handleFavoriteToggle}
                  className={`p-3 rounded-full shadow-lg transition-all duration-300 ${
                    isFavorited
                      ? "bg-red-500 text-white"
                      : "bg-white text-gray-600 hover:text-red-500"
                  }`}
                >
                  <FiHeart
                    className={`h-5 w-5 ${isFavorited ? "fill-current" : ""}`}
                  />
                </button>
                <button
                  onClick={handleShare}
                  className='p-3 bg-white text-gray-600 hover:text-blue-500 rounded-full shadow-lg transition-colors duration-300'
                >
                  <FiShare2 className='h-5 w-5' />
                </button>
              </div>
              <div className='absolute bottom-4 left-4 bg-blue-500 text-white px-3 py-1 rounded-full text-sm font-medium'>
                {pet.type}
              </div>
            </div>

            {/* Image Thumbnails */}
            {pet.images && pet.images.length > 1 && (
              <div className='grid grid-cols-4 gap-2'>
                {pet.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`relative rounded-lg overflow-hidden transition-all duration-300 ${
                      currentImageIndex === index
                        ? "ring-2 ring-blue-500 scale-105"
                        : "hover:scale-105"
                    }`}
                  >
                    <img
                      src={image}
                      alt={`${pet.name} ${index + 1}`}
                      className='w-full h-20 object-cover'
                      onError={(e) => {
                        e.target.src = 'https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=500';
                      }}
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Pet Information */}
          <div className='space-y-8'>
            {/* Basic Info */}
            <div className='bg-white rounded-2xl shadow-lg p-8'>
              <div className='flex items-start justify-between mb-6'>
                <div>
                  <h1 className='text-4xl font-bold text-gray-900 mb-2'>
                    {pet.name}
                  </h1>
                  <p className='text-xl text-gray-600'>{pet.breed}</p>
                </div>
                <div className='text-right'>
                  <div className='text-3xl font-bold text-green-600'>
                    ৳{pet.adoptionFee}
                  </div>
                  <div className='text-sm text-gray-500'>Adoption Fee</div>
                </div>
              </div>

              <div className='grid grid-cols-2 md:grid-cols-4 gap-4 mb-6'>
                <div className='text-center p-4 bg-gray-50 rounded-lg'>
                  <div className='font-semibold text-gray-900'>{pet.age}</div>
                  <div className='text-sm text-gray-600'>Age</div>
                </div>
                <div className='text-center p-4 bg-gray-50 rounded-lg'>
                  <div className='font-semibold text-gray-900'>
                    {pet.gender}
                  </div>
                  <div className='text-sm text-gray-600'>Gender</div>
                </div>
                <div className='text-center p-4 bg-gray-50 rounded-lg'>
                  <div className='font-semibold text-gray-900'>{pet.size}</div>
                  <div className='text-sm text-gray-600'>Size</div>
                </div>
                <div className='text-center p-4 bg-gray-50 rounded-lg'>
                  <div className='font-semibold text-gray-900'>
                    {pet.energyLevel}
                  </div>
                  <div className='text-sm text-gray-600'>Energy</div>
                </div>
              </div>

              <div className='mb-6'>
                <h3 className='text-lg font-semibold text-gray-900 mb-3'>
                  About {pet.name}
                </h3>
                <p className='text-gray-700 leading-relaxed'>
                  {pet.description}
                </p>
              </div>

              <div className='flex items-center text-gray-600 mb-6'>
                <FiMapPin className='h-4 w-4 mr-2' />
                <span>{pet.location}</span>
              </div>

              <button
                onClick={() => setShowApplicationForm(true)}
                className='w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-4 px-6 rounded-lg hover:from-blue-600 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-300 transform hover:scale-105 font-semibold text-lg'
              >
                Apply to Adopt {pet.name}
              </button>
            </div>

            {/* Health & Characteristics */}
            <div className='bg-white rounded-2xl shadow-lg p-8'>
              <h3 className='text-xl font-bold text-gray-900 mb-6'>
                Health & Characteristics
              </h3>

              <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                <div className='space-y-4'>
                  <div className='flex items-center justify-between'>
                    <span className='text-gray-700'>Vaccinated</span>
                    {pet.vaccinated ? (
                      <FiCheck className='h-5 w-5 text-green-500' />
                    ) : (
                      <FiX className='h-5 w-5 text-red-500' />
                    )}
                  </div>
                  <div className='flex items-center justify-between'>
                    <span className='text-gray-700'>Spayed/Neutered</span>
                    {pet.spayedNeutered ? (
                      <FiCheck className='h-5 w-5 text-green-500' />
                    ) : (
                      <FiX className='h-5 w-5 text-red-500' />
                    )}
                  </div>
                  <div className='flex items-center justify-between'>
                    <span className='text-gray-700'>House Trained</span>
                    {pet.houseTrained ? (
                      <FiCheck className='h-5 w-5 text-green-500' />
                    ) : (
                      <FiX className='h-5 w-5 text-red-500' />
                    )}
                  </div>
                </div>

                <div className='space-y-4'>
                  <div className='flex items-center justify-between'>
                    <span className='text-gray-700'>Good with Kids</span>
                    {pet.goodWithKids ? (
                      <FiCheck className='h-5 w-5 text-green-500' />
                    ) : (
                      <FiX className='h-5 w-5 text-red-500' />
                    )}
                  </div>
                  <div className='flex items-center justify-between'>
                    <span className='text-gray-700'>Good with Pets</span>
                    {pet.goodWithPets ? (
                      <FiCheck className='h-5 w-5 text-green-500' />
                    ) : (
                      <FiX className='h-5 w-5 text-red-500' />
                    )}
                  </div>
                  <div className='flex items-center justify-between'>
                    <span className='text-gray-700'>Energy Level</span>
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        pet.energyLevel === "High"
                          ? "bg-red-100 text-red-800"
                          : pet.energyLevel === "Medium"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-green-100 text-green-800"
                      }`}
                    >
                      {pet.energyLevel}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Rescue Organization */}
            <div className='bg-white rounded-2xl shadow-lg p-8'>
              <h3 className='text-xl font-bold text-gray-900 mb-6'>
                Rescue Organization
              </h3>

              <div className='space-y-4'>
                <div className='flex items-center'>
                  <FaPaw className='h-5 w-5 text-blue-500 mr-3' />
                  <span className='font-semibold text-gray-900'>
                    {pet.rescueOrganization?.name || pet.rescueOrg}
                  </span>
                </div>

                <div className='flex items-center'>
                  <FiMail className='h-5 w-5 text-gray-500 mr-3' />
                  <a
                    href={`mailto:${pet.rescueOrganization?.email || pet.contactEmail}`}
                    className='text-blue-600 hover:text-blue-700'
                  >
                    {pet.rescueOrganization?.email || pet.contactEmail}
                  </a>
                </div>

                <div className='flex items-center'>
                  <FiPhone className='h-5 w-5 text-gray-500 mr-3' />
                  <a
                    href={`tel:${pet.rescueOrganization?.phone || pet.contactPhone}`}
                    className='text-blue-600 hover:text-blue-700'
                  >
                    {pet.rescueOrganization?.phone || pet.contactPhone}
                  </a>
                </div>

                <div className='flex items-center'>
                  <FiCalendar className='h-5 w-5 text-gray-500 mr-3' />
                  <span className='text-gray-700'>
                    Listed on {new Date(pet.createdAt || pet.datePosted).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Application Modal */}
        {showApplicationForm && (
          <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50'>
            <div className='bg-white rounded-2xl max-w-2xl w-full max-h-screen overflow-y-auto'>
              <div className='p-8'>
                <div className='flex items-center justify-between mb-6'>
                  <h3 className='text-2xl font-bold text-gray-900'>
                    Apply to Adopt {pet.name}
                  </h3>
                  <button
                    onClick={() => setShowApplicationForm(false)}
                    className='text-gray-400 hover:text-gray-600'
                  >
                    <FiX className='h-6 w-6' />
                  </button>
                </div>

                <form 
                  className='space-y-6'
                  onSubmit={async (e) => {
                    e.preventDefault();
                    
                    if (!currentUser) {
                      alert('Please log in to submit an application');
                      return;
                    }

                    setApplicationSubmitting(true);
                    
                    try {
                      const formData = new FormData(e.target);
                      const applicationData = {
                        petId: pet._id,
                        applicantId: currentUser.uid,
                        applicantName: formData.get('fullName'),
                        applicantEmail: formData.get('email'),
                        applicantPhone: formData.get('phone'),
                        reason: formData.get('reason'),
                        livingSituation: formData.get('livingSituation'),
                        petName: pet.name
                      };

                      const response = await applicationAPI.submitApplication(applicationData);
                      
                      if (response.success) {
                        alert('Application submitted successfully! The rescue organization will contact you soon.');
                        setShowApplicationForm(false);
                      } else {
                        throw new Error(response.message || 'Failed to submit application');
                      }
                    } catch (error) {
                      console.error('Error submitting application:', error);
                      alert('Failed to submit application. Please try again.');
                    } finally {
                      setApplicationSubmitting(false);
                    }
                  }}
                >
                  <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                    <div>
                      <label className='block text-sm font-medium text-gray-700 mb-2'>
                        Full Name
                      </label>
                      <input
                        type='text'
                        name='fullName'
                        required
                        defaultValue={currentUser?.displayName || ''}
                        className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
                        placeholder='Your full name'
                      />
                    </div>
                    <div>
                      <label className='block text-sm font-medium text-gray-700 mb-2'>
                        Email
                      </label>
                      <input
                        type='email'
                        name='email'
                        required
                        defaultValue={currentUser?.email || ''}
                        className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
                        placeholder='your@email.com'
                      />
                    </div>
                  </div>

                  <div>
                    <label className='block text-sm font-medium text-gray-700 mb-2'>
                      Phone Number
                    </label>
                    <input
                      type='tel'
                      name='phone'
                      required
                      className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
                      placeholder='+880 1xxx-xxxxxx'
                    />
                  </div>

                  <div>
                    <label className='block text-sm font-medium text-gray-700 mb-2'>
                      Why do you want to adopt {pet.name}?
                    </label>
                    <textarea
                      name='reason'
                      rows={4}
                      required
                      className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none'
                      placeholder='Tell us about your interest in this pet...'
                    ></textarea>
                  </div>

                  <div>
                    <label className='block text-sm font-medium text-gray-700 mb-2'>
                      Living Situation
                    </label>
                    <select 
                      name='livingSituation'
                      required
                      className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
                    >
                      <option value=''>Select your living situation</option>
                      <option value='house_with_yard'>House with yard</option>
                      <option value='apartment'>Apartment</option>
                      <option value='condo'>Condo</option>
                      <option value='other'>Other</option>
                    </select>
                  </div>

                  <div className='flex space-x-4'>
                    <button
                      type='button'
                      onClick={() => setShowApplicationForm(false)}
                      disabled={applicationSubmitting}
                      className='flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium disabled:opacity-50'
                    >
                      Cancel
                    </button>
                    <button
                      type='submit'
                      disabled={applicationSubmitting}
                      className='flex-1 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:from-blue-600 hover:to-purple-700 font-medium disabled:opacity-50 disabled:cursor-not-allowed'
                    >
                      {applicationSubmitting ? 'Submitting...' : 'Submit Application'}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PetProfile;
