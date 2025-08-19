import React, { useState } from "react";
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
import { mockPets } from "../../data/mockData";

const PetProfile = () => {
  const { id } = useParams();
  const [isFavorited, setIsFavorited] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showApplicationForm, setShowApplicationForm] = useState(false);

  // Find the pet by ID
  const pet = mockPets.find((p) => p.id === parseInt(id));

  if (!pet) {
    return (
      <div className='min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center'>
        <div className='text-center'>
          <div className='text-6xl mb-4'>🐕‍🦺</div>
          <h2 className='text-2xl font-bold text-gray-900 mb-2'>
            Pet not found
          </h2>
          <p className='text-gray-600 mb-6'>
            The pet you're looking for doesn't exist.
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

  const handleFavoriteToggle = () => {
    setIsFavorited(!isFavorited);
    // In a real app, this would update the backend
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
                src={pet.images[currentImageIndex]}
                alt={pet.name}
                className='w-full h-96 object-cover'
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
            {pet.images.length > 1 && (
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
                    ${pet.adoptionFee}
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
                    {pet.rescueOrg}
                  </span>
                </div>

                <div className='flex items-center'>
                  <FiMail className='h-5 w-5 text-gray-500 mr-3' />
                  <a
                    href={`mailto:${pet.contactEmail}`}
                    className='text-blue-600 hover:text-blue-700'
                  >
                    {pet.contactEmail}
                  </a>
                </div>

                <div className='flex items-center'>
                  <FiPhone className='h-5 w-5 text-gray-500 mr-3' />
                  <a
                    href={`tel:${pet.contactPhone}`}
                    className='text-blue-600 hover:text-blue-700'
                  >
                    {pet.contactPhone}
                  </a>
                </div>

                <div className='flex items-center'>
                  <FiCalendar className='h-5 w-5 text-gray-500 mr-3' />
                  <span className='text-gray-700'>
                    Listed on {new Date(pet.datePosted).toLocaleDateString()}
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

                <form className='space-y-6'>
                  <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                    <div>
                      <label className='block text-sm font-medium text-gray-700 mb-2'>
                        Full Name
                      </label>
                      <input
                        type='text'
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
                      className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
                      placeholder='(555) 123-4567'
                    />
                  </div>

                  <div>
                    <label className='block text-sm font-medium text-gray-700 mb-2'>
                      Why do you want to adopt {pet.name}?
                    </label>
                    <textarea
                      rows={4}
                      className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none'
                      placeholder='Tell us about your interest in this pet...'
                    ></textarea>
                  </div>

                  <div>
                    <label className='block text-sm font-medium text-gray-700 mb-2'>
                      Living Situation
                    </label>
                    <select className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'>
                      <option>House with yard</option>
                      <option>Apartment</option>
                      <option>Condo</option>
                      <option>Other</option>
                    </select>
                  </div>

                  <div className='flex space-x-4'>
                    <button
                      type='button'
                      onClick={() => setShowApplicationForm(false)}
                      className='flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium'
                    >
                      Cancel
                    </button>
                    <button
                      type='submit'
                      className='flex-1 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:from-blue-600 hover:to-purple-700 font-medium'
                    >
                      Submit Application
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
