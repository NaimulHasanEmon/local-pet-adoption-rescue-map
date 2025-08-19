# 🐾 Pet Adoption & Rescue Map - Frontend Application

[![React](https://img.shields.io/badge/React-18+-blue.svg)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-5.0+-purple.svg)](https://vitejs.dev/)
[![Firebase](https://img.shields.io/badge/Firebase-10.0+-orange.svg)](https://firebase.google.com/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.0+-teal.svg)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

> A modern, responsive web application that connects pet lovers with rescue organizations and adorable pets in need of loving homes. Built with React, Vite, and Firebase for a seamless user experience.

## 🌟 Features

### **User Experience**
- **🎨 Modern UI/UX**: Beautiful, intuitive interface with smooth animations
- **📱 Responsive Design**: Optimized for all devices (desktop, tablet, mobile)
- **⚡ Fast Performance**: Built with Vite for lightning-fast development and builds
- **♿ Accessibility**: WCAG compliant with keyboard navigation and screen reader support

### **Core Functionality**
- **🔐 Authentication**: Secure login/signup with Firebase Auth (Google & Email/Password)
- **🐕 Pet Browsing**: Browse pets with advanced filtering and search
- **❤️ Favorites**: Save and manage your favorite pets
- **🏢 Rescue Organizations**: Discover and connect with rescue organizations
- **🗺️ Interactive Map**: Visual map view of pets and organizations
- **📊 Dashboard**: Personalized dashboard based on user role
- **📝 Pet Applications**: Submit adoption applications for pets

### **Advanced Features**
- **🔍 Smart Search**: Multi-criteria search with real-time filtering
- **📱 PWA Ready**: Progressive Web App capabilities
- **🌙 Dark Mode**: Toggle between light and dark themes
- **🔔 Notifications**: Real-time updates and alerts
- **📱 Offline Support**: Basic functionality when offline

## 🏗️ Architecture

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   React App     │    │   Backend API   │    │   Firebase      │
│   (Components)  │◄──►│   (Node.js)     │◄──►│   (Auth/DB)     │
│                 │    │   (Express)     │    │                 │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

## 🛠️ Tech Stack

### **Frontend Framework**
- **React 18+**: Latest React with hooks and modern patterns
- **Vite 5+**: Next-generation build tool for fast development
- **React Router 6**: Client-side routing with nested routes

### **Styling & UI**
- **Tailwind CSS**: Utility-first CSS framework
- **CSS Modules**: Component-scoped styling
- **Framer Motion**: Smooth animations and transitions
- **React Icons**: Comprehensive icon library

### **State Management**
- **React Context**: Global state management
- **Custom Hooks**: Reusable logic and state
- **Local Storage**: Persistent user preferences

### **Authentication & Backend**
- **Firebase Auth**: Google and email/password authentication
- **REST API**: Custom backend API integration
- **Axios**: HTTP client for API requests

### **Development Tools**
- **ESLint**: Code linting and quality
- **Prettier**: Code formatting
- **Vite Dev Server**: Hot module replacement
- **React DevTools**: Development debugging

## 📋 Prerequisites

Before running this project, make sure you have:

- **Node.js** 18.0.0 or higher
- **npm** 8.0.0 or higher
- **Firebase Project** with Authentication enabled
- **Backend API** running (see server README)
- **Git** for version control

## 🚀 Quick Start

### **1. Clone the Repository**
```bash
git clone https://github.com/yourusername/pet-adoption-rescue-map.git
cd pet-adoption-rescue-map/local_pet_adoption_rescue_map_client
```

### **2. Install Dependencies**
```bash
npm install
```

### **3. Environment Configuration**
Create a `.env` file in the root directory:

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

### **4. Start Development Server**
```bash
npm run dev
```

The application will open at `http://localhost:5173` with hot reload enabled.

### **5. Build for Production**
```bash
npm run build
npm run preview
```

## 📁 Project Structure

```
src/
├── components/           # Reusable UI components
│   ├── common/          # Common components (Button, Input, etc.)
│   ├── layout/          # Layout components (Header, Footer, etc.)
│   └── ui/              # UI-specific components
├── pages/               # Page components
│   ├── Home/            # Home page
│   ├── Login/           # Authentication pages
│   ├── Dashboard/       # User dashboard
│   ├── BrowsePets/      # Pet browsing
│   └── PetProfile/      # Individual pet pages
├── hooks/               # Custom React hooks
├── services/            # API services and utilities
├── providers/           # Context providers
├── styles/              # Global styles and CSS
├── utils/               # Utility functions
└── config/              # Configuration files
```

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

## 🧪 Testing

### **Unit Testing**
```bash
# Run unit tests
npm run test

# Run tests with coverage
npm run test:coverage

# Run tests in watch mode
npm run test:watch
```

### **E2E Testing**
```bash
# Run end-to-end tests
npm run test:e2e

# Run specific test suite
npm run test:e2e:smoke
```

### **Testing Tools**
- **Jest**: Unit testing framework
- **React Testing Library**: Component testing
- **Cypress**: End-to-end testing
- **MSW**: API mocking

## 🚀 Deployment

### **Build Process**
```bash
# Install dependencies
npm ci

# Build for production
npm run build

# Preview build
npm run preview
```

### **Deployment Options**
- **Vercel**: Zero-config deployment
- **Netlify**: Static site hosting
- **Firebase Hosting**: Google's hosting solution
- **AWS S3**: Scalable cloud hosting

### **Environment Variables**
- **Development**: `.env.development`
- **Staging**: `.env.staging`
- **Production**: `.env.production`

## 🔒 Security Features

- **Firebase Auth**: Secure authentication
- **HTTPS Only**: Secure connections
- **Input Validation**: Client-side validation
- **XSS Protection**: React's built-in protection
- **CSP Headers**: Content Security Policy

## 📊 Analytics & Monitoring

### **Performance Monitoring**
- **Core Web Vitals**: LCP, FID, CLS
- **Bundle Analysis**: Webpack bundle analyzer
- **Performance Metrics**: Real User Monitoring

### **Error Tracking**
- **Error Boundaries**: React error handling
- **Logging**: Console and remote logging
- **Monitoring**: Performance and error alerts

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

- **React Team** for the amazing framework
- **Vite Team** for the fast build tool
- **Firebase Team** for authentication services
- **Tailwind CSS Team** for the utility framework
- **All contributors** who help make this project better

## 📞 Support

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
</div>
