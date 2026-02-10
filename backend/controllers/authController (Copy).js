const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const { createUser, findUserByEmail } = require('../models/userModel');

dotenv.config();

const register = (req, res) => {
  const { name, email, password } = req.body;
  findUserByEmail(email, (err, results) => {
    if (results.length) return res.status(400).json({ message: 'User already exists' });

    const hashedPassword = bcrypt.hashSync(password, 8);
    createUser({ name, email, password: hashedPassword }, (err, result) => {
      if (err) return res.status(500).json(err);
      res.json({ message: 'User registered successfully' });
    });
  });
};

const login = (req, res) => {
  const { email, password } = req.body;
  findUserByEmail(email, (err, results) => {
    if (results.length === 0) return res.status(400).json({ message: 'Invalid email or password' });

    const user = results[0];
    const valid = bcrypt.compareSync(password, user.password);
    if (!valid) return res.status(400).json({ message: 'Invalid email or password' });

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
  });
};

module.exports = { register, login };