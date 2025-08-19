const { MongoClient, ServerApiVersion } = require('mongodb');

// MongoDB Configuration
const uri = "mongodb+srv://LocalPetAdoptionRescueMap:Req0NlhvAB60Kq33@localpetcluster0.1ggvfxo.mongodb.net/petAdoptionDB?retryWrites=true&w=majority&appName=LocalPetCluster0";

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function testSinglePetInsert() {
  try {
    console.log('🧪 Testing single pet insertion...');
    
    // Connect to MongoDB
    await client.connect();
    console.log('✅ Connected to MongoDB');
    
    const db = client.db('petAdoptionDB');
    
    // Test pet data
    const testPet = {
      name: "Test Tommy",
      type: "Dog",
      breed: "Street Dog",
      age: "3 years",
      gender: "Male",
      size: "Large",
      location: "Dhaka",
      coordinates: [23.8103, 90.4125],
      description: "Test Tommy is a friendly and energetic street dog who loves playing fetch and running in the park. He's great with kids and other pets.",
      images: [
        "https://images.unsplash.com/photo-1507146426996-ef05306b995a?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=500"
      ],
      rescueOrgId: null,
      rescueOrgName: "Dhaka Paws Foundation",
      contactEmail: "contact@dhakapaws.org",
      contactPhone: "+880 1711-123456",
      vaccinated: true,
      spayedNeutered: true,
      houseTrained: true,
      goodWithKids: true,
      goodWithPets: true,
      energyLevel: "High",
      adoptionFee: 1500,
      status: "Available",
      createdAt: new Date("2024-01-15"),
      updatedAt: new Date()
    };
    
    console.log('📋 Test pet data:');
    console.log(JSON.stringify(testPet, null, 2));
    
    // Try to insert the test pet
    console.log('\n🚀 Attempting to insert test pet...');
    const result = await db.collection('pets').insertOne(testPet);
    console.log('✅ Pet inserted successfully!');
    console.log('Inserted ID:', result.insertedId);
    
    // Verify the insertion
    const insertedPet = await db.collection('pets').findOne({ _id: result.insertedId });
    console.log('\n🔍 Retrieved pet from database:');
    console.log(JSON.stringify(insertedPet, null, 2));
    
    // Check all pets in the collection
    const allPets = await db.collection('pets').find({}).toArray();
    console.log(`\n📊 Total pets in collection: ${allPets.length}`);
    
    // Clean up - remove test pet
    await db.collection('pets').deleteOne({ _id: result.insertedId });
    console.log('🧹 Test pet removed');
    
  } catch (error) {
    console.error('❌ Error testing pet insertion:', error);
    console.error('Error details:', error.message);
    if (error.code) {
      console.error('Error code:', error.code);
    }
  } finally {
    await client.close();
    console.log('🔌 MongoDB connection closed');
  }
}

// Run the test
testSinglePetInsert();
