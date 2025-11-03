# CRM Backend – Node.js REST API  
**Developed by Divyaanshu Agrawal**

A lightweight backend system for managing client enquiries in a CRM workflow.  
Built using **Node.js**, **Express**, **MongoDB**, and **JWT**.

---

## Overview
Employees (counselors) can register, log in, and claim client enquiries.  
Unclaimed enquiries are visible to all; once claimed, they become private to that counselor.

---

## Features
- Employee registration & login (JWT auth)  
- Public enquiry submission form  
- View all unclaimed enquiries  
- Claim an enquiry (assign to employee)  
- View enquiries claimed by logged-in employee  

---

## Tech Stack
- **Backend:** Node.js + Express.js  
- **Database:** MongoDB (Mongoose ORM)  
- **Auth:** JWT + bcryptjs  
- **Env Config:** dotenv  

---

## Setup
```bash
git clone <repo-url>
cd crm-backend
npm install
```

### Create .env file
```bash
PORT=5000
MONGO_URI=<your_mongodb_uri>
JWT_SECRET=<your_secret_key>
```

### Run Server
npm run dev

## Example Request
```bash
POST /api/enquiry
Content-Type: application/json
{
  "name": "Rohit Sharma",
  "email": "rohit@example.com",
  "courseInterest": "Full Stack Web Development",
  "message": "This is test request"
}
```

# Developed and Submitted by:
Divyaanshu Agrawal
divyaanshuagrawal2711@gmail.com




