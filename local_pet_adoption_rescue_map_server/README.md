# PetAdoption Rescue Map Server

A comprehensive backend server for the PetAdoption Rescue Map application, built with Node.js, Express, and MongoDB.

## 🚀 Features

- **User Management**: Complete user authentication and profile management
- **Pet Management**: CRUD operations for pets with advanced filtering
- **Favorites System**: User favorites management
- **Rescue Organizations**: Management of rescue organization data
- **Search & Filtering**: Advanced search capabilities for pets
- **Statistics**: Dashboard statistics and analytics
- **MongoDB Integration**: Robust database with proper indexing

## 🛠️ Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB with MongoDB Driver
- **Authentication**: Firebase Auth (client-side)
- **CORS**: Cross-origin resource sharing enabled

## 📋 Prerequisites

- Node.js (v14 or higher)
- MongoDB Atlas account or local MongoDB instance
- Firebase project for authentication

## 🔧 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd local_pet_adoption_rescue_map_server
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure MongoDB**
   - Update the MongoDB connection string in `index.js`
   - Replace `<db_password>` with your actual MongoDB password
   - Ensure your IP is whitelisted in MongoDB Atlas

4. **Start the server**
   ```bash
   # Development mode (with auto-reload)
   npm run dev
   
   # Production mode
   npm start
   ```

## 🌐 API Endpoints

### User Management

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/users` | Create or update user |
| `GET` | `/api/users/:uid` | Get user by UID |
| `PUT` | `/api/users/:uid` | Update user data |

### Pet Management

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/pets` | Create new pet |
| `GET` | `/api/pets` | Get all pets with filters |
| `GET` | `/api/pets/:id` | Get pet by ID |
| `PUT` | `/api/pets/:id` | Update pet |
| `DELETE` | `/api/pets/:id` | Delete pet |

### Favorites Management

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/favorites` | Add pet to favorites |
| `GET` | `/api/favorites/:userId` | Get user favorites |
| `DELETE` | `/api/favorites/:userId/:petId` | Remove from favorites |

### Rescue Organizations

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/rescue-organizations` | Create rescue organization |
| `GET` | `/api/rescue-organizations` | Get all organizations |

### Search & Statistics

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/search/pets` | Search pets with filters |
| `GET` | `/api/stats/dashboard` | Get dashboard statistics |

## 📊 Database Schema

### Users Collection
```javascript
{
  uid: String,           // Firebase UID
  email: String,         // User email
  displayName: String,   // User display name
  photoURL: String,      // Profile picture URL
  userRole: String,      // 'adopter', 'rescuer', 'admin'
  createdAt: Date,       // Account creation date
  updatedAt: Date,       // Last update date
  // Additional user-specific fields based on role
}
```

### Pets Collection
```javascript
{
  name: String,          // Pet name
  type: String,          // 'dog', 'cat', 'bird', etc.
  breed: String,         // Pet breed
  age: Number,           // Pet age
  status: String,        // 'available', 'adopted', 'pending'
  rescueOrgId: String,   // Reference to rescue organization
  description: String,   // Pet description
  images: [String],      // Array of image URLs
  location: String,      // Pet location
  createdAt: Date,       // Listing creation date
  updatedAt: Date        // Last update date
}
```

### Favorites Collection
```javascript
{
  userId: String,        // User UID
  petId: String,         // Pet ID
  createdAt: Date        // When added to favorites
}
```

### Rescue Organizations Collection
```javascript
{
  name: String,          // Organization name
  type: String,          // Organization type
  licenseNumber: String, // License number
  address: String,       // Organization address
  phone: String,         // Contact phone
  email: String,         // Contact email
  website: String,       // Organization website
  description: String,   // Organization description
  status: String,        // 'active', 'inactive'
  createdAt: Date,       // Registration date
  updatedAt: Date        // Last update date
}
```

## 🔍 Query Parameters

### Pet Filtering
- `status`: Filter by pet status
- `type`: Filter by pet type
- `breed`: Filter by breed (case-insensitive)
- `age`: Filter by age
- `rescueOrgId`: Filter by rescue organization
- `page`: Page number for pagination
- `limit`: Number of items per page

### Search Parameters
- `q`: General search query
- `type`: Pet type filter
- `breed`: Breed filter
- `location`: Location filter
- `age`: Age filter

## 🚦 Error Handling

All API endpoints return consistent error responses:

```javascript
{
  success: false,
  message: "Error description",
  error: "Detailed error message"
}
```

## 🔐 Security Features

- **CORS Configuration**: Properly configured for client access
- **Input Validation**: Request body validation
- **Error Logging**: Comprehensive error logging
- **Graceful Fallbacks**: Fallback to localStorage if database fails

## 📈 Performance Features

- **Database Indexing**: Optimized indexes for common queries
- **Connection Pooling**: Efficient MongoDB connection management
- **Async Operations**: Non-blocking I/O operations
- **Graceful Shutdown**: Proper cleanup on server shutdown

## 🧪 Testing

Test the server endpoints using tools like:
- **Postman**
- **Insomnia**
- **cURL**
- **Thunder Client (VS Code)**

## 🚀 Deployment

### Environment Variables
Create a `.env` file for production:
```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
NODE_ENV=production
```

### Production Considerations
- Use environment variables for sensitive data
- Implement rate limiting
- Add request validation middleware
- Set up monitoring and logging
- Use PM2 or similar process manager

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📝 License

This project is licensed under the ISC License.

## 🆘 Support

For support and questions:
- Check the console logs for error details
- Verify MongoDB connection
- Ensure all dependencies are installed
- Check Firebase configuration

## 🔄 Updates

The server automatically:
- Connects to MongoDB on startup
- Creates necessary database indexes
- Handles graceful shutdowns
- Provides fallback mechanisms for offline scenarios
