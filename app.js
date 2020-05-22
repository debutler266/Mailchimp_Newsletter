const express = require('express');
const request = require('request');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();

// Middleware needed to use bodyParser
app.use(bodyParser.urlencoded({ extended: true}));

// Declare static folder
app.use(express.static(path.join(__dirname, 'public')));

// Signup Route
app.post('/signup', (req, res) => {
  const { firstName, lastName, email } = req.body;

  // checks to make sure ALL fields are filled, if not will redirect to failed page
  if (!firstName || !lastName || !email) {
    res.redirect('/fail.html');
    return;
  }

  // Data we send with request
  const data = {
    members: [
      {
        email_address: email,
        status: 'subscribed',
        merge_fields: {
          FNAME: firstName,
          LNAME: lastName
        }
      }
    ]
  };

  // turn objects (above) into strings, this data Cant be sent as objects
  const postData = JSON.stringify(data);

  const options = {
    url: 'https://us18.api.mailchimp.com/3.0/lists/7587143c25',
    method: 'POST',
    headers: {
      Authorization: 'auth b8d5572b461a7507d65fae2975d4cd26-us18'
    },
    body: postData
  };

  // Callback arrow function
  request(options, (err, response, body) => {
    if (err) {
      res.redirect('/fail.html');
    } else {
      if(response.statusCode === 200) {
        res.redirect('/success.html');
      } else {
        res.redirect('/fail.html');
      }
    }
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Sever started on ${PORT}`));
