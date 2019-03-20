const express = require('express');
const routes = express.Router();
const moment = require('moment');

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

// DELETE A SPECIFIC POST
routes.delete(postIdUrl, async (req, res) => {
  const { id } = req.params;
  try {
    const post = await db.findById(id);
    if (post.length > 0) {
      try {
        await db.remove(id);
        res.status(200).json(post);
      } catch {
        res
          .status(404)
          .json({ message: 'The post with the specified ID does not exist.' });
      }
    } else {
      res
        .status(404)
        .json({ message: 'The post with the specified ID does not exist.' });
    }
  } catch (error) {
    res.status(500).json({ error: 'The post could not be removed' });
  }
});

// ADD A POST
routes.post(postUrl, async (req, res) => {
  const { title } = req.body;
  const { contents } = req.body;
  if (title && contents) {
    try {
      await db.insert({
        title,
        contents,
      });
      res.status(201).json(req.body);
    } catch (error) {
      res.status(500).json({
        error: 'There was an error while saving the post to the database',
      });
    }
  } else {
    res.status(404).json({
      errorMessage: 'Please provide title and contents for the post.',
    });
  }
});

// UPDATE A POST
routes.put(postIdUrl, async (req, res) => {
  const { id } = req.params;
  const post = {
    ...req.body,
    updated_at: moment()
      .format()
      .replace(/T/g,' ')
      .slice(0, -6),
  };
  const { title } = req.body;
  const { contents } = req.body;
  if (title && contents) {
    try {
      const updatedPost = await db.update(id, post);
      if (updatedPost) {
        try {
          const post = await db.findById(id);
          res.status(200).json(post);
        } catch {
          res.status(404).json({
            message: 'The post with the specified ID does not exist.',
          });
        }
      } else {
        res
          .status(404)
          .json({ message: 'The post with the specified ID does not exist.' });
      }
    } catch (error) {
      res
        .status(500)
        .json({ error: 'The post information could not be modified.' });
    }
  } else {
    res.status(400).json({
      errorMessage: 'Please provide title and contents for the post.',
    });
  }
});

module.exports = routes;
