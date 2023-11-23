const express = require('express');
const fs = require('fs');

// Inject relevant environment variables
const backend_url = process.env.BACKEND_ADDR || 'http://localhost:3333'
const env_backend_url = `export const BACKEND_ADDR = "${backend_url}"`

fs.writeFileSync('./public/environment.js', env_backend_url)

const app = express();

app.use('/', express.static('public'));
app.listen(5678);
