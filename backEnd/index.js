require('dotenv').config();
const express = require('express');
const Razorpay = require('razorpay');
const cors = require('cors');
const bodyParser = require('body-parser');
const admin=require('./admin')
const security=require('./security')
const chairman=require('./chairman')
const secretary=require('./secretary')
const owner=require('./owner')
const login=require('./login')
const client=require("./dbconnect")
const axios=require('axios')

const app = express();

const dbName = 'apartmentdatabase';
db = client.db(dbName);

app.use(cors());
app.use(bodyParser.json());

// const mongoURI = 'mongodb+srv://anirudhmore96:Fullstackanirudh96@apartmentcluster.sa5bh.mongodb.net/';
// const dbName = 'apartmentdatabase';

// const client = new MongoClient(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });
// let db;
// client.connect()
// .then(() => {
//     db = client.db(dbName);  // Select the database
//     console.log('Connected to MongoDB');
// })
// .catch((err) => {
//     console.error('Failed to connect to MongoDB:', err);
// });

const razorpay = new Razorpay({
  key_id: 'rzp_test_FRoCXFr2FkZqrx', // Replace with your Razorpay Key ID
  key_secret: '4FFZPHjeFmQO9IQTPc6mlDoK' // Replace with your Razorpay Key Secret
});

app.use("/api/security",security)
app.use("/api/admin",admin)
app.use('/api/secretary',secretary)
app.use('/api/chairman',chairman)
app.use('/api/owner',owner)
app.use('/api/login',login)

// app.get("/api/getstats", async (req,res)=>{

//   const ownersCount = await db.collection('ownerandmaintainence').countDocuments();})

app.post('/api/create-order', async (req, res) => {
  
  try {
      const { amount, currency, receipt } = req.body; // Accept amount, currency, and receipt from the request
        console.log(amount+currency+receipt)
      const order = await razorpay.orders.create({
          amount: amount * 100, // Razorpay works in paise; convert to smallest currency unit
          currency,
          receipt
      });
      console.log(order)

      res.status(201).json({
          success: true,
          orderId: order.id,
          amount: order.amount,
          currency: order.currency,
          receipt: order.receipt
      });
  } catch (error) {
      console.error('Error creating order:', error);
      res.status(500).json({ success: false, error: 'Failed to create Razorpay order' });
  }
});
app.post('/api/capture-payment', async (req, res) => {
  const { paymentId, amount } = req.body;

  try {
      // Step 1: Verify Payment Status
      const paymentDetails = await razorpay.payments.fetch(paymentId);
      if (paymentDetails.status === 'captured') {
          return res.json({
              success: false,
              message: 'Payment has already been captured.',
          });
      }

      // Step 2: Capture Payment
      const response = await razorpay.payments.capture(paymentId, amount);
      console.log(response)
      res.json({ success: true, response });
  } catch (error) {
      console.error('Error capturing payment:', error);
      res.status(500).json({ success: false, error: 'Failed to capture payment.' });
  }
});
app.get("/api/getAptname", async (req, res) => {
  try {
    const collection = db.collection("Apartment");
    const Apartment = await collection.find({}).toArray();
    return res.status(200).send(Apartment);
  } catch (error) {
    console.error("Error ", error);
    return res.status(500).json({ message: "Server error. Please try again later." });
  }
});
app.get("/api/getinfo", async (req, res) => {
  try {
    const collection = db.collection("Apartment");
    const info = await collection.find({}).toArray();
    return res.status(200).json(info);
  } catch (error) {
    console.error("Error fetching apartment info:", error);
    return res.status(500).json({ message: "Server error. Please try again later." });
  }
});
app.post("/api/Raisedemand", async (req, res) => {
  const { paymentdescription,modeofpayment, year, paymentdate, amount, estatus } = req.body;
  const Owner=db.collection("ownerandmaintainence")
  try {
    const duplicateCheck = await Owner.findOne({
      "maintenence.year": year,
    });

    if (duplicateCheck) {
      return res
        .status(400)
        .json({ message: "Duplicate year detected in Maintenance field." });
    }
    const newMaintenance = { paymentdescription, year, paymentdate, amount,estatus };
    const result = await Owner.updateMany(
      {},
      { $push: { maintainence: newMaintenance } }
    );

    res.status(200).json({
      message: "Demands submitted successfully.",
      updatedCount: result.modifiedCount,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "An unexpected error occurred." });
  }
});

app.get("/api/getDues/:year", async (req, res) => {
  const year = req.params.year;
  console.log("Requested year:", year);
  try {
    const collection = db.collection("ownerandmaintainence");

    const Dues = await collection
      .find(
        {
          "Maintainence.year": year 
        },
        {
          projection: { ofname: 1, olname: 1, Maintainence: 1, _id: 0 }
        }
      )
      .toArray();
    
    console.log("Dues found:", Dues);
    return res.status(200).json(Dues);
  } catch (error) {
    console.error("Error fetching data:", error);
    return res.status(500).json({ message: "Server error. Please try again later." });
  }
});
app.get("/api/getMaintainance/:oid", async (req, res) => {
  const oid = parseInt(req.params.oid);
  
  try {
    // Fetching the document for the given oid
    const result = await db.collection("ownerandmaintainence")
      .find({ oid: oid }, { projection: { oid: 1, maintainence: 1, _id: 0 } })
      .toArray();

    if (result.length > 0) {
      // Assuming the `maintenance` field is an array of objects, extract the maintenance data
      const maintenanceData = result[0].maintainence || [];

      // Send the maintenance data as an array of objects
      return res.json(maintenanceData);
    } else {
      return res.status(404).json({ message: "No data found for the given OID." });
    }
  } catch (error) {
    console.error("Error fetching maintenance data:", error);
    return res.status(500).json({ message: "Server error. Please try again later." });
  }
});
app.post("/api/getMaintainance", async (req, res) => {
  const { oid,year, estatus } = req.body;  // Assuming the body contains the year and the new status

  try {
    const collection = db.collection("ownerandmaintainence");

    // Update the Maintainance array for the specific owner (oid) and year
    const result = await collection.updateOne(
      { oid: oid, "maintainence.year": year }, // Find the Owner with the specified OID and year in Maintainance array
      {
        $set: {
          "maintainance.$.estatus": estatus // Update the status of the matching Maintainance entry
        }
      }
    );

    if (result.modifiedCount > 0) {
      return res.json({ message: "Maintenance status updated successfully." });
    } else {
      return res.status(404).json({ message: "No maintenance entry found with the given year." });
    }
  } catch (error) {
    console.error("Error updating maintenance data:", error);
    return res.status(500).json({ message: "Server error. Please try again later." });
  }
});

app.get('/temperature', async (req, res) => {
  try {
    const url = 'https://api.thingspeak.com/channels/3397109/feeds.json?results=2';
    const response = await axios.get(url);

    // Extract data properly
    const temperatureData = response.data.feeds.map((feed) => ({
      time: feed.created_at,
      temperature: feed.field1, // Field1 (Temperature)
      gasSensorData: parseFloat(feed.field2) // Field2 (Gas Sensor)
    }));

    console.log("Gas Data from ThingSpeak: ", temperatureData[0].gasSensorData);
    console.log("Gas Data from ThingSpeak: ", temperatureData[0].temperature);
    res.json(temperatureData);
  } catch (error) {
    console.error('Error fetching data from ThingSpeak:', error.message);
    res.status(500).json({ error: 'Failed to fetch data' });
  }
});

// app.post("/api/login", async (req, res) => {
//     const { username, password, userType } = req.body;
//   console.log(username+" "+password+" "+userType)
  
//     try {
//       if (!username || !password || !userType) {
//         return res.status(400).json({ message: "All fields are required" });
//       }
//   var user;
//       const collection = db.collection("ownerandmaintainence"); // Collection name
//       if (userType==="Owner")
//          user = await collection.find({ flatno: username, Password: password, Adesignation: userType }).toArray();

//         else
//        user = await collection.find({ Login: username, Password: password, Adesignation: userType }).toArray();
//     console.log(user)
//       if (user.length > 0) {
//         return res.status(200).json({ message: "Login successful", userType });
//       } else {
//         return res.status(401).json({ message: "Invalid credentials or role mismatch" });
//       }
//     } catch (error) {
//       console.error("Error during login:", error);
//       return res.status(500).json({ message: "Server error. Please try again later." });
//     }
// });
  
// app.get('/api/getallemployees', async (req, res) => {
//   try {
//     const employees = await db.collection('employee').find().toArray();  // Fetch all employees from MongoDB
//     res.json(employees);
//   } catch (error) {
//     res.status(500).json({ message: 'Error fetching employee data', error });
//   }
// });

// app.get('/api/getallvisitors', async (req, res) => {
//   try {
//     const visitors = await db.collection('visitors').find().toArray();  // Fetch all employees from MongoDB
//     res.json(visitors);
//   } catch (error) {
//     res.status(500).json({ message: 'Error fetching visitors data', error });
//   }
// });

// app.get('/api/getallowners', async (req, res) => {
//   try {
//     const owners = await db.collection('ownerandmaintainence').find().toArray(); 
//     console.log("im here")
//     // Fetch all employees from MongoDB
//     res.json(owners);  // Send the employee data as JSON
//   } catch (error) {
//     res.status(500).json({ message: 'Error fetching employee data', error });
//   }
// });

// app.get('/api/getNotices', async (req, res) => {
//   try {
//     const notice = await db.collection('notices').find().toArray(); 
//     res.json(notice);  // Send the employee data as JSON
//   } catch (error) {
//     res.status(500).json({ message: 'Error fetching data', error });
//   }
// });

// app.get("/api/getsummaryexpenses", async (req, res) => {
//   try {
//     // Perform the aggregation or query with $toInt for type conversion
//     const results = await db.collection("Expenses").aggregate([
//       {
//         $addFields: {
//           amount: { $toInt: "$amount" }, // Ensure 'amount' is cast to integer
//         },
//       },
//       {
//         $group: {
//           _id: "$description",
//           total: { $sum: "$amount" }, // Sum the integer values
//         },
//       },
//     ]).toArray();
//     console.log("Aggregation results:", results);
//     res.json(results);
//   } catch (error) {
//     console.error("Error during aggregation:", error);
//     res.status(500).json({ error: "An error occurred while processing your request." });
//   }
// });

// app.post("/api/getmonthwiseexpenses", async (req, res) => {
//   let {description,year}=req.body
//   console.log(description+" "+year)
//   try {
//     const result = await db.collection("Expenses").aggregate([
//       {
//         $match: {
//           description:description,
//           year:year,
//           date: { $exists: true, $ne: null }, // Ensure only documents with valid dates are processed
//           amount: { $exists: true, $ne: null } // Ensure only valid amounts are processed
//         }
//       },
//       {
//         $addFields: {
//           month: { $month: { $toDate: "$date" } },
//           year: { $year: { $toDate: "$date" } }
//         }
//       },
//       {
//         $group: {
//           _id: { month: "$month", year: "$year" },
//           totalAmount: { $sum: { $toDouble: "$amount" } }
//         }
//       },
//       {
//         $sort: { "_id.year": 1, "_id.month": 1 }
//       }
//     ]).toArray();

//     const transformedData = result.map(item => ({
//       month: item._id.month,
//       year: item._id.year,
//       totalAmount: item.totalAmount
//     }));

//     console.log("Aggregation result", transformedData);
//     //const chartData = result.map(({ _id, totalAmount }) => ({
//      // month: `${_id.month}-${_id.year}`,
//       //totalAmount,
//     //}));
//     return res.send(transformedData);
//   } catch (error) {
//     console.error("Error fetching month-wise expenses:", error);
//     return res.status(500).json({ message: "Failed to fetch month-wise expenses" });
//   }
// });

// app.get('/api/getoidcount', async (req, res) => {
//   try {
//     const oidcount = await db.collection('counters').find().toArray(); 
//     console.log(oidcount)
//     res.json(oidcount);  // Send the employee data as JSON
//   } catch (error) {
//     res.status(500).json({ message: 'Error fetching data', error });
//   }
// });

// app.get('/api/getMessages', async (req, res) => {
//   try {
//     const notice = await db.collection('messages').find().toArray(); 
//     res.json(notice);
//   } catch (error) {
//     res.status(500).json({ message: 'Error fetching data', error });
//   }
// });

// app.get('/getmaintainence/:username', async (req, res) => {
//   let username=req.params.username;
//   try {
//     const owners = await db.collection('ownerandmaintainence').find({flatno:username}).toArray(); 
//     console.log(owners)
//     res.json(owners);
//   } catch (error) {
//     res.status(500).json({ message: 'Error fetching employee data', error });
//   }
// });

// app.post('/api/generatesalarydetails', async (req, res) => {
//   const {payload,empid}=req.body
//   console.log(payload)
//   try {
//     const result = await db.collection('employee').updateOne({empid:empid},{$push:{empsalarydet:payload}}); 
//   //  res.send("Employee salary Added sucess") // Insert the new employee document
//     res.status(201).json({ message: 'Employee added successfully', result });
//   } catch (error) {
//     res.status(500).json({ message: 'Error saving employee data', error });
//   }
// });

// app.post('/api/generatemaintainencedetails', async (req, res) => {
//   const {payload1, oid}=req.body
//   console.log(payload1)
//   try {
//     const result = await db.collection('ownerandmaintainence').updateOne({oid:oid},{$push:{maintainence:payload1}}); 
//   //  res.send("Employee salary Added sucess") // Insert the new employee document
//     res.status(201).json({ message: 'Maintainence added successfully', result });
//   } catch (error) {
//     res.status(500).json({ message: 'Error saving maintainence data', error });
//   }
// });

// app.post('/api/addvisitors',async(req,res)=>{
//   const payload=req.body
//   console.log(payload)
//   try {
//     const result=await db.collection('visitors').insertOne(payload)
//   res.send("added visitor!!!")
//   } catch (error) {
//     console.log(error)
//   }
//  })

// app.post('/api/addExpense',async(req,res)=>{
//   const expense=req.body
//   console.log(expense)
//   try {
//     const result=await db.collection('expenses').insertOne(expense)
//   res.send("added expense!!!")
//   } catch (error) {
//     console.log(error)
//   }
// })

// app.post('/addemployee',async(req,res)=>{
//   const payload=req.body
//   console.log(payload)
//   try {
//     const result=await db.collection('employee').insertOne(payload)
//   res.send("added employee!!!")
//   } catch (error) {
//     console.log(error)
//   }
// })

// app.post('/api/postNotice',async(req,res)=>{
//   const payload=req.body
//   console.log(payload)
//   try {
//     const result=await db.collection('notices').insertOne(payload)
//   res.send("added employee!!!")
//   } catch (error) {
//     console.log(error)
//   }
// })

// app.post('/api/postMessage',async(req,res)=>{
//   const payload=req.body
//   console.log(payload)
//   try {
//     const result=await db.collection('messages').insertOne(payload)
//   res.send("added message!!!")
//   } catch (error) {
//     console.log(error)
//   }
// })

// app.post('/updatepaymentstatus',async(req,res)=>{
//   const payload=req.body
//   console.log(payload)
//   try {
//     const result=await db.collection('ownerandmaintainence').updateOne({ flatno:payload.username, "maintainence.estatus": "Pending" }, // Query to match flatno and pending status
//       { $set: { "maintainence.$.estatus": "Paid" } })
//   res.send("added message!!!")
//   } catch (error) {
//     console.log(error)
//   }
// })

// app.post('/api/addowner',async(req,res)=>{
//   const formData=req.body
//   let oid=formData.oid
//   try {
//     const result1=await db.collection('counters').updateOne({},{$set:{"oidcounter":oid}})
//     const result=await db.collection('ownerandmaintainence').insertOne(formData)
//   res.send("added owner!!!")
//   } catch (error) {
//     console.log(error)
//   }
// })

// app.post('/api/insertapartmentdetails',async(req,res)=>{
//   const payload=req.body
//   console.log(payload)
//   try {
//     const result=await db.collection('apartmentdetails').insertOne(payload)
//   res.send("Added apartment details!!!")
//   } catch (error) {
//     console.log(error)
//   }
// })

// Email setup for gas leak alerts
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER || 'your-email@gmail.com',
    pass: process.env.EMAIL_PASSWORD || 'your-app-password'
  }
});

// Send gas leak alert email
app.post('/api/sendGasAlert', async (req, res) => {
  const { gasLevel, ownerEmail, ownerName, flatno } = req.body;

  if (!ownerEmail) {
    return res.status(400).json({ message: 'Owner email is required' });
  }

  const mailOptions = {
    from: process.env.EMAIL_USER || 'your-email@gmail.com',
    to: ownerEmail,
    subject: '⚠️ GAS LEAK ALERT - Immediate Action Required',
    html: `
      <div style="font-family: Arial, sans-serif; color: #333;">
        <h2 style="color: #d32f2f;">🚨 GAS LEAK DETECTED</h2>
        <p>Dear ${ownerName || 'Resident'},</p>
        <p>
          <strong>A gas leak has been detected in your property!</strong>
        </p>
        <div style="background-color: #fff3cd; border-left: 4px solid #ffc107; padding: 15px; margin: 20px 0;">
          <p><strong>Details:</strong></p>
          <ul>
            <li><strong>Flat Number:</strong> ${flatno}</li>
            <li><strong>Gas Level:</strong> ${gasLevel} ppm</li>
            <li><strong>Threshold:</strong> 3.8 ppm</li>
            <li><strong>Time:</strong> ${new Date().toLocaleString()}</li>
          </ul>
        </div>
        <p style="color: #d32f2f;"><strong>Immediate Actions Required:</strong></p>
        <ol>
          <li>Evacuate the property immediately</li>
          <li>Open all windows and doors for ventilation</li>
          <li>Call emergency services: 112</li>
          <li>Contact building management</li>
        </ol>
        <p style="margin-top: 30px; color: #666; font-size: 12px;">
          This is an automated alert from the Apartment Management System. Please do not reply to this email.
        </p>
      </div>
    `
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`✉️ Gas alert email sent to ${ownerEmail}`);
    res.status(200).json({ message: 'Email alert sent successfully', recipient: ownerEmail });
  } catch (error) {
    console.error('❌ Error sending email:', error);
    res.status(500).json({ message: 'Failed to send email alert', error: error.message });
  }
});

// Get all owners for alerts
app.get('/api/getAllOwners', async (req, res) => {
  try {
    const owners = await db.collection('ownerandmaintainence').find({}).toArray();
    res.status(200).json(owners);
  } catch (error) {
    console.error('Error fetching owners:', error);
    res.status(500).json({ message: 'Error fetching owners', error });
  }
});

// TEST ENDPOINT: Send test gas alert using Ethereal (free test email service)
app.post('/api/testGasAlert', async (req, res) => {
  try {
    // Create a free test account on Ethereal
    const testAccount = await nodemailer.createTestAccount();

    // Create transporter using Ethereal test account
    const testTransporter = nodemailer.createTransport({
      host: 'smtp.ethereal.email',
      port: 587,
      secure: false,
      auth: {
        user: testAccount.user,
        pass: testAccount.pass
      }
    });

    const { gasLevel = 8, ownerEmail = 'arokhade02@gmail.com', ownerName = 'Owner', flatno = 'A-101' } = req.body;

    const mailOptions = {
      from: testAccount.user,
      to: ownerEmail,
      subject: '⚠️ GAS LEAK ALERT - Immediate Action Required (TEST)',
      html: `
        <div style="font-family: Arial, sans-serif; color: #333;">
          <h2 style="color: #d32f2f;">🚨 GAS LEAK DETECTED (TEST MODE)</h2>
          <p>Dear ${ownerName},</p>
          <p><strong>A gas leak has been detected in your property!</strong></p>
          <div style="background-color: #fff3cd; border-left: 4px solid #ffc107; padding: 15px; margin: 20px 0;">
            <p><strong>Details:</strong></p>
            <ul>
              <li><strong>Flat Number:</strong> ${flatno}</li>
              <li><strong>Gas Level:</strong> ${gasLevel} ppm</li>
              <li><strong>Threshold:</strong> 3.8 ppm</li>
              <li><strong>Time:</strong> ${new Date().toLocaleString()}</li>
              <li><strong>Mode:</strong> TEST ALERT</li>
            </ul>
          </div>
          <p style="color: #d32f2f;"><strong>Immediate Actions Required:</strong></p>
          <ol>
            <li>Evacuate the property immediately</li>
            <li>Open all windows and doors for ventilation</li>
            <li>Call emergency services: 112</li>
            <li>Contact building management</li>
          </ol>
          <p style="margin-top: 30px; color: #666; font-size: 12px;">
            This is a TEST alert from the Apartment Management System. Please do not reply to this email.
          </p>
        </div>
      `
    };

    const info = await testTransporter.sendMail(mailOptions);
    const testUrl = nodemailer.getTestMessageUrl(info);

    console.log(`✉️ TEST Gas alert email sent! Preview URL: ${testUrl}`);
    res.status(200).json({
      message: 'Test email sent successfully',
      recipient: ownerEmail,
      previewUrl: testUrl,
      etherealUser: testAccount.user
    });
  } catch (error) {
    console.error('❌ Error sending test email:', error);
    res.status(500).json({ message: 'Failed to send test email', error: error.message });
  }
});

const PORT = 9000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});