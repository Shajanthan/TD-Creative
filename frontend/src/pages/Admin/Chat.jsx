import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { FaArrowLeft, FaWhatsapp, FaCheck, FaBell } from 'react-icons/fa'
import { db } from '../../config/firebase'
import {
  collection,
  query,
  where,
  orderBy,
  onSnapshot,
  getDocs,
} from 'firebase/firestore'
import api from '../../utils/api'

const AdminChat = () => {
  const [sessions, setSessions] = useState([])
  const [selectedSession, setSelectedSession] = useState(null)
  const [messages, setMessages] = useState([])
  const [loading, setLoading] = useState(true)
  
  // Your WhatsApp number for notifications (update this with your actual number)
  // Set VITE_ADMIN_WHATSAPP in .env file or update this directly
  const adminWhatsAppNumber = import.meta.env.VITE_ADMIN_WHATSAPP || '+1234567890'

  useEffect(() => {
    fetchSessions()
    // Set up real-time listener for all chat messages to update sessions
    const messagesRef = collection(db, 'chatMessages')
    const unsubscribe = onSnapshot(messagesRef, () => {
      fetchSessions()
    })

    return () => unsubscribe()
  }, [])

  useEffect(() => {
    if (selectedSession) {
      // Set up real-time listener for selected session messages
      const messagesRef = collection(db, 'chatMessages')
      const q = query(
        messagesRef,
        where('sessionId', '==', selectedSession.sessionId),
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
          // Fallback to API
          loadMessagesFromAPI(selectedSession.sessionId)
        }
      )

      return () => unsubscribe()
    } else {
      setMessages([])
    }
  }, [selectedSession])

  const fetchSessions = async () => {
    try {
      // Fetch from Firebase
      const messagesRef = collection(db, 'chatMessages')
      const snapshot = await getDocs(messagesRef)
      const sessionsMap = new Map()

      snapshot.docs.forEach((doc) => {
        const data = doc.data()
        const sessionId = data.sessionId
        if (!sessionsMap.has(sessionId)) {
          sessionsMap.set(sessionId, {
            sessionId,
            messageCount: 0,
            lastMessage: null,
            status: 'active',
          })
        }
        const session = sessionsMap.get(sessionId)
        session.messageCount++
        const msgTime = data.createdAt?.toDate?.() || new Date(data.timestamp || 0)
        if (!session.lastMessage || msgTime > session.lastMessage) {
          session.lastMessage = msgTime
        }
      })

      const sessionsList = Array.from(sessionsMap.values()).sort(
        (a, b) => (b.lastMessage || 0) - (a.lastMessage || 0)
      )
      setSessions(sessionsList)
    } catch (err) {
      console.error('Failed to fetch sessions:', err)
      // Fallback to API
      try {
        const response = await api.get('/admin/chat/sessions')
        setSessions(response.data)
      } catch (apiError) {
        console.error('Failed to fetch sessions from API:', apiError)
      }
    } finally {
      setLoading(false)
    }
  }

  const loadMessagesFromAPI = async (sessionId) => {
    try {
      const response = await api.get(`/chat/messages/${sessionId}`)
      setMessages(response.data || [])
    } catch (err) {
      console.error('Failed to load messages:', err)
    }
  }

  const openWhatsAppNotification = (sessionId) => {
    // Get the latest user message to include in WhatsApp notification
    const userMessages = messages.filter(msg => msg.sender === 'user')
    const latestMessage = userMessages[userMessages.length - 1]
    const messageText = latestMessage 
      ? `New chat message from session ${sessionId.slice(-8)}:\n\n"${latestMessage.message}"`
      : `New chat message from session ${sessionId.slice(-8)}`
    
    // Format WhatsApp URL
    const whatsappUrl = `https://wa.me/${adminWhatsAppNumber.replace(/[^\d+]/g, '')}?text=${encodeURIComponent(messageText)}`
    window.open(whatsappUrl, '_blank')
  }

  const markResolved = async (sessionId) => {
    try {
      await api.put(`/admin/chat/sessions/${sessionId}`, { status: 'resolved' })
      fetchSessions()
      if (selectedSession?.sessionId === sessionId) {
        setSelectedSession(null)
        setMessages([])
      }
    } catch (err) {
      console.error('Failed to mark resolved:', err)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary-200 border-t-primary-600 rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <Link
            to="/admin"
            className="inline-flex items-center gap-2 text-gray-600 hover:text-primary-600 mb-4"
          >
            <FaArrowLeft /> Back to Dashboard
          </Link>
          <h1 className="text-2xl font-bold text-gray-800">Chat Notifications</h1>
          <p className="text-sm text-gray-600 mt-1">
            View messages and reply via WhatsApp
          </p>
        </div>
      </div>

      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Sessions List */}
          <div className="lg:col-span-1 bg-white rounded-lg shadow-md p-4">
            <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
              <FaBell /> New Messages
            </h2>
            <div className="space-y-2">
              {sessions.map((session) => (
                <button
                  key={session.sessionId}
                  onClick={() => setSelectedSession(session)}
                  className={`w-full text-left p-3 rounded-lg transition-colors ${
                    selectedSession?.sessionId === session.sessionId
                      ? 'bg-primary-100 border-2 border-primary-600'
                      : 'bg-gray-50 hover:bg-gray-100'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <p className="font-semibold text-gray-800">
                        Session {session.sessionId.slice(-8)}
                      </p>
                      <p className="text-sm text-gray-500">
                        {session.messageCount || 0} messages
                      </p>
                      {session.lastMessage && (
                        <p className="text-xs text-gray-400 mt-1">
                          {new Date(session.lastMessage).toLocaleString()}
                        </p>
                      )}
                    </div>
                    {session.status !== 'resolved' && (
                      <span className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
                    )}
                  </div>
                </button>
              ))}
              {sessions.length === 0 && (
                <p className="text-gray-500 text-center py-4">No active conversations</p>
              )}
            </div>
          </div>

          {/* Chat Window */}
          <div className="lg:col-span-2 bg-white rounded-lg shadow-md flex flex-col h-[600px]">
            {selectedSession ? (
              <>
                <div className="bg-primary-600 text-white p-4 rounded-t-lg flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold">
                      Session {selectedSession.sessionId.slice(-8)}
                    </h3>
                    <p className="text-sm text-primary-100">
                      {selectedSession.messageCount || 0} messages
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => openWhatsAppNotification(selectedSession.sessionId)}
                      className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center gap-2"
                    >
                      <FaWhatsapp /> Reply via WhatsApp
                    </button>
                    {selectedSession.status !== 'resolved' && (
                      <button
                        onClick={() => markResolved(selectedSession.sessionId)}
                        className="px-4 py-2 bg-white text-primary-600 rounded-lg hover:bg-primary-50 flex items-center gap-2"
                      >
                        <FaCheck /> Mark Done
                      </button>
                    )}
                  </div>
                </div>

                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                  {messages.map((msg, index) => (
                    <div
                      key={index}
                      className={`flex ${msg.sender === 'admin' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-[80%] rounded-lg p-3 ${
                          msg.sender === 'admin'
                            ? 'bg-primary-600 text-white'
                            : 'bg-gray-100 text-gray-800'
                        }`}
                      >
                        <p className="text-sm">{msg.message}</p>
                        <p
                          className={`text-xs mt-1 ${
                            msg.sender === 'admin' ? 'text-primary-100' : 'text-gray-500'
                          }`}
                        >
                          {new Date(msg.timestamp).toLocaleString()}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="p-4 border-t bg-gray-50">
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <p className="text-sm text-blue-800 mb-2">
                      <strong>💡 Reply via WhatsApp:</strong>
                    </p>
                    <p className="text-xs text-blue-600 mb-3">
                      Click "Reply via WhatsApp" button above to open WhatsApp and send your response.
                    </p>
                    <button
                      onClick={() => openWhatsAppNotification(selectedSession.sessionId)}
                      className="w-full px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center justify-center gap-2"
                    >
                      <FaWhatsapp /> Open WhatsApp to Reply
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <div className="flex-1 flex items-center justify-center text-gray-500">
                <p>Select a conversation to start chatting</p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}

export default AdminChat

