import transporter from '../config/nodemailer.js'

export const sendReceiptEmail = async (to, receiptData) => {
  const mailOptions = {
    from: process.env.FROM_EMAIL,
    to,
    subject: 'Your Receipt - Graphic Designer Portfolio',
    html: `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: #0ea5e9; color: white; padding: 20px; text-align: center; }
            .content { padding: 20px; background: #f9fafb; }
            .receipt-details { background: white; padding: 20px; margin: 20px 0; border-radius: 8px; }
            .detail-row { display: flex; justify-content: space-between; padding: 10px 0; border-bottom: 1px solid #e5e7eb; }
            .footer { text-align: center; padding: 20px; color: #6b7280; font-size: 12px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>Receipt</h1>
            </div>
            <div class="content">
              <p>Dear ${receiptData.fullName},</p>
              <p>Thank you for your payment. Please find your receipt details below:</p>
              <div class="receipt-details">
                <div class="detail-row">
                  <strong>Service:</strong>
                  <span>${receiptData.projectService}</span>
                </div>
                <div class="detail-row">
                  <strong>Amount Paid:</strong>
                  <span>$${parseFloat(receiptData.amountPaid).toFixed(2)}</span>
                </div>
                <div class="detail-row">
                  <strong>Date:</strong>
                  <span>${new Date(receiptData.date).toLocaleDateString()}</span>
                </div>
                ${receiptData.notes ? `
                <div class="detail-row">
                  <strong>Notes:</strong>
                  <span>${receiptData.notes}</span>
                </div>
                ` : ''}
              </div>
              <p>If you have any questions, please don't hesitate to contact us.</p>
              <p>Best regards,<br>Graphic Designer Portfolio</p>
            </div>
            <div class="footer">
              <p>This is an automated email. Please do not reply.</p>
            </div>
          </div>
        </body>
      </html>
    `,
  }

  try {
    await transporter.sendMail(mailOptions)
    return { success: true }
  } catch (error) {
    console.error('Email send error:', error)
    return { success: false, error: error.message }
  }
}

export const sendOrderConfirmation = async (to, orderData) => {
  const mailOptions = {
    from: process.env.FROM_EMAIL,
    to,
    subject: 'Order Received - Graphic Designer Portfolio',
    html: `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: #0ea5e9; color: white; padding: 20px; text-align: center; }
            .content { padding: 20px; background: #f9fafb; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>Order Received</h1>
            </div>
            <div class="content">
              <p>Dear ${orderData.name},</p>
              <p>Thank you for your order! We have received your request and will get back to you shortly.</p>
              <p><strong>Order Type:</strong> ${orderData.inquiryType}</p>
              <p>We'll review your request and contact you soon.</p>
              <p>Best regards,<br>Graphic Designer Portfolio</p>
            </div>
          </div>
        </body>
      </html>
    `,
  }

  try {
    await transporter.sendMail(mailOptions)
    return { success: true }
  } catch (error) {
    console.error('Email send error:', error)
    return { success: false, error: error.message }
  }
}

export const sendInquiryReply = async (to, inquiryData, replyMessage) => {
  const mailOptions = {
    from: process.env.FROM_EMAIL,
    to,
    subject: 'Re: Your Inquiry - Graphic Designer Portfolio',
    html: `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: #0ea5e9; color: white; padding: 20px; text-align: center; }
            .content { padding: 20px; background: #f9fafb; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>Response to Your Inquiry</h1>
            </div>
            <div class="content">
              <p>Dear ${inquiryData.name},</p>
              <p>${replyMessage}</p>
              <p>Best regards,<br>Graphic Designer Portfolio</p>
            </div>
          </div>
        </body>
      </html>
    `,
  }

  try {
    await transporter.sendMail(mailOptions)
    return { success: true }
  } catch (error) {
    console.error('Email send error:', error)
    return { success: false, error: error.message }
  }
}

