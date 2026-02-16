const express = require('express');
//const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const projectRoutes = require('./routes/projectRoutes');
const workerRoutes = require('./routes/workerRoutes');
const orderRoutes = require('./routes/orderRoutes');

dotenv.config();
const app = express();
app.use(cors({
  origin: ["http://localhost:3000", "http://localhost:5173"],
  credentials: true
}));

//app.use(bodyParser.json());
app.use(express.json());

// Handle invalid JSON payloads from clients (body-parser / express.json SyntaxError)
app.use((err, req, res, next) => {
  if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
    console.error('Invalid JSON received:', err.message);
    return res.status(400).json({ message: 'Invalid JSON payload' });
  }
  next();
});

app.use('/api/auth', authRoutes);
app.use('/api/project', projectRoutes);
app.use('/api/worker', workerRoutes);
app.use('/api/order', orderRoutes);

// Sample Protected Route
app.get('/api/protected', require('./middleware/authMiddleware'), (req, res) => {
  res.json({ message: 'You accessed protected data!' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));