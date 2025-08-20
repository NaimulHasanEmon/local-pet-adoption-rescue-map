import { mockPets, mockRescueOrgs, mockApplications, mockFavorites, filterOptions, successStories } from '../data/mockData';

// Helper function to check if server is available
export const checkServerStatus = async (apiUrl) => {
  try {
    // For local development, always return false to use mock data
    if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
      console.log('Running locally, using mock data');
      return false;
    }
    
    const response = await fetch(apiUrl, { 
      method: 'HEAD',
      cache: 'no-cache',
      signal: AbortSignal.timeout(3000) // 3 second timeout
    });
    return response.ok;
  } catch (error) {
    console.warn('Server unavailable, using fallback data:', error);
    return false;
  }
};

// Helper function to normalize mock data to match server data structure
export const normalizeMockData = (pets) => {
  return pets.map(pet => ({
    ...pet,
    _id: pet.id, // Convert id to _id
    createdAt: pet.datePosted, // Convert datePosted to createdAt
    rescueOrganization: {
      name: pet.rescueOrg,
      email: pet.contactEmail,
      phone: pet.contactPhone
    }
  }));
};

// Helper function to filter mock pets based on search criteria
export const filterMockPets = (pets, filters) => {
  let filteredPets = [...pets];

  // Apply search term filter
  if (filters.q) {
    const searchTerm = filters.q.toLowerCase();
    filteredPets = filteredPets.filter(pet => 
      pet.name.toLowerCase().includes(searchTerm) ||
      pet.breed.toLowerCase().includes(searchTerm) ||
      pet.description.toLowerCase().includes(searchTerm)
    );
  }

  // Apply type filter
  if (filters.type && filters.type !== 'All') {
    filteredPets = filteredPets.filter(pet => pet.type === filters.type);
  }

  // Apply size filter
  if (filters.size && filters.size !== 'All') {
    filteredPets = filteredPets.filter(pet => pet.size === filters.size);
  }

  // Apply gender filter
  if (filters.gender && filters.gender !== 'All') {
    filteredPets = filteredPets.filter(pet => pet.gender === filters.gender);
  }

  // Apply energy level filter
  if (filters.energyLevel && filters.energyLevel !== 'All') {
    filteredPets = filteredPets.filter(pet => pet.energyLevel === filters.energyLevel);
  }

  // Apply status filter
  if (filters.status) {
    filteredPets = filteredPets.filter(pet => pet.status === filters.status);
  }

  return filteredPets;
};

// Helper function to paginate mock data
export const paginateMockData = (data, page = 1, limit = 20) => {
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;
  const paginatedData = data.slice(startIndex, endIndex);
  
  return {
    data: paginatedData,
    pagination: {
      currentPage: page,
      totalPages: Math.ceil(data.length / limit),
      totalPets: data.length,
      hasNext: endIndex < data.length,
      hasPrev: page > 1
    }
  };
};

// Main fallback data functions
export const fallbackData = {
  // Get pets with fallback
  getPets: async (filters = {}) => {
    try {
      // Check if server is available
      const serverAvailable = await checkServerStatus(import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000');
      
      if (serverAvailable) {
        // Try to fetch from server
        const response = await fetch(`${import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000'}/api/pets?${new URLSearchParams(filters)}`);
        if (response.ok) {
          return await response.json();
        }
      }
      
      // Fallback to mock data
      console.log('Using fallback mock data for pets');
      const filteredPets = filterMockPets(mockPets, filters);
      const normalizedPets = normalizeMockData(filteredPets);
      const { data, pagination } = paginateMockData(normalizedPets, filters.page || 1, filters.limit || 20);
      
      return {
        success: true,
        pets: data,
        pagination
      };
    } catch (error) {
      console.error('Error in fallback getPets:', error);
      // Return mock data as last resort
      const filteredPets = filterMockPets(mockPets, filters);
      const normalizedPets = normalizeMockData(filteredPets);
      const { data, pagination } = paginateMockData(normalizedPets, filters.page || 1, filters.limit || 20);
      
      return {
        success: true,
        pets: data,
        pagination
      };
    }
  },

  // Search pets with fallback
  searchPets: async (searchParams = {}) => {
    try {
      const serverAvailable = await checkServerStatus(import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000');
      
      if (serverAvailable) {
        const response = await fetch(`${import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000'}/api/search/pets?${new URLSearchParams(searchParams)}`);
        if (response.ok) {
          return await response.json();
        }
      }
      
      // Fallback to mock data
      console.log('Using fallback mock data for search');
      const filteredPets = filterMockPets(mockPets, searchParams);
      const normalizedPets = normalizeMockData(filteredPets);
      
      return {
        success: true,
        pets: normalizedPets,
        total: normalizedPets.length
      };
    } catch (error) {
      console.error('Error in fallback searchPets:', error);
      const filteredPets = filterMockPets(mockPets, searchParams);
      const normalizedPets = normalizeMockData(filteredPets);
      
      return {
        success: true,
        pets: normalizedPets,
        total: normalizedPets.length
      };
    }
  },

  // Advanced search with fallback
  advancedSearch: async (searchParams = {}) => {
    try {
      const serverAvailable = await checkServerStatus(import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000');
      
      if (serverAvailable) {
        const response = await fetch(`${import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000'}/api/search/advanced?${new URLSearchParams(searchParams)}`);
        if (response.ok) {
          return await response.json();
        }
      }
      
      // Fallback to mock data
      console.log('Using fallback mock data for advanced search');
      const filteredPets = filterMockPets(mockPets, searchParams);
      const normalizedPets = normalizeMockData(filteredPets);
      const { data, pagination } = paginateMockData(normalizedPets, searchParams.page || 1, searchParams.limit || 20);
      
      return {
        success: true,
        pets: data,
        pagination
      };
    } catch (error) {
      console.error('Error in fallback advancedSearch:', error);
      const filteredPets = filterMockPets(mockPets, searchParams);
      const normalizedPets = normalizeMockData(filteredPets);
      const { data, pagination } = paginateMockData(normalizedPets, searchParams.page || 1, searchParams.limit || 20);
      
      return {
        success: true,
        pets: data,
        pagination
      };
    }
  },

  // Get pet by ID with fallback
  getPetById: async (id) => {
    try {
      const serverAvailable = await checkServerStatus(import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000');
      
      if (serverAvailable) {
        const response = await fetch(`${import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000'}/api/pets/${id}`);
        if (response.ok) {
          return await response.json();
        }
      }
      
      // Fallback to mock data
      console.log('Using fallback mock data for pet by ID');
      const pet = mockPets.find(p => p.id.toString() === id.toString());
      
      if (pet) {
        const normalizedPet = normalizeMockData([pet])[0];
        return {
          success: true,
          pet: normalizedPet
        };
      } else {
        return {
          success: false,
          message: 'Pet not found'
        };
      }
    } catch (error) {
      console.error('Error in fallback getPetById:', error);
      const pet = mockPets.find(p => p.id.toString() === id.toString());
      
      if (pet) {
        const normalizedPet = normalizeMockData([pet])[0];
        return {
          success: true,
          pet: normalizedPet
        };
      } else {
        return {
          success: false,
          message: 'Pet not found'
        };
      }
    }
  },

  // Get dashboard stats with fallback
  getDashboardStats: async () => {
    try {
      const serverAvailable = await checkServerStatus(import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000');
      
      if (serverAvailable) {
        const response = await fetch(`${import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000'}/api/stats/dashboard`);
        if (response.ok) {
          return await response.json();
        }
      }
      
      // Fallback to mock data
      console.log('Using fallback mock data for dashboard stats');
      const availablePets = mockPets.filter(pet => pet.status === 'Available').length;
      const totalOrganizations = mockRescueOrgs.length;
      
      return {
        success: true,
        stats: {
          availablePets,
          totalOrganizations,
          totalPets: mockPets.length,
          totalApplications: mockApplications.length
        }
      };
    } catch (error) {
      console.error('Error in fallback getDashboardStats:', error);
      const availablePets = mockPets.filter(pet => pet.status === 'Available').length;
      const totalOrganizations = mockRescueOrgs.length;
      
      return {
        success: true,
        stats: {
          availablePets,
          totalOrganizations,
          totalPets: mockPets.length,
          totalApplications: mockApplications.length
        }
      };
    }
  }
};

export default fallbackData;
