import PDFDocument from 'pdfkit'

export const generateReceiptPDF = (receiptData) => {
  return new Promise((resolve, reject) => {
    try {
      const doc = new PDFDocument({ margin: 50 })
      const chunks = []

      doc.on('data', (chunk) => chunks.push(chunk))
      doc.on('end', () => resolve(Buffer.concat(chunks)))
      doc.on('error', reject)

      // Header
      doc.fontSize(24).text('RECEIPT', { align: 'center' })
      doc.moveDown()

      // Receipt Number
      const receiptNumber = `REC-${receiptData.id.slice(0, 8).toUpperCase()}`
      doc.fontSize(12).text(`Receipt Number: ${receiptNumber}`, { align: 'center' })
      doc.moveDown(2)

      // Date
      doc.fontSize(10).text(`Date: ${new Date(receiptData.date).toLocaleDateString()}`, {
        align: 'left',
      })
      doc.moveDown()

      // Client Information
      doc.fontSize(14).text('Client Information:', { underline: true })
      doc.moveDown(0.5)
      doc.fontSize(12).text(`Name: ${receiptData.fullName}`)
      if (receiptData.email) {
        doc.text(`Email: ${receiptData.email}`)
      }
      if (receiptData.phone) {
        doc.text(`Phone: ${receiptData.phone}`)
      }
      doc.moveDown()

      // Service Details
      doc.fontSize(14).text('Service Details:', { underline: true })
      doc.moveDown(0.5)
      doc.fontSize(12).text(`Service: ${receiptData.projectService}`)
      doc.moveDown()

      // Amount
      doc.fontSize(16).text(`Amount Paid: $${parseFloat(receiptData.amountPaid).toFixed(2)}`, {
        align: 'right',
      })
      doc.moveDown()

      // Notes
      if (receiptData.notes) {
        doc.moveDown()
        doc.fontSize(12).text('Notes:', { underline: true })
        doc.moveDown(0.5)
        doc.fontSize(10).text(receiptData.notes)
      }

      // Footer
      doc.moveDown(3)
      doc.fontSize(10)
        .text('Thank you for your business!', { align: 'center' })
        .text('Graphic Designer Portfolio', { align: 'center' })

      doc.end()
    } catch (error) {
      reject(error)
    }
  })
}

