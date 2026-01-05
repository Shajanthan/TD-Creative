/**
 * Database Initialization Script
 * 
 * This script initializes the Firestore database with:
 * - Required collections structure
 * - Initial admin user
 * 
 * Usage: node scripts/initDatabase.js
 */

import db from '../config/firebase.js'
import bcrypt from 'bcryptjs'
import readline from 'readline'
import { fileURLToPath } from 'url'
import { dirname } from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

// Create readline interface for user input
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
})

// Helper function to ask questions
const question = (query) => {
  return new Promise((resolve) => {
    rl.question(query, resolve)
  })
}

// Initialize collections with sample structure
const initializeCollections = async () => {
  console.log('\n📦 Initializing Firestore collections...\n')

  const collections = [
    {
      name: 'receiptRequests',
      description: 'Receipt requests from users',
      sampleDoc: {
        fullName: 'Sample User',
        email: 'sample@example.com',
        phone: '+1234567890',
        projectService: 'Sample Project',
        amountPaid: 100.0,
        date: new Date().toISOString(),
        notes: 'Sample receipt request',
        status: 'pending',
        createdAt: new Date().toISOString(),
      },
    },
    {
      name: 'orders',
      description: 'New orders from contact form',
      sampleDoc: {
        name: 'Sample Customer',
        email: 'customer@example.com',
        phone: '+1234567890',
        message: 'Sample order message',
        inquiryType: 'New Order',
        status: 'new',
        createdAt: new Date().toISOString(),
      },
    },
    {
      name: 'inquiries',
      description: 'General inquiries from contact form',
      sampleDoc: {
        name: 'Sample Inquirer',
        email: 'inquirer@example.com',
        phone: '+1234567890',
        message: 'Sample inquiry message',
        inquiryType: 'General Inquiry',
        status: 'new',
        createdAt: new Date().toISOString(),
      },
    },
    {
      name: 'chatMessages',
      description: 'Live chat messages',
      sampleDoc: {
        sessionId: 'sample-session-id',
        message: 'Sample chat message',
        sender: 'user',
        timestamp: new Date().toISOString(),
        createdAt: new Date().toISOString(),
      },
    },
  ]

  for (const collection of collections) {
    try {
      // Check if collection exists by trying to read from it
      const snapshot = await db.collection(collection.name).limit(1).get()
      
      if (snapshot.empty) {
        // Collection is empty, add a sample document (will be deleted)
        const docRef = await db.collection(collection.name).add(collection.sampleDoc)
        console.log(`✅ Created collection: ${collection.name}`)
        console.log(`   Description: ${collection.description}`)
        console.log(`   Sample document ID: ${docRef.id} (you can delete this)\n`)
        
        // Optionally delete the sample document
        // await docRef.delete()
      } else {
        console.log(`ℹ️  Collection already exists: ${collection.name}\n`)
      }
    } catch (error) {
      console.error(`❌ Error initializing collection ${collection.name}:`, error.message)
    }
  }
}

// Initialize admin user
const initializeAdmin = async () => {
  console.log('\n👤 Setting up admin user...\n')

  try {
    // Check if admin already exists
    const adminSnapshot = await db.collection('admin').limit(1).get()

    if (!adminSnapshot.empty) {
      console.log('ℹ️  Admin user already exists.')
      const existingAdmin = adminSnapshot.docs[0].data()
      console.log(`   Username: ${existingAdmin.username}`)
      
      const update = await question('\nDo you want to update the admin password? (y/n): ')
      if (update.toLowerCase() !== 'y') {
        return
      }
    }

    // Get admin credentials
    const username = await question('Enter admin username (default: admin): ') || 'admin'
    const password = await question('Enter admin password (min 6 characters): ')

    if (!password || password.length < 6) {
      console.log('❌ Password must be at least 6 characters long')
      return
    }

    // Hash password
    const passwordHash = await bcrypt.hash(password, 10)

    // Create or update admin document
    const adminData = {
      username,
      passwordHash,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }

    if (!adminSnapshot.empty) {
      // Update existing admin
      const adminDocId = adminSnapshot.docs[0].id
      await db.collection('admin').doc(adminDocId).update(adminData)
      console.log(`\n✅ Admin user updated successfully!`)
    } else {
      // Create new admin
      await db.collection('admin').add(adminData)
      console.log(`\n✅ Admin user created successfully!`)
    }

    console.log(`   Username: ${username}`)
    console.log(`   Password: ${'*'.repeat(password.length)}`)
    console.log('\n⚠️  Please save these credentials securely!\n')
  } catch (error) {
    console.error('❌ Error setting up admin user:', error.message)
  }
}

// Main initialization function
const main = async () => {
  console.log('🚀 Firebase Database Initialization Script')
  console.log('==========================================\n')

  try {
    // Test Firebase connection
    console.log('🔌 Testing Firebase connection...')
    await db.collection('_test').limit(1).get()
    console.log('✅ Firebase connection successful!\n')

    // Initialize collections
    await initializeCollections()

    // Initialize admin
    await initializeAdmin()

    console.log('\n✨ Database initialization complete!')
    console.log('\nNext steps:')
    console.log('1. Review and update Firestore security rules in Firebase Console')
    console.log('2. Set up environment variables in .env files')
    console.log('3. Test the application endpoints')
    console.log('4. Delete sample documents if you created any\n')
  } catch (error) {
    console.error('\n❌ Initialization failed:', error.message)
    console.error('\nTroubleshooting:')
    console.error('1. Check that Firebase Admin SDK is properly configured')
    console.error('2. Verify service account JSON file exists and is valid')
    console.error('3. Ensure Firestore is enabled in Firebase Console')
    console.error('4. Check that you have proper permissions\n')
    process.exit(1)
  } finally {
    rl.close()
  }
}

// Run the script
main()


