# Team Scope

This project contains both frontend and backend code for the Team Scope application.

---

## 📁 Folder Structure

team-scope/
├── team-scope-frontend/ # React frontend
├── team-scope-backend/ # Node.js/Express backend


---

## 🚀 Getting Started

### 1. Clone the repository

```bash
cd team-scope
🔧 Backend Setup (team-scope-backend)
Prerequisites
Node.js >= 18

cd team-scope-backend
npm install
Create a .env file in the root of team-scope-backend:


Start the backend server:
npm run dev
By default, the backend runs on:
📍 http://localhost:5000

💻 Frontend Setup (team-scope-frontend)
Prerequisites
Node.js >= 18

cd team-scope-frontend
npm install

Start the frontend server:

npm start
By default, the frontend runs on:
http://localhost:3000

Testing the App
Go to http://localhost:3000 in your browser.

Login using credentials defined in team-scope-backend
| Username | Password | Role     |
| -------- | -------- | -------- |
| admin    | admin123 | Admin    |
| john     | user123  | Employee |

Explore the dashboard and features!

📦 Technologies Used
React (Frontend)

Tailwind CSS

Node.js / Express (Backend)

GraphQL

⚠️ Special Note
Due to time constraints, we were unable to integrate a database in this version of the application. As a result, the backend currently uses mock data stored in memory, which limits the functionality of features like adding and deleting records.

We truly appreciate your understanding, and if granted an additional day, we would be happy to implement a full database solution. This will enable persistent data storage and allow dynamic operations such as adding, and deleting employees to function as expected.

We are fully committed to delivering a complete and scalable solution and would love the opportunity to enhance this further.