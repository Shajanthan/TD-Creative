import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FaReceipt, FaEnvelope } from 'react-icons/fa'
import api from '../../utils/api'
import AdminNavbar from '../../components/AdminNavbar'

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    pendingReceiptRequests: 0,
    contacts: 0,
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchStats()
  }, [])

  const fetchStats = async () => {
    try {
      const [receipts, contacts] = await Promise.all([
        api.get('/admin/receipt-requests'),
        api.get('/admin/contacts'),
      ])

      setStats({
        pendingReceiptRequests: receipts.data.filter((r) => r.status !== 'completed').length,
        contacts: contacts.data.filter((c) => c.status === 'new').length,
      })
    } catch (err) {
      console.error('Failed to fetch stats:', err)
    } finally {
      setLoading(false)
    }
  }

  const statCards = [
    {
      title: 'Pending Receipt Requests',
      count: stats.pendingReceiptRequests,
      icon: <FaReceipt />,
      link: '/admin/receipt-requests',
      color: 'bg-blue-500',
    },
    {
      title: 'New Contacts',
      count: stats.contacts,
      icon: <FaEnvelope />,
      link: '/admin/contacts',
      color: 'bg-purple-500',
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminNavbar />
      <main className="container mx-auto px-4 py-8">
        {loading ? (
          <div className="text-center py-12">
            <div className="w-16 h-16 border-4 border-primary-200 border-t-primary-600 rounded-full animate-spin mx-auto mb-4" />
            <p className="text-gray-600">Loading...</p>
          </div>
        ) : (
          <>
            <h2 className="text-3xl font-bold text-gray-800 mb-8">Overview</h2>
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              {statCards.map((stat, index) => (
                <Link key={index} to={stat.link}>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow cursor-pointer"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div className={`${stat.color} text-white p-3 rounded-lg`}>
                        {stat.icon}
                      </div>
                      <span className="text-3xl font-bold text-gray-800">{stat.count}</span>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-700">{stat.title}</h3>
                  </motion.div>
                </Link>
              ))}
            </div>
          </>
        )}
      </main>
    </div>
  )
}

export default AdminDashboard

