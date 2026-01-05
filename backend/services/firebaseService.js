import db from '../config/firebase.js'

// Receipt Requests
export const createReceiptRequest = async (data) => {
  const docRef = await db.collection('receiptRequests').add({
    ...data,
    status: 'pending',
    createdAt: new Date().toISOString(),
  })
  return { id: docRef.id, ...data }
}

export const getReceiptRequests = async () => {
  const snapshot = await db.collection('receiptRequests').orderBy('createdAt', 'desc').get()
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
}

export const updateReceiptRequest = async (id, updates) => {
  await db.collection('receiptRequests').doc(id).update(updates)
  const doc = await db.collection('receiptRequests').doc(id).get()
  return { id: doc.id, ...doc.data() }
}

export const getReceiptRequest = async (id) => {
  const doc = await db.collection('receiptRequests').doc(id).get()
  if (!doc.exists) return null
  return { id: doc.id, ...doc.data() }
}

export const deleteReceiptRequest = async (id) => {
  await db.collection('receiptRequests').doc(id).delete()
  return { id }
}

// Orders
export const createOrder = async (data) => {
  const docRef = await db.collection('orders').add({
    ...data,
    status: 'new',
    createdAt: new Date().toISOString(),
  })
  return { id: docRef.id, ...data }
}

export const getOrders = async () => {
  const snapshot = await db.collection('orders').orderBy('createdAt', 'desc').get()
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
}

export const updateOrder = async (id, updates) => {
  await db.collection('orders').doc(id).update(updates)
  const doc = await db.collection('orders').doc(id).get()
  return { id: doc.id, ...doc.data() }
}

// Inquiries
export const createInquiry = async (data) => {
  const docRef = await db.collection('inquiries').add({
    ...data,
    status: 'new',
    createdAt: new Date().toISOString(),
  })
  return { id: docRef.id, ...data }
}

export const getInquiries = async () => {
  const snapshot = await db.collection('inquiries').orderBy('createdAt', 'desc').get()
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
}

export const updateInquiry = async (id, updates) => {
  await db.collection('inquiries').doc(id).update(updates)
  const doc = await db.collection('inquiries').doc(id).get()
  return { id: doc.id, ...doc.data() }
}

// Chat
export const createChatMessage = async (data) => {
  const docRef = await db.collection('chatMessages').add({
    ...data,
    createdAt: new Date().toISOString(),
  })
  return { id: docRef.id, ...data }
}

export const getChatMessages = async (sessionId) => {
  const snapshot = await db
    .collection('chatMessages')
    .where('sessionId', '==', sessionId)
    .orderBy('createdAt', 'asc')
    .get()
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
}

export const getChatSessions = async () => {
  const snapshot = await db.collection('chatMessages').get()
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
    if (!session.lastMessage || data.createdAt > session.lastMessage) {
      session.lastMessage = data.createdAt
    }
  })

  return Array.from(sessionsMap.values()).sort(
    (a, b) => new Date(b.lastMessage) - new Date(a.lastMessage)
  )
}

export const updateChatSession = async (sessionId, updates) => {
  // Update all messages in the session
  const snapshot = await db
    .collection('chatMessages')
    .where('sessionId', '==', sessionId)
    .get()

  const batch = db.batch()
  snapshot.docs.forEach((doc) => {
    batch.update(doc.ref, updates)
  })
  await batch.commit()
}

// Contact Submissions
export const createContact = async (data) => {
  const docRef = await db.collection('contacts').add({
    ...data,
    status: 'new',
    createdAt: new Date().toISOString(),
  })
  return { id: docRef.id, ...data }
}

export const getContacts = async () => {
  const snapshot = await db.collection('contacts').orderBy('createdAt', 'desc').get()
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
}

export const updateContact = async (id, updates) => {
  await db.collection('contacts').doc(id).update(updates)
  const doc = await db.collection('contacts').doc(id).get()
  return { id: doc.id, ...doc.data() }
}

export const getContact = async (id) => {
  const doc = await db.collection('contacts').doc(id).get()
  if (!doc.exists) return null
  return { id: doc.id, ...doc.data() }
}

export const deleteContact = async (id) => {
  await db.collection('contacts').doc(id).delete()
  return { id }
}

// Admin
export const getAdminCredentials = async () => {
  const snapshot = await db.collection('admin').limit(1).get()
  if (snapshot.empty) return null
  return snapshot.docs[0].data()
}

