const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const { randomBytes } = require('crypto');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());

const events = [];

app.post('/events', (req, res) => {
  const event = req.body;
  events.push(event);
  axios
    .post('http://localhost:4000/events', event)
    .catch((e) => console.log(e));
  axios
    .post('http://localhost:4001/events', event)
    .catch((e) => console.log(e));
  axios
    .post('http://localhost:4002/events', event)
    .catch((e) => console.log(e));
  axios
    .post('http://localhost:4003/events', event)
    .catch((e) => console.log(e));

  res.send({ status: 'OK' });
});

app.get('/events', async (req, res) => {
  try {
    res.send(events);
  } catch (e) {
    console.log(e);
  }
});

app.listen(4005, () => {
  console.log('App runs at 4005');
});
