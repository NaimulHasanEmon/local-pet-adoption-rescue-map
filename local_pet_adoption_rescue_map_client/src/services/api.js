const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

// Generic API request function
const apiRequest = async (endpoint, options = {}) => {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || `HTTP error! status: ${response.status}`);
    }

    return data;
  } catch (error) {
    console.error(`API Error (${endpoint}):`, error);
    throw error;
  }
};

// ==================== USER MANAGEMENT API ====================

export const userAPI = {
  // Create or update user
  createOrUpdateUser: async (userData) => {
    return apiRequest('/users', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
  },

  // Get user by UID
  getUserByUID: async (uid) => {
    return apiRequest(`/users/${uid}`);
  },

  // Update user data
  updateUser: async (uid, updateData) => {
    return apiRequest(`/users/${uid}`, {
      method: 'PUT',
      body: JSON.stringify(updateData),
    });
  },
};

// ==================== PET MANAGEMENT API ====================

export const petAPI = {
  // Create new pet
  createPet: async (petData) => {
    return apiRequest('/pets', {
      method: 'POST',
      body: JSON.stringify(petData),
    });
  },

  // Get all pets with filters
  getPets: async (filters = {}) => {
    try {
      // Check if running locally
      if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
        console.log('Running locally, using fallback data for getPets');
        const { fallbackData } = await import('../utils/fallbackData');
        return await fallbackData.getPets(filters);
      }
      
      const queryParams = new URLSearchParams(filters).toString();
      return await apiRequest(`/pets?${queryParams}`);
    } catch (error) {
      // Import fallback data dynamically to avoid circular dependencies
      const { fallbackData } = await import('../utils/fallbackData');
      console.warn('Server unavailable, using fallback data for getPets');
      return await fallbackData.getPets(filters);
    }
  },

  // Get pet by ID
  getPetById: async (id) => {
    try {
      // Check if running locally
      if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
        console.log('Running locally, using fallback data for getPetById');
        const { fallbackData } = await import('../utils/fallbackData');
        return await fallbackData.getPetById(id);
      }
      
      return await apiRequest(`/pets/${id}`);
    } catch (error) {
      // Import fallback data dynamically to avoid circular dependencies
      const { fallbackData } = await import('../utils/fallbackData');
      console.warn('Server unavailable, using fallback data for getPetById');
      return await fallbackData.getPetById(id);
    }
  },

  // Update pet
  updatePet: async (id, updateData) => {
    return apiRequest(`/pets/${id}`, {
      method: 'PUT',
      body: JSON.stringify(updateData),
    });
  },

  // Delete pet
  deletePet: async (id) => {
    return apiRequest(`/pets/${id}`, {
      method: 'DELETE',
    });
  },

  // Search pets
  searchPets: async (searchParams = {}) => {
    const queryParams = new URLSearchParams(searchParams).toString();
    return apiRequest(`/search/pets?${queryParams}`);
  },
};

// ==================== FAVORITES MANAGEMENT API ====================

export const favoritesAPI = {
  // Add pet to favorites
  addToFavorites: async (userId, petId) => {
    return apiRequest('/favorites', {
      method: 'POST',
      body: JSON.stringify({ userId, petId }),
    });
  },

  // Get user favorites
  getUserFavorites: async (userId) => {
    return apiRequest(`/favorites/${userId}`);
  },

  // Remove pet from favorites
  removeFromFavorites: async (userId, petId) => {
    return apiRequest(`/favorites/${userId}/${petId}`, {
      method: 'DELETE',
    });
  },
};

// ==================== RESCUE ORGANIZATION API ====================

export const rescueOrgAPI = {
  // Create rescue organization
  createRescueOrg: async (orgData) => {
    return apiRequest('/rescue-organizations', {
      method: 'POST',
      body: JSON.stringify(orgData),
    });
  },

  // Get all rescue organizations
  getRescueOrganizations: async () => {
    return apiRequest('/rescue-organizations');
  },
};

// ==================== STATISTICS API ====================

export const statsAPI = {
  // Get dashboard statistics
  getDashboardStats: async () => {
    return apiRequest('/stats/dashboard');
  },
};

// ==================== UTILITY FUNCTIONS ====================

export const apiUtils = {
  // Check if server is running
  checkServerStatus: async () => {
    try {
      const response = await fetch(`${API_BASE_URL.replace('/api', '')}`);
      return response.ok;
    } catch (error) {
      return false;
    }
  },

  // Handle API errors gracefully
  handleError: (error, fallbackValue = null) => {
    console.error('API Error:', error);
    return fallbackValue;
  },
};

// ==================== PET APPLICATIONS API ====================

export const applicationAPI = {
  // Submit adoption application
  submitApplication: async (applicationData) => {
    return apiRequest('/applications', {
      method: 'POST',
      body: JSON.stringify(applicationData),
    });
  },

  // Get applications for a pet
  getPetApplications: async (petId) => {
    return apiRequest(`/applications/pet/${petId}`);
  },

  // Update application status
  updateApplicationStatus: async (applicationId, updateData) => {
    return apiRequest(`/applications/${applicationId}`, {
      method: 'PUT',
      body: JSON.stringify(updateData),
    });
  },
};

// ==================== ENHANCED SEARCH API ====================

export const searchAPI = {
  // Basic search
  searchPets: async (searchParams = {}) => {
    const queryParams = new URLSearchParams(searchParams).toString();
    return apiRequest(`/search/pets?${queryParams}`);
  },

  // Advanced search with multiple filters
  advancedSearch: async (searchParams = {}) => {
    try {
      // Check if running locally
      if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
        console.log('Running locally, using fallback data for advancedSearch');
        const { fallbackData } = await import('../utils/fallbackData');
        return await fallbackData.advancedSearch(searchParams);
      }
      
      const queryParams = new URLSearchParams(searchParams).toString();
      return await apiRequest(`/search/advanced?${queryParams}`);
    } catch (error) {
      // Import fallback data dynamically to avoid circular dependencies
      const { fallbackData } = await import('../utils/fallbackData');
      console.warn('Server unavailable, using fallback data for advancedSearch');
      return await fallbackData.advancedSearch(searchParams);
    }
  },
};

// ==================== ENHANCED STATISTICS API ====================

export const enhancedStatsAPI = {
  // Basic dashboard stats
  getDashboardStats: async () => {
    try {
      // Check if running locally
      if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
        console.log('Running locally, using fallback data for getDashboardStats');
        const { fallbackData } = await import('../utils/fallbackData');
        return await fallbackData.getDashboardStats();
      }
      
      return await apiRequest('/stats/dashboard');
    } catch (error) {
      // Import fallback data dynamically to avoid circular dependencies
      const { fallbackData } = await import('../utils/fallbackData');
      console.warn('Server unavailable, using fallback data for getDashboardStats');
      return await fallbackData.getDashboardStats();
    }
  },

  // Detailed statistics
  getDetailedStats: async () => {
    return apiRequest('/stats/detailed');
  },
};

// ==================== SYSTEM & MONITORING API ====================

export const systemAPI = {
  // System health check
  getSystemHealth: async () => {
    return apiRequest('/system/health');
  },

  // API documentation
  getAPIDocs: async () => {
    return apiRequest('/docs');
  },

  // Server status
  checkServerStatus: async () => {
    try {
      const response = await fetch(`${API_BASE_URL.replace('/api', '')}`);
      return response.ok;
    } catch (error) {
      return false;
    }
  },
};

export default {
  userAPI,
  petAPI,
  favoritesAPI,
  rescueOrgAPI,
  statsAPI,
  applicationAPI,
  searchAPI,
  enhancedStatsAPI,
  systemAPI,
  apiUtils,
};
