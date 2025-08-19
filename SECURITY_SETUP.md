# 🔒 Security Setup Guide

This guide explains how to properly secure your Pet Adoption Rescue Map application before deploying to GitHub or production.

## 🚨 **CRITICAL: Never Commit Sensitive Information**

**DO NOT COMMIT** the following files to GitHub:
- `.env` files
- API keys
- Database credentials
- Firebase configuration with real keys
- Private keys or secrets

## 📁 **Environment Files Setup**

### **Server (.env)**
Create a `.env` file in `local_pet_adoption_rescue_map_server/`:

```bash
# MongoDB Configuration
MONGODB_URI=mongodb+srv://your_username:your_password@your_cluster.mongodb.net/your_database?retryWrites=true&w=majority

# Server Configuration
PORT=5000
NODE_ENV=development

# JWT Secret (generate a strong random string)
JWT_SECRET=your_super_secret_jwt_key_here

# CORS Configuration
CORS_ORIGIN=http://localhost:3000

# Rate Limiting
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
```

### **Client (.env)**
Create a `.env` file in `local_pet_adoption_rescue_map_client/`:

```bash
# Firebase Configuration
VITE_FIREBASE_API_KEY=your_actual_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789
VITE_FIREBASE_APP_ID=1:123456789:web:abcdef123456

# API Configuration
VITE_API_BASE_URL=http://localhost:5000/api

# App Configuration
VITE_APP_NAME=Pet Adoption Rescue Map
VITE_APP_VERSION=1.0.0
```

## 🔐 **How to Generate Secure Secrets**

### **JWT Secret**
```bash
# Generate a random 64-character string
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

### **MongoDB Password**
- Use a strong password (12+ characters)
- Include uppercase, lowercase, numbers, and symbols
- Never reuse passwords from other services

## 🛡️ **Security Best Practices**

### **1. Environment Variables**
- ✅ Use `.env` files for local development
- ✅ Use environment variables in production
- ✅ Never hardcode secrets in source code
- ✅ Use different values for dev/staging/production

### **2. Database Security**
- ✅ Use strong, unique passwords
- ✅ Enable MongoDB authentication
- ✅ Restrict network access (IP whitelist)
- ✅ Use SSL/TLS connections
- ✅ Regular security updates

### **3. API Security**
- ✅ Implement rate limiting
- ✅ Use HTTPS in production
- ✅ Validate all inputs
- ✅ Sanitize data before database operations
- ✅ Implement proper CORS policies

### **4. Firebase Security**
- ✅ Use Firebase Security Rules
- ✅ Restrict API key usage
- ✅ Monitor API usage
- ✅ Use Firebase Auth for user management

## 📋 **Pre-Deployment Checklist**

Before pushing to GitHub:

- [ ] ✅ All `.env` files are in `.gitignore`
- [ ] ✅ No hardcoded credentials in source code
- [ ] ✅ Example environment files are provided
- [ ] ✅ Sensitive data is replaced with placeholders
- [ ] ✅ Database connection strings are environment variables
- [ ] ✅ API keys are environment variables
- [ ] ✅ JWT secrets are environment variables

## 🚀 **Production Deployment**

### **Environment Variables in Production**
```bash
# Set environment variables on your hosting platform
# Example for Heroku:
heroku config:set MONGODB_URI="your_production_mongodb_uri"
heroku config:set JWT_SECRET="your_production_jwt_secret"
heroku config:set NODE_ENV="production"

# Example for Vercel:
vercel env add MONGODB_URI
vercel env add JWT_SECRET
```

### **Client Environment Variables**
For Vercel, Netlify, or similar platforms, set the `VITE_*` environment variables in your hosting platform's dashboard.

## 🔍 **Security Testing**

### **Check for Exposed Secrets**
```bash
# Search for potential secrets in your codebase
grep -r "mongodb+srv://" .
grep -r "AIza" .
grep -r "sk-" .
grep -r "pk_" .
```

### **Common Patterns to Avoid**
- ❌ `mongodb+srv://username:password@cluster`
- ❌ `AIzaSyC...` (Firebase API keys)
- ❌ `sk-...` (Stripe secret keys)
- ❌ `pk_...` (Stripe publishable keys)
- ❌ `ghp_...` (GitHub personal access tokens)

## 📚 **Additional Resources**

- [MongoDB Security Checklist](https://docs.mongodb.com/manual/security-checklist/)
- [Firebase Security Rules](https://firebase.google.com/docs/rules)
- [Node.js Security Best Practices](https://nodejs.org/en/docs/guides/security/)
- [OWASP Security Guidelines](https://owasp.org/www-project-top-ten/)

## 🆘 **If You Accidentally Commit Secrets**

1. **Immediate Action**: Revoke/rotate the exposed credentials
2. **Remove from Git History**: Use `git filter-branch` or BFG Repo-Cleaner
3. **Force Push**: Update the remote repository
4. **Notify Team**: Alert all collaborators
5. **Audit**: Check for any unauthorized access

## 📞 **Support**

If you need help with security setup or have questions:
1. Check the troubleshooting guides
2. Review the example environment files
3. Consult the security documentation
4. Never share real credentials in issues or discussions

---

**Remember: Security is everyone's responsibility. When in doubt, ask before committing!**
