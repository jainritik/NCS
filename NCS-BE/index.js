const express = require('express');
const app = express();
const router = require('./route/routes');
const bodyParser = require('body-parser');
const cors = require('cors');

app.use(express.json());
app.use(bodyParser.json());
app.use(cors()); // Enable CORS for all routes

app.use(router);

app.listen(3003, () => {
  console.log('App listening on port 3003!');
});
