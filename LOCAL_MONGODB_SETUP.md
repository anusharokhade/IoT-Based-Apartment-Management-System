# Local MongoDB & MongoDB Compass Setup Guide

## Step 1: Install MongoDB Community Edition

### For Windows:

1. **Download MongoDB Community Server**
   - Visit: https://www.mongodb.com/try/download/community
   - Select your Windows version (64-bit recommended)
   - Click "Download"

2. **Run the Installer**
   - Double-click the `.msi` file
   - Click "Next" through the setup
   - **Important:** Check "Install MongoDB as a Service"
   - This allows MongoDB to run automatically in the background
   - Complete the installation

3. **Verify Installation**
   - Open PowerShell or Command Prompt
   - Run: `mongod --version`
   - You should see the version number

### For Mac:
```bash
brew tap mongodb/brew
brew install mongodb-community
brew services start mongodb-community
```

### For Linux (Ubuntu):
```bash
sudo apt-get install -y mongodb
sudo systemctl start mongodb
```

---

## Step 2: Install MongoDB Compass

1. **Download Compass**
   - Visit: https://www.mongodb.com/products/compass
   - Click "Download"
   - Select your operating system

2. **Install Compass**
   - Run the installer
   - Follow the installation prompts
   - Open MongoDB Compass

---

## Step 3: Connect MongoDB Compass to Local MongoDB

1. **Open MongoDB Compass**

2. **Connection String:**
   - You should see a connection dialog
   - Enter: `mongodb://localhost:27017`
   - Click "Connect"

3. **You're Connected!**
   - You'll see your local database
   - Wait a few seconds for it to load
   - If empty, run the initialization script first

---

## Step 4: Initialize Your Database

**First time only:** Run this command to create collections:

```bash
cd backEnd
node initializeDatabase.js
```

You'll see output like:
```
✅ Created 'ownerandmaintainence' collection
✅ Created 'Expenses' collection
✅ Created 'notices' collection
... etc
```

---

## Step 5: Add Test Data (Optional)

To add sample users for testing:

```bash
cd backEnd
node setupTestCredentials.js
```

---

## Verify Everything Works

### Test Connection:
```bash
cd backEnd
node -e "require('./dbconnect')"
```

Expected output: `Connected to MongoDB`

### In MongoDB Compass:
1. Look for `apartmentdatabase` in the left sidebar
2. Expand it to see your collections:
   - ownerandmaintainence
   - Expenses
   - notices
   - messages
   - counters
   - complaints
   - visitors
   - employees
   - maintenance_requests

3. Click on each collection to see the documents

---

## MongoDB Compass Features

### Browse Data:
- Click any collection to view all documents
- Click a document to expand and see all fields

### Insert Data:
- Click the `+` icon in a collection
- Add new documents directly

### Query Data:
- Use the filter bar to search (e.g., `{flatno: "101"}`)
- See results in real-time

### Edit Data:
- Click a field to edit it
- Changes are saved instantly

### View Indexes:
- Click "Indexes" tab
- See all indexes on that collection

---

## Troubleshooting

### "Cannot connect to MongoDB"
**Solution:**
1. Check if MongoDB is running:
   ```bash
   tasklist | findstr mongod
   ```
   You should see `mongod.exe` in the list

2. If not running, start it:
   ```bash
   mongod
   ```
   Or if installed as service, it should auto-start

3. If it still doesn't work:
   ```bash
   # Check MongoDB service status
   Get-Service MongoDB
   
   # Start the service
   Start-Service MongoDB
   ```

### "Connection refused"
- Make sure MongoDB is actually running
- Verify connection string is correct: `mongodb://localhost:27017`
- Check your firewall isn't blocking port 27017

### "Database not found"
- Run `node initializeDatabase.js` to create collections
- MongoDB doesn't create databases/collections until data is written

### "Permission denied"
- Run PowerShell as Administrator
- Then try the commands again

---

## Next Steps

1. ✅ Install MongoDB Community Edition
2. ✅ Install MongoDB Compass
3. ✅ Connect Compass to `mongodb://localhost:27017`
4. ✅ Run `initializeDatabase.js`
5. ✅ Run `setupTestCredentials.js` (optional)
6. ✅ Start your app: `npm start` (from root folder)
7. ✅ Browse data in MongoDB Compass

---

## Important Ports

- **MongoDB Server:** Port 27017 (local)
- **React App:** Port 3000 (local)
- **Backend Server:** Port 9000 (check your index.js)

Make sure these ports are not in use by other applications!

---

## Quick Commands Reference

```bash
# Check if MongoDB is running
tasklist | findstr mongod

# Start MongoDB (if not running as service)
mongod

# Connect to MongoDB shell
mongosh
# or
mongo

# View all databases
show dbs

# Use a specific database
use apartmentdatabase

# View all collections
show collections

# Find all documents
db.ownerandmaintainence.find()

# Find specific document
db.ownerandmaintainence.find({flatno: "101"})
```

Good luck! 🚀
