import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { authenticateToken } from "../middleware/auth.js";
import {
  getReceiptRequests,
  updateReceiptRequest,
  getReceiptRequest,
  deleteReceiptRequest,
  getContacts,
  updateContact,
  getContact,
  deleteContact,
  getAdminCredentials,
  getChatSessions,
  createChatMessage,
  updateChatSession,
} from "../services/firebaseService.js";
import { generateReceiptPDF } from "../services/pdfService.js";

const router = express.Router();

// POST /api/admin/login - Admin login
router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res
        .status(400)
        .json({ message: "Username and password required" });
    }

    // Get admin credentials from Firestore
    const adminCreds = await getAdminCredentials();

    if (!adminCreds) {
      // First time setup - create admin with default credentials
      // In production, you should set this up manually
      return res.status(401).json({
        message:
          'Admin not configured. Please run "npm run init-db" to set up admin credentials.',
      });
    }

    // Validate admin credentials structure
    if (!adminCreds.username) {
      return res.status(500).json({
        message:
          'Admin configuration is invalid. Missing username. Please run "npm run init-db" to fix.',
      });
    }

    if (!adminCreds.passwordHash) {
      return res.status(500).json({
        message:
          'Admin configuration is invalid. Missing password hash. Please run "npm run init-db" to fix.',
      });
    }

    // Verify credentials
    if (adminCreds.username !== username) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const isValidPassword = await bcrypt.compare(
      password,
      adminCreds.passwordHash
    );

    if (!isValidPassword) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Generate JWT token
    if (!process.env.JWT_SECRET) {
      console.error("JWT_SECRET is not set in environment variables");
      return res.status(500).json({ message: "Server configuration error" });
    }

    const token = jwt.sign(
      { username, role: "admin" },
      process.env.JWT_SECRET,
      {
        expiresIn: "24h",
      }
    );

    res.json({ token, message: "Login successful" });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Login failed" });
  }
});

// GET /api/admin/receipt-requests - Get all receipt requests
router.get("/receipt-requests", authenticateToken, async (req, res) => {
  try {
    const requests = await getReceiptRequests();
    res.json(requests);
  } catch (error) {
    console.error("Error fetching receipt requests:", error);
    res.status(500).json({ message: "Failed to fetch receipt requests" });
  }
});

// PUT /api/admin/receipt-requests/:id - Update receipt request status
router.put("/receipt-requests/:id", authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!status) {
      return res.status(400).json({ message: "Status is required" });
    }

    await updateReceiptRequest(id, { status });
    const updated = await getReceiptRequest(id);

    res.json(updated);
  } catch (error) {
    console.error("Error updating receipt request:", error);
    res.status(500).json({ message: "Failed to update receipt request" });
  }
});

// POST /api/admin/receipt-requests/:id/generate-pdf - Generate PDF
router.post(
  "/receipt-requests/:id/generate-pdf",
  authenticateToken,
  async (req, res) => {
  try {
      const { id } = req.params;
      const receiptData = await getReceiptRequest(id);

    if (!receiptData) {
        return res.status(404).json({ message: "Receipt request not found" });
    }

      const pdfBuffer = await generateReceiptPDF(receiptData);

      res.setHeader("Content-Type", "application/pdf");
      res.setHeader(
        "Content-Disposition",
        `attachment; filename=receipt-${id}.pdf`
      );
      res.send(pdfBuffer);
  } catch (error) {
      console.error("Error generating PDF:", error);
      res.status(500).json({ message: "Failed to generate PDF" });
  }
  }
);

// DELETE /api/admin/receipt-requests/:id - Delete receipt request
router.delete("/receipt-requests/:id", authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    await deleteReceiptRequest(id);
    res.json({ message: "Receipt request deleted successfully" });
  } catch (error) {
    console.error("Error deleting receipt request:", error);
    res.status(500).json({ message: "Failed to delete receipt request" });
  }
});

// GET /api/admin/contacts - Get all contact submissions
router.get("/contacts", authenticateToken, async (req, res) => {
  try {
    const contacts = await getContacts();
    res.json(contacts);
  } catch (error) {
    console.error("Error fetching contacts:", error);
    res.status(500).json({ message: "Failed to fetch contacts" });
  }
});

// PUT /api/admin/contacts/:id - Update contact status
router.put("/contacts/:id", authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!status) {
      return res.status(400).json({ message: "Status is required" });
    }

    await updateContact(id, { status });
    const updated = await getContact(id);

    res.json(updated);
  } catch (error) {
    console.error("Error updating contact:", error);
    res.status(500).json({ message: "Failed to update contact" });
  }
});

// DELETE /api/admin/contacts/:id - Delete contact
router.delete("/contacts/:id", authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    await deleteContact(id);
    res.json({ message: "Contact deleted successfully" });
  } catch (error) {
    console.error("Error deleting contact:", error);
    res.status(500).json({ message: "Failed to delete contact" });
  }
});

// GET /api/admin/chat/sessions - Get all chat sessions
router.get("/chat/sessions", authenticateToken, async (req, res) => {
  try {
    const sessions = await getChatSessions();
    res.json(sessions);
  } catch (error) {
    console.error("Error fetching chat sessions:", error);
    res.status(500).json({ message: "Failed to fetch chat sessions" });
  }
});

// POST /api/admin/chat/messages - Send admin message
router.post("/chat/messages", authenticateToken, async (req, res) => {
  try {
    const message = await createChatMessage(req.body);
    res.json(message);
  } catch (error) {
    console.error("Error sending chat message:", error);
    res.status(500).json({ message: "Failed to send message" });
  }
});

// PUT /api/admin/chat/sessions/:sessionId - Update chat session
router.put("/chat/sessions/:sessionId", authenticateToken, async (req, res) => {
  try {
    const { sessionId } = req.params;
    await updateChatSession(sessionId, req.body);
    res.json({ message: "Session updated successfully" });
  } catch (error) {
    console.error("Error updating chat session:", error);
    res.status(500).json({ message: "Failed to update session" });
  }
});

export default router;
