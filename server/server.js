const express = require('express');
const path = require('path');
const db = require('./config/connection');
const routes = require('./routes');
const dotenv = require(“dotenv”).config()  

const app = express();
const PORT = process.env.PORT;
const GOOGLE_API_KEY=process.env.GOOGLE_API_KEY

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// if we're in production, serve client/build as static assets
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
}

app.use(routes);

db.once('open', () => {
  app.listen(PORT, () => console.log(`🌍 Now listening on localhost:${PORT}`));
});
