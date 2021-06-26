const express = require('express');
const bodyParser = require('body-parser');
const { randomBytes } = require('crypto');
const cors = require('cors');
const { default: axios } = require('axios');

const app = express();
app.use(bodyParser.json());
app.use(cors());
const posts = {};

app.get('/posts', (req, res) => {
  res.send(posts);
});

app.post('/posts', async (req, res) => {
  const id = randomBytes(4).toString('hex');
  const { title } = req.body;
  posts[id] = { title, id };
  await axios.post('http://localhost:4005/events', {
    type: 'PostCreated',
    data: { title, id },
  });
  res.status(201).send(posts);
});

app.post('/events', async (req, res) => {
  console.log('Event Received', req.body.type);
  res.send({});
});

app.listen(4000, () => {
  console.log(`App runs at port 4000`);
});
