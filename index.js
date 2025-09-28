const express = require('express')
const userRouter = require('./routes/routes.js');

const app = express()
const port = 3000

app.use(express.json());
app.use('/api', userRouter);

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})