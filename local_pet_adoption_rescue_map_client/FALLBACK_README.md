# Fallback Data System

This document explains how the fallback data system works in the Local Pet Adoption Rescue Map application.

## Overview

The fallback data system ensures that the application continues to function even when the server is unavailable or experiencing issues. When the server cannot be reached, the application automatically falls back to using mock data stored locally.

## How It Works

### 1. Server Availability Check
The system first attempts to connect to the server. If the connection fails or times out, it automatically switches to fallback mode.

### 2. Fallback Data Sources
The fallback data is stored in `src/data/mockData.js` and includes:
- Mock pets with realistic Bangladeshi context
- Rescue organizations
- Adoption applications
- Success stories
- Filter options

### 3. Automatic Fallback
When a server request fails, the system:
1. Logs a warning about server unavailability
2. Automatically loads data from the mock data file
3. Applies the same filters and search criteria
4. Returns the filtered results in the same format as the server

## Implementation Details

### Fallback Utility (`src/utils/fallbackData.js`)
- `checkServerStatus()`: Checks if the server is reachable
- `filterMockPets()`: Applies search and filter criteria to mock data
- `paginateMockData()`: Handles pagination for mock data
- `fallbackData`: Main object with fallback functions for all API endpoints

### Updated Components
- **BrowsePets**: Automatically falls back to mock data when server is unavailable
- **Home**: Shows featured pets and stats from fallback data if needed
- **API Service**: Built-in fallback functionality for all pet-related API calls

### API Functions with Fallback
- `getPets()`: Fetches pets with filters, falls back to mock data
- `advancedSearch()`: Advanced search with fallback
- `getDashboardStats()`: Dashboard statistics with fallback
- `getPetById()`: Individual pet details with fallback

## Usage Examples

### Basic Fallback Usage
```javascript
import { fallbackData } from '../utils/fallbackData';

// This will try the server first, then fall back to mock data
const pets = await fallbackData.getPets({ 
  status: 'Available', 
  limit: 10 
});
```

### Search with Fallback
```javascript
const searchResults = await fallbackData.advancedSearch({
  q: 'Tommy',
  type: 'Dog',
  page: 1,
  limit: 20
});
```

## Benefits

1. **Offline Functionality**: Users can browse pets even without internet
2. **Better User Experience**: No more "failed to load" errors
3. **Development Testing**: Developers can test the UI without running the server
4. **Graceful Degradation**: Application remains functional even during server issues

## Configuration

The fallback system automatically detects the server URL from environment variables:
- `VITE_API_BASE_URL`: The base URL for the API server
- Defaults to `http://localhost:5000/api` if not set

## Testing the Fallback System

You can test the fallback system by:
1. Stopping the server
2. Refreshing the browser page
3. The application should automatically load mock data
4. All functionality (search, filters, pagination) should work with mock data

## Mock Data Structure

The mock data includes realistic pet information:
- 6 sample pets with detailed information
- Various breeds, ages, and characteristics
- Bangladeshi locations and context
- Realistic adoption fees and descriptions

## Troubleshooting

If the fallback system isn't working:
1. Check that `mockData.js` is properly imported
2. Verify the fallback utility functions are working
3. Check browser console for any error messages
4. Ensure the mock data structure matches the expected API response format

## Future Enhancements

Potential improvements to the fallback system:
- Local storage caching for better offline experience
- Service worker for offline-first functionality
- Progressive web app features
- More comprehensive mock data sets
