# Machine Test for MERN Stack Developer

## Overview
This project is a **MERN Stack-based Machine Test** that includes user authentication, agent management, and CSV file upload with task distribution. The frontend is built using **Vite** and communicates with a Node.js backend.

## Technologies Used
- **Frontend:** React (Vite)
- **Backend:** Node.js, Express
- **Database:** MongoDB
- **Authentication:** JSON Web Token (JWT)

## **Features**

### **1. User Authentication**
- Secure login system using JWT.
- Role-based authentication for admin.
- Session management with automatic token refresh.

### **2. Agent Management**
- Add agent with his info like name, email, mobile number with country code.
- Display a list of registered agents.

### **3. CSV File Processing & Task Distribution**
- Upload CSV/XLSX files with data validation.
- Automatic task distribution among agents.

### **4. Dashboard & UI Enhancements**
- Interactive dashboard displaying agent statistics.
- Responsive and user-friendly UI.

### **5. Data Persistence & Security**
- Store agent and task data securely in MongoDB.
- Input validation and sanitization to prevent SQL injection and XSS.
- Secure API endpoints with authentication middleware.

## Project setup
### Frontend setup
```
cd frontend
npm install

```
### Backend setup
```
cd backend
npm install
```
## **Environment Variables**

### **Frontend (`.env` file)**
```env
VITE_API_BASE_URL = <your_backend_url>
```
### **Backend (`.env` file)**
```
MONGO_URI = <your_mongodb_drive_url>
JWT_SECRET = <your_secret_token>
```

## Project Start
### Frontend
```
npm run dev
```
### Backend
```
npm run start
```
### User email and password
```
email : admin@example.com
password : admin123
```
## **Conclusion**  

This project successfully implements a **MERN Stack-based system** with key functionalities such as user authentication, agent management, and automated CSV task distribution. By utilizing **React (Vite) for the frontend, Node.js with Express for the backend, and MongoDB for data storage**, the system ensures **scalability, security, and efficiency**.  

With features like **role-based authentication, real-time task assignment, and an interactive dashboard**, this project demonstrates practical applications in **team management and workload distribution**. 

This machine test serves as a strong foundation for **scalable enterprise applications**, showcasing best practices in **secure authentication, API management, and dynamic data handling** within the MERN stack. 🚀