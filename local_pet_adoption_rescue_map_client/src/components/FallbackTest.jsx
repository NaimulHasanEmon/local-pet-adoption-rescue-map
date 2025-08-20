import React, { useState, useEffect } from 'react';
import { fallbackData } from '../utils/fallbackData';

const FallbackTest = () => {
  const [pets, setPets] = useState([]);
  const [stats, setStats] = useState({});
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  // Auto-load data when component mounts
  useEffect(() => {
    testFallbackData();
  }, []);

  const testFallbackData = async () => {
    setLoading(true);
    setMessage('Testing fallback data...');
    
    try {
      // Test getting pets
      const petsResponse = await fallbackData.getPets({ 
        status: 'Available', 
        limit: 5,
        page: 1
      });
      
      if (petsResponse.success) {
        setPets(petsResponse.pets);
        setMessage(`Successfully loaded ${petsResponse.pets.length} pets from fallback data`);
      }

      // Test getting stats
      const statsResponse = await fallbackData.getDashboardStats();
      if (statsResponse.success) {
        setStats(statsResponse.stats);
      }

    } catch (error) {
      setMessage(`Error testing fallback: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const testSearch = async () => {
    setLoading(true);
    setMessage('Testing search with fallback...');
    
    try {
      const searchResponse = await fallbackData.advancedSearch({
        q: 'Tommy',
        type: 'Dog',
        page: 1,
        limit: 10
      });
      
      if (searchResponse.success) {
        setPets(searchResponse.pets);
        setMessage(`Search found ${searchResponse.pets.length} pets matching "Tommy"`);
      }
    } catch (error) {
      setMessage(`Error testing search: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Fallback Data Test</h2>
      
      <div className="mb-6 space-y-2">
        <button
          onClick={testFallbackData}
          disabled={loading}
          className="bg-blue-500 text-white px-4 py-2 rounded disabled:opacity-50"
        >
          Test Fallback Data
        </button>
        
        <button
          onClick={testSearch}
          disabled={loading}
          className="bg-green-500 text-white px-4 py-2 rounded disabled:opacity-50 ml-2"
        >
          Test Search
        </button>
      </div>

      {message && (
        <div className="mb-4 p-3 bg-gray-100 rounded">
          <strong>Status:</strong> {message}
        </div>
      )}

      {loading && (
        <div className="mb-4">Loading...</div>
      )}

      {stats && Object.keys(stats).length > 0 && (
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-2">Statistics</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-blue-100 p-3 rounded">
              <div className="text-2xl font-bold text-blue-600">{stats.totalPets || 0}</div>
              <div className="text-sm text-blue-800">Total Pets</div>
            </div>
            <div className="bg-green-100 p-3 rounded">
              <div className="text-2xl font-bold text-green-600">{stats.availablePets || 0}</div>
              <div className="text-sm text-green-800">Available Pets</div>
            </div>
            <div className="bg-purple-100 p-3 rounded">
              <div className="text-2xl font-bold text-purple-600">{stats.totalOrganizations || 0}</div>
              <div className="text-sm text-purple-800">Organizations</div>
            </div>
            <div className="bg-orange-100 p-3 rounded">
              <div className="text-2xl font-bold text-orange-600">{stats.totalApplications || 0}</div>
              <div className="text-sm text-orange-800">Applications</div>
            </div>
          </div>
        </div>
      )}

      {pets.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold mb-2">Pets from Fallback Data</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {pets.map((pet) => (
              <div key={pet.id} className="border rounded-lg p-4 bg-white shadow">
                <h4 className="font-semibold text-lg">{pet.name}</h4>
                <p className="text-gray-600">{pet.breed} • {pet.age}</p>
                <p className="text-gray-600">{pet.location}</p>
                <p className="text-sm text-gray-500 mt-2">{pet.description}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default FallbackTest;
