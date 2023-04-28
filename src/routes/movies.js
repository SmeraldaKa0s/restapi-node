const { Router } = require('express');
const router = Router();
const _ = require('underscore');
const fs = require('fs');
const path = require('path');

const movies = require('../sample.json');


router.get('/', (req, res) => {
    res.json(movies);
});

router.post('/', (req, res) => {
    try {
        const { title, director, year, rating } = req.body;
        if (title && director && year && rating) {
            const id = movies.length + 1;
            const newMovie = { ...req.body, id };
            console.log(newMovie);
            movies.push(newMovie);
            const filepath = path.join(__dirname, '../sample.json');
            console.log('filepath', filepath)
            fs.writeFile(filepath, JSON.stringify(movies, null, 2), (err) => {
                if (err) {
                    console.log("mal")
                    res.status(500).json({ error: "There was an error" });
                } else {
                    console.log("bien")
                    res.json(movies);

                }
            });

        } else {
            res.status(500).json({ error: "There was an error" });
        }
    } catch (err) {
        console.log(err)
    }
});

router.put('/:id', (req, res) => {
    const { id } = req.params;
    const { title, director, year, rating } = req.body;
    if (title && director && year && rating) {
        _.each(movies, (movie, i) => {
            if (movie.id == id) {
                movie.title = title;
                movie.director = director;
                movie.year = year;
                movie.rating = rating;
            }
        });
        res.json(movies);
    } else {
        res.status(500).json({ error: 'There was an error.' });
    }
});

router.delete('/:id', (req, res) => {
    const { id } = req.params;
    _.each(movies, (movie, i) => {
        if (movie.id == id) {
            movies.splice(i, 1);
        }
    });
    res.send(movies);
})

module.exports = router; 
