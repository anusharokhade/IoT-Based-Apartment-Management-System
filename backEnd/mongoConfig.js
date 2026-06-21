// MongoDB Configuration
// Update this file with your MongoDB Atlas credentials

const MONGO_CONFIG = {
  // Local MongoDB connection (for development)
  // For MongoDB Atlas, use: mongodb+srv://username:password@cluster-name.mongodb.net/
  mongoURI: 'mongodb://localhost:27017/',
  
  // Database name
  dbName: 'apartmentdatabase',
  
  // Collections needed for this project
  collections: [
    'ownerandmaintainence',  // Store owners, maintenance staff, and their info
    'Expenses',              // Store expense records
    'notices',               // Store notices posted by chairman
    'messages',              // Store messages
    'counters',              // Store counters for ID generation
    'complaints',            // Store complaints
    'visitors',              // Store visitor information
    'employees',             // Store employee data
    'maintenance_requests'   // Store maintenance requests
  ]
};

module.exports = MONGO_CONFIG;
