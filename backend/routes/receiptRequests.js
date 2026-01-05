import express from 'express'
import { createReceiptRequest } from '../services/firebaseService.js'

const router = express.Router()

// POST /api/receipt-requests - Create new receipt request
router.post('/', async (req, res) => {
  try {
    const { fullName, phone, projectService, amountPaid, date, notes } = req.body

    // Validation
    if (!fullName || !projectService || !amountPaid || !date) {
      return res.status(400).json({ message: 'Missing required fields' })
    }

    if (!phone) {
      return res.status(400).json({ message: 'WhatsApp number is required' })
    }

    const receiptData = {
      fullName,
      phone,
      projectService,
      amountPaid: parseFloat(amountPaid),
      date,
      notes: notes || null,
    }

    const result = await createReceiptRequest(receiptData)

    res.status(201).json({
      message: 'Receipt request submitted successfully',
      id: result.id,
    })
  } catch (error) {
    console.error('Error creating receipt request:', error)
    res.status(500).json({ message: 'Failed to create receipt request' })
  }
})

export default router

