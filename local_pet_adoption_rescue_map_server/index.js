const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// MongoDB Configuration
const uri = process.env.MONGODB_URI || "mongodb://localhost:27017/petAdoptionDB";

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

// Database and Collections
let db;
let usersCollection;
let petsCollection;
let favoritesCollection;
let rescueOrganizationsCollection;

// Helper function to check if database is available
const isDatabaseAvailable = () => {
  return db && client && client.topology && client.topology.isConnected();
};

// Middleware to check database availability
const checkDatabase = (req, res, next) => {
  if (!isDatabaseAvailable()) {
    return res.status(503).json({
      success: false,
      message: 'Database service unavailable',
      error: 'Server is running in fallback mode. Please check MongoDB connection.'
    });
  }
  next();
};

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
async function connectToDatabase() {
  try {
    console.log('🔌 Attempting to connect to MongoDB...');
    await client.connect();
    
    // Test the connection
    await client.db("admin").command({ ping: 1 });
    console.log('✅ Successfully connected to MongoDB!');
    
    db = client.db('petAdoptionDB');
    
    // Initialize collections
    usersCollection = db.collection('users');
    petsCollection = db.collection('pets');
    favoritesCollection = db.collection('favorites');
    rescueOrganizationsCollection = db.collection('rescueOrganizations');
    
    // Create indexes for better performance
    try {
      // User indexes
      await usersCollection.createIndex({ email: 1 }, { unique: true });
      await usersCollection.createIndex({ uid: 1 }, { unique: true });
      await usersCollection.createIndex({ userRole: 1 });
      
      // Pet indexes
      await petsCollection.createIndex({ rescueOrgId: 1 });
      await petsCollection.createIndex({ status: 1 });
      await petsCollection.createIndex({ type: 1 });
      await petsCollection.createIndex({ breed: 1 });
      await petsCollection.createIndex({ location: 1 });
      await petsCollection.createIndex({ createdAt: -1 });
      await petsCollection.createIndex({ adoptionFee: 1 });
      
      // Favorites indexes
      await favoritesCollection.createIndex({ userId: 1, petId: 1 }, { unique: true });
      await favoritesCollection.createIndex({ userId: 1 });
      await favoritesCollection.createIndex({ petId: 1 });
      
      // Rescue organization indexes
      await rescueOrganizationsCollection.createIndex({ name: 1 });
      await rescueOrganizationsCollection.createIndex({ status: 1 });
      await rescueOrganizationsCollection.createIndex({ location: 1 });
      
      // Application indexes
      await db.collection('applications').createIndex({ petId: 1 });
      await db.collection('applications').createIndex({ userId: 1 });
      await db.collection('applications').createIndex({ status: 1 });
      await db.collection('applications').createIndex({ createdAt: -1 });
      
      // Text search indexes
      await petsCollection.createIndex({ 
        name: 'text', 
        breed: 'text', 
        description: 'text' 
      });
      
      console.log('📊 Database indexes created successfully');
    } catch (indexError) {
      console.log('⚠️ Some indexes already exist, continuing...');
    }
    
  } catch (error) {
    console.error('❌ MongoDB connection error:', error.message);
    
    // Provide helpful debugging information
    if (error.code === 8000) {
      console.error('🔍 Authentication failed. Please check:');
      console.error('   - Username: LocalPetAdoptionRescueMap');
      console.error('   - Password: Req0NlhvAB60Kq33');
      console.error('   - Network access (IP whitelist)');
      console.error('   - Database user permissions');
    }
    
    // Don't exit the process, let it continue with fallback
    console.log('🔄 Server will start without database connection');
  }
}

// Test route
app.get('/', (req, res) => {
    res.json({
        message: 'PetAdoption Server is running 🚀',
        status: 'online',
        database: isDatabaseAvailable() ? 'connected' : 'disconnected',
        timestamp: new Date().toISOString()
    });
});

// Health check endpoint
app.get('/health', (req, res) => {
    res.json({
        status: 'healthy',
        server: 'running',
        database: isDatabaseAvailable() ? 'connected' : 'disconnected',
        uptime: process.uptime(),
        timestamp: new Date().toISOString()
    });
});

// ==================== USER MANAGEMENT ENDPOINTS ====================

// Create or update user
app.post('/api/users', checkDatabase, async (req, res) => {
  try {
    const { uid, email, displayName, photoURL, userRole, additionalData } = req.body;
    
    const userData = {
      uid,
      email,
      displayName,
      photoURL,
      userRole: userRole || 'adopter',
      createdAt: new Date(),
      updatedAt: new Date(),
      ...additionalData
    };

    const result = await usersCollection.updateOne(
      { uid },
      { $set: userData },
      { upsert: true }
    );

    res.status(200).json({
      success: true,
      message: 'User created/updated successfully',
      user: userData
    });
  } catch (error) {
    console.error('Error creating/updating user:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error.message
    });
  }
});

// Get user by UID
app.get('/api/users/:uid', checkDatabase, async (req, res) => {
  try {
    const { uid } = req.params;
    const user = await usersCollection.findOne({ uid });
    
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    res.status(200).json({
      success: true,
      user
    });
  } catch (error) {
    console.error('Error fetching user:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error.message
    });
  }
});

// Update user data
app.put('/api/users/:uid', checkDatabase, async (req, res) => {
  try {
    const { uid } = req.params;
    const updateData = {
      ...req.body,
      updatedAt: new Date()
    };

    const result = await usersCollection.updateOne(
      { uid },
      { $set: updateData }
    );

    if (result.matchedCount === 0) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'User updated successfully'
    });
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error.message
    });
  }
});

// ==================== PET MANAGEMENT ENDPOINTS ====================

// Create new pet
app.post('/api/pets', checkDatabase, async (req, res) => {
    try {
        const petData = {
        ...req.body,
        createdAt: new Date(),
        updatedAt: new Date(),
        status: 'available'
        };

        const result = await petsCollection.insertOne(petData);
        
        res.status(201).json({
        success: true,
        message: 'Pet created successfully',
        petId: result.insertedId
        });
    } catch (error) {
        console.error('Error creating pet:', error);
        res.status(500).json({
        success: false,
        message: 'Internal server error',
        error: error.message
        });
    }
});

// Get all pets with filters
app.get('/api/pets', checkDatabase, async (req, res) => {
    try {
        const { 
        status, 
        type, 
        breed, 
        age, 
        rescueOrgId, 
        page = 1, 
        limit = 20 
        } = req.query;

        const filter = {};
        if (status) filter.status = status;
        if (type) filter.type = type;
        if (breed) filter.breed = { $regex: breed, $options: 'i' };
        if (age) filter.age = age;
        if (rescueOrgId) filter.rescueOrgId = rescueOrgId;

        const skip = (parseInt(page) - 1) * parseInt(limit);
        
        const pets = await petsCollection
        .find(filter)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(parseInt(limit))
        .toArray();

        const total = await petsCollection.countDocuments(filter);

        res.status(200).json({
        success: true,
        pets,
        pagination: {
            currentPage: parseInt(page),
            totalPages: Math.ceil(total / parseInt(limit)),
            totalPets: total,
            hasNext: skip + pets.length < total,
            hasPrev: parseInt(page) > 1
        }
        });
    } catch (error) {
        console.error('Error fetching pets:', error);
        res.status(500).json({
        success: false,
        message: 'Internal server error',
        error: error.message
        });
    }
});

// Get pet by ID
app.get('/api/pets/:id', checkDatabase, async (req, res) => {
    try {
        const { id } = req.params;
        const pet = await petsCollection.findOne({ _id: new ObjectId(id) });
        
        if (!pet) {
        return res.status(404).json({
            success: false,
            message: 'Pet not found'
        });
        }

        res.status(200).json({
        success: true,
        pet
        });
    } catch (error) {
        console.error('Error fetching pet:', error);
        res.status(500).json({
        success: false,
        message: 'Internal server error',
        error: error.message
        });
    }
});

// Update pet
app.put('/api/pets/:id', checkDatabase, async (req, res) => {
    try {
        const { id } = req.params;
        const updateData = {
        ...req.body,
        updatedAt: new Date()
        };

        const result = await petsCollection.updateOne(
        { _id: new ObjectId(id) },
        { $set: updateData }
        );

        if (result.matchedCount === 0) {
        return res.status(404).json({
            success: false,
            message: 'Pet not found'
        });
        }

        res.status(200).json({
        success: true,
        message: 'Pet updated successfully'
        });
    } catch (error) {
        console.error('Error updating pet:', error);
        res.status(500).json({
        success: false,
        message: 'Internal server error',
        error: error.message
        });
    }
});

// Delete pet
app.delete('/api/pets/:id', checkDatabase, async (req, res) => {
    try {
        const { id } = req.params;
        
        const result = await petsCollection.deleteOne({ _id: new ObjectId(id) });

        if (result.deletedCount === 0) {
        return res.status(404).json({
            success: false,
            message: 'Pet not found'
        });
        }

        // Also remove from favorites
        await favoritesCollection.deleteMany({ petId: id });

        res.status(200).json({
        success: true,
        message: 'Pet deleted successfully'
        });
    } catch (error) {
        console.error('Error deleting pet:', error);
        res.status(500).json({
        success: false,
        message: 'Internal server error',
        error: error.message
        });
    }
});

// ==================== FAVORITES MANAGEMENT ENDPOINTS ====================

// Add pet to favorites
app.post('/api/favorites', checkDatabase, async (req, res) => {
    try {
        const { userId, petId } = req.body;
        
        const result = await favoritesCollection.insertOne({
        userId,
        petId,
        createdAt: new Date()
        });

        res.status(201).json({
        success: true,
        message: 'Pet added to favorites',
        favoriteId: result.insertedId
        });
    } catch (error) {
        if (error.code === 11000) {
        return res.status(400).json({
            success: false,
            message: 'Pet already in favorites'
        });
        }
        
        console.error('Error adding to favorites:', error);
        res.status(500).json({
        success: false,
        message: 'Internal server error',
        error: error.message
        });
    }
});

// Get user favorites
app.get('/api/favorites/:userId', checkDatabase, async (req, res) => {
    try {
        const { userId } = req.params;
        
        const favorites = await favoritesCollection
        .find({ userId })
        .sort({ createdAt: -1 })
        .toArray();

        // Get pet details for each favorite
        const favoritePets = await Promise.all(
        favorites.map(async (favorite) => {
            const pet = await petsCollection.findOne({ _id: new ObjectId(favorite.petId) });
            return {
            ...favorite,
            pet: pet || null
            };
        })
        );

        res.status(200).json({
        success: true,
        favorites: favoritePets
        });
    } catch (error) {
        console.error('Error fetching favorites:', error);
        res.status(500).json({
        success: false,
        message: 'Internal server error',
        error: error.message
        });
    }
});

// Remove pet from favorites
app.delete('/api/favorites/:userId/:petId', checkDatabase, async (req, res) => {
    try {
        const { userId, petId } = req.params;
        
        const result = await favoritesCollection.deleteOne({ userId, petId });

        if (result.deletedCount === 0) {
        return res.status(404).json({
            success: false,
            message: 'Favorite not found'
        });
        }

        res.status(200).json({
        success: true,
        message: 'Pet removed from favorites'
        });
    } catch (error) {
        console.error('Error removing from favorites:', error);
        res.status(500).json({
        success: false,
        message: 'Internal server error',
        error: error.message
        });
    }
});

// ==================== RESCUE ORGANIZATION ENDPOINTS ====================

// Create rescue organization
app.post('/api/rescue-organizations', checkDatabase, async (req, res) => {
    try {
        const orgData = {
        ...req.body,
        createdAt: new Date(),
        updatedAt: new Date(),
        status: 'active'
        };

        const result = await rescueOrganizationsCollection.insertOne(orgData);
        
        res.status(201).json({
        success: true,
        message: 'Rescue organization created successfully',
        orgId: result.insertedId
        });
    } catch (error) {
        console.error('Error creating rescue organization:', error);
        res.status(500).json({
        success: false,
        message: 'Internal server error',
        error: error.message
        });
    }
});

// Get all rescue organizations
app.get('/api/rescue-organizations', checkDatabase, async (req, res) => {
    try {
        const organizations = await rescueOrganizationsCollection
        .find({ status: 'active' })
        .sort({ name: 1 })
        .toArray();

        res.status(200).json({
        success: true,
        organizations
        });
    } catch (error) {
        console.error('Error fetching rescue organizations:', error);
        res.status(500).json({
        success: false,
        message: 'Internal server error',
        error: error.message
        });
    }
});

// ==================== SEARCH ENDPOINTS ====================

// Search pets
app.get('/api/search/pets', checkDatabase, async (req, res) => {
    try {
        const { q, type, breed, location, age } = req.query;
        
        const filter = {};
        
        if (q) {
        filter.$or = [
            { name: { $regex: q, $options: 'i' } },
            { breed: { $regex: q, $options: 'i' } },
            { description: { $regex: q, $options: 'i' } }
        ];
    }
    
    if (type) filter.type = type;
    if (breed) filter.breed = { $regex: breed, $options: 'i' };
    if (location) filter.location = { $regex: location, $options: 'i' };
    if (age) filter.age = age;
    
    filter.status = 'available';

    const pets = await petsCollection
        .find(filter)
        .sort({ createdAt: -1 })
        .limit(50)
        .toArray();

        res.status(200).json({
        success: true,
        pets,
        total: pets.length
        });
    } catch (error) {
        console.error('Error searching pets:', error);
        res.status(500).json({
        success: false,
        message: 'Internal server error',
        error: error.message
        });
    }
});

// ==================== STATISTICS ENDPOINTS ====================

// Get dashboard statistics
app.get('/api/stats/dashboard', checkDatabase, async (req, res) => {
    try {
        const totalPets = await petsCollection.countDocuments();
        const availablePets = await petsCollection.countDocuments({ status: 'available' });
        const adoptedPets = await petsCollection.countDocuments({ status: 'adopted' });
        const totalUsers = await usersCollection.countDocuments();
        const totalOrganizations = await rescueOrganizationsCollection.countDocuments({ status: 'active' });

        res.status(200).json({
            success: true,
            stats: {
                totalPets,
                availablePets,
                adoptedPets,
                totalUsers,
                totalOrganizations
            }
        });
    } catch (error) {
        console.error('Error fetching statistics:', error);
        res.status(500).json({
        success: false,
        message: 'Internal server error',
        error: error.message
        });
    }
});

// ==================== PET APPLICATIONS ENDPOINTS ====================

// Create pet adoption application
app.post('/api/applications', checkDatabase, async (req, res) => {
  try {
    const applicationData = {
      ...req.body,
      status: 'pending',
      createdAt: new Date(),
      updatedAt: new Date()
    };

    const result = await db.collection('applications').insertOne(applicationData);
    
    res.status(201).json({
      success: true,
      message: 'Application submitted successfully',
      applicationId: result.insertedId
    });
  } catch (error) {
    console.error('Error creating application:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error.message
    });
  }
});

// Get applications for a pet
app.get('/api/applications/pet/:petId', checkDatabase, async (req, res) => {
  try {
    const { petId } = req.params;
    const applications = await db.collection('applications')
      .find({ petId })
      .sort({ createdAt: -1 })
      .toArray();

    res.status(200).json({
      success: true,
      applications
    });
  } catch (error) {
    console.error('Error fetching applications:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error.message
    });
  }
});

// Update application status
app.put('/api/applications/:applicationId', checkDatabase, async (req, res) => {
  try {
    const { applicationId } = req.params;
    const { status, notes } = req.body;
    
    const result = await db.collection('applications').updateOne(
      { _id: new ObjectId(applicationId) },
      { 
        $set: { 
          status, 
          notes, 
          updatedAt: new Date() 
        } 
      }
    );

    if (result.matchedCount === 0) {
      return res.status(404).json({
        success: false,
        message: 'Application not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Application updated successfully'
    });
  } catch (error) {
    console.error('Error updating application:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error.message
    });
  }
});

// ==================== ENHANCED RESCUE ORGANIZATION ENDPOINTS ====================

// Update rescue organization
app.put('/api/rescue-organizations/:id', checkDatabase, async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = {
      ...req.body,
      updatedAt: new Date()
    };

    const result = await rescueOrganizationsCollection.updateOne(
      { _id: new ObjectId(id) },
      { $set: updateData }
    );

    if (result.matchedCount === 0) {
      return res.status(404).json({
        success: false,
        message: 'Rescue organization not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Rescue organization updated successfully'
    });
  } catch (error) {
    console.error('Error updating rescue organization:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error.message
    });
  }
});

// Get rescue organization by ID
app.get('/api/rescue-organizations/:id', checkDatabase, async (req, res) => {
  try {
    const { id } = req.params;
    const organization = await rescueOrganizationsCollection.findOne({ _id: new ObjectId(id) });
    
    if (!organization) {
      return res.status(404).json({
        success: false,
        message: 'Rescue organization not found'
      });
    }

    res.status(200).json({
      success: true,
      organization
    });
  } catch (error) {
    console.error('Error fetching rescue organization:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error.message
    });
  }
});

// ==================== ENHANCED PET ENDPOINTS ====================

// Update pet status (adopted, pending, etc.)
app.patch('/api/pets/:id/status', checkDatabase, async (req, res) => {
  try {
    const { id } = req.params;
    const { status, adoptedBy, adoptionDate } = req.body;
    
    const updateData = {
      status,
      updatedAt: new Date()
    };
    
    if (status === 'adopted') {
      updateData.adoptedBy = adoptedBy;
      updateData.adoptionDate = adoptionDate || new Date();
    }

    const result = await petsCollection.updateOne(
      { _id: new ObjectId(id) },
      { $set: updateData }
    );

    if (result.matchedCount === 0) {
      return res.status(404).json({
        success: false,
        message: 'Pet not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Pet status updated successfully'
    });
  } catch (error) {
    console.error('Error updating pet status:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error.message
    });
  }
});

// ==================== ENHANCED SEARCH ENDPOINTS ====================

// Advanced pet search with multiple filters
app.get('/api/search/advanced', checkDatabase, async (req, res) => {
  try {
    const { 
      q, type, breed, location, age, size, gender, 
      energyLevel, goodWithKids, goodWithPets, 
      vaccinated, spayedNeutered, minFee, maxFee,
      page = 1, limit = 20 
    } = req.query;
    
    const filter = { status: 'available' };
    
    // Text search
    if (q) {
      filter.$or = [
        { name: { $regex: q, $options: 'i' } },
        { breed: { $regex: q, $options: 'i' } },
        { description: { $regex: q, $options: 'i' } }
      ];
    }
    
    // Basic filters
    if (type) filter.type = type;
    if (breed) filter.breed = { $regex: breed, $options: 'i' };
    if (location) filter.location = { $regex: location, $options: 'i' };
    if (age) filter.age = age;
    if (size) filter.size = size;
    if (gender) filter.gender = gender;
    if (energyLevel) filter.energyLevel = energyLevel;
    
    // Boolean filters
    if (goodWithKids !== undefined) filter.goodWithKids = goodWithKids === 'true';
    if (goodWithPets !== undefined) filter.goodWithPets = goodWithPets === 'true';
    if (vaccinated !== undefined) filter.vaccinated = vaccinated === 'true';
    if (spayedNeutered !== undefined) filter.spayedNeutered = spayedNeutered === 'true';
    
    // Price range
    if (minFee || maxFee) {
      filter.adoptionFee = {};
      if (minFee) filter.adoptionFee.$gte = parseInt(minFee);
      if (maxFee) filter.adoptionFee.$lte = parseInt(maxFee);
    }

    const skip = (parseInt(page) - 1) * parseInt(limit);
    
    const pets = await petsCollection
      .find(filter)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit))
      .toArray();

    const total = await petsCollection.countDocuments(filter);

    res.status(200).json({
      success: true,
      pets,
      pagination: {
        currentPage: parseInt(page),
        totalPages: Math.ceil(total / parseInt(limit)),
        totalPets: total,
        hasNext: skip + pets.length < total,
        hasPrev: parseInt(page) > 1
      }
    });
  } catch (error) {
    console.error('Error in advanced search:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error.message
    });
  }
});

// ==================== ENHANCED STATISTICS ENDPOINTS ====================

// Get detailed statistics for dashboard
app.get('/api/stats/detailed', checkDatabase, async (req, res) => {
  try {
    const [
      totalPets,
      availablePets,
      adoptedPets,
      pendingPets,
      totalUsers,
      totalOrganizations,
      recentAdoptions,
      petsByType,
      petsByLocation
    ] = await Promise.all([
      petsCollection.countDocuments(),
      petsCollection.countDocuments({ status: 'available' }),
      petsCollection.countDocuments({ status: 'adopted' }),
      petsCollection.countDocuments({ status: 'pending' }),
      usersCollection.countDocuments(),
      rescueOrganizationsCollection.countDocuments({ status: 'active' }),
      petsCollection.find({ status: 'adopted' }).sort({ adoptionDate: -1 }).limit(5).toArray(),
      petsCollection.aggregate([
        { $group: { _id: '$type', count: { $sum: 1 } } },
        { $sort: { count: -1 } }
      ]).toArray(),
      petsCollection.aggregate([
        { $group: { _id: '$location', count: { $sum: 1 } } },
        { $sort: { count: -1 } },
        { $limit: 10 }
      ]).toArray()
    ]);

    res.status(200).json({
      success: true,
      stats: {
        overview: {
          totalPets,
          availablePets,
          adoptedPets,
          pendingPets,
          totalUsers,
          totalOrganizations
        },
        recentAdoptions,
        petsByType,
        petsByLocation
      }
    });
  } catch (error) {
    console.error('Error fetching detailed statistics:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error.message
    });
  }
});

// ==================== HEALTH & MONITORING ENDPOINTS ====================

// System health check with database status
app.get('/api/system/health', async (req, res) => {
  try {
    const dbStatus = isDatabaseAvailable();
    const collections = dbStatus ? Object.keys(db.collections()) : [];
    
    res.status(200).json({
      success: true,
      status: 'healthy',
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      database: {
        connected: dbStatus,
        collections: collections.length
      },
      memory: process.memoryUsage(),
      environment: process.env.NODE_ENV || 'development'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      status: 'unhealthy',
      error: error.message,
      timestamp: new Date().toISOString()
    });
  }
});

// API documentation endpoint
app.get('/api/docs', (req, res) => {
  res.json({
    success: true,
    message: 'Pet Adoption API Documentation',
    version: '1.0.0',
    endpoints: {
      users: '/api/users',
      pets: '/api/pets',
      favorites: '/api/favorites',
      applications: '/api/applications',
      rescueOrganizations: '/api/rescue-organizations',
      search: '/api/search',
      stats: '/api/stats',
      system: '/api/system'
    },
    documentation: 'See README.md for detailed API documentation'
  });
});

// ==================== DATA SEEDING ENDPOINTS ====================

// Seed database with mock data
app.post('/api/seed', checkDatabase, async (req, res) => {
  try {
    // Check if data already exists
    const existingPets = await petsCollection.countDocuments();
    if (existingPets > 0) {
      return res.status(400).json({
        success: false,
        message: 'Database already contains data. Use /api/seed/force to overwrite.',
        existingData: {
          pets: existingPets,
          rescueOrgs: await rescueOrganizationsCollection.countDocuments(),
          applications: await db.collection('applications').countDocuments()
        }
      });
    }
    
    // Import and run the seeding logic
    const { seedDatabase } = require('./seedData');
    await seedDatabase();
    
    res.json({
      success: true,
      message: 'Database seeded successfully',
      count: { 
        pets: 6, 
        rescueOrgs: 6, 
        applications: 2, 
        successStories: 2,
        favorites: 3
      }
    });
  } catch (error) {
    console.error('Error seeding database:', error);
    res.status(500).json({
      success: false,
      message: 'Error seeding database',
      error: error.message
    });
  }
});

// Force seeding (overwrites existing data)
app.post('/api/seed/force', checkDatabase, async (req, res) => {
  try {
    // Clear existing data first
    await petsCollection.deleteMany({});
    await rescueOrganizationsCollection.deleteMany({});
    await db.collection('applications').deleteMany({});
    await db.collection('successStories').deleteMany({});
    await favoritesCollection.deleteMany({});
    
    // Import and run the seeding logic
    const { seedDatabase } = require('./seedData');
    await seedDatabase();
    
    res.json({
      success: true,
      message: 'Database forcefully seeded (existing data cleared)',
      count: { 
        pets: 6, 
        rescueOrgs: 6, 
        applications: 2, 
        successStories: 2,
        favorites: 3
      }
    });
  } catch (error) {
    console.error('Error force seeding database:', error);
    res.status(500).json({
      success: false,
      message: 'Error force seeding database',
      error: error.message
    });
  }
});

// Check database status and data counts
app.get('/api/seed/status', checkDatabase, async (req, res) => {
  try {
    const counts = {
      pets: await petsCollection.countDocuments(),
      rescueOrgs: await rescueOrganizationsCollection.countDocuments(),
      applications: await db.collection('applications').countDocuments(),
      successStories: await db.collection('successStories').countDocuments(),
      favorites: await favoritesCollection.countDocuments(),
      users: await usersCollection.countDocuments()
    };
    
    res.json({
      success: true,
      message: 'Database status retrieved',
      counts,
      isEmpty: Object.values(counts).every(count => count === 0)
    });
  } catch (error) {
    console.error('Error checking database status:', error);
    res.status(500).json({
      success: false,
      message: 'Error checking database status',
      error: error.message
    });
  }
});

// Start server
async function startServer() {
  await connectToDatabase();
  
  app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
    if (db) {
      console.log(`📊 Connected to MongoDB database: petAdoptionDB`);
    } else {
      console.log(`⚠️ Running in fallback mode (no database connection)`);
      console.log(`📝 API endpoints will return mock data or errors`);
    }
  });
}

startServer().catch(console.error);

// Graceful shutdown
process.on('SIGINT', async () => {
  console.log('\n🛑 Shutting down server...');
  if (client) {
    await client.close();
  }
  process.exit(0);
});