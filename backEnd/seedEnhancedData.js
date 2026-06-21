const client = require("./dbconnect");

const dbName = 'apartmentdatabase';
const db = client.db(dbName);

async function seedEnhanced() {
  try {
    await client.connect();

    const ownerCollection = db.collection('ownerandmaintainence');
    const employeeCollection = db.collection('employee');
    const apartmentCollection = db.collection('Apartment');
    const expenseCollection = db.collection('Expenses');
    const noticeCollection = db.collection('notices');
    const messageCollection = db.collection('messages');
    const complaintCollection = db.collection('complaints');
    const visitorCollection = db.collection('visitors');
    const maintenanceRequestCollection = db.collection('maintenance_requests');
    const corpusCollection = db.collection('collectioncorpus');

    // Enhanced Owners with Tenants and Complete Information
    const owners = [
      {
        oid: 1,
        ofname: 'Anusha',
        olname: 'Rokhade',
        ogender: 'F',
        ocellno: '9876543210',
        oemail: 'arokhade02@gmail.com',
        Login: 'owner1',
        Password: 'owner123',
        Adesignation: 'Owner',
        famcount: '3',
        flatno: 'A-101',
        floorno: '1',
        wing: 'A',
        maintainence: [
          { paymentdescription: 'Annual maintenance', year: '2024-2025', paymentdate: '2024-04-10', amount: '15000', estatus: 'Paid', modeofpayment: 'UPI' },
          { paymentdescription: 'Quarterly maintenance', year: '2024-2025', paymentdate: '2024-07-15', amount: '15000', estatus: 'Pending', modeofpayment: 'Bank Transfer' }
        ],
        tenant: [
          { tname: 'Rajesh Kumar', taadhar: '123456789012', tcell: '9123456789', taddress: 'Previous: Mumbai', tod: '2024-01-15', tld: '2025-01-14', tstatus: 'Active', createdAt: '2024-01-15T10:00:00Z' },
          { tname: 'Priya Singh', taadhar: '234567890123', tcell: '9234567890', taddress: 'Previous: Bangalore', tod: '2024-03-20', tld: '2025-03-19', tstatus: 'Active', createdAt: '2024-03-20T14:30:00Z' }
        ],
        Messages: [
          { postedtext: 'Welcome to KLE Apartment Complex' },
          { postedtext: 'Please ensure timely payment of maintenance' }
        ]
      },
      {
        oid: 2,
        ofname: 'Priya',
        olname: 'Sharma',
        ogender: 'F',
        ocellno: '9123456780',
        oemail: 'priya.sharma@example.com',
        Login: 'owner2',
        Password: 'owner123',
        Adesignation: 'Owner',
        famcount: '4',
        flatno: 'A-102',
        floorno: '1',
        wing: 'A',
        maintainence: [
          { paymentdescription: 'Maintenance fee', year: '2024-2025', paymentdate: '2024-05-01', amount: '15000', estatus: 'Paid', modeofpayment: 'Cash' }
        ],
        tenant: [
          { tname: 'Vikram Desai', taadhar: '345678901234', tcell: '9345678901', taddress: 'Previous: Delhi', tod: '2024-02-10', tld: '2025-02-09', tstatus: 'Active', createdAt: '2024-02-10T09:00:00Z' }
        ],
        Messages: [
          { postedtext: 'Building security updated' }
        ]
      },
      {
        oid: 3,
        ofname: 'Rahul',
        olname: 'Patel',
        ogender: 'M',
        ocellno: '9988776655',
        oemail: 'rahul.patel@example.com',
        Login: 'owner3',
        Password: 'owner123',
        Adesignation: 'Owner',
        famcount: '2',
        flatno: 'B-202',
        floorno: '2',
        wing: 'B',
        maintainence: [
          { paymentdescription: 'Quarterly payment', year: '2024-2025', paymentdate: '2024-06-01', amount: '15000', estatus: 'Pending', modeofpayment: 'Bank Transfer' }
        ],
        tenant: [
          { tname: 'Anjali Verma', taadhar: '456789012345', tcell: '9456789012', taddress: 'Previous: Hyderabad', tod: '2024-04-05', tld: '2025-04-04', tstatus: 'Active', createdAt: '2024-04-05T11:20:00Z' }
        ],
        Messages: []
      },
      {
        oid: 4,
        ofname: 'Neha',
        olname: 'Gupta',
        ogender: 'F',
        ocellno: '8765432109',
        oemail: 'neha.gupta@example.com',
        Login: 'owner4',
        Password: 'owner123',
        Adesignation: 'Owner',
        famcount: '5',
        flatno: 'C-303',
        floorno: '3',
        wing: 'C',
        maintainence: [
          { paymentdescription: 'Half-yearly maintenance', year: '2024-2025', paymentdate: '2024-03-15', amount: '30000', estatus: 'Paid', modeofpayment: 'Cheque' }
        ],
        tenant: [
          { tname: 'Suresh Nair', taadhar: '567890123456', tcell: '9567890123', taddress: 'Previous: Kochi', tod: '2024-05-12', tld: '2025-05-11', tstatus: 'Active', createdAt: '2024-05-12T15:45:00Z' }
        ],
        Messages: [
          { postedtext: 'Gas leakage alert - please check' }
        ]
      },
      {
        oid: 5,
        ofname: 'Arjun',
        olname: 'Verma',
        ogender: 'M',
        ocellno: '7654321098',
        oemail: 'arjun.verma@example.com',
        Login: 'owner5',
        Password: 'owner123',
        Adesignation: 'Owner',
        famcount: '3',
        flatno: 'D-404',
        floorno: '4',
        wing: 'D',
        maintainence: [
          { paymentdescription: 'Annual payment', year: '2024-2025', paymentdate: '2024-04-20', amount: '15000', estatus: 'Paid', modeofpayment: 'UPI' },
          { paymentdescription: 'Parking fee', year: '2024-2025', paymentdate: '2024-05-20', amount: '3000', estatus: 'Pending', modeofpayment: 'UPI' }
        ],
        tenant: [],
        Messages: []
      },
      {
        oid: 6,
        ofname: 'Mohit',
        olname: 'Singh',
        ogender: 'M',
        ocellno: '6543210987',
        oemail: 'mohit.singh@example.com',
        Login: 'owner6',
        Password: 'owner123',
        Adesignation: 'Owner',
        famcount: '4',
        flatno: 'E-505',
        floorno: '5',
        wing: 'E',
        maintainence: [
          { paymentdescription: 'Full year maintenance', year: '2024-2025', paymentdate: '2024-04-01', amount: '60000', estatus: 'Paid', modeofpayment: 'Bank Transfer' }
        ],
        tenant: [
          { tname: 'Deepak Rao', taadhar: '678901234567', tcell: '9678901234', taddress: 'Previous: Chennai', tod: '2024-02-28', tld: '2025-02-27', tstatus: 'Active', createdAt: '2024-02-28T08:00:00Z' }
        ],
        Messages: []
      }
    ];

    for (const user of owners) {
      await ownerCollection.updateOne({ oid: user.oid }, { $set: user }, { upsert: true });
    }
    console.log('✅ Enhanced owners seeded');

    // Enhanced Employees with Complete Salary Records
    const employees = [
      {
        empid: 'E001',
        empname: 'Amit Desai',
        empgender: 'M',
        empcellno: '9123456701',
        empaadhaarno: '123456789012',
        empaddress: 'Flat B-101, KLE, Pune',
        empsalarydet: [
          { year: '2024-2025', month: 'April', salary: '22000', bonus: '2000', status: 'Paid', date: '2024-04-30' },
          { year: '2024-2025', month: 'May', salary: '22000', bonus: '1800', status: 'Paid', date: '2024-05-31' },
          { year: '2024-2025', month: 'June', salary: '22000', bonus: '1500', status: 'Pending', date: '2024-06-30' }
        ]
      },
      {
        empid: 'E002',
        empname: 'Sonal Gupta',
        empgender: 'F',
        empcellno: '9123456702',
        empaadhaarno: '123456789013',
        empaddress: 'Flat B-102, KLE, Pune',
        empsalarydet: [
          { year: '2024-2025', month: 'April', salary: '24000', bonus: '1500', status: 'Paid', date: '2024-04-30' },
          { year: '2024-2025', month: 'May', salary: '24000', bonus: '1500', status: 'Paid', date: '2024-05-31' },
          { year: '2024-2025', month: 'June', salary: '24000', bonus: '2000', status: 'Paid', date: '2024-06-30' }
        ]
      },
      {
        empid: 'E003',
        empname: 'Ravi Kumar',
        empgender: 'M',
        empcellno: '9223456703',
        empaadhaarno: '223456789014',
        empaddress: 'Flat A-201, KLE, Pune',
        empsalarydet: [
          { year: '2024-2025', month: 'April', salary: '18000', bonus: '1000', status: 'Paid', date: '2024-04-30' },
          { year: '2024-2025', month: 'May', salary: '18000', bonus: '1200', status: 'Paid', date: '2024-05-31' }
        ]
      },
      {
        empid: 'E004',
        empname: 'Meera Patel',
        empgender: 'F',
        empcellno: '9323456704',
        empaadhaarno: '323456789015',
        empaddress: 'Flat C-103, KLE, Pune',
        empsalarydet: [
          { year: '2024-2025', month: 'April', salary: '20000', bonus: '1500', status: 'Paid', date: '2024-04-30' },
          { year: '2024-2025', month: 'May', salary: '20000', bonus: '1500', status: 'Pending', date: '2024-05-31' }
        ]
      }
    ];

    for (const emp of employees) {
      await employeeCollection.updateOne({ empid: emp.empid }, { $set: emp }, { upsert: true });
    }
    console.log('✅ Enhanced employees seeded');

    // Enhanced Apartment Details
    const apartments = [
      {
        Apartmentname: 'KLE Luxury Apartments',
        address: '12 Green Valley Road, Pune',
        areaname: 'Kalyani Nagar',
        city: 'Pune',
        builder: 'KLE Builders',
        registrationNo: 'REG/2022/KLE001',
        regDate: '2022-03-15',
        totalFloors: 5,
        totalWings: 3,
        totalUnits: 72,
        builtYear: 2022,
        societyName: 'KLE Society',
        wings: { 'A': 24, 'B': 24, 'C': 24 },
        amenities: ['Swimming Pool', 'Gym', 'Garden', 'Security', 'Parking']
      }
    ];

    for (const apt of apartments) {
      await apartmentCollection.updateOne({ Apartmentname: apt.Apartmentname }, { $set: apt }, { upsert: true });
    }
    console.log('✅ Enhanced apartment details seeded');

    // Enhanced Expenses
    const expenses = [
      { personOrAgencyName: 'Electrical Contractor', description: 'Common area wiring repair', amount: '8500', year: '2024-2025', date: '2024-05-20', category: 'Maintenance' },
      { personOrAgencyName: 'Cleaning Service', description: 'Weekly cleaning service', amount: '4500', year: '2024-2025', date: '2024-05-12', category: 'Services' },
      { personOrAgencyName: 'Security Agency', description: 'Monthly security contract', amount: '12000', year: '2024-2025', date: '2024-05-01', category: 'Security' },
      { personOrAgencyName: 'Garden Maintenance', description: 'Landscaping and maintenance', amount: '6000', year: '2024-2025', date: '2024-05-15', category: 'Maintenance' },
      { personOrAgencyName: 'Water Supply', description: 'Monthly water charges', amount: '3500', year: '2024-2025', date: '2024-06-01', category: 'Utilities' },
      { personOrAgencyName: 'Electricity Board', description: 'Common area electricity', amount: '8000', year: '2024-2025', date: '2024-06-05', category: 'Utilities' },
      { personOrAgencyName: 'Pest Control', description: 'Quarterly pest control', amount: '2500', year: '2024-2025', date: '2024-06-10', category: 'Maintenance' },
      { personOrAgencyName: 'Swimming Pool Maintenance', description: 'Pool cleaning and chemicals', amount: '4000', year: '2024-2025', date: '2024-06-08', category: 'Amenities' }
    ];

    for (const expense of expenses) {
      await expenseCollection.updateOne(
        { personOrAgencyName: expense.personOrAgencyName, date: expense.date },
        { $set: expense },
        { upsert: true }
      );
    }
    console.log('✅ Enhanced expenses seeded');

    // Enhanced Notices
    const notices = [
      { title: 'Monthly HOA Meeting', description: 'All residents are requested to attend the monthly HOA meeting in the community hall on 20th June at 5 PM.', date: '2024-06-20', postedBy: 'Chairman', priority: 'High' },
      { title: 'Swimming Pool Cleaning', description: 'The pool will be closed for cleaning on 25th June from 9 AM to 1 PM.', date: '2024-06-24', postedBy: 'Secretary', priority: 'Medium' },
      { title: 'Gas Safety Inspection', description: 'Annual gas safety inspection scheduled for 28th June. All flats must be accessible.', date: '2024-06-27', postedBy: 'Secretary', priority: 'High' },
      { title: 'Parking Rule Update', description: 'New parking regulations effective from July 1st. Each unit is allotted 2 parking spaces.', date: '2024-06-25', postedBy: 'Chairman', priority: 'Medium' },
      { title: 'Maintenance Payment Reminder', description: 'Pending maintenance payments must be cleared by 30th June 2024.', date: '2024-06-15', postedBy: 'Secretary', priority: 'High' }
    ];

    for (const notice of notices) {
      await noticeCollection.updateOne({ title: notice.title, date: notice.date }, { $set: notice }, { upsert: true });
    }
    console.log('✅ Enhanced notices seeded');

    // Enhanced Messages
    const messages = [
      { flatno: 'A-101', message: 'Your maintenance payment is due', postedBy: 'Secretary', date: '2024-06-10', status: 'Unread' },
      { flatno: 'A-102', message: 'Swimming pool closed for maintenance', postedBy: 'Secretary', date: '2024-06-12', status: 'Read' },
      { flatno: 'B-202', message: 'Parking regulation updated', postedBy: 'Chairman', date: '2024-06-14', status: 'Unread' },
      { flatno: 'C-303', message: 'Gas leak alert detected', postedBy: 'Admin', date: '2024-06-14', status: 'Unread' },
      { flatno: 'D-404', message: 'Monthly meeting scheduled', postedBy: 'Chairman', date: '2024-06-08', status: 'Read' }
    ];

    for (const msg of messages) {
      await messageCollection.updateOne(
        { flatno: msg.flatno, date: msg.date },
        { $set: msg },
        { upsert: true }
      );
    }
    console.log('✅ Enhanced messages seeded');

    // Enhanced Complaints
    const complaints = [
      { flatno: 'A-101', category: 'Maintenance', cdescription: 'Water leakage in bathroom', cstatus: 'Pending', submittedAt: '2024-06-10T10:30:00Z', isAnonymous: false, priority: 'High' },
      { flatno: 'A-102', category: 'Security', cdescription: 'Unauthorized parking in lot', cstatus: 'Resolved', submittedAt: '2024-06-08T14:15:00Z', isAnonymous: true, priority: 'Medium' },
      { flatno: 'B-202', category: 'Noise', cdescription: 'Late night noise disturbance', cstatus: 'Pending', submittedAt: '2024-06-12T22:00:00Z', isAnonymous: false, priority: 'High' },
      { flatno: 'C-303', category: 'Facilities', cdescription: 'Lift not working', cstatus: 'In Progress', submittedAt: '2024-06-13T09:00:00Z', isAnonymous: false, priority: 'Critical' },
      { flatno: 'D-404', category: 'Maintenance', cdescription: 'Common area lights flickering', cstatus: 'Resolved', submittedAt: '2024-06-05T11:20:00Z', isAnonymous: true, priority: 'Low' }
    ];

    for (const complaint of complaints) {
      await complaintCollection.updateOne(
        { flatno: complaint.flatno, submittedAt: complaint.submittedAt },
        { $set: complaint },
        { upsert: true }
      );
    }
    console.log('✅ Enhanced complaints seeded');

    // Enhanced Visitor Logs
    const visitors = [
      { visitorname: 'Rajesh Singh', flatno: 'A-101', cellno: '9876543210', intime: '2024-06-14 09:30', outtime: '2024-06-14 11:00', purpose: 'Maintenance', status: 'Completed' },
      { visitorname: 'Priya Desai', flatno: 'A-102', cellno: '9876543211', intime: '2024-06-14 14:15', outtime: '2024-06-14 16:45', purpose: 'Social Visit', status: 'Completed' },
      { visitorname: 'Vikram Patel', flatno: 'B-202', cellno: '9876543212', intime: '2024-06-14 10:00', outtime: '2024-06-14 11:45', purpose: 'Business Meeting', status: 'Completed' },
      { visitorname: 'Anjali Verma', flatno: 'C-303', cellno: '9876543213', intime: '2024-06-14 15:30', outtime: '2024-06-14 17:00', purpose: 'Delivery', status: 'Completed' },
      { visitorname: 'Suresh Kumar', flatno: 'D-404', cellno: '9876543214', intime: '2024-06-13 11:00', outtime: '2024-06-13 12:30', purpose: 'Repair Work', status: 'Completed' }
    ];

    for (const visitor of visitors) {
      await visitorCollection.updateOne(
        { visitorname: visitor.visitorname, intime: visitor.intime },
        { $set: visitor },
        { upsert: true }
      );
    }
    console.log('✅ Enhanced visitors seeded');

    // Enhanced Maintenance Requests
    const maintenanceRequests = [
      { flatno: 'A-101', type: 'Plumbing', description: 'Repair leaking tap', status: 'Pending', requestedDate: '2024-06-10', priority: 'High', assignedTo: 'Amit Desai' },
      { flatno: 'A-102', type: 'Electrical', description: 'Install additional socket', status: 'In Progress', requestedDate: '2024-06-12', priority: 'Medium', assignedTo: 'Ravi Kumar' },
      { flatno: 'B-202', type: 'Carpentry', description: 'Repair door lock', status: 'Completed', requestedDate: '2024-06-08', priority: 'Low', assignedTo: 'Sonal Gupta' },
      { flatno: 'C-303', type: 'General', description: 'Lift maintenance', status: 'Pending', requestedDate: '2024-06-13', priority: 'Critical', assignedTo: 'Meera Patel' },
      { flatno: 'D-404', type: 'Painting', description: 'Wall repainting', status: 'Scheduled', requestedDate: '2024-06-11', priority: 'Low', assignedTo: 'Amit Desai' }
    ];

    for (const request of maintenanceRequests) {
      await maintenanceRequestCollection.updateOne(
        { flatno: request.flatno, requestedDate: request.requestedDate },
        { $set: request },
        { upsert: true }
      );
    }
    console.log('✅ Enhanced maintenance requests seeded');

    // Collection Corpus (Financial Data)
    const corpus = [
      { year: '2024-2025', openingBalance: '250000', closingBalance: '285000', totalIncome: '180000', totalExpense: '145000', status: 'Active' },
      { year: '2023-2024', openingBalance: '200000', closingBalance: '250000', totalIncome: '175000', totalExpense: '125000', status: 'Closed' }
    ];

    for (const corp of corpus) {
      await corpusCollection.updateOne(
        { year: corp.year },
        { $set: corp },
        { upsert: true }
      );
    }
    console.log('✅ Enhanced collection corpus seeded');

    console.log('✅✅✅ All enhanced data seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding data:', error);
    process.exit(1);
  }
}

seedEnhanced();
