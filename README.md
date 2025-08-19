# 🐾 Pet Adoption & Rescue Map Platform

[![React](https://img.shields.io/badge/React-18+-blue.svg)](https://reactjs.org/)
[![Node.js](https://img.shields.io/badge/Node.js-18+-green.svg)](https://nodejs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-6.0+-green.svg)](https://www.mongodb.com/)
[![Firebase](https://img.shields.io/badge/Firebase-10.0+-orange.svg)](https://firebase.google.com/)
[![Vite](https://img.shields.io/badge/Vite-5.0+-purple.svg)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.0+-teal.svg)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

> A comprehensive, full-stack platform that connects loving homes with pets in need. Built with modern technologies to create a seamless experience for pet adoption and rescue operations.

## 🌟 Project Overview

The Pet Adoption & Rescue Map Platform is a complete solution for pet adoption and rescue organizations. It features a modern React frontend with a robust Node.js backend, MongoDB database, and Firebase authentication. The platform enables users to browse pets, connect with rescue organizations, and manage the entire adoption process.

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                        Pet Adoption Platform                    │
├─────────────────────────────────────────────────────────────────┤
│  Frontend (React + Vite)  │  Backend (Node.js + Express)      │
│  ├── User Interface       │  ├── RESTful API                  │
│  ├── Authentication       │  ├── Database Management          │
│  ├── Pet Browsing         │  ├── Business Logic               │
│  └── Dashboard            │  └── Security & Validation        │
├─────────────────────────────────────────────────────────────────┤
│  Database (MongoDB Atlas) │  Authentication (Firebase)        │
│  ├── Users                │  ├── Google Auth                  │
│  ├── Pets                 │  ├── Email/Password               │
│  ├── Organizations        │  └── JWT Tokens                   │
│  └── Favorites            │                                   │
└─────────────────────────────────────────────────────────────────┘
```

## 🌟 Features

### **Core Functionality**
- **🐕 Pet Management**: Complete CRUD operations for pets with advanced filtering
- **👥 User Management**: Secure user authentication and role-based access control
- **🏢 Rescue Organization Management**: Comprehensive organization profiles and management
- **❤️ Favorites System**: User favorite pets with efficient data relationships
- **🔍 Advanced Search**: Multi-criteria search with pagination and filtering
- **📊 Analytics Dashboard**: Real-time statistics and insights
- **📱 RESTful API**: Clean, intuitive API design with comprehensive documentation

### **User Experience**
- **🎨 Modern UI/UX**: Beautiful, intuitive interface with smooth animations
- **📱 Responsive Design**: Optimized for all devices (desktop, tablet, mobile)
- **⚡ Fast Performance**: Built with Vite for lightning-fast development and builds
- **♿ Accessibility**: WCAG compliant with keyboard navigation and screen reader support

### **Advanced Features**
- **🔍 Smart Search**: Multi-criteria search with real-time filtering
- **📱 PWA Ready**: Progressive Web App capabilities
- **🌙 Dark Mode**: Toggle between light and dark themes
- **🔔 Notifications**: Real-time updates and alerts
- **📱 Offline Support**: Basic functionality when offline

## 🛠️ Technology Stack

### **Frontend**
- **React 18+**: Modern React with hooks and modern patterns
- **Vite 5+**: Next-generation build tool for fast development
- **React Router 6**: Client-side routing with nested routes
- **Tailwind CSS**: Utility-first CSS framework
- **CSS Modules**: Component-scoped styling
- **React Icons**: Comprehensive icon library

### **Backend**
- **Node.js 18+**: JavaScript runtime
- **Express.js 4.18+**: Web application framework
- **MongoDB 6.0+**: NoSQL database with MongoDB Atlas
- **JWT**: JSON Web Token authentication
- **dotenv**: Environment configuration

### **Authentication & Services**
- **Firebase Auth**: Google and email/password authentication
- **REST API**: Custom backend API integration
- **Axios**: HTTP client for API requests

### **Development Tools**
- **ESLint**: Code linting and quality
- **Prettier**: Code formatting (recommended)
- **Vite Dev Server**: Hot module replacement
- **React DevTools**: Development debugging

## 📋 Prerequisites

Before running this project, make sure you have:

- **Node.js** 18.0.0 or higher
- **npm** 8.0.0 or higher
- **MongoDB Atlas** account (or local MongoDB instance)
- **Firebase Project** with Authentication enabled
- **Git** for version control

## 🚀 Quick Start

### **1. Clone the Repository**
```bash
git clone https://github.com/yourusername/pet-adoption-rescue-map.git
cd pet-adoption-rescue-map
```

### **2. Backend Setup**
```bash
cd local_pet_adoption_rescue_map_server
npm install
cp env.example .env
# Edit .env with your MongoDB credentials
npm start
```

### **3. Frontend Setup**
```bash
cd ../local_pet_adoption_rescue_map_client
npm install
cp env.example .env
# Edit .env with your Firebase credentials
npm run dev
```

### **4. Access the Application**
- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:5000
- **API Documentation**: http://localhost:5000/api/docs

## 📁 Project Structure

```
pet-adoption-rescue-map/
├── README.md                                    # This file
├── .gitignore                                   # Git ignore rules
├── local_pet_adoption_rescue_map_client/        # React Frontend
│   ├── src/                                     # Source code
│   │   ├── components/                          # Reusable UI components
│   │   ├── pages/                               # Page components
│   │   ├── hooks/                               # Custom React hooks
│   │   ├── services/                            # API services
│   │   ├── providers/                           # Context providers
│   │   ├── styles/                              # Global styles
│   │   └── utils/                               # Utility functions
│   ├── public/                                  # Static assets
│   ├── package.json                             # Dependencies
│   └── .env.example                             # Environment template
└── local_pet_adoption_rescue_map_server/        # Node.js Backend
    ├── index.js                                 # Main server file
    ├── package.json                             # Dependencies
    └── .env.example                             # Environment template
```

## 📚 API Documentation

### **Base URL**
```
http://localhost:5000/api
```

### **Authentication Endpoints**
| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/auth/register` | User registration |
| `POST` | `/auth/login` | User authentication |
| `POST` | `/auth/refresh` | Refresh access token |
| `POST` | `/auth/logout` | User logout |

### **Pet Management**
| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/pets` | Get all pets with filtering |
| `GET` | `/pets/:id` | Get specific pet details |
| `POST` | `/pets` | Create new pet listing |
| `PUT` | `/pets/:id` | Update pet information |
| `DELETE` | `/pets/:id` | Remove pet listing |

### **User Management**
| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/users/profile` | Get user profile |
| `PUT` | `/users/profile` | Update user profile |
| `DELETE` | `/users/profile` | Delete user account |

### **Rescue Organizations**
| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/rescue-organizations` | List all organizations |
| `GET` | `/rescue-organizations/:id` | Get organization details |
| `POST` | `/rescue-organizations` | Register new organization |
| `PUT` | `/rescue-organizations/:id` | Update organization info |

### **Favorites System**
| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/favorites` | Get user's favorite pets |
| `POST` | `/favorites/:petId` | Add pet to favorites |
| `DELETE` | `/favorites/:petId` | Remove pet from favorites |

### **Search & Analytics**
| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/search` | Search pets with filters |
| `GET` | `/stats` | Get platform statistics |
| `GET` | `/health` | API health check |

## 🗄️ Database Schema

### **Users Collection**
```javascript
{
  _id: ObjectId,
  uid: String,           // Firebase UID
  email: String,
  displayName: String,
  role: String,          // 'adopter', 'rescuer', 'admin'
  photoURL: String,
  createdAt: Date,
  updatedAt: Date
}
```

### **Pets Collection**
```javascript
{
  _id: ObjectId,
  name: String,
  type: String,          // 'dog', 'cat', 'bird', etc.
  breed: String,
  age: Number,
  gender: String,
  size: String,          // 'small', 'medium', 'large'
  description: String,
  images: [String],
  status: String,        // 'available', 'adopted', 'pending'
  rescueOrganization: ObjectId,
  adoptionFee: Number,
  spayedNeutered: Boolean,
  vaccinated: Boolean,
  createdAt: Date,
  updatedAt: Date
}
```

### **Rescue Organizations Collection**
```javascript
{
  _id: ObjectId,
  name: String,
  description: String,
  email: String,
  phone: String,
  address: {
    street: String,
    city: String,
    state: String,
    zipCode: String,
    coordinates: [Number, Number]  // [longitude, latitude]
  },
  website: String,
  isActive: Boolean,
  createdAt: Date,
  updatedAt: Date
}
```

### **Favorites Collection**
```javascript
{
  _id: ObjectId,
  userId: ObjectId,
  petId: ObjectId,
  createdAt: Date
}
```

## 🔧 Configuration

### **Environment Variables**

#### **Backend (.env)**
```env
# MongoDB Configuration
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/database?retryWrites=true&w=majority

# Server Configuration
PORT=5000
NODE_ENV=development

# Security Configuration
JWT_SECRET=your_super_secret_jwt_key_here
CORS_ORIGIN=http://localhost:5173

# Rate Limiting
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
```

#### **Frontend (.env)**
```env
# Firebase Configuration
VITE_FIREBASE_API_KEY=your_firebase_api_key_here
VITE_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
VITE_FIREBASE_MEASUREMENT_ID=your_measurement_id

# API Configuration
VITE_API_BASE_URL=http://localhost:5000/api
VITE_APP_NAME=Pet Adoption Platform
VITE_APP_VERSION=1.0.0
```

### **Database Indexes**
The API automatically creates the following indexes for optimal performance:
- **Users**: `uid` (unique), `email` (unique)
- **Pets**: `type`, `breed`, `status`, `rescueOrganization`
- **Rescue Organizations**: `name`, `isActive`
- **Favorites**: `userId`, `petId` (compound)

## 🎨 Component Library

### **Common Components**
- **Button**: Primary, secondary, and outline variants
- **Input**: Text, email, password, and search inputs
- **Modal**: Reusable modal dialogs
- **Card**: Content containers with various styles
- **Loading**: Spinners and skeleton loaders

### **Layout Components**
- **Navbar**: Navigation with user authentication
- **Sidebar**: Collapsible sidebar navigation
- **Footer**: Site footer with links and information
- **Main**: Main content wrapper

### **Specialized Components**
- **PetCard**: Pet information display
- **SearchBar**: Advanced search functionality
- **FilterPanel**: Pet filtering options
- **MapView**: Interactive map component
- **ImageGallery**: Pet image carousel

## 🔐 Authentication Flow

### **User Registration**
1. User fills out registration form
2. Firebase creates account
3. User profile stored in backend
4. Redirect to dashboard

### **User Login**
1. User enters credentials
2. Firebase authenticates
3. JWT token generated
4. User session established

### **Role-Based Access**
- **Adopter**: Browse pets, manage favorites, submit applications
- **Rescuer**: Manage pet listings, view applications
- **Admin**: Platform management and analytics

## 📱 Responsive Design

### **Breakpoints**
- **Mobile**: 320px - 768px
- **Tablet**: 768px - 1024px
- **Desktop**: 1024px+

### **Mobile-First Approach**
- Touch-friendly interactions
- Optimized navigation
- Responsive images
- Performance optimization

## 🧪 Testing

### **Frontend Testing**
```bash
cd local_pet_adoption_rescue_map_client
npm test                    # Unit tests
npm run test:coverage       # Coverage report
npm run test:e2e            # End-to-end tests
```

### **Backend Testing**
```bash
cd local_pet_adoption_rescue_map_server
npm test                    # Unit tests
npm run test:coverage       # Coverage report
npm run test:integration    # Integration tests
```

### **API Testing**
Use tools like **Postman**, **Insomnia**, or **curl** to test the endpoints:

```bash
# Health check
curl http://localhost:5000/health

# Get all pets
curl http://localhost:5000/api/pets

# Search pets
curl "http://localhost:5000/api/search?type=dog&size=medium"
```

## 🚀 Deployment

### **Frontend Deployment**
- **Vercel**: Zero-config deployment
- **Netlify**: Static site hosting
- **Firebase Hosting**: Google's hosting solution

### **Backend Deployment**
- **Heroku**: Easy cloud deployment
- **Railway**: Modern deployment platform
- **DigitalOcean**: Scalable cloud hosting
- **AWS EC2**: Enterprise-grade hosting

### **Database**
- **MongoDB Atlas**: Cloud database hosting
- **Local MongoDB**: Development database

### **Environment-Specific Configs**
- **Development**: `.env.development`
- **Staging**: `.env.staging`
- **Production**: `.env.production`

## 📊 Performance & Monitoring

### **Health Checks**
- **Endpoint**: `/health`
- **Database**: `/health/db`
- **Memory**: `/health/memory`

### **Metrics**
- Request count and response times
- Database query performance
- Memory usage and garbage collection
- Error rates and types

## 🔒 Security Features

- **Firebase Authentication**: Secure user authentication
- **JWT Tokens**: Secure API access
- **Input Validation**: Comprehensive request validation
- **Rate Limiting**: Protection against abuse
- **CORS Protection**: Controlled cross-origin requests
- **Environment Variables**: Secure configuration management
- **HTTPS Only**: Secure connections
- **XSS Protection**: React's built-in protection

## 🎯 Performance Optimization

### **Code Splitting**
- Route-based code splitting
- Lazy loading of components
- Dynamic imports for heavy features

### **Image Optimization**
- WebP format support
- Lazy loading images
- Responsive image sizes
- Compression and optimization

### **Bundle Optimization**
- Tree shaking
- Minification
- Gzip compression
- CDN ready

## 📊 Project Status

- **Frontend**: ✅ Complete
- **Backend**: ✅ Complete
- **Database**: ✅ Complete
- **Authentication**: ✅ Complete
- **Documentation**: ✅ Complete
- **Testing**: 🚧 In Progress
- **Deployment**: 🚧 In Progress

## 🎯 Roadmap

### **Phase 1: Core Features** ✅
- [x] User authentication
- [x] Pet browsing and search
- [x] Basic CRUD operations
- [x] Database integration

### **Phase 2: Advanced Features** ✅
- [x] Advanced search and filtering
- [x] Favorites system
- [x] User dashboards
- [x] Organization management

### **Phase 3: Enhancement** 🚧
- [ ] Real-time notifications
- [ ] Advanced analytics
- [ ] Mobile app
- [ ] Payment integration

### **Phase 4: Scale** 📋
- [ ] Multi-language support
- [ ] Advanced reporting
- [ ] API rate limiting
- [ ] Performance optimization

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guidelines](CONTRIBUTING.md) for details.

### **Development Setup**
1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Install dependencies: `npm install`
4. Make your changes
5. Run tests: `npm test`
6. Commit your changes: `git commit -m 'Add amazing feature'`
7. Push to the branch: `git push origin feature/amazing-feature`
8. Open a Pull Request

### **Code Style**
- Follow ESLint configuration
- Use Prettier for formatting
- Write meaningful commit messages
- Add tests for new features
- Update documentation as needed

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **MongoDB Atlas** for cloud database hosting
- **Firebase** for authentication services
- **React Team** for the amazing framework
- **Node.js Community** for continuous improvements
- **Vite Team** for the fast build tool
- **Tailwind CSS Team** for the utility framework
- **All contributors** who help make this project better

## 📞 Support & Community

- **Documentation**: [Wiki](https://github.com/yourusername/pet-adoption-rescue-map/wiki)
- **Issues**: [GitHub Issues](https://github.com/yourusername/pet-adoption-rescue-map/issues)
- **Discussions**: [GitHub Discussions](https://github.com/yourusername/pet-adoption-rescue-map/discussions)
- **Email**: support@petadoptionplatform.com

## 🌟 Star History

[![Star History Chart](https://api.star-history.com/svg?repos=yourusername/pet-adoption-rescue-map&type=Date)](https://star-history.com/#yourusername/pet-adoption-rescue-map&Date)

---

<div align="center">
  <p>Made with ❤️ for pets and their future families</p>
  <p><strong>Every pet deserves a loving home</strong></p>
  
  <p>
    <a href="https://github.com/yourusername/pet-adoption-rescue-map/stargazers">
      <img src="https://img.shields.io/github/stars/yourusername/pet-adoption-rescue-map?style=social" alt="Stars">
    </a>
    <a href="https://github.com/yourusername/pet-adoption-rescue-map/forks">
      <img src="https://img.shields.io/badge/github-forks/yourusername/pet-adoption-rescue-map" alt="Forks">
    </a>
    <a href="https://github.com/yourusername/pet-adoption-rescue-map/issues">
      <img src="https://img.shields.io/github/issues/yourusername/pet-adoption-rescue-map" alt="Issues">
    </a>
    <a href="https://github.com/yourusername/pet-adoption-rescue-map/pulls">
      <img src="https://img.shields.io/github/issues-pr/yourusername/pet-adoption-rescue-map" alt="Pull Requests">
    </a>
  </p>
</div>
