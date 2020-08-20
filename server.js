const express = require('express');
const bodyParser = require('body-parser');
const redis_db = require('redis');

// client.on("error", function(error) {
//     console.error(error);
//   });

const app = express();

const PROTOCOL = 'http';
const DOMAIN = process.env.DOMAIN || 'localhost';
const PORT = process.env.PORT || 5050;

const REDIS_PORT = process.env.REDIS_PORT || 5001;
const REDIS_HOST = process.env.REDIS_HOST || 'localhost';

const redis_client = redis_db.createClient(REDIS_PORT);
redis_client.on("error", function(error) {
    console.error(`REDIS ERROR`+error);
});

app.db = redis_client;
//app.use(bodyParser.urlencoded({extended: true}));

require('./app/routes')(app, redis_client);

app.listen(PORT, ()=>{
    console.log("We are live on port: " + PROTOCOL+ "//" + DOMAIN + ":" + PORT);
})

