Lily Closet Bot Dashboard
A comprehensive management dashboard for the Lily Closet Bot, designed to manage products, monitor consultations, and handle user data efficiently.

Tech Stack
Backend
Node.js & Express: API development and server management.

MongoDB (Atlas): Cloud-based database for storing product details and consultation logs.

Fly.io: Production deployment for the backend server.

Frontend (Dashboard)
React.js: Building a dynamic and responsive user interface.

Vite: Efficient build tool for fast development.

Vercel: Production deployment for the dashboard.

Features
Product Management: Create, update, and delete product listings.

Consultation System: Manage and review user consultation inquiries.

Authentication: Secured login system to protect dashboard access.

API Integration: Real-time communication between the dashboard and the backend server.

Project Structure: 
/src
  /components     # UI components (Tables, Forms, Lists)
  /pages          # Dashboard pages (Login, Products, Consultations)
  /services       # API service integration
  /hooks          # Custom hooks for state management

Setup and Installation
1-Clone the repository: git clone https://github.com/Mohamedt693/lily-bot-dashboard.git
2-Install dependencies: npm install
3-Configure Environment Variables: VITE_API_URL=https://lily-bot-backend.fly.dev
4-Run the application: npm run dev

This project serves as an administrative tool for managing and coordinating store data for the Lily Closet Bot.