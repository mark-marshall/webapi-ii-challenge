const express = require('express');
const routes = express.Router();
const db = require('./data/db');

routes.use(express.json());

module.exports = routes;