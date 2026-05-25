"use server";

import { getDb, saveDb } from "./db-store";

// Format currency helper
const formatIDR = (num: number) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0
  }).format(num);
};

/**
 * WhatsApp Gateway - Simulates outbound Twilio / Fonnte WhatsApp API requests
 */
export async function sendWhatsAppNotification(phone: string, text: string): Promise<boolean> {
  const cleanPhone = phone.replace(/[^0-9+]/g, "");
  console.log(`\n--- [OUTBOUND WHATSAPP NOTIFICATION] ---`);
  console.log(`TO: ${cleanPhone}`);
  console.log(`MESSAGE:\n${text}`);
  console.log(`-----------------------------------------\n`);

  // Write notification audit log
  try {
    const db = await getDb();
    const newLog = {
      id: `aud-wa-${Date.now()}`,
      adminUser: "System Notification",
      action: "Outbound WhatsApp",
      module: "Notification Gateway",
      description: `WhatsApp notification successfully triggered to ${cleanPhone}: "${text.substring(0, 60)}..."`,
      ipAddress: "127.0.0.1",
      createdDate: new Date().toISOString().replace('T', ' ').substring(0, 19)
    };
    db.auditLogs.unshift(newLog);
    await saveDb(db);
  } catch (err) {
    console.error("Failed to write WA audit log:", err);
  }

  return true;
}

/**
 * Email Gateway - Simulates premium HTML template deliveries via Resend / Nodemailer
 */
export async function sendEmailNotification(to: string, subject: string, htmlContent: string): Promise<boolean> {
  console.log(`\n--- [OUTBOUND EMAIL GATEWAY] ---`);
  console.log(`TO: ${to}`);
  console.log(`SUBJECT: ${subject}`);
  console.log(`HTML BODY LAYOUT:\n[Aesthetic Email Template Content: ${htmlContent.length} chars]`);
  console.log(`---------------------------------\n`);

  // Write notification audit log
  try {
    const db = await getDb();
    const newLog = {
      id: `aud-email-${Date.now()}`,
      adminUser: "System Notification",
      action: "Outbound Email",
      module: "Notification Gateway",
      description: `Email delivered to <${to}> with subject: "${subject}"`,
      ipAddress: "127.0.0.1",
      createdDate: new Date().toISOString().replace('T', ' ').substring(0, 19)
    };
    db.auditLogs.unshift(newLog);
    await saveDb(db);
  } catch (err) {
    console.error("Failed to write Email audit log:", err);
  }

  return true;
}

// ================================================
// TRIGGER INTEGRATION UTILITIES FOR USER INTERACTIONS
// ================================================

/**
 * Triggers automated WhatsApp and Email notifications on new Quote request submissions
 */
export async function triggerQuoteSubmittedNotifications(quote: any): Promise<void> {
  const estimatedPriceSim = 1250000; // Simulated price calculation

  // 1. Send WhatsApp Update (Standard Indonesian style)
  const waText = `*[BYLIAN LOGISTIC]*\n\n` +
                 `Halo Ibu/Bapak *${quote.name}*,\n\n` +
                 `Terima kasih telah mengajukan penawaran harga di Bylian Logistic.\n\n` +
                 `*Detail Permintaan Penawaran:*\n` +
                 `• *ID Penawaran:* ${quote.id}\n` +
                 `• *Jenis Layanan:* ${quote.serviceType}\n` +
                 `• *Jenis Kargo:* ${quote.freightType}\n` +
                 `• *Rute:* ${quote.pickupAddress} ➔ ${quote.destinationAddress}\n` +
                 `• *Berat:* ${quote.weight}\n` +
                 `• *Estimasi Awal:* ${formatIDR(estimatedPriceSim)}\n\n` +
                 `Dokumen penawaran Anda sedang ditinjau oleh staf kami. Kami akan segera menghubungi Anda kembali via email atau telepon untuk finalisasi kontrak.\n\n` +
                 `Lacak pengiriman Anda kapan saja di: https://bylianlogistics.com/track-shipment\n\n` +
                 `*Bylian Logistic - Transport Services*`;
  
  await sendWhatsAppNotification(quote.phone, waText);

  // 2. Send Premium HTML Confirmation Email
  const emailHtml = `
    <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e2e8f0; border-radius: 12px;">
      <h2 style="color: #0f172a; font-size: 24px; border-bottom: 2px solid #f97316; padding-bottom: 10px;">Bylian Logistic - Quote Request Received</h2>
      <p>Dear <strong>${quote.name}</strong>,</p>
      <p>We have successfully received your request for a shipping price estimation. Here is a summary of your requested logistics package:</p>
      
      <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
        <tr style="background: #f8fafc;">
          <th style="padding: 10px; border: 1px solid #e2e8f0; text-align: left;">Quote ID</th>
          <td style="padding: 10px; border: 1px solid #e2e8f0;"><strong>${quote.id}</strong></td>
        </tr>
        <tr>
          <th style="padding: 10px; border: 1px solid #e2e8f0; text-align: left;">Service Type</th>
          <td style="padding: 10px; border: 1px solid #e2e8f0;">${quote.serviceType}</td>
        </tr>
        <tr style="background: #f8fafc;">
          <th style="padding: 10px; border: 1px solid #e2e8f0; text-align: left;">Route</th>
          <td style="padding: 10px; border: 1px solid #e2e8f0;">${quote.pickupAddress} to ${quote.destinationAddress}</td>
        </tr>
        <tr>
          <th style="padding: 10px; border: 1px solid #e2e8f0; text-align: left;">Cargo Details</th>
          <td style="padding: 10px; border: 1px solid #e2e8f0;">${quote.freightType} (${quote.weight})</td>
        </tr>
      </table>

      <p>Our dispatch operators are working on mapping the most cost-effective and secure transit route for your shipment. You will receive an official invoice receipt within 24 hours.</p>
      <hr style="border: 0; border-top: 1px solid #e2e8f0; margin: 20px 0;" />
      <p style="font-size: 12px; color: #64748b; text-align: center;">This is an automated system email from Bylian Logistic Support. Please do not reply directly to this message.</p>
    </div>
  `;
  
  await sendEmailNotification(quote.email, `[Bylian Logistic] We have received your Quote Request #${quote.id}`, emailHtml);
}

/**
 * Triggers notifications when a shipment's active tracking status is updated by operators
 */
export async function triggerShipmentUpdatedNotifications(shipmentId: string, status: string, location: string, detail?: string): Promise<void> {
  // 1. Simulating phone fetch for shipment
  const mockPhone = "+6281298765432";
  const mockEmail = "customer@retailpartner.co.id";

  const waText = `*[BYLIAN LOGISTIC - LOGISTICS TRACKING UPDATE]*\n\n` +
                 `Shipment Anda dengan ID *${shipmentId}* memiliki pembaruan status baru!\n\n` +
                 `• *Status Terkini:* _${detail || status}_\n` +
                 `• *Lokasi Terakhir:* *${location}*\n` +
                 `• *Waktu Update:* ${new Date().toLocaleDateString("id-ID")} ${new Date().toLocaleTimeString("id-ID", {hour: '2-digit', minute:'2-digit'})} WIB\n\n` +
                 `Lacak detail pengiriman Anda di peta live kami secara real-time:\n` +
                 `https://bylianlogistics.com/track-shipment?tracking=${shipmentId}\n\n` +
                 `Terima kasih telah mempercayai layanan Bylian Logistic.`;

  await sendWhatsAppNotification(mockPhone, waText);

  const emailHtml = `
    <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e2e8f0; border-radius: 12px;">
      <h2 style="color: #0f172a; font-size: 24px; border-bottom: 2px solid #3b82f6; padding-bottom: 10px;">Bylian Tracking Status Update</h2>
      <p>Dear Valued Customer,</p>
      <p>Your active shipment with ID <strong>${shipmentId}</strong> has been updated at a transit checkpoint:</p>
      
      <div style="background: #eff6ff; padding: 15px; border-radius: 8px; border-left: 4px solid #3b82f6; margin: 20px 0;">
        <p style="margin: 0 0 8px 0;"><strong>Status Update:</strong> ${detail || status}</p>
        <p style="margin: 0 0 8px 0;"><strong>Current Location:</strong> ${location}</p>
        <p style="margin: 0;"><strong>Timestamp:</strong> ${new Date().toLocaleString()}</p>
      </div>

      <p>You can check the live tracking trajectory route map on our tracking portal.</p>
      <a href="https://bylianlogistics.com/track-shipment?tracking=${shipmentId}" style="display: inline-block; background: #3b82f6; color: white; padding: 12px 24px; border-radius: 8px; text-decoration: none; font-weight: bold; margin-top: 10px;">Track Live on Map</a>
    </div>
  `;

  await sendEmailNotification(mockEmail, `[Bylian Tracking] Status Update for Shipment #${shipmentId} - ${status}`, emailHtml);
}
