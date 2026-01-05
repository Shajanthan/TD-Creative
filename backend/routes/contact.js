import express from 'express'
import { createContact } from '../services/firebaseService.js'

const router = express.Router()

// POST /api/contact - Handle contact form submission
router.post('/', async (req, res) => {
  try {
    const { name, phone, message, inquiryType } = req.body

    // Log received data for debugging
    console.log('Received contact form data:', { name, phone, message, inquiryType })

    // Validation - check for empty strings and trim whitespace
    const trimmedName = name?.trim()
    const trimmedPhone = phone?.trim()
    const trimmedMessage = message?.trim()
    const trimmedInquiryType = inquiryType?.trim()

    // Check which fields are missing
    const missingFields = []
    if (!trimmedName) missingFields.push('name')
    if (!trimmedPhone) missingFields.push('phone')
    if (!trimmedMessage) missingFields.push('message')
    if (!trimmedInquiryType) missingFields.push('inquiryType')

    if (missingFields.length > 0) {
      return res.status(400).json({ 
        message: `Missing required fields: ${missingFields.join(', ')}` 
      })
    }

    const contactData = {
      name: trimmedName,
      phone: trimmedPhone,
      message: trimmedMessage,
      inquiryType: trimmedInquiryType,
    }

    await createContact(contactData)

    res.status(201).json({
      message: 'Your message has been received. We will get back to you via WhatsApp soon!',
    })
  } catch (error) {
    console.error('Error processing contact form:', error)
    res.status(500).json({ message: 'Failed to process your request' })
  }
})

export default router

