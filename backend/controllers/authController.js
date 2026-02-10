const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const { validationResult } = require('express-validator');
const { createUser, findByMobile, findUserByEmail } = require('../models/userModel');

dotenv.config();

/*const register = (req, res) => {
  const { name, email, password } = req.body;
  findUserByEmail(email, (err, results) => {
    if (results.length) return res.status(400).json({ message: 'User already exists' });

    const hashedPassword = bcrypt.hashSync(password, 8);
    createUser({ name, email, password: hashedPassword }, (err, result) => {
      if (err) return res.status(500).json(err);
      res.json({ message: 'User registered successfully' });
    });
  });
};*/

const register = async (req, res) => {
  try {
    // ✅ 1. Validate request fields
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, mobile, password, role, parent_id } = req.body;
    if (!name || !email || !mobile || !password || !role) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const validateEmail = (email) => /\S+@\S+\.\S+/.test(email);
    const validateMobile = (mobile) => /^\d{10}$/.test(mobile);

    if (!validateEmail(email)) {
      return res.status(400).json({ message: 'Invalid email format' });
    }
    if (!validateMobile(mobile)) {
      return res.status(400).json({ message: 'Invalid mobile number' });
    }

    // ✅ 2. Check if email already exists
    const existingUser = await findUserByEmail(email);
    if (existingUser) {
      return res.status(400).json({ message: "Email already registered." });
    }

    // ✅ 3. Check if mobile already exists
    const existingMobile = await findByMobile(mobile);
    if (existingMobile) {
      return res.status(400).json({ message: "Mobile number already registered." });
    }

    // ✅ 4. Save user
    await createUser({ name, email, mobile, password, role, parent_id });

    res.status(201).json({ message: "User registered successfully!" });
  } catch (err) {
    console.error("Register Error:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const results = await findUserByEmail(email); 
      if (results.length === 0) return res.status(400).json({ message: 'Invalid email or password' });
      const user = results;
      const valid = bcrypt.compareSync(password, user.password);
      if (!valid) return res.status(400).json({ message: 'Invalid email or password' });
      const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
      const userData = { id: user.id, name: user.name, email: user.email, role: user.role };
      res.json({ token, userData });
  } catch (err) {
    console.error("Login Error:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

module.exports = { register, login };