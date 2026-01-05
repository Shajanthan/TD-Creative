// Firebase Client Configuration
import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getAnalytics } from 'firebase/analytics'
import { getAuth } from 'firebase/auth'

// Your web app's Firebase configuration
// Use environment variables if available, otherwise fall back to hardcoded values
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || 'AIzaSyDyeW3o7PyzacDDdO27Xh6AvSkHhu5QaFY',
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || 'td-creative-9f3c5.firebaseapp.com',
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || 'td-creative-9f3c5',
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || 'td-creative-9f3c5.firebasestorage.app',
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || '838617243666',
  appId: import.meta.env.VITE_FIREBASE_APP_ID || '1:838617243666:web:ec2219c422c822b090f8cb',
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID || 'G-33M6C44BJE',
}

// Validate required config
if (!firebaseConfig.apiKey || !firebaseConfig.projectId) {
  console.error('Firebase configuration is missing required fields')
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)

// Initialize Firestore
export const db = getFirestore(app)

// Initialize Auth
export const auth = getAuth(app)

// Initialize Analytics (only in browser, not SSR)
export const analytics = typeof window !== 'undefined' ? getAnalytics(app) : null

export default app

