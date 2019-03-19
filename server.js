const express = require('express');
const blogRoutes = require('./routes');
const server = express();

server.use(blogRoutes);

module.exports = server;