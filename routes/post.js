const express = require('express');
const router = express.Router();
const Publication = require('../models/post'); 

// GET all publications
router.get('/publications', async (req, res) => {
  try {
    const publications = await Publication.find();
    res.json(publications);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET a specific publication by ID
router.get('/publications/:id', async (req, res) => {
  const publicationId = req.params.id;
  try {
    const publication = await Publication.findById(publicationId);
    if (publication) {
      res.json(publication);
    } else {
      res.status(404).json({ message: 'Publication not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST a new publication
router.post('/publications', async (req, res) => {
  const newPublication = req.body;
  try {
    const createdPublication = await Publication.create(newPublication);
    res.status(201).json(createdPublication);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// PUT/update an existing publication
router.put('/publications/:id', async (req, res) => {
  const publicationId = req.params.id;
  const updatedPublication = req.body;
  try {
    const publication = await Publication.findByIdAndUpdate(publicationId, updatedPublication, { new: true });
    if (publication) {
      res.json(publication);
    } else {
      res.status(404).json({ message: 'Publication not found' });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// DELETE a publication by ID
router.delete('/publications/:id', async (req, res) => {
  const publicationId = req.params.id;
  try {
    const deletedPublication = await Publication.findByIdAndRemove(publicationId);
    if (deletedPublication) {
      res.json({ message: 'Publication deleted', deletedPublication });
    } else {
      res.status(404).json({ message: 'Publication not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
