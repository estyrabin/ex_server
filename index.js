const express = require('express');
const router = require('./routes/routes.js');
const cors = require('cors');

const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());
app.use('/api', router);

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
