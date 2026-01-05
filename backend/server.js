import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import receiptRoutes from './routes/receiptRequests.js'
import adminRoutes from './routes/admin.js'
import contactRoutes from './routes/contact.js'
import chatRoutes from './routes/chat.js'

dotenv.config()

// Suppress punycode deprecation warning from nodemailer dependencies
// This is a known issue in nodemailer and doesn't affect functionality
const originalEmitWarning = process.emitWarning
process.emitWarning = function (warning, ...args) {
  if (
    typeof warning === 'string' &&
    warning.includes('punycode') &&
    warning.includes('deprecated')
  ) {
    // Suppress punycode deprecation warnings
    return
  }
  // Pass through other warnings
  return originalEmitWarning.call(this, warning, ...args)
}

const app = express()
const PORT = process.env.PORT || 5000

// Middleware
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Routes
app.use('/api/receipt-requests', receiptRoutes)
app.use('/api/admin', adminRoutes)
app.use('/api/contact', contactRoutes)
app.use('/api/chat', chatRoutes)

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Server is running' })
})

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})

