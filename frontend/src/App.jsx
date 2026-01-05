import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Layout from "./components/Layout";
import SinglePage from "./pages/SinglePage";
import AdminLogin from "./pages/Admin/Login";
import AdminDashboard from "./pages/Admin/Dashboard";
import ReceiptRequests from "./pages/Admin/ReceiptRequests";
import Contacts from "./pages/Admin/Contacts";
import AdminChat from "./pages/Admin/Chat";
import ProtectedRoute from "./components/ProtectedRoute";
import WhatsAppButton from "./components/WhatsAppButton";
import LoadingScreen from "./components/LoadingScreen";

function App() {
  return (
    <>
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/receipt-requests"
            element={
              <ProtectedRoute>
                <ReceiptRequests />
              </ProtectedRoute>
            }
          />
          <Route
              path="/admin/contacts"
            element={
              <ProtectedRoute>
                  <Contacts />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/chat"
            element={
              <ProtectedRoute>
                <AdminChat />
              </ProtectedRoute>
            }
          />
          <Route
            path="/*"
            element={
              <>
                <Layout>
                    <SinglePage />
                </Layout>
                  <WhatsAppButton />
              </>
            }
          />
        </Routes>
      </Router>
    </AuthProvider>
    </>
  );
}

export default App;
