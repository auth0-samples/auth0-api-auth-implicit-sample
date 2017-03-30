const express = require('express');
const app = express();
const jwt = require('express-jwt');
const jwksRsa = require('jwks-rsa');
const cors = require('cors');

require('dotenv').config();

const port = process.env.CONTACTS_API_PORT;
const domain = process.env.AUTH0_DOMAIN;

app.use(cors());

// Validate the access token and enable the use of the jwtCheck middleware
app.use(jwt({
  // Dynamically provide a signing key based on the kid in the header and
  // the singing keys provided by the JWKS endpoint
  secret: jwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    // Replace with your Auth0 Domain
    jwksUri: `https://YOUR_AUTH0_DOMAIN/.well-known/jwks.json`
  }),


  // Validate the audience and the issuer
  audience: 'organize',
  // Replace with your Auth0 Domain
  issuer: `https://YOUR_AUTH0_DOMAIN/`,
  algorithms: [ 'RS256' ]
}));

// Middleware to check scopes
const checkPermissions = function(req, res, next){
  switch(req.path){
    case '/api/contacts':{
      var permissions = ['read:contacts'];
      for(var i = 0; i < permissions.length; i++){
        if(req.user.scope.includes(permissions[i])){
          next();
        } else {
          res.status(403).send({message:'Forbidden'});
        }
      }
      break;
    }
  }
}

app.use(checkPermissions);


app.get('/api/contacts', function (req, res) {
  res.send({ contacts: [
    { name: "Jane", email: "jane@example.com" },
    { name: "John", email: "john@example.com" }
  ] });
});

app.listen(port, function () {
  console.log('Contacts API started on port: ' + port);
});
