const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const authRoutes = require('./routes/authRoutes');
const projectRoutes = require('./routes/projectRoutes');
const workerRoutes = require('./routes/workerRoutes');

dotenv.config();
const app = express();

app.use(bodyParser.json());
app.use('/api/auth', authRoutes);
app.use('/api/project', projectRoutes);
app.use('/api/worker', workerRoutes);

// Sample Protected Route
app.get('/api/protected', require('./middleware/authMiddleware'), (req, res) => {
  res.json({ message: 'You accessed protected data!' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));