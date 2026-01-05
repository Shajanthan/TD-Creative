import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FaComments, FaTimes, FaPaperPlane } from 'react-icons/fa'
import { db } from '../config/firebase'
import {
  collection,
  query,
  where,
  orderBy,
  onSnapshot,
  addDoc,
  serverTimestamp,
} from 'firebase/firestore'
import api from '../utils/api'

const LiveChat = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState([])
  const [newMessage, setNewMessage] = useState('')
  const [loading, setLoading] = useState(false)
  const [sessionId, setSessionId] = useState(null)
  const messagesEndRef = useRef(null)

  useEffect(() => {
    // Generate or retrieve session ID
    let id = localStorage.getItem('chatSessionId')
    if (!id) {
      id = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
      localStorage.setItem('chatSessionId', id)
    }
    setSessionId(id)

    // Set up real-time listener for messages
    const messagesRef = collection(db, 'chatMessages')
    const q = query(
      messagesRef,
      where('sessionId', '==', id),
      orderBy('createdAt', 'asc')
    )

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const messagesData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
          timestamp: doc.data().createdAt?.toDate?.()?.toISOString() || doc.data().timestamp,
        }))
        setMessages(messagesData)
      },
      (error) => {
        console.error('Error listening to messages:', error)
        // Fallback to API if Firebase fails
        loadMessagesFromAPI(id)
      }
    )

    return () => unsubscribe()
  }, [])

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  const loadMessagesFromAPI = async (sessionId) => {
    try {
      const response = await api.get(`/chat/messages/${sessionId}`)
      setMessages(response.data || [])
    } catch (err) {
      console.error('Failed to load messages:', err)
    }
  }

  const sendMessage = async (e) => {
    e.preventDefault()
    if (!newMessage.trim() || !sessionId) return

    const messageText = newMessage.trim()
    setNewMessage('')
    setLoading(true)

    try {
      // Send to Firebase Firestore for real-time updates
      await addDoc(collection(db, 'chatMessages'), {
        sessionId,
        message: messageText,
        sender: 'user',
        createdAt: serverTimestamp(),
        timestamp: new Date().toISOString(),
      })

      // Also send to backend API for backup/processing
      try {
        await api.post('/chat/messages', {
          sessionId,
          message: messageText,
          sender: 'user',
          timestamp: new Date().toISOString(),
        })
      } catch (apiError) {
        console.error('Failed to send to API (using Firebase only):', apiError)
      }
    } catch (err) {
      console.error('Failed to send message:', err)
      // Fallback to API only
      try {
        await api.post('/chat/messages', {
          sessionId,
          message: messageText,
          sender: 'user',
          timestamp: new Date().toISOString(),
        })
        // Reload messages from API
        loadMessagesFromAPI(sessionId)
      } catch (apiError) {
        console.error('Failed to send message via API:', apiError)
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      {/* Chat Button */}
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 w-14 h-14 bg-primary-600 text-white rounded-full shadow-lg flex items-center justify-center z-40 hover:bg-primary-700 transition-colors"
      >
        {isOpen ? <FaTimes /> : <FaComments />}
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="fixed bottom-24 right-6 w-96 h-[500px] bg-white rounded-lg shadow-2xl z-40 flex flex-col"
          >
            {/* Header */}
            <div className="bg-primary-600 text-white p-4 rounded-t-lg flex items-center justify-between">
              <div>
                <h3 className="font-semibold">Live Chat</h3>
                <p className="text-sm text-primary-100">We'll respond as soon as possible</p>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-white hover:text-gray-200"
              >
                <FaTimes />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.length === 0 ? (
                <div className="text-center text-gray-500 py-8">
                  <p>Start a conversation!</p>
                  <p className="text-sm mt-2">Send us a message and we'll get back to you.</p>
                </div>
              ) : (
                messages.map((msg, index) => (
                  <div
                    key={index}
                    className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[80%] rounded-lg p-3 ${
                        msg.sender === 'user'
                          ? 'bg-primary-600 text-white'
                          : 'bg-gray-100 text-gray-800'
                      }`}
                    >
                      <p className="text-sm">{msg.message}</p>
                      <p
                        className={`text-xs mt-1 ${
                          msg.sender === 'user' ? 'text-primary-100' : 'text-gray-500'
                        }`}
                      >
                        {new Date(msg.timestamp).toLocaleTimeString()}
                      </p>
                    </div>
                  </div>
                ))
              )}
              {loading && (
                <div className="flex justify-start">
                  <div className="bg-gray-100 rounded-lg p-3">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                      <div
                        className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                        style={{ animationDelay: '0.1s' }}
                      />
                      <div
                        className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                        style={{ animationDelay: '0.2s' }}
                      />
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <form onSubmit={sendMessage} className="p-4 border-t">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder="Type your message..."
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  disabled={loading}
                />
                <button
                  type="submit"
                  disabled={loading || !newMessage.trim()}
                  className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <FaPaperPlane />
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default LiveChat

