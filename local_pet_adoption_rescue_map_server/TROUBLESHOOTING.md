# 🔧 MongoDB Connection Troubleshooting Guide

## ❌ Common Error: "bad auth : authentication failed"

This error occurs when MongoDB cannot authenticate with the provided credentials.

## 🔍 **Step-by-Step Troubleshooting**

### **1. Verify MongoDB Atlas Credentials**

**Check your MongoDB Atlas dashboard:**
1. Log into [MongoDB Atlas](https://cloud.mongodb.com)
2. Go to your cluster: `localpetcluster0`
3. Click **"Database Access"** in the left sidebar
4. Verify the user exists: `LocalPetAdoptionRescueMap`

### **2. Reset Database Password**

**If the password is incorrect:**
1. In MongoDB Atlas, go to **"Database Access"**
2. Find user `LocalPetAdoptionRescueMap`
3. Click **"Edit"** (pencil icon)
4. Click **"Reset Password"**
5. Set new password (e.g., `LocalPetAdoptionRescueMap123`)
6. Copy the new password

### **3. Update Connection String**

**Replace the password in `index.js`:**
```javascript
// OLD (incorrect)
const uri = "mongodb+srv://username:password@cluster.mongodb.net/database?retryWrites=true&w=majority";

// NEW (with correct password)
const uri = "mongodb+srv://username:YOUR_NEW_PASSWORD@cluster.mongodb.net/database?retryWrites=true&w=majority";
```

### **4. Check Network Access**

**Verify IP whitelist:**
1. In MongoDB Atlas, go to **"Network Access"**
2. Click **"Add IP Address"**
3. Add your current IP or use **"Allow Access from Anywhere"** (0.0.0.0/0)
4. Click **"Confirm"**

### **5. Verify Database User Permissions**

**Check user roles:**
1. In **"Database Access"**, click on your user
2. Ensure it has these roles:
   - `Atlas admin` (or `readWrite` on your database)
   - `User Admin` (if managing other users)

### **6. Test Connection String**

**Use MongoDB Compass to test:**
1. Download [MongoDB Compass](https://www.mongodb.com/products/compass)
2. Use your connection string to connect
3. If it works in Compass, the issue is in the server code

## 🚀 **Alternative Solutions**

### **Option 1: Create New Database User**
1. In MongoDB Atlas, go to **"Database Access"**
2. Click **"Add New Database User"**
3. Set username: `petadoption_user`
4. Set password: `secure_password_123`
5. Set roles: `readWrite` on `petAdoptionDB`
6. Update your connection string with new credentials

### **Option 2: Use Environment Variables**
1. Create `.env` file in server directory:
```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/database
```

2. Update `index.js`:
```javascript
require('dotenv').config();
const uri = process.env.MONGODB_URI || "fallback_connection_string";
```

### **Option 3: Local MongoDB (Development Only)**
1. Install MongoDB locally
2. Use connection string: `mongodb://localhost:27017/petAdoptionDB`

## 🧪 **Testing Your Fix**

### **1. Test Server Startup**
```bash
cd local_pet_adoption_rescue_map_server
npm run dev
```

**Expected Output:**
```
🔌 Attempting to connect to MongoDB...
✅ Successfully connected to MongoDB!
📊 Database indexes created successfully
🚀 Server running on http://localhost:5000
📊 Connected to MongoDB database: petAdoptionDB
```

### **2. Test API Endpoints**
```bash
# Test server status
curl http://localhost:5000/health

# Test database connection
curl http://localhost:5000/
```

### **3. Test Database Operations**
```bash
# Test user creation (should work if DB is connected)
curl -X POST http://localhost:5000/api/users \
  -H "Content-Type: application/json" \
  -d '{"uid":"test123","email":"test@example.com","displayName":"Test User"}'
```

## 🆘 **Still Having Issues?**

### **Check Server Logs:**
- Look for specific error codes
- Check if it's a network, authentication, or permission issue

### **Common Error Codes:**
- **8000**: Authentication failed (wrong username/password)
- **18**: Authentication failed (wrong database)
- **13**: Unauthorized (no permissions)
- **6**: Host unreachable (network/firewall issue)

### **Debug Connection:**
```javascript
// Add this to your connection function for debugging
console.log('Connection string:', uri.replace(/\/\/.*@/, '//***:***@'));
```

## 📞 **Need More Help?**

1. **Check MongoDB Atlas Status**: [status.mongodb.com](https://status.mongodb.com)
2. **MongoDB Documentation**: [docs.mongodb.com](https://docs.mongodb.com)
3. **Community Support**: [community.mongodb.com](https://community.mongodb.com)

## 🔄 **Quick Fix Summary**

1. **Reset password** in MongoDB Atlas
2. **Update connection string** in `index.js`
3. **Check IP whitelist** in Network Access
4. **Verify user permissions** in Database Access
5. **Restart server** with `npm run dev`

The server will now start even without database connection and provide helpful error messages to guide you through the fix!
