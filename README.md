# 🏥 Healthcare Backend

A **Node.js + Express + MongoDB** backend for a healthcare application.  
Supports user authentication (JWT), patient & doctor management, and patient-doctor mapping.

---

## 🚀 Features
- User registration & login with JWT authentication
- Manage **patients** (CRUD)
- Manage **doctors** (CRUD)
- Map **patients to doctors**
- Secure routes (only authenticated users can create/manage)
- MongoDB Atlas support (via Mongoose)

---

## 🛠 Tech Stack
- **Node.js** + **Express.js**
- **MongoDB Atlas** + **Mongoose**
- **JWT Authentication**
- **dotenv** for environment variables

---

## ⚙️ Setup (Local Development)

 1. Clone the repository
git clone https://github.com/Harshksingh1/Healthcare-Backend.git

cd Healthcare-Backend


3. Install dependencies
npm install
4. Setup environment variables
Create a .env file in the root folder (based on .env.example):

PORT=4000
MONGODB_URI=mongodb+srv://<user>:<password>@cluster0.abcd.mongodb.net/healthcare
JWT_SECRET=yourSecretKey
JWT_EXPIRES_IN=7d

4. Run the server
npm run dev
Server will start at:

http://localhost:4000

🔑 API Endpoints
Auth
POST /api/auth/register → Register new user

POST /api/auth/login → Login and get JWT

Patients
POST /api/patients → Create patient (auth required)

GET /api/patients → Get all patients for user

GET /api/patients/:id → Get single patient

PUT /api/patients/:id → Update patient

DELETE /api/patients/:id → Delete patient

Doctors
POST /api/doctors → Create doctor (auth required)

GET /api/doctors → Get all doctors

GET /api/doctors/:id → Get single doctor

PUT /api/doctors/:id → Update doctor

DELETE /api/doctors/:id → Delete doctor

Mappings
POST /api/mappings → Assign doctor to patient

GET /api/mappings → Get all mappings

GET /api/mappings/:patientId → Get doctors for a patient

DELETE /api/mappings/:id → Remove mapping

