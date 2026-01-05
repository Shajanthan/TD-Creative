# Graphic Designer Portfolio Website

A modern, minimal portfolio website for a freelance graphic designer with admin dashboard, receipt management, and live chat functionality.

## Features

- **Portfolio Pages**: Home, About, Projects (with carousel), Skills, Contact
- **Receipt Request System**: Clients can request PDF receipts
- **Admin Dashboard**: Manage receipts, orders, inquiries, and chat
- **Live Chat Widget**: Real-time messaging between clients and admin
- **Responsive Design**: Mobile-first approach with smooth animations

## Technology Stack

### Frontend
- React 18 with Vite
- React Router v6
- Tailwind CSS
- Framer Motion (animations)
- Swiper.js (project carousel)
- React Icons

### Backend
- Node.js + Express
- Firebase Firestore (database)
- Firebase Admin SDK
- JWT (authentication)
- Nodemailer (email service)
- PDFKit (PDF generation)

## Setup Instructions

### Prerequisites
- Node.js (v18 or higher)
- Firebase project with Firestore enabled
- SMTP email account (Gmail, etc.)

### Backend Setup

1. Navigate to backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file (copy from `.env.example`):
```bash
cp .env.example .env
```

4. Configure environment variables in `.env`:
   - Firebase credentials (from Firebase Console > Project Settings > Service Accounts)
   - JWT secret (generate a random string)
   - SMTP credentials (for email sending)
   - Admin username and password

5. Set up Firebase:
   - **Quick Start**: See [FIREBASE_QUICK_START.md](./FIREBASE_QUICK_START.md) for a 5-minute setup
   - **Detailed Guide**: See [FIREBASE_SETUP.md](./FIREBASE_SETUP.md) for comprehensive instructions
   - Create a Firebase project
   - Enable Firestore Database
   - Create a service account and download the JSON key
   - Add the credentials to `.env`

6. Initialize database and admin user:
   ```bash
   npm run init-db
   ```
   This will create all required collections and set up your admin user interactively.
   
   Alternatively, manually create the `admin` collection in Firestore with:
   - `username`: your admin username
   - `passwordHash`: bcrypt hash of your password

7. Start the server:
```bash
npm start
# or for development with auto-reload
npm run dev
```



## Project Structure

```
portfolio-website/
├── frontend/
│   ├── src/
│   │   ├── components/      # Reusable components
│   │   ├── pages/           # Page components
│   │   ├── context/         # React context
│   │   ├── utils/           # Helper functions
│   │   └── App.jsx
│   └── package.json
├── backend/
│   ├── routes/              # API routes
│   ├── controllers/         # Business logic
│   ├── services/            # Services (email, PDF, Firebase)
│   ├── middleware/         # Auth middleware
│   ├── config/             # Configuration files
│   └── server.js
└── README.md
```

## API Endpoints

### Public Endpoints
- `POST /api/receipt-requests` - Submit receipt request
- `POST /api/contact` - Submit contact form
- `POST /api/chat/messages` - Send chat message
- `GET /api/chat/messages/:sessionId` - Get chat messages

### Admin Endpoints (Requires JWT)
- `POST /api/admin/login` - Admin login
- `GET /api/admin/receipt-requests` - Get all receipt requests
- `PUT /api/admin/receipt-requests/:id` - Update receipt status
- `POST /api/admin/receipt-requests/:id/generate-pdf` - Generate PDF
- `POST /api/admin/receipt-requests/:id/send-email` - Send receipt email
- `GET /api/admin/orders` - Get all orders
- `PUT /api/admin/orders/:id` - Update order status
- `GET /api/admin/inquiries` - Get all inquiries
- `PUT /api/admin/inquiries/:id` - Update inquiry status
- `GET /api/admin/chat/sessions` - Get chat sessions
- `POST /api/admin/chat/messages` - Send admin message

## Deployment

### Frontend (Vercel/Netlify)
1. Build the project: `npm run build`
2. Deploy the `dist` folder
3. Set environment variable `VITE_API_URL` to your backend URL

### Backend (Render/Railway)
1. Connect your repository
2. Set all environment variables
3. Deploy

### Firebase
- Firestore is cloud-based, no additional deployment needed
- Ensure Firestore rules allow your backend service account to read/write

## Environment Variables

See `.env.example` files in both frontend and backend directories for required variables.

## License

MIT

