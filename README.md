🚀 QuickGPT – AI Chat & Image Generation Platform

QuickGPT is a full-stack AI-powered web application that delivers ChatGPT-style conversational responses and AI image generation using OpenAI APIs. The platform includes secure authentication, a credit-based usage system, Stripe payments, and a modern, responsive user interface.

📌 Features

🤖 AI Chat Interface – Real-time conversational AI similar to ChatGPT

🎨 AI Image Generation – Generate images using AI with prompt inputs

🔐 User Authentication – Secure login and registration system

💳 Credit-Based System – Users consume credits for chat & image generation

💰 Stripe Payment Integration – Buy credits securely

🖼 Public Image Gallery – View and explore generated images

📱 Responsive UI – Optimized for desktop and mobile devices

🔒 Secure REST APIs – Robust backend with proper authorization

🛠 Tech Stack
Frontend

React.js

HTML5, CSS3, JavaScript

Responsive UI Design

Backend

Node.js

Express.js

RESTful APIs

Database

MongoDB

AI & Payments

OpenAI API

Stripe Payment Gateway

ImageKit (for image storage & optimization)

🏗 Project Architecture
QuickGPT/
│
├── frontend/        # React UI
│   ├── components/
│   ├── pages/
│   ├── services/
│   └── App.js
│
├── backend/         # Node.js + Express
│   ├── controllers/
│   ├── routes/
│   ├── models/
│   ├── middleware/
│   └── server.js
│
├── .env
├── package.json
└── README.md

⚙️ Installation & Setup
Prerequisites

Node.js (v16+ recommended)

MongoDB

OpenAI API Key

Stripe Account

ImageKit Account

1️⃣ Clone the Repository
git clone https://github.com/Rishant03/quickgpt.git
cd quickgpt

2️⃣ Backend Setup
cd backend
npm install


Create a .env file:

PORT=5000
MONGO_URI=your_mongodb_uri
OPENAI_API_KEY=your_openai_key
STRIPE_SECRET_KEY=your_stripe_secret
IMAGEKIT_PUBLIC_KEY=your_imagekit_public_key
IMAGEKIT_PRIVATE_KEY=your_imagekit_private_key
IMAGEKIT_URL_ENDPOINT=your_imagekit_url
JWT_SECRET=your_jwt_secret


Run backend:

npm start

3️⃣ Frontend Setup
cd frontend
npm install
npm start

🔐 Authentication & Credits Flow

User signs up / logs in

User purchases credits via Stripe

Credits are deducted for:

AI chat responses

Image generation requests

Usage is tracked securely in the database


🚀 Future Enhancements

Conversation history & export

Prompt templates

Subscription-based pricing

Admin dashboard

Multi-language support

🤝 Contributing

Contributions are welcome!

Fork the repository

Create a new branch

Commit your changes

Submit a pull request

📄 License

This project is licensed under the MIT License.

👨‍💻 Author

Rishant Raj
Software Developer | Full Stack | AI Enthusiast
