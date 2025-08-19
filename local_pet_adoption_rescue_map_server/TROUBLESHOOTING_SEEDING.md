# 🚨 Seeding Troubleshooting Guide

This guide helps you identify and fix issues with the database seeding process.

## 🔍 **Current Issue**
You're only seeing rescue organizations in your database, but pets and other data are missing.

## 🧪 **Step-by-Step Testing**

### **Step 1: Test Single Pet Insertion**
```bash
cd local_pet_adoption_rescue_map_server
node testSinglePet.js
```

This will test if individual pets can be inserted without issues.

### **Step 2: Run Enhanced Seeding Script**
```bash
node seedData.js
```

The enhanced script now includes detailed logging and verification steps.

### **Step 3: Check Database Contents**
```bash
node testSeeding.js
```

This will show you exactly what's in each collection.

## 🚨 **Common Issues & Solutions**

### **Issue 1: Pets Collection Empty**
**Symptoms:** Only rescue organizations are visible
**Possible Causes:**
- MongoDB validation errors
- Data type mismatches
- Collection permissions

**Solution:**
1. Check the console output from `seedData.js`
2. Look for error messages
3. Verify MongoDB connection

### **Issue 2: Data Type Problems**
**Symptoms:** Insertion fails silently
**Common Problems:**
- Date objects not properly formatted
- Boolean values as strings
- Array fields with wrong types

**Solution:**
1. Check the `testSinglePet.js` output
2. Verify data types in the mock data
3. Ensure all required fields are present

### **Issue 3: Collection Access Issues**
**Symptoms:** Can't read/write to pets collection
**Possible Causes:**
- Collection doesn't exist
- Permission issues
- Database connection problems

**Solution:**
1. Check if collections exist
2. Verify database connection
3. Check MongoDB user permissions

## 🔧 **Manual Database Check**

### **Using MongoDB Compass:**
1. Connect to your cluster
2. Navigate to `petAdoptionDB` database
3. Check each collection manually
4. Look for any error messages

### **Using MongoDB Shell:**
```bash
mongosh "mongodb+srv://LocalPetAdoptionRescueMap:Req0NlhvAB60Kq33@localpetcluster0.1ggvfxo.mongodb.net/petAdoptionDB"

# Check collections
show collections

# Check pets collection
db.pets.find().pretty()

# Check rescue organizations
db.rescueOrganizations.find().pretty()

# Count documents
db.pets.countDocuments()
db.rescueOrganizations.countDocuments()
```

## 📊 **Expected Results**

After successful seeding, you should see:

### **Collections:**
- `pets` - 6 documents
- `rescueOrganizations` - 6 documents  
- `applications` - 2 documents
- `successStories` - 2 documents
- `favorites` - 3 documents

### **Sample Pet Document:**
```json
{
  "_id": "ObjectId(...)",
  "name": "Tommy",
  "type": "Dog",
  "breed": "Street Dog",
  "age": "3 years",
  "gender": "Male",
  "size": "Large",
  "location": "Dhaka",
  "coordinates": [23.8103, 90.4125],
  "description": "Tommy is a friendly and energetic street dog...",
  "images": ["https://...", "https://..."],
  "rescueOrgId": "ObjectId(...)",
  "rescueOrgName": "Dhaka Paws Foundation",
  "contactEmail": "contact@dhakapaws.org",
  "contactPhone": "+880 1711-123456",
  "vaccinated": true,
  "spayedNeutered": true,
  "houseTrained": true,
  "goodWithKids": true,
  "goodWithPets": true,
  "energyLevel": "High",
  "adoptionFee": 1500,
  "status": "Available",
  "createdAt": "2024-01-15T00:00:00.000Z",
  "updatedAt": "2024-01-15T00:00:00.000Z"
}
```

## 🚀 **Quick Fix Commands**

### **Force Reseed (Overwrites everything):**
```bash
# Start server first
nodemon index.js

# In another terminal, force reseed
curl -X POST http://localhost:5000/api/seed/force
```

### **Check Server Status:**
```bash
curl http://localhost:5000/api/system/health
```

### **Check Seeding Status:**
```bash
curl http://localhost:5000/api/seed/status
```

## 📝 **Debugging Steps**

1. **Run `testSinglePet.js`** - Tests basic pet insertion
2. **Run `seedData.js`** - Full seeding with enhanced logging
3. **Run `testSeeding.js`** - Verifies all collections
4. **Check server logs** - Look for error messages
5. **Verify MongoDB connection** - Ensure database is accessible

## 🆘 **If Still Not Working**

1. **Check MongoDB Atlas:**
   - Verify cluster is running
   - Check IP whitelist
   - Verify user credentials

2. **Check Server Logs:**
   - Look for connection errors
   - Check for validation errors
   - Verify collection creation

3. **Manual Collection Creation:**
   ```bash
   # In MongoDB shell
   use petAdoptionDB
   db.createCollection('pets')
   db.createCollection('rescueOrganizations')
   db.createCollection('applications')
   db.createCollection('successStories')
   db.createCollection('favorites')
   ```

## 📞 **Get Help**

If you're still having issues:

1. Run all three test scripts
2. Copy the complete console output
3. Check the server logs
4. Verify MongoDB connection status

The enhanced logging should now show exactly where the process is failing.
