import { useState, useCallback, useRef } from 'react';

export const useAPI = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const abortControllerRef = useRef(null);

  const executeAPI = useCallback(async (apiCall, options = {}) => {
    const {
      showLoading = true,
      retryCount = 0,
      retryDelay = 1000,
      onSuccess,
      onError,
      abortPrevious = true
    } = options;

    // Abort previous request if needed
    if (abortPrevious && abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    // Create new abort controller
    abortControllerRef.current = new AbortController();

    if (showLoading) {
      setLoading(true);
    }
    setError(null);

    try {
      const result = await apiCall(abortControllerRef.current.signal);
      
      if (onSuccess) {
        onSuccess(result);
      }
      
      return result;
    } catch (err) {
      // Don't set error if request was aborted
      if (err.name === 'AbortError') {
        return;
      }

      // Retry logic
      if (retryCount > 0 && err.status >= 500) {
        await new Promise(resolve => setTimeout(resolve, retryDelay));
        return executeAPI(apiCall, { ...options, retryCount: retryCount - 1 });
      }

      const errorMessage = err.message || 'An unexpected error occurred';
      setError(errorMessage);
      
      if (onError) {
        onError(err);
      }
      
      throw err;
    } finally {
      if (showLoading) {
        setLoading(false);
      }
    }
  }, []);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  const abortRequest = useCallback(() => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
  }, []);

  return {
    loading,
    error,
    executeAPI,
    clearError,
    abortRequest
  };
};

// Specialized hooks for common API patterns
export const usePetSearch = () => {
  const { loading, error, executeAPI, clearError } = useAPI();
  const [pets, setPets] = useState([]);
  const [pagination, setPagination] = useState(null);

  const searchPets = useCallback(async (searchParams, options = {}) => {
    const { searchAPI } = await import('../services/api');
    
    return executeAPI(
      async (signal) => {
        const result = await searchAPI.advancedSearch(searchParams);
        setPets(result.pets || []);
        setPagination(result.pagination || null);
        return result;
      },
      { ...options, onSuccess: options.onSuccess }
    );
  }, [executeAPI]);

  return {
    loading,
    error,
    pets,
    pagination,
    searchPets,
    clearError
  };
};

export const useFavorites = () => {
  const { loading, error, executeAPI, clearError } = useAPI();
  const [favorites, setFavorites] = useState([]);

  const loadFavorites = useCallback(async (userId, options = {}) => {
    const { favoritesAPI } = await import('../services/api');
    
    return executeAPI(
      async (signal) => {
        const result = await favoritesAPI.getUserFavorites(userId);
        setFavorites(result.favorites || []);
        return result;
      },
      { ...options, onSuccess: options.onSuccess }
    );
  }, [executeAPI]);

  const addToFavorites = useCallback(async (userId, petId, options = {}) => {
    const { favoritesAPI } = await import('../services/api');
    
    return executeAPI(
      async (signal) => {
        const result = await favoritesAPI.addToFavorites(userId, petId);
        // Refresh favorites list
        await loadFavorites(userId);
        return result;
      },
      { ...options, onSuccess: options.onSuccess }
    );
  }, [executeAPI, loadFavorites]);

  const removeFromFavorites = useCallback(async (userId, petId, options = {}) => {
    const { favoritesAPI } = await import('../services/api');
    
    return executeAPI(
      async (signal) => {
        const result = await favoritesAPI.removeFromFavorites(userId, petId);
        // Refresh favorites list
        await loadFavorites(userId);
        return result;
      },
      { ...options, onSuccess: options.onSuccess }
    );
  }, [executeAPI, loadFavorites]);

  return {
    loading,
    error,
    favorites,
    loadFavorites,
    addToFavorites,
    removeFromFavorites,
    clearError
  };
};

export const usePetSubmission = () => {
  const { loading, error, executeAPI, clearError } = useAPI();

  const submitPet = useCallback(async (petData, options = {}) => {
    const { petAPI } = await import('../services/api');
    
    return executeAPI(
      async (signal) => {
        const result = await petAPI.createPet(petData);
        return result;
      },
      { ...options, onSuccess: options.onSuccess }
    );
  }, [executeAPI]);

  return {
    loading,
    error,
    submitPet,
    clearError
  };
};
