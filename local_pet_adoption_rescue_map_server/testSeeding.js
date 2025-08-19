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

async function testDatabaseContents() {
  try {
    console.log('🔍 Testing database contents...');
    
    // Connect to MongoDB
    await client.connect();
    console.log('✅ Connected to MongoDB');
    
    const db = client.db('petAdoptionDB');
    
    // Test all collections
    console.log('\n📊 Checking all collections...');
    
    // 1. Check Rescue Organizations
    console.log('\n🏢 Rescue Organizations:');
    const rescueOrgs = await db.collection('rescueOrganizations').find({}).toArray();
    console.log(`Total: ${rescueOrgs.length}`);
    if (rescueOrgs.length > 0) {
      console.log('Sample:', JSON.stringify(rescueOrgs[0], null, 2));
    }
    
    // 2. Check Pets
    console.log('\n🐾 Pets:');
    const pets = await db.collection('pets').find({}).toArray();
    console.log(`Total: ${pets.length}`);
    if (pets.length > 0) {
      console.log('Sample:', JSON.stringify(pets[0], null, 2));
    }
    
    // 3. Check Applications
    console.log('\n📋 Applications:');
    const applications = await db.collection('applications').find({}).toArray();
    console.log(`Total: ${applications.length}`);
    if (applications.length > 0) {
      console.log('Sample:', JSON.stringify(applications[0], null, 2));
    }
    
    // 4. Check Success Stories
    console.log('\n🏆 Success Stories:');
    const successStories = await db.collection('successStories').find({}).toArray();
    console.log(`Total: ${successStories.length}`);
    if (successStories.length > 0) {
      console.log('Sample:', JSON.stringify(successStories[0], null, 2));
    }
    
    // 5. Check Favorites
    console.log('\n❤️ Favorites:');
    const favorites = await db.collection('favorites').find({}).toArray();
    console.log(`Total: ${favorites.length}`);
    if (favorites.length > 0) {
      console.log('Sample:', JSON.stringify(favorites[0], null, 2));
    }
    
    // 6. Check Users
    console.log('\n👥 Users:');
    const users = await db.collection('users').find({}).toArray();
    console.log(`Total: ${users.length}`);
    if (users.length > 0) {
      console.log('Sample:', JSON.stringify(users[0], null, 2));
    }
    
    // Summary
    console.log('\n📈 SUMMARY:');
    console.log(`   • Rescue Organizations: ${rescueOrgs.length}`);
    console.log(`   • Pets: ${pets.length}`);
    console.log(`   • Applications: ${applications.length}`);
    console.log(`   • Success Stories: ${successStories.length}`);
    console.log(`   • Favorites: ${favorites.length}`);
    console.log(`   • Users: ${users.length}`);
    
    // Check if pets have rescue org IDs
    if (pets.length > 0) {
      console.log('\n🔗 Checking pet-rescue organization relationships...');
      pets.forEach(pet => {
        console.log(`   • ${pet.name} -> Rescue Org ID: ${pet.rescueOrgId ? '✅ Set' : '❌ Missing'}`);
      });
    }
    
    // Check if applications have pet IDs
    if (applications.length > 0) {
      console.log('\n🔗 Checking application-pet relationships...');
      applications.forEach(app => {
        console.log(`   • ${app.petName} -> Pet ID: ${app.petId ? '✅ Set' : '❌ Missing'}`);
      });
    }
    
  } catch (error) {
    console.error('❌ Error testing database:', error);
  } finally {
    await client.close();
    console.log('\n🔌 MongoDB connection closed');
  }
}

// Run the test
testDatabaseContents();
