const express = require('express');
const axios = require('axios');
const path = require('path');
const app = express();
const PORT = 3000;

// Replace this with your current backend IP and port
const API_URL = 'http://YOUR_PUBLIC_IP:5000';

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.post('/submit', async (req, res) => {
  const { name, email, message } = req.body;
  try {
    const response = await axios.post(`${API_URL}/submit`, { name, email, message }, {
      headers: { 'Content-Type': 'application/json' }
    });

    res.send(`
      <html>
      <body style="background:#121212; color:#00ffc3; font-family:sans-serif; display:flex; justify-content:center; align-items:center; height:100vh;">
        <div style="text-align:center;">
          <h1>✅ Feedback Submitted!</h1>
          <p>Thanks, ${name}! Your feedback has been received.</p>
          <a href="/" style="color:#00ffc3; text-decoration:underline;">Go Back</a>
        </div>
      </body>
      </html>
    `);
  } catch (error) {
    console.error('❌ Error sending feedback:', error.message);
    res.status(500).send(`
      <html>
      <body style="background:#121212; color:#ff4d4d; font-family:sans-serif; display:flex; justify-content:center; align-items:center; height:100vh;">
        <div style="text-align:center;">
          <h1>❌ Error submitting feedback</h1>
          <p>Please try again later.</p>
          <a href="/" style="color:#00ffc3; text-decoration:underline;">Go Back</a>
        </div>
      </body>
      </html>
    `);
  }
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`✅ Frontend running on http://0.0.0.0:${PORT}`);
  console.log(`✅ Backend API at ${API_URL}`);
});
