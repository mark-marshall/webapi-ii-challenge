const express = require('express');
const routes = express.Router();
const db = require('./data/db');

const postUrl = '/api/posts';
const postIdUrl = '/api/posts/:id';

routes.use(express.json());

routes.get(postUrl, async (req, res) => {
  try {
    const posts = await db.find();
    if (posts) {
      res.status(200).json(posts);
    }
  } catch (error) {
    res
      .status(500)
      .json({ error: 'The posts information could not be retrieved.' });
  }
});

module.exports = routes;
