const express = require('express');
const routes = express.Router();
const db = require('./data/db');

const postUrl = '/api/posts';
const postIdUrl = '/api/posts/:id';

routes.use(express.json());

// GET ALL POSTS
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

// GET SPECIFIC POSTS
routes.get(postIdUrl, async (req, res) => {
  const { id } = req.params;
  try {
    const post = await db.findById(id);
    if (post.length > 0) {
      res.status(200).json(post);
    } else {
      res
        .status(404)
        .json({ message: 'The post with the specified ID does not exist.' });
    }
  } catch (error) {
    res
      .status(500)
      .json({ error: 'The post information could not be retrieved.' });
  }
});

module.exports = routes;
