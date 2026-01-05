import admin from 'firebase-admin'
import { readFileSync, existsSync } from 'fs'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'
import dotenv from 'dotenv'

// Load environment variables from .env file
dotenv.config()

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

if (!admin.apps.length) {
  try {
    let credential
    let initializationMethod = ''

    // Method 1: Try to use service account JSON file
    // Look for common service account file names
    const possibleServiceAccountPaths = [
      join(__dirname, '../../td-creative-9f3c5-firebase-adminsdk-fbsvc-3e794b578d.json'),
      join(__dirname, '../../firebase-service-account.json'),
      join(__dirname, '../../service-account-key.json'),
      process.env.FIREBASE_SERVICE_ACCOUNT_PATH 
        ? join(__dirname, '../../', process.env.FIREBASE_SERVICE_ACCOUNT_PATH)
        : null,
    ].filter(Boolean)

    let serviceAccountFound = false
    for (const serviceAccountPath of possibleServiceAccountPaths) {
      if (existsSync(serviceAccountPath)) {
        try {
      const serviceAccount = JSON.parse(readFileSync(serviceAccountPath, 'utf8'))
      credential = admin.credential.cert(serviceAccount)
          initializationMethod = `JSON file (${serviceAccountPath})`
          serviceAccountFound = true
          break
    } catch (jsonError) {
          console.warn(`Failed to read service account file at ${serviceAccountPath}:`, jsonError.message)
        }
      }
    }

    // Method 2: Fall back to environment variables
    if (!serviceAccountFound) {
      if (process.env.FIREBASE_PROJECT_ID && process.env.FIREBASE_PRIVATE_KEY && process.env.FIREBASE_CLIENT_EMAIL) {
        credential = admin.credential.cert({
          projectId: process.env.FIREBASE_PROJECT_ID,
          privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
          clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
        })
        initializationMethod = 'environment variables'
      } else {
        throw new Error(
          'Firebase credentials not found.\n' +
          'Please either:\n' +
          '1. Place a service account JSON file in the project root, or\n' +
          '2. Set FIREBASE_PROJECT_ID, FIREBASE_PRIVATE_KEY, and FIREBASE_CLIENT_EMAIL environment variables.\n' +
          'See FIREBASE_SETUP.md for detailed instructions.'
        )
      }
    }

    admin.initializeApp({
      credential: credential,
      projectId: process.env.FIREBASE_PROJECT_ID || credential.projectId,
    })
    
    console.log(`✅ Firebase Admin initialized successfully from ${initializationMethod}`)
  } catch (error) {
    console.error('❌ Firebase initialization error:', error.message)
    console.error('\nPlease check:')
    console.error('1. Service account JSON file exists and is valid')
    console.error('2. Environment variables are set correctly')
    console.error('3. Firestore is enabled in Firebase Console')
    console.error('\nSee FIREBASE_SETUP.md for setup instructions.\n')
    throw error
  }
}

const db = admin.firestore()

// Set Firestore settings
db.settings({
  ignoreUndefinedProperties: true,
})

export default db

