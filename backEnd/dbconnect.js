const { MongoClient } = require('mongodb');

// Local MongoDB connection (for development)
const mongoURI = 'mongodb://localhost:27017/';
const client = new MongoClient(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });

client.connect()
.then(() => {
    console.log('Connected to MongoDB');
})
.catch((err) => {
    console.error('Failed to connect to MongoDB:', err);
});


module.exports=client