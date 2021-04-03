// routes/movie.routes.js

const express = require('express');
const router = express.Router();

const fileUploader = require('../config/cloudinary.config');

// **** require Movie model in order to use it ****
const Movie = require('../models/Movie.model');

// GET route to display all the movies
router.get('/movies', (req, res) => {
  Movie.find()
    .then(moviesFromDB => {
      console.log(moviesFromDB);
      res.render('movies-list', { movies: moviesFromDB });
    })
    .catch(err => console.log(`Error while getting the movies from the DB: ${err}`));
});

// GET route to display the form to create a new movie
router.get('/movies/create', (req, res) => res.render('movie-create'));

// POST route for saving a new movie in the database
// This route has the image upload example 🥳
router.post('/movies/create', fileUploader.single('image'), (req, res) => {
  const { title, description } = req.body;

  Movie.create({ title, description, imageUrl: req.file.path })
    .then(() => res.redirect('/movies'))
    .catch(error => console.log(`Error while creating a new movie: ${error}`));
});

module.exports = router;