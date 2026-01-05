# Firebase Quick Start Guide

This is a condensed guide to get Firebase up and running quickly. For detailed instructions, see [FIREBASE_SETUP.md](./FIREBASE_SETUP.md).

## 🚀 Quick Setup (5 minutes)

### 1. Create Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click **"Add project"**
3. Enter project name → **Create project**
4. Wait for creation → **Continue**

### 2. Enable Firestore

1. Click **"Firestore Database"** in sidebar
2. Click **"Create database"**
3. Select **"Start in production mode"**
4. Choose location → **Enable**

### 3. Get Configuration

1. Click gear icon ⚙️ → **Project settings**
2. Scroll to **"Your apps"** → Click Web icon `</>`
3. Register app → Copy the config object

### 4. Configure Frontend

Create `frontend/.env`:

```env
VITE_FIREBASE_API_KEY=your-api-key
VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-project.firebasestorage.app
VITE_FIREBASE_MESSAGING_SENDER_ID=your-sender-id
VITE_FIREBASE_APP_ID=your-app-id
VITE_FIREBASE_MEASUREMENT_ID=your-measurement-id
```

### 5. Configure Backend

**Option A: Service Account JSON (Easiest)**

1. In Firebase Console: **Project settings** → **Service accounts** tab
2. Click **"Generate new private key"** → **Generate key**
3. Save the downloaded JSON file in project root
4. Rename it to match the filename in `backend/config/firebase.js` OR update the path in the config file

**Option B: Environment Variables**

1. Create `backend/.env`:

```env
FIREBASE_PROJECT_ID=your-project-id
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nYour key here\n-----END PRIVATE KEY-----\n"
FIREBASE_CLIENT_EMAIL=firebase-adminsdk-xxxxx@your-project.iam.gserviceaccount.com
JWT_SECRET=your-secret-key
```

2. Extract values from the service account JSON file

### 6. Initialize Database

Run the initialization script:

```bash
cd backend
node scripts/initDatabase.js
```

This will:
- Create required collections
- Set up admin user (you'll be prompted for username/password)

### 7. Test It!

**Frontend:**
```bash
cd frontend
npm run dev
```

**Backend:**
```bash
cd backend
npm run dev
```

Check console for "Firebase Admin initialized successfully" message.

## 📋 Collections Created

The app uses these Firestore collections:
- `receiptRequests` - Receipt requests
- `orders` - New orders
- `inquiries` - General inquiries  
- `chatMessages` - Chat messages
- `admin` - Admin credentials

## 🔐 Security Rules

Update Firestore rules in Firebase Console → Firestore Database → Rules:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // For development - allow all
    match /{document=**} {
      allow read, write: if true;
    }
  }
}
```

⚠️ **Update these rules for production!**

## ❓ Troubleshooting

**"Firebase credentials not found"**
- Check service account JSON file exists and path is correct
- Or verify environment variables are set

**"Permission denied"**
- Check Firestore security rules
- Verify service account has proper permissions

**Collections not found**
- Collections are created automatically on first write
- Or run `node backend/scripts/initDatabase.js`

## 📚 Next Steps

- Read [FIREBASE_SETUP.md](./FIREBASE_SETUP.md) for detailed instructions
- Set up proper security rules for production
- Configure Firebase Authentication if needed
- Set up Firebase Storage for file uploads


