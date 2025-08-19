import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { AuthProvider } from './providers/AuthProvider';
import { NotificationProvider } from './components/NotificationSystem';
import ErrorBoundary from './components/ErrorBoundary';
import Routes from './Routes/Routes';
import './App.css';

function App() {
  return (
    <ErrorBoundary>
      <HelmetProvider>
        <NotificationProvider>
          <AuthProvider>
            <Router>
              <div className="App">
                <Routes />
              </div>
            </Router>
          </AuthProvider>
        </NotificationProvider>
      </HelmetProvider>
    </ErrorBoundary>
  );
}

export default App;
