const express = require('express');
const request = require('request');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();

// Middleware needed to use bodyParser
app.use(bodyParser.urlencoded({extended: true}));

// Declare static folder
app.use(express.static(path.join(__dirname, 'public')));

// Signup Route
app.post('/signup', (req, res) => {
  console.log(req.body)
  res.send('hello');
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Sever started on ${PORT}`));
