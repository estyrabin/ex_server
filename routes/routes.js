const express = require('express');
const bcrypt = require('bcrypt');
const { generateToken } = require('../utils/token');
const { isLoggedin } = require('../middlewares/middleware');
const { addToken, deleteToken } = require('../services/tokenService');

const router = express.Router();

const DB = [{ id: 1, name: 'book 1' }];
const USERS = [{ username: 'admin', password: bcrypt.hashSync('1234', 10) }];
const SALT_ROUNDS = 10;

router.get('/book', isLoggedin, (req, res) => {
  res.json(DB);
});

router.post('/login', async (req, res) => {
  const { username, password } = req.body || {};
  if (!username || !password) return res.status(400).json({ message: 'username and password required' });

  const user = USERS.find(u => u.username === username);
  if (!user) return res.status(401).json({ message: 'invalid credentials' });

  const ok = await bcrypt.compare(password, user.password);
  if (!ok) return res.status(401).json({ message: 'invalid credentials' });

  const token = generateToken();
  addToken(token);
  res.json({ token });
});

router.post('/register', async (req, res) => {
  const { username, password } = req.body || {};
  if (!username || !password) return res.status(400).json({ message: 'username and password required' });

  const exists = USERS.find(u => u.username === username);
  if (exists) return res.status(409).json({ message: 'user already exists' });

  const hashed = await bcrypt.hash(password, SALT_ROUNDS);
  USERS.push({ username, password: hashed });

  res.json({message: 'user registered successfully' });
});

router.post('/logout', (req, res) => {
  const auth = req.headers.authorization || '';
  const headerToken = auth.startsWith('Bearer ') ? auth.slice(7) : null;
  const token = req.body?.token || headerToken;

  if (!token) return res.status(400).json({ message: 'Token required' });

  const removed = deleteToken(token);
  if (removed) return res.status(200).json({ message: 'Logged out successfully', success: true });
  return res.status(404).json({ message: 'Token not found' });
});

module.exports = router;
