# Firebase Setup Guide

This guide will walk you through setting up Firebase for this project, including creating a Firestore database and configuring authentication.

## Prerequisites

- A Google account
- Node.js installed on your system
- Basic understanding of Firebase services

## Step 1: Create a Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click **"Add project"** or **"Create a project"**
3. Enter your project name (e.g., "td-creative" or "portfolio-app")
4. (Optional) Enable Google Analytics if desired
5. Click **"Create project"**
6. Wait for the project to be created, then click **"Continue"**

## Step 2: Enable Firestore Database

1. In your Firebase project dashboard, click on **"Firestore Database"** in the left sidebar
2. Click **"Create database"**
3. Choose **"Start in production mode"** (we'll set up security rules later)
4. Select a location for your database (choose the closest to your users)
5. Click **"Enable"**

### Firestore Security Rules

After creating the database, go to the **"Rules"** tab and update them:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Allow read/write access to all collections (for development)
    // IMPORTANT: Update these rules for production!
    match /{document=**} {
      allow read, write: if request.auth != null || request.auth == null;
    }
    
    // More secure rules for production:
    // match /receiptRequests/{requestId} {
    //   allow read: if request.auth != null;
    //   allow create: if true; // Anyone can create
    //   allow update: if request.auth != null; // Only authenticated users can update
    // }
    
    // match /orders/{orderId} {
    //   allow read, write: if request.auth != null;
    //   allow create: if true;
    // }
    
    // match /inquiries/{inquiryId} {
    //   allow read, write: if request.auth != null;
    //   allow create: if true;
    // }
    
    // match /chatMessages/{messageId} {
    //   allow read, write: if request.auth != null;
    //   allow create: if true;
    // }
    
    // match /admin/{adminId} {
    //   allow read, write: if request.auth != null && request.auth.token.role == 'admin';
    // }
  }
}
```

Click **"Publish"** to save the rules.

## Step 3: Get Web App Configuration

1. In Firebase Console, click the gear icon ⚙️ next to **"Project Overview"**
2. Select **"Project settings"**
3. Scroll down to **"Your apps"** section
4. Click the **Web icon** (`</>`) to add a web app
5. Register your app with a nickname (e.g., "Portfolio Web App")
6. (Optional) Check "Also set up Firebase Hosting"
7. Click **"Register app"**
8. Copy the Firebase configuration object that appears

## Step 4: Configure Frontend (Client-Side)

### Option A: Using Environment Variables (Recommended)

1. Create a `.env` file in the `frontend/` directory:

```env
VITE_FIREBASE_API_KEY=your-api-key-here
VITE_FIREBASE_AUTH_DOMAIN=your-project-id.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-project-id.firebasestorage.app
VITE_FIREBASE_MESSAGING_SENDER_ID=your-messaging-sender-id
VITE_FIREBASE_APP_ID=your-app-id
VITE_FIREBASE_MEASUREMENT_ID=your-measurement-id
```

2. Replace the values with your actual Firebase config values

### Option B: Direct Configuration

The `frontend/src/config/firebase.js` file already has fallback values. You can update them directly if you prefer.

## Step 5: Set Up Firebase Admin SDK (Backend)

### Step 5.1: Generate Service Account Key

1. In Firebase Console, go to **Project settings** (gear icon)
2. Click on the **"Service accounts"** tab
3. Click **"Generate new private key"**
4. Click **"Generate key"** in the confirmation dialog
5. A JSON file will be downloaded - this is your service account key
6. **IMPORTANT**: Keep this file secure and never commit it to version control!

### Step 5.2: Configure Backend

**Option A: Using Service Account JSON File (Current Setup)**

1. Place the downloaded JSON file in the project root directory
2. Rename it to match the filename in `backend/config/firebase.js`:
   - Current: `td-creative-9f3c5-firebase-adminsdk-fbsvc-3e794b578d.json`
   - Or update the path in `backend/config/firebase.js` to match your file name

**Option B: Using Environment Variables (More Secure)**

1. Create a `.env` file in the `backend/` directory:

```env
FIREBASE_PROJECT_ID=your-project-id
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nYour private key here\n-----END PRIVATE KEY-----\n"
FIREBASE_CLIENT_EMAIL=firebase-adminsdk-xxxxx@your-project-id.iam.gserviceaccount.com
```

2. Extract these values from your service account JSON file:
   - `FIREBASE_PROJECT_ID`: The `project_id` field
   - `FIREBASE_PRIVATE_KEY`: The `private_key` field (keep the quotes and \n characters)
   - `FIREBASE_CLIENT_EMAIL`: The `client_email` field

3. Add `.env` to your `.gitignore` file

## Step 6: Create Database Collections

The application uses the following Firestore collections:

- `receiptRequests` - Stores receipt requests from users
- `orders` - Stores new orders from contact form
- `inquiries` - Stores general inquiries
- `chatMessages` - Stores live chat messages
- `admin` - Stores admin credentials (username and hashed password)

### Option A: Automatic Creation (Recommended)

Collections will be created automatically when the first document is written. However, you can manually create them:

1. Go to Firestore Database in Firebase Console
2. Click **"Start collection"**
3. Create each collection with an initial document (you can delete it later)

### Option B: Using the Initialization Script

Run the database initialization script:

```bash
cd backend
node scripts/initDatabase.js
```

This will create the collections and set up the initial admin user.

## Step 7: Set Up Admin User

### Manual Setup

1. Go to Firestore Database in Firebase Console
2. Create a collection named `admin`
3. Add a document with ID `admin` (or any ID)
4. Add the following fields:
   - `username`: Your admin username (string)
   - `passwordHash`: A bcrypt hash of your password

To generate a password hash, you can use Node.js:

```javascript
const bcrypt = require('bcryptjs');
const hash = bcrypt.hashSync('your-password', 10);
console.log(hash);
```

Or use the initialization script (see Step 6, Option B).

## Step 8: Set Up Firestore Indexes

Some queries require composite indexes. Firebase will prompt you to create them when needed, or you can create them manually:

1. Go to Firestore Database → Indexes
2. Click **"Create Index"**
3. Create indexes for:
   - Collection: `receiptRequests`, Fields: `createdAt` (Descending)
   - Collection: `orders`, Fields: `createdAt` (Descending)
   - Collection: `inquiries`, Fields: `createdAt` (Descending)
   - Collection: `chatMessages`, Fields: `sessionId` (Ascending), `createdAt` (Ascending)

## Step 9: Test the Configuration

### Test Frontend Connection

1. Start the frontend development server:
   ```bash
   cd frontend
   npm run dev
   ```

2. Open browser console and check for Firebase initialization messages
3. Try submitting the contact form to test Firestore writes

### Test Backend Connection

1. Start the backend server:
   ```bash
   cd backend
   npm run dev
   ```

2. Check the console for "Firebase Admin initialized successfully" message
3. Test an API endpoint that uses Firebase

## Step 10: Environment Variables Summary

### Frontend (.env in `frontend/` directory)

```env
VITE_FIREBASE_API_KEY=
VITE_FIREBASE_AUTH_DOMAIN=
VITE_FIREBASE_PROJECT_ID=
VITE_FIREBASE_STORAGE_BUCKET=
VITE_FIREBASE_MESSAGING_SENDER_ID=
VITE_FIREBASE_APP_ID=
VITE_FIREBASE_MEASUREMENT_ID=
```

### Backend (.env in `backend/` directory)

```env
# Firebase Admin SDK
FIREBASE_PROJECT_ID=
FIREBASE_PRIVATE_KEY=
FIREBASE_CLIENT_EMAIL=

# JWT Secret (for admin authentication)
JWT_SECRET=your-secret-key-here

# Admin Password (for initial setup)
ADMIN_PASSWORD=your-admin-password

# Email Configuration (if using email service)
EMAIL_HOST=
EMAIL_PORT=
EMAIL_USER=
EMAIL_PASS=
```

## Troubleshooting

### Common Issues

1. **"Firebase Admin initialized from JSON file" but still getting errors**
   - Check that the service account JSON file path is correct
   - Verify the file has proper permissions

2. **"Permission denied" errors**
   - Check Firestore security rules
   - Verify service account has proper permissions in Firebase Console

3. **"Collection not found" errors**
   - Collections are created automatically on first write
   - Or create them manually in Firebase Console

4. **Frontend can't connect to Firebase**
   - Verify API key is correct
   - Check browser console for specific error messages
   - Ensure Firebase project has billing enabled (if using certain features)

### Getting Help

- [Firebase Documentation](https://firebase.google.com/docs)
- [Firestore Documentation](https://firebase.google.com/docs/firestore)
- [Firebase Admin SDK Documentation](https://firebase.google.com/docs/admin/setup)

## Security Best Practices

1. **Never commit service account keys or `.env` files to version control**
2. **Use environment variables in production**
3. **Set up proper Firestore security rules for production**
4. **Enable Firebase App Check for additional security**
5. **Regularly rotate service account keys**
6. **Use least privilege principle for service account permissions**

## Next Steps

- Set up Firebase Authentication if you need user authentication
- Configure Firebase Storage if you need file uploads
- Set up Firebase Hosting for deployment
- Configure Firebase Cloud Functions for serverless operations


