# 🌱 Database Seeding Guide

This guide explains how to populate your MongoDB database with sample data for the Pet Adoption and Rescue Map application.

## 🚀 **Quick Start**

### **Option 1: Run the Seeding Script Directly**

```bash
# Navigate to server directory
cd local_pet_adoption_rescue_map_server

# Run the seeding script
node seedData.js
```

### **Option 2: Use the API Endpoints**

Start your server first, then use these endpoints:

```bash
# Check current database status
GET /api/seed/status

# Seed database (only if empty)
POST /api/seed

# Force seed (overwrites existing data)
POST /api/seed/force
```

## 📊 **What Gets Seeded**

The seeding script will populate your database with:

### **🏢 Rescue Organizations (6)**
- Dhaka Paws Foundation
- Chattogram Cat Shelter
- Sylhet Animal Aid
- Rajshahi Cat Welfare
- Khulna Pet Rescue
- Barisal Animal Haven

### **🐾 Pets (6)**
- **Tommy** - Street Dog (Dhaka)
- **Mimi** - Persian Mix Cat (Chattogram)
- **Rocky** - German Shepherd (Sylhet)
- **Tinku** - Maine Coon Cat (Rajshahi)
- **Bella** - Labrador Mix (Khulna)
- **Shadow** - Black Domestic Shorthair (Barisal)

### **📋 Applications (2)**
- Sample adoption applications for Tommy and Mimi

### **🏆 Success Stories (2)**
- Shuvo (adopted by Ahmed Family)
- Lili (adopted by Samira Hossain)

### **❤️ Sample Favorites (3)**
- Sample user favorites for testing

## 🔧 **Prerequisites**

1. **MongoDB Connection**: Ensure your server can connect to MongoDB
2. **Server Running**: Start your server with `nodemon index.js` or `node index.js`
3. **Dependencies**: Make sure `mongodb` package is installed

## 📝 **Step-by-Step Instructions**

### **Step 1: Start Your Server**
```bash
cd local_pet_adoption_rescue_map_server
nodemon index.js
```

### **Step 2: Check Database Status**
```bash
curl http://localhost:5000/api/seed/status
# Or use Postman/Thunder Client
```

### **Step 3: Seed the Database**
```bash
# If database is empty
curl -X POST http://localhost:5000/api/seed

# If you want to overwrite existing data
curl -X POST http://localhost:5000/api/seed/force
```

## 🧪 **Testing the Seeded Data**

After seeding, test these endpoints:

```bash
# Get all pets
GET http://localhost:5000/api/pets

# Get all rescue organizations
GET http://localhost:5000/api/rescue-organizations

# Get all applications
GET http://localhost:5000/api/applications

# Search pets
GET http://localhost:5000/api/search?type=Dog&location=Dhaka
```

## 🚨 **Troubleshooting**

### **Common Issues**

1. **"Database already contains data"**
   - Use `/api/seed/force` to overwrite existing data
   - Or manually clear collections first

2. **"MongoDB connection error"**
   - Check your MongoDB connection string
   - Ensure MongoDB Atlas is accessible
   - Verify network permissions

3. **"Module not found"**
   - Ensure `seedData.js` is in the same directory as `index.js`
   - Check file permissions

### **Manual Database Check**

```bash
# Connect to MongoDB shell
mongosh "mongodb+srv://LocalPetAdoptionRescueMap:LocalPetAdoptionRescueMap@localpetcluster0.1ggvfxo.mongodb.net/petAdoptionDB"

# Check collections
show collections

# Check data counts
db.pets.countDocuments()
db.rescueOrganizations.countDocuments()
db.applications.countDocuments()
```

## 🔄 **Reseeding Data**

To update or refresh your sample data:

```bash
# Option 1: Force reseed
POST /api/seed/force

# Option 2: Run script directly
node seedData.js

# Option 3: Manual collection clearing
# Use MongoDB Compass or shell to clear collections manually
```

## 📈 **Customizing the Data**

To modify the sample data:

1. **Edit `seedData.js`** - Modify the mock data arrays
2. **Add new collections** - Extend the seeding function
3. **Change data structure** - Update the data objects as needed

## 🎯 **Next Steps**

After successful seeding:

1. **Test your API endpoints** with the new data
2. **Verify data relationships** (pets linked to rescue organizations)
3. **Test search functionality** with the sample data
4. **Check your frontend** displays the data correctly

## 📞 **Support**

If you encounter issues:

1. Check the server console for error messages
2. Verify MongoDB connection status
3. Check the `/api/system/health` endpoint
4. Review the main `README.md` for troubleshooting tips

---

**Happy Seeding! 🌱✨**
