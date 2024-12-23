//exporting the express library
const express = require('express');
//create
const app = express();
const PORT = 3000;

// Define a basic route that responds to all URLs
//req=>request and res=>response
app.use((req, res) => {
    res.send('ok');
});


//route for test
app.get('/test', (req, res) => {
    res.json({ status: 200, message: "ok" });
});
//route for time
const moment = require('moment'); // For formatting the time
app.get('/time', (req, res) => {
    const currentTime = moment().format('HH:mm');
    res.json({ status: 200, message: currentTime });
});
//route for the dynamic id 
app.get('/hello/:id?', (req, res) => {
    const id = req.params.id || 'World';  // Default to 'World' if no ID is provided
    res.json({ status: 200, message: `Hello, ${id}` });
});
// Route for /search?s=<SEARCH>
app.get('/search', (req, res) => {
    const search = req.query.s;

    if (search) {
        res.status(200).json({ status: 200, message: "ok", data: search });
    } else {
        res.status(500).json({ status: 500, error: true, message: "you have to provide a search" });
    }
});
// Route for /movies/create
app.get('/movies/create', (req, res) => {
    res.send('Create Movie');
});

// Route for /movies/read
app.get('/movies/read', (req, res) => {
    res.json({ status: 200, data: movies });
});

// Route for /movies/update
app.get('/movies/update', (req, res) => {
    res.send('Update Movie');
});

// Route for /movies/delete
app.get('/movies/delete', (req, res) => {
    res.send('Delete Movie');
});
const movies = [
    { title: 'Jaws', year: 1975, rating: 8 },
    { title: 'Avatar', year: 2009, rating: 7.8 },
    { title: 'Brazil', year: 1985, rating: 8 },
    { title: 'الإرهاب والكباب‎', year: 1992, rating: 6.2 }
]
// Route for /movies/read/by-date
app.get('/movies/read/by-date', (req, res) => {
    const orderedMovies = movies.sort((a, b) => a.year - b.year);  // Sort by year (ascending)
    res.json({ status: 200, data: orderedMovies });
});
//rooute for movies/read/by-rating
app.get('/movies/read/by-rating', (req, res) => {
    const orderedMovies = movies.sort((a, b) => b.rating - a.rating);  // Sort by rating (descending)
    res.json({ status: 200, data: orderedMovies });
});
// Route for /movies/read/by-title
app.get('/movies/read/by-title', (req, res) => {
    const orderedMovies = movies.sort((a, b) => a.title.localeCompare(b.title));  // Sort by title (ascending)
    res.json({ status: 200, data: orderedMovies });
});
//route for /movies/read/id/:id
app.get('/movies/read/id/:id', (req, res) => {
    const movieId = parseInt(req.params.id);
    const movie = movies.find(m => m.id === movieId);

    if (movie) {
        res.json({ status: 200, data: movie });
    } else {
        res.status(404).json({ status: 404, error: true, message: `the movie ${movieId} does not exist` });
    }
});
//using https verbs 
// Route for /movies/add
app.get('/movies/add', (req, res) => {
    const { title, year, rating } = req.query;

    // Validation
    if (!title || !year || isNaN(year) || year.length !== 4) {
        return res.status(403).json({ status: 403, error: true, message: 'you cannot create a movie without providing a title and a year' });
    }

    // Default rating if not provided
    const movieRating = rating ? parseFloat(rating) : 4;

    // Create new movie
    const newMovie = {
        id: movies.length + 1,
        title: title,
        year: parseInt(year),
        rating: movieRating
    };

    // Add the new movie to the movies array
    movies.push(newMovie);

    // Respond with the updated list of movies
    res.json({ status: 200, data: movies });
});
// Route for /movies/delete/<ID>
app.delete('/movies/delete/:id', (req, res) => {
    const movieId = parseInt(req.params.id);
    const movieIndex = movies.findIndex(m => m.id === movieId);

    if (movieIndex !== -1) {
        // Remove the movie from the array
        movies.splice(movieIndex, 1);
        res.json({ status: 200, data: movies });
    } else {
        // Movie not found
        res.status(404).json({ status: 404, error: true, message: `the movie ${movieId} does not exist` });
    }
});
// Route for updating movie title
app.put('/movies/update/:id', (req, res) => {
    const movieId = parseInt(req.params.id);
    const { title } = req.query;

    const movieIndex = movies.findIndex(m => m.id === movieId);

    if (movieIndex !== -1) {
        movies[movieIndex].title = title;
        res.json({ status: 200, data: movies });
    } else {
        res.status(404).json({ status: 404, error: true, message: `the movie ${movieId} does not exist` });
    }
});

// Route for updating movie title and rating
app.put('/movies/update/:id', (req, res) => {
    const movieId = parseInt(req.params.id);
    const { title, rating } = req.query;

    const movieIndex = movies.findIndex(m => m.id === movieId);

    if (movieIndex !== -1) {
        if (title) movies[movieIndex].title = title;
        if (rating) movies[movieIndex].rating = parseFloat(rating);
        res.json({ status: 200, data: movies });
    } else {
        res.status(404).json({ status: 404, error: true, message: `the movie ${movieId} does not exist` });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});