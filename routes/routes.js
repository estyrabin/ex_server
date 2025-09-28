const express = require('express');
const router = express.Router();

const DB = [{ id: 1, name: 'book 1' }];
const users = [
  { username: 'admin', password: '1234' }
];

router.get('/book', (req, res) => {
  res.json(DB);
});

module.exports = router;
