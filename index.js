const express = require('express');
const cors = require('cors');
require('dotenv').config();
 
const app = express();
 
// ---- Middleware ----
app.use(
  cors({
    origin: process.env.CLIENT_URL || '*', // ตอน deploy จริง ให้ใส่ domain ของ frontend แทน '*'
  })
);
app.use(express.json());
 
// ---- Routes ----
app.get('/api/hello', (req, res) => {
  res.json({ message: 'Hello from Express!' });
});
 
// ตัวอย่าง route เพิ่มเติม
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});
 
// ---- Run server only when NOT on Vercel (local dev) ----
if (process.env.VERCEL !== '1') {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
}
 
// ---- Export app for Vercel serverless ----
module.exports = app;