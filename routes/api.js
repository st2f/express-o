const router = require('express').Router();
const Chapters = require('../database/models/chapter.model');

router.get('/users', (req, res) => {
    Chapters.findOne({}).then(doc => {
        console.log(doc);
        res.json(doc);
    })
    
});

module.exports = router;