const express = require('express');
const { generateToken } = require('../utils/token');
const { isLoggedin } = require('../middlewares/middleware');
const { addToken, deleteToken } = require('../services/tokenService');

const router = express.Router();

const DB = [{ id: 1, name: 'book 1' }];
const USERS = [{ username: 'admin', password: '1234' }];

router.get('/book', isLoggedin, (req, res) => {
  res.json(DB);
});

router.post('/login', (req, res) => {
  const { username, password } = req.body || {};
  if (!username || !password) return res.status(400).json({ error: 'username and password required' });

  const user = USERS.find(u => u.username === username && u.password === password);
  if (!user) return res.status(401).json({ error: 'invalid credentials' });

  const token = generateToken();
  addToken(token);               
  res.json({ token });
});


router.post('/register', (req, res) => {
  const { username, password } = req.body || {};
  if (!username || !password) return res.status(400).json({ error: 'username and password required' });
  
  const find_user = USERS.find(u => u.username === username);
  if (find_user) return res.status(409).json({ message: 'user already exsit' });

  const user = { username: username, password: password };


  USERS.push(user)

  res.json({ USERS });
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
