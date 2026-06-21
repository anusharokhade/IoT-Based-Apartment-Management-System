const client = require("./dbconnect");

const dbName = 'apartmentdatabase';
const db = client.db(dbName);

async function seed() {
  try {
    await client.connect();

    const ownerCollection = db.collection('ownerandmaintainence');
    const employeeCollection = db.collection('employee');
    const apartmentCollection = db.collection('Apartment');
    const expenseCollection = db.collection('Expenses');
    const noticeCollection = db.collection('notices');
    const messageCollection = db.collection('messages');
    const counterCollection = db.collection('counters');
    const complaintCollection = db.collection('complaints');
    const visitorCollection = db.collection('visitors');
    const maintenanceRequestCollection = db.collection('maintenance_requests');
    const corpusCollection = db.collection('collectioncorpus');

    const owners = [
      {
        oid: 1,
        ofname: 'Admin',
        olname: 'User',
        ogender: 'M',
        ocellno: '9876543210',
        oemail: 'admin@example.com',
        Login: 'admin1',
        Password: 'admin123',
        Adesignation: 'Admin',
        famcount: '3',
        flatno: 'A-001',
        floorno: '1',
        wing: 'A',
        maintainence: [
          {
            paymentdescription: 'Annual maintenance charge',
            year: '2024-2025',
            paymentdate: '2024-04-10',
            amount: '12000',
            estatus: 'Paid',
            modeofpayment: 'UPI'
          }
        ],
        Messages: [
          { postedtext: 'Welcome to the apartment management system.' }
        ]
      },
      {
        oid: 2,
        ofname: 'Priya',
        olname: 'Sharma',
        ogender: 'F',
        ocellno: '9123456780',
        oemail: 'priya.sharma@example.com',
        Login: 'chairman1',
        Password: 'chairman123',
        Adesignation: 'Chairman',
        famcount: '4',
        flatno: 'A-101',
        floorno: '1',
        wing: 'A',
        maintainence: [
          {
            paymentdescription: 'Building security fee',
            year: '2024-2025',
            paymentdate: '2024-05-15',
            amount: '8000',
            estatus: 'Paid',
            modeofpayment: 'Cash'
          }
        ],
        Messages: [
          { postedtext: 'Please attend the AGM on 15th May.' }
        ]
      },
      {
        oid: 3,
        ofname: 'Rahul',
        olname: 'Patel',
        ogender: 'M',
        ocellno: '9988776655',
        oemail: 'rahul.patel@example.com',
        Login: 'secretary1',
        Password: 'secretary123',
        Adesignation: 'Secretary',
        famcount: '2',
        flatno: 'B-202',
        floorno: '2',
        wing: 'B',
        maintainence: [
          {
            paymentdescription: 'Garden maintenance',
            year: '2024-2025',
            paymentdate: '2024-06-01',
            amount: '6000',
            estatus: 'Pending',
            modeofpayment: 'Bank Transfer'
          }
        ],
        Messages: [
          { postedtext: 'Lift maintenance scheduled for tomorrow.' }
        ]
      },
      {
        oid: 4,
        ofname: 'Sunita',
        olname: 'Kumar',
        ogender: 'F',
        ocellno: '9012345678',
        oemail: 'sunita.kumar@example.com',
        Login: 'security1',
        Password: 'security123',
        Adesignation: 'Security',
        famcount: '1',
        flatno: 'C-303',
        floorno: '3',
        wing: 'C',
        maintainence: [
          {
            paymentdescription: 'Gate security upgrade',
            year: '2024-2025',
            paymentdate: '2024-07-10',
            amount: '5500',
            estatus: 'Paid',
            modeofpayment: 'Credit Card'
          }
        ],
        Messages: [
          { postedtext: 'Visitor entry protocol has been updated.' }
        ]
      },
      {
        oid: 5,
        ofname: 'Rohit',
        olname: 'Verma',
        ogender: 'M',
        ocellno: '9898989898',
        oemail: 'rohit.verma@example.com',
        Login: '101',
        Password: 'owner123',
        Adesignation: 'Owner',
        famcount: '4',
        flatno: '101',
        floorno: '1',
        wing: 'A',
        maintainence: [
          {
            paymentdescription: 'Quarterly maintenance',
            year: '2024-2025',
            paymentdate: '2024-04-01',
            amount: '3000',
            estatus: 'Paid',
            modeofpayment: 'UPI'
          },
          {
            paymentdescription: 'Pool maintenance share',
            year: '2024-2025',
            paymentdate: '2024-09-15',
            amount: '500',
            estatus: 'Pending',
            modeofpayment: 'Cash'
          }
        ],
        Messages: [
          { postedtext: 'Your annual property tax notice has been shared.' }
        ]
      },
      {
        oid: 6,
        ofname: 'Neha',
        olname: 'Singh',
        ogender: 'F',
        ocellno: '9765432109',
        oemail: 'neha.singh@example.com',
        Login: '102',
        Password: 'owner456',
        Adesignation: 'Owner',
        famcount: '3',
        flatno: '102',
        floorno: '1',
        wing: 'A',
        maintainence: [
          {
            paymentdescription: 'Common area lighting',
            year: '2024-2025',
            paymentdate: '2024-05-05',
            amount: '2200',
            estatus: 'Paid',
            modeofpayment: 'Debit Card'
          }
        ],
        Messages: [
          { postedtext: 'Your visitor parking passes are ready for collection.' }
        ]
      }
    ];

    for (const user of owners) {
      const filter = user.Login ? { Login: user.Login } : { flatno: user.flatno };
      await ownerCollection.updateOne(filter, { $setOnInsert: user }, { upsert: true });
    }

    const employees = [
      {
        empid: 'E001',
        empname: 'Amit Desai',
        empgender: 'M',
        empcellno: '9123456701',
        empaadhaarno: '123456789012',
        empaddress: 'Flat B-101, KLE, Pune',
        empsalarydet: [
          { year: '2024-2025', month: 'April', salary: '22000', bonus: '2000' },
          { year: '2024-2025', month: 'May', salary: '22000', bonus: '1800' }
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
          { year: '2024-2025', month: 'April', salary: '24000', bonus: '1500' },
          { year: '2024-2025', month: 'May', salary: '24000', bonus: '1500' }
        ]
      }
    ];

    for (const emp of employees) {
      await employeeCollection.updateOne({ empid: emp.empid }, { $setOnInsert: emp }, { upsert: true });
    }

    const apartments = [
      {
        Apartmentname: 'KLE',
        address: '12 Green Valley Road, Pune',
        totalFloors: 5,
        totalWings: 3,
        totalUnits: 72,
        builtYear: 2022
      }
    ];

    for (const apt of apartments) {
      await apartmentCollection.updateOne({ Apartmentname: apt.Apartmentname }, { $setOnInsert: apt }, { upsert: true });
    }

    const expenses = [
      {
        personOrAgencyName: 'Electrical Contractor',
        description: 'Common area wiring repair',
        amount: '8500',
        year: '2024-2025',
        date: '2024-05-20'
      },
      {
        personOrAgencyName: 'Cleaning Service',
        description: 'Weekly cleaning service',
        amount: '4500',
        year: '2024-2025',
        date: '2024-05-12'
      },
      {
        personOrAgencyName: 'Security Agency',
        description: 'Monthly security contract',
        amount: '12000',
        year: '2024-2025',
        date: '2024-05-01'
      }
    ];

    for (const expense of expenses) {
      await expenseCollection.updateOne(
        { personOrAgencyName: expense.personOrAgencyName, description: expense.description, date: expense.date },
        { $setOnInsert: expense },
        { upsert: true }
      );
    }

    const notices = [
      {
        title: 'Monthly HOA Meeting',
        description: 'All residents are requested to attend the monthly HOA meeting in the community hall on 20th June at 5 PM.',
        date: '2024-06-20',
        postedBy: 'Chairman'
      },
      {
        title: 'Swimming Pool Cleaning',
        description: 'The pool will be closed for cleaning on 25th June from 9 AM to 1 PM.',
        date: '2024-06-24',
        postedBy: 'Secretary'
      }
    ];

    for (const notice of notices) {
      await noticeCollection.updateOne({ title: notice.title, date: notice.date }, { $setOnInsert: notice }, { upsert: true });
    }

    const messages = [
      { message: 'Reminder: Parking rules will be strictly enforced from July 1st.', postedBy: 'Admin', date: '2024-06-10' },
      { message: 'New maintenance staff has joined the team.', postedBy: 'Chairman', date: '2024-06-08' }
    ];

    for (const message of messages) {
      await messageCollection.updateOne({ message: message.message, date: message.date }, { $setOnInsert: message }, { upsert: true });
    }

    await counterCollection.updateOne({}, {
      $set: {
        financialyear: '2024-2025',
        oidcounter: 10,
        annualmaintainence: '12000'
      }
    }, { upsert: true });

    const complaints = [
      {
        category: 'Noise',
        description: 'Loud music from apartment B-202 after 10 PM.',
        isAnonymous: false,
        submittedBy: 'Rohit Verma',
        date: '2024-06-04',
        status: 'Open'
      },
      {
        category: 'Plumbing',
        description: 'Water leakage in the hallway near flat A-103.',
        isAnonymous: true,
        submittedBy: 'Anonymous',
        date: '2024-06-05',
        status: 'In Progress'
      }
    ];

    for (const complaint of complaints) {
      await complaintCollection.updateOne({ description: complaint.description, date: complaint.date }, { $setOnInsert: complaint }, { upsert: true });
    }

    const visitors = [
      {
        vname: 'Anjali Mehta',
        vcellno: '9870123456',
        flatno: '101',
        vdate: '2024-06-05',
        vpurpose: 'Delivery',
        intime: '10:30',
        outtime: '10:45'
      },
      {
        vname: 'Vikram Joshi',
        vcellno: '9123409876',
        flatno: '102',
        vdate: '2024-06-06',
        vpurpose: 'Maintenance',
        intime: '14:00',
        outtime: '15:15'
      }
    ];

    for (const visitor of visitors) {
      await visitorCollection.updateOne({ vname: visitor.vname, vdate: visitor.vdate }, { $setOnInsert: visitor }, { upsert: true });
    }

    const maintenanceRequests = [
      {
        requestId: 'MR001',
        flatno: '101',
        issue: 'Water pipe leakage in kitchen',
        status: 'Open',
        requestedOn: '2024-06-06',
        assignedTo: 'Amit Desai'
      },
      {
        requestId: 'MR002',
        flatno: '102',
        issue: 'AC service required',
        status: 'In Progress',
        requestedOn: '2024-06-07',
        assignedTo: 'Sonal Gupta'
      }
    ];

    for (const request of maintenanceRequests) {
      await maintenanceRequestCollection.updateOne({ requestId: request.requestId }, { $setOnInsert: request }, { upsert: true });
    }

    await corpusCollection.updateOne({}, { $set: { expenses: 25000, balance: 175000 } }, { upsert: true });

    console.log('✅ Dummy data seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding dummy data:', error);
    process.exit(1);
  }
}

seed();
