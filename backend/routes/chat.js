import express from 'express'
import { createChatMessage, getChatMessages } from '../services/firebaseService.js'

const router = express.Router()

// POST /api/chat/messages - Create new chat message
router.post('/messages', async (req, res) => {
  try {
    const { sessionId, message, sender } = req.body

    if (!sessionId || !message || !sender) {
      return res.status(400).json({ message: 'Missing required fields' })
    }

    const messageData = {
      sessionId,
      message,
      sender,
      timestamp: new Date().toISOString(),
    }

    const result = await createChatMessage(messageData)

    res.status(201).json(result)
  } catch (error) {
    console.error('Error creating chat message:', error)
    res.status(500).json({ message: 'Failed to send message' })
  }
})

// GET /api/chat/messages/:sessionId - Get messages for a session
router.get('/messages/:sessionId', async (req, res) => {
  try {
    const { sessionId } = req.params
    const messages = await getChatMessages(sessionId)
    res.json(messages)
  } catch (error) {
    console.error('Error fetching messages:', error)
    res.status(500).json({ message: 'Failed to fetch messages' })
  }
})

export default router

