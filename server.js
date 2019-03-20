const express = require('express');
const cors = require('cors');
const blogRoutes = require('./routes');
const server = express();

server.use(cors());
server.use(blogRoutes);

module.exports = server;