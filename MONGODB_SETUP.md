# MongoDB Setup Guide for Apartment Management System

## Option 1: Use Your Own MongoDB Atlas Cluster (Recommended)

### Step 1: Create MongoDB Atlas Account
1. Visit https://www.mongodb.com/cloud/atlas
2. Click "Sign Up for Free"
3. Complete the registration process
4. Create a new project

### Step 2: Create a Cluster
1. Click "Create" → "Build a Database"
2. Select "Shared" (M0 - Free tier)
3. Choose your preferred cloud provider and region
4. Click "Create Cluster" (takes 2-3 minutes)

### Step 3: Set Up Security
1. Go to "Database Access" (left menu)
   - Click "Add New Database User"
   - Create username (e.g., `apartment_user`)
   - Create password (e.g., `SecurePass123!`)
   - Click "Add User"

2. Go to "Network Access" (left menu)
   - Click "Add IP Address"
   - Select "Allow Access from Anywhere" (for development)
   - OR add your IP: Click "Add Current IP Address"
   - Click "Confirm"

### Step 4: Get Connection String
1. Go to "Deployments" (left menu)
2. Click "Connect" button on your cluster
3. Select "Drivers"
4. Choose Node.js from dropdown
5. Copy the connection string
   - Format: `mongodb+srv://username:password@cluster-name.mongodb.net/`
   - Replace `username` and `password` with your credentials

### Step 5: Update Connection in Your Project
1. Open `backEnd/dbconnect.js`
2. Update the `mongoURI` with your connection string:
   ```javascript
   const mongoURI = 'mongodb+srv://your_username:your_password@your_cluster.mongodb.net/';
   ```

### Step 6: Initialize Database Collections
Run this command from the `backEnd` folder:
```bash
node initializeDatabase.js
```

### Step 7: Add Test Data (Optional)
Run this to add sample users:
```bash
node setupTestCredentials.js
```

---

## Option 2: Use Local MongoDB

### Windows Installation
1. Download from https://www.mongodb.com/try/download/community
2. Run the installer and follow prompts
3. Choose "Install as a Service" (recommended)
4. MongoDB will run locally at `mongodb://localhost:27017`

### Update Connection String
In `backEnd/dbconnect.js`:
```javascript
const mongoURI = 'mongodb://localhost:27017/';
```

---

## Database Schema Overview

### Collections Created:

#### 1. **ownerandmaintainence**
Stores owner and maintenance staff information
```json
{
  "flatno": "101",           // For owners
  "Login": "chairman1",      // For other users
  "Password": "password123",
  "Adesignation": "Owner|Admin|Chairman|Secretary|Security",
  "ofname": "John",
  "olname": "Doe",
  "oid": "owner001",
  "Messages": []
}
```

#### 2. **Expenses**
Stores apartment expenses
```json
{
  "personOrAgencyName": "Contractor",
  "amount": "5000",
  "year": "2024-2025"
}
```

#### 3. **notices**
Stores notices posted by chairman

#### 4. **messages**
Stores messages

#### 5. **counters**
Stores system counters
```json
{
  "_id": "financialyear",
  "financialyear": "2024-2025"
}
```

#### 6. **complaints**
Stores complaint tickets

#### 7. **visitors**
Stores visitor logs

#### 8. **employees**
Stores employee information

#### 9. **maintenance_requests**
Stores maintenance requests

---

## Testing Connection

After setup, verify the connection:
```bash
cd backEnd
node dbconnect.js
```

You should see: **"Connected to MongoDB"**

---

## Troubleshooting

### Connection Refused
- Check MongoDB is running (local) or cluster is active (Atlas)
- Verify username/password in connection string
- Check IP whitelist is configured (Atlas)

### Database Not Found
- MongoDB creates database automatically on first write
- Run `initializeDatabase.js` to create collections

### Authentication Failed
- Double-check username and password
- Ensure special characters in password are URL encoded
- (e.g., `@` becomes `%40`, `#` becomes `%23`)

---

## Next Steps

1. ✅ Set up MongoDB
2. ✅ Update connection string
3. ✅ Run `initializeDatabase.js`
4. ✅ Run `setupTestCredentials.js` (optional)
5. ✅ Start your backend server
6. ✅ Login with test credentials

Good luck! 🚀
