const express = require('express');
const app = express();
const path = require('path');
const fs = require('fs');

require('dotenv').config();

const calendarApiPort = process.env.CALENDAR_API_PORT;
const contactsApiPort = process.env.CONTACTS_API_PORT;
const domain = process.env.AUTH0_DOMAIN;
const port = process.env.SPA_PORT;

app.get('/', function (req, res) {
  let indexPath = path.join(__dirname + '/index.html');
  replaceWithConfig(indexPath, (err, index) => {
    if (err) { return res.send(404); }

    res.send(index);
  });
  
});

app.listen(port, function () {
  console.log('SPA being served on port: ' + port);
});

const replaceWithConfig = (filePath, cb) => {
  let file = fs.readFile(filePath, (err, data) => {

    data = data.toString();

    if (err) { return cb(err) }

    ['CALENDAR_API_PORT', 'CONTACTS_API_PORT', 'AUTH0_DOMAIN'].forEach((configParam) => {
      let placeholder = '${' + configParam + '}'
      data = data.replace(placeholder, process.env[configParam]);
    });

    return cb(null, data);

  })
}