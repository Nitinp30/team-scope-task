const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const { buildSchema } = require("graphql");
const jwt = require("jsonwebtoken");
const cors = require("cors");
require('dotenv').config();

// Mock Data
let employees = [
  {
    id: 1,
    name: 'John Doe',
    email: 'john.doe@company.com',
    phone: '+1 (555) 123-4567',
    position: 'Senior Developer',
    department: 'Engineering',
    salary: '$85,000',
    joinDate: '2022-03-15',
    address: '123 Main St, New York, NY 10001',
    avatar: 'JD',
    status: 'Active'
  },
  {
    id: 2,
    name: 'Jane Smith',
    email: 'jane.smith@company.com',
    phone: '+1 (555) 987-6543',
    position: 'Product Manager',
    department: 'Product',
    salary: '$95,000',
    joinDate: '2021-08-22',
    address: '456 Oak Ave, Los Angeles, CA 90210',
    avatar: 'JS',
    status: 'Active'
  },
  {
    id: 3,
    name: 'Mike Johnson',
    email: 'mike.johnson@company.com',
    phone: '+1 (555) 456-7890',
    position: 'UI/UX Designer',
    department: 'Design',
    salary: '$75,000',
    joinDate: '2023-01-10',
    address: '789 Pine St, Chicago, IL 60601',
    avatar: 'MJ',
    status: 'Active'
  },
  {
    id: 4,
    name: 'Sarah Wilson',
    email: 'sarah.wilson@company.com',
    phone: '+1 (555) 321-0987',
    position: 'Marketing Specialist',
    department: 'Marketing',
    salary: '$65,000',
    joinDate: '2022-11-05',
    address: '321 Elm St, Houston, TX 77001',
    avatar: 'SW',
    status: 'Active'
  }
];

let currentId = 2;
const PORT = process.env.PORT || 5000;

const users = [
  { id: 1, username: 'admin', password: 'admin123', role: 'admin' },
  { id: 2, username: 'john', password: 'user123', role: 'employee' }
];

const SECRET = "your_jwt_secret";

// GraphQL Schema
const schema = buildSchema(`
  type Employee {
    id: ID!
    name: String!
    email: String!
    phone: String!
    position: String!
    department: String!
    salary: String!
    joinDate: String!
    address: String!
    avatar: String!
    status: String!
  }

  type Query {
    listEmployees(department: String, status: String): [Employee]
    getEmployee(id: ID!): Employee
    paginatedEmployees(page: Int!, limit: Int!, sortBy: String): [Employee]
  }

  type Mutation {
    addEmployee(
      name: String!,
      email: String!,
      phone: String!,
      position: String!,
      department: String!,
      salary: String!,
      joinDate: String!,
      address: String!,
      avatar: String!,
      status: String!
    ): Employee

    updateEmployee(
      id: ID!,
      name: String,
      email: String,
      phone: String,
      position: String,
      department: String,
      salary: String,
      joinDate: String,
      address: String,
      avatar: String,
      status: String
    ): Employee
  }
`);


// Middleware: Auth
function authenticate() {
  return function (req, res, next) {
    const token = req.headers.authorization;
    if (!token) return res.status(401).send("No token");
    try {
      const user = jwt.verify(token.replace("Bearer ", ""), "SECRET_KEY");
      req.user = user;
      next();
    } catch (err) {
      res.status(401).send("Invalid token");
    }
  };
}

// Resolvers
const root = {
  listEmployees: ({ class: className, minAttendance }) => {
    return employees.filter((emp) => {
      return (
        (!className || emp.class === className) &&
        (!minAttendance || emp.attendance >= minAttendance)
      );
    });
  },

  getEmployee: ({ id }) => {
    return employees.find((e) => e.id == id)
  },

  paginatedEmployees: ({ page, limit, sortBy }) => {
    let sorted = [...employees];
    if (sortBy) sorted.sort((a, b) => (a[sortBy] > b[sortBy] ? 1 : -1));
    const start = (page - 1) * limit;
    return sorted.slice(start, start + limit);
  },

  addEmployee: ({ name, age, class: cls, subjects, attendance }) => {
    const newEmp = {
      id: String(currentId++),
      name,
      age,
      class: cls,
      subjects,
      attendance,
    };
    employees.push(newEmp);
    return newEmp;
  },

  updateEmployee: ({ id, ...fields }) => {
    const emp = employees.find((e) => e.id == id);
    if (!emp) throw new Error("Employee not found");
    Object.assign(emp, fields);
    return emp;
  },
};

// Express App
const app = express();
app.use(cors());
app.use(express.json());

// Secure GraphQL endpoint
app.use(
  "/graphql",
  authenticate(),
  graphqlHTTP({
    schema,
    rootValue: root,
    graphiql: true,
  })
);

// Login route (mocked)
app.post("/login", (req, res) => {
  const { username, password } = req.body;

  const user = users.find(u => u.username === username && u.password === password);

  if (!user) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }

  const token = jwt.sign(
    { id: user.id, username: user.username, role: user.role },
    "SECRET_KEY",
    { expiresIn: '1h' }
  );

  res.json({
    token,
    role: user.role,
    message: `Logged in as ${user.role}`
  });
});

// Start server
app.listen(PORT, () =>
  console.log(`GraphQL API running on http://localhost:${PORT}/graphql`)
);

/*
  Performance considerations:
  - Use pagination to limit results.
  - Use filtering to reduce data scanned.
  - For production: index fields (e.g., id, class, etc.) in the DB.
  - Use dataloaders if resolving nested fields.
*/