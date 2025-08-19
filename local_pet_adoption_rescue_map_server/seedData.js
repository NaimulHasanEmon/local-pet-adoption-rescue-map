const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');

// MongoDB Configuration
const uri = "mongodb+srv://LocalPetAdoptionRescueMap:Req0NlhvAB60Kq33@localpetcluster0.1ggvfxo.mongodb.net/petAdoptionDB?retryWrites=true&w=majority&appName=LocalPetCluster0";

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

// Mock Data (converted from client-side format)
const mockPets = [
  {
    name: "Tommy",
    type: "Dog",
    breed: "Street Dog",
    age: "3 years",
    gender: "Male",
    size: "Large",
    location: "Dhaka",
    coordinates: [23.8103, 90.4125],
    description: "Tommy is a friendly and energetic street dog who loves playing fetch and running in the park. He's great with kids and other pets.",
    images: [
      "https://images.unsplash.com/photo-1507146426996-ef05306b995a?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=500"
    ],
    rescueOrgId: null, // Will be set after creating rescue orgs
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
  },
  {
    name: "Mimi",
    type: "Cat",
    breed: "Persian Mix",
    age: "2 years",
    gender: "Female",
    size: "Medium",
    location: "Chattogram",
    coordinates: [22.3569, 91.7832],
    description: "Mimi is a beautiful Persian mix cat with a calm and loving personality. She enjoys quiet environments and gentle cuddles.",
    images: [
      "https://images.unsplash.com/photo-1574158622682-e40e69881006?w=500",
      "https://images.unsplash.com/photo-1533738363-b7f9aef128ce?w=500"
    ],
    rescueOrgId: null,
    rescueOrgName: "Chattogram Cat Shelter",
    contactEmail: "info@ctgcats.org",
    contactPhone: "+880 1812-334455",
    vaccinated: true,
    spayedNeutered: true,
    houseTrained: true,
    goodWithKids: true,
    goodWithPets: false,
    energyLevel: "Low",
    adoptionFee: 1000,
    status: "Available",
    createdAt: new Date("2024-01-20"),
    updatedAt: new Date()
  },
  {
    name: "Rocky",
    type: "Dog",
    breed: "German Shepherd",
    age: "5 years",
    gender: "Male",
    size: "Large",
    location: "Sylhet",
    coordinates: [24.8949, 91.8687],
    description: "Rocky is a loyal and intelligent dog. He's well-trained and would make an excellent companion for an active family.",
    images: [
      "https://images.unsplash.com/photo-1589941013453-ec89f33b5e95?w=500",
      "https://images.unsplash.com/photo-1605568427561-40dd23c2acea?w=500"
    ],
    rescueOrgId: null,
    rescueOrgName: "Sylhet Animal Aid",
    contactEmail: "adopt@sylhetpets.org",
    contactPhone: "+880 1920-445566",
    vaccinated: true,
    spayedNeutered: true,
    houseTrained: true,
    goodWithKids: true,
    goodWithPets: true,
    energyLevel: "Medium",
    adoptionFee: 1800,
    status: "Available",
    createdAt: new Date("2024-01-10"),
    updatedAt: new Date()
  },
  {
    name: "Tinku",
    type: "Cat",
    breed: "Maine Coon",
    age: "4 years",
    gender: "Male",
    size: "Large",
    location: "Rajshahi",
    coordinates: [24.3745, 88.6042],
    description: "Tinku is a gentle giant Maine Coon with a playful spirit. He loves interactive toys and window watching.",
    images: [
      "https://images.unsplash.com/photo-1592194996308-7b43878e84a6?w=500",
      "https://images.unsplash.com/photo-1513245543132-31f507417b26?w=500"
    ],
    rescueOrgId: null,
    rescueOrgName: "Rajshahi Cat Welfare",
    contactEmail: "hello@rcwelfare.org",
    contactPhone: "+880 1722-321987",
    vaccinated: true,
    spayedNeutered: true,
    houseTrained: true,
    goodWithKids: true,
    goodWithPets: true,
    energyLevel: "Medium",
    adoptionFee: 1200,
    status: "Available",
    createdAt: new Date("2024-01-25"),
    updatedAt: new Date()
  },
  {
    name: "Bella",
    type: "Dog",
    breed: "Labrador Mix",
    age: "1 year",
    gender: "Female",
    size: "Medium",
    location: "Khulna",
    coordinates: [22.8456, 89.5403],
    description: "Bella is a young and energetic Labrador mix who loves learning new tricks and going on adventures.",
    images: [
      "https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=500",
      "https://images.unsplash.com/photo-1518717758536-85ae29035b6d?w=500"
    ],
    rescueOrgId: null,
    rescueOrgName: "Khulna Pet Rescue",
    contactEmail: "info@kprescue.org",
    contactPhone: "+880 1933-654321",
    vaccinated: true,
    spayedNeutered: true,
    houseTrained: false,
    goodWithKids: true,
    goodWithPets: true,
    energyLevel: "High",
    adoptionFee: 1400,
    status: "Available",
    createdAt: new Date("2024-01-30"),
    updatedAt: new Date()
  },
  {
    name: "Shadow",
    type: "Cat",
    breed: "Black Domestic Shorthair",
    age: "6 months",
    gender: "Male",
    size: "Small",
    location: "Barisal",
    coordinates: [22.7010, 90.3535],
    description: "Shadow is a playful kitten who loves to explore and play with toys. He's looking for a loving home to grow up in.",
    images: [
      "https://images.unsplash.com/photo-1570824104453-508955ab713e?w=500",
      "https://images.unsplash.com/photo-1561948955-570b270e7c36?w=500"
    ],
    rescueOrgId: null,
    rescueOrgName: "Barisal Animal Haven",
    contactEmail: "adopt@bahaven.org",
    contactPhone: "+880 1789-789012",
    vaccinated: true,
    spayedNeutered: false,
    houseTrained: true,
    goodWithKids: true,
    goodWithPets: true,
    energyLevel: "High",
    adoptionFee: 800,
    status: "Available",
    createdAt: new Date("2024-02-01"),
    updatedAt: new Date()
  }
];

const mockRescueOrgs = [
  {
    name: "Dhaka Paws Foundation",
    location: "Dhaka",
    email: "contact@dhakapaws.org",
    phone: "+880 1711-123456",
    website: "www.dhakapaws.org",
    description: "Dedicated to rescuing and rehoming dogs and cats in Dhaka.",
    totalPets: 45,
    founded: "2015",
    status: "active",
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    name: "Chattogram Cat Shelter",
    location: "Chattogram",
    email: "info@ctgcats.org",
    phone: "+880 1812-334455",
    website: "www.ctgcats.org",
    description: "Specialized cat rescue focusing on Persian and long-haired breeds in Chattogram.",
    totalPets: 32,
    founded: "2012",
    status: "active",
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    name: "Sylhet Animal Aid",
    location: "Sylhet",
    email: "adopt@sylhetpets.org",
    phone: "+880 1920-445566",
    website: "www.sylhetpets.org",
    description: "Comprehensive animal rescue and adoption center in Sylhet.",
    totalPets: 28,
    founded: "2018",
    status: "active",
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    name: "Rajshahi Cat Welfare",
    location: "Rajshahi",
    email: "hello@rcwelfare.org",
    phone: "+880 1722-321987",
    website: "www.rcwelfare.org",
    description: "Dedicated to cat welfare and adoption in Rajshahi region.",
    totalPets: 35,
    founded: "2016",
    status: "active",
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    name: "Khulna Pet Rescue",
    location: "Khulna",
    email: "info@kprescue.org",
    phone: "+880 1933-654321",
    website: "www.kprescue.org",
    description: "Pet rescue and adoption center serving Khulna and surrounding areas.",
    totalPets: 42,
    founded: "2014",
    status: "active",
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    name: "Barisal Animal Haven",
    location: "Barisal",
    email: "adopt@bahaven.org",
    phone: "+880 1789-789012",
    website: "www.bahaven.org",
    description: "Animal sanctuary and adoption center in Barisal.",
    totalPets: 38,
    founded: "2017",
    status: "active",
    createdAt: new Date(),
    updatedAt: new Date()
  }
];

const mockApplications = [
  {
    petId: null, // Will be set after creating pets
    petName: "Tommy",
    applicantName: "Rezaul Karim",
    applicantEmail: "rezaul.karim@gmail.com",
    applicantPhone: "+880 1715-223344",
    status: "Pending",
    submittedDate: new Date("2024-02-05"),
    experience: "I've had dogs for over 10 years",
    livingSpace: "House with large yard",
    otherPets: "One parrot",
    workSchedule: "Work from home 3 days a week",
    createdAt: new Date("2024-02-05"),
    updatedAt: new Date()
  },
  {
    petId: null,
    petName: "Mimi",
    applicantName: "Taslima Akter",
    applicantEmail: "taslima.akter@yahoo.com",
    applicantPhone: "+880 1960-112233",
    status: "Approved",
    submittedDate: new Date("2024-02-03"),
    experience: "First-time pet owner but well-researched",
    livingSpace: "Flat with balcony",
    otherPets: "None",
    workSchedule: "9-5 office job",
    createdAt: new Date("2024-02-03"),
    updatedAt: new Date()
  }
];

const mockSuccessStories = [
  {
    petName: "Shuvo",
    adopterName: "Ahmed Family",
    story: "Shuvo found his forever home in Uttara after 6 months in care. He now enjoys daily walks and lots of love.",
    image: "https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=500",
    adoptionDate: new Date("2023-12-15"),
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    petName: "Lili",
    adopterName: "Samira Hossain",
    story: "Lili was a shy kitten from Sylhet who blossomed in Samira's peaceful flat. She now loves sunbathing and cuddles.",
    image: "https://images.unsplash.com/photo-1573865526739-10659fec78a5?w=500",
    adoptionDate: new Date("2023-11-20"),
    createdAt: new Date(),
    updatedAt: new Date()
  }
];

async function seedDatabase() {
  try {
    console.log('🌱 Starting database seeding...');
    
    // Connect to MongoDB
    await client.connect();
    console.log('✅ Connected to MongoDB');
    
    const db = client.db('petAdoptionDB');
    
    // Clear existing data (optional - comment out if you want to keep existing data)
    console.log('🧹 Clearing existing data...');
    await db.collection('pets').deleteMany({});
    await db.collection('rescueOrganizations').deleteMany({});
    await db.collection('applications').deleteMany({});
    await db.collection('successStories').deleteMany({});
    console.log('✅ Existing data cleared');
    
    // 1. Insert Rescue Organizations
    console.log('🏢 Inserting rescue organizations...');
    const rescueOrgResult = await db.collection('rescueOrganizations').insertMany(mockRescueOrgs);
    console.log(`✅ Inserted ${rescueOrgResult.insertedCount} rescue organizations`);
    
    // Create a map of rescue org names to IDs
    const rescueOrgMap = {};
    Object.values(rescueOrgResult.insertedIds).forEach((id, index) => {
      rescueOrgMap[mockRescueOrgs[index].name] = id;
    });
    
    // 2. Update pets with rescue org IDs
    console.log('🐾 Updating pets with rescue org IDs...');
    mockPets.forEach(pet => {
      pet.rescueOrgId = rescueOrgMap[pet.rescueOrgName];
    });
    
    // 3. Insert Pets
    console.log('🐾 Inserting pets...');
    console.log('Sample pet data to insert:', JSON.stringify(mockPets[0], null, 2));
    const petsResult = await db.collection('pets').insertMany(mockPets);
    console.log(`✅ Inserted ${petsResult.insertedCount} pets`);
    
    // Create a map of pet names to IDs
    const petMap = {};
    Object.values(petsResult.insertedIds).forEach((id, index) => {
      petMap[mockPets[index].name] = id;
    });
    
    // Verify pets were inserted correctly
    console.log('🔍 Verifying pets insertion...');
    const insertedPets = await db.collection('pets').find({}).toArray();
    console.log(`Total pets in database: ${insertedPets.length}`);
    if (insertedPets.length > 0) {
      console.log('Sample inserted pet:', JSON.stringify(insertedPets[0], null, 2));
    }
    
    // 4. Update applications with pet IDs
    console.log('📝 Updating applications with pet IDs...');
    mockApplications.forEach(app => {
      app.petId = petMap[app.petName];
    });
    
    // 5. Insert Applications
    console.log('📋 Inserting applications...');
    const applicationsResult = await db.collection('applications').insertMany(mockApplications);
    console.log(`✅ Inserted ${applicationsResult.insertedCount} applications`);
    
    // 6. Insert Success Stories
    console.log('🏆 Inserting success stories...');
    const successStoriesResult = await db.collection('successStories').insertMany(mockSuccessStories);
    console.log(`✅ Inserted ${successStoriesResult.insertedCount} success stories`);
    
    // 7. Create some sample favorites
    console.log('❤️ Creating sample favorites...');
    const sampleFavorites = [
      { userId: 'sample_user_1', petId: petMap['Tommy'], createdAt: new Date() },
      { userId: 'sample_user_1', petId: petMap['Rocky'], createdAt: new Date() },
      { userId: 'sample_user_2', petId: petMap['Bella'], createdAt: new Date() }
    ];
    await db.collection('favorites').insertMany(sampleFavorites);
    console.log('✅ Sample favorites created');
    
    console.log('🎉 Database seeding completed successfully!');
    console.log('\n📊 Summary:');
    console.log(`   • ${rescueOrgResult.insertedCount} Rescue Organizations`);
    console.log(`   • ${petsResult.insertedCount} Pets`);
    console.log(`   • ${applicationsResult.insertedCount} Applications`);
    console.log(`   • ${successStoriesResult.insertedCount} Success Stories`);
    console.log(`   • ${sampleFavorites.length} Sample Favorites`);
    
    // Final verification - check all collections
    console.log('\n🔍 Final verification...');
    const finalCounts = {
      rescueOrgs: await db.collection('rescueOrganizations').countDocuments(),
      pets: await db.collection('pets').countDocuments(),
      applications: await db.collection('applications').countDocuments(),
      successStories: await db.collection('successStories').countDocuments(),
      favorites: await db.collection('favorites').countDocuments()
    };
    
    console.log('Final database counts:');
    Object.entries(finalCounts).forEach(([collection, count]) => {
      console.log(`   • ${collection}: ${count}`);
    });
    
    // Show sample pet with all fields
    if (finalCounts.pets > 0) {
      const samplePet = await db.collection('pets').findOne({});
      console.log('\n📋 Sample pet with all fields:');
      console.log(JSON.stringify(samplePet, null, 2));
    }
    
  } catch (error) {
    console.error('❌ Error seeding database:', error);
  } finally {
    await client.close();
    console.log('🔌 MongoDB connection closed');
  }
}

// Export the function for use in server endpoints
module.exports = { seedDatabase };

// Run the seeding if this file is executed directly
if (require.main === module) {
  seedDatabase();
}
