var express = require('express');
var router = express.Router();
var models = require('../models');

var Vote = models.Vote;

router.get('/votes', function(req, res) {
    Vote.findAll()
    .then((votes) => {
      res.status(200).send(votes);
    })
    .catch((error) => {
      console.log(error);
      res.status(501).send("error in getting votes form database");
    })
});

router.post('/votes', function(req, res) {
    Vote
      .create(req.body)
      .then(() => {
        res.status(201).send('votes added')
      })
      .catch((error) => {
        console.warn(error)
        res.status(400).send('Vote not added')
      })
})

router.get('/votes/:id', function(req, res){
    Vote
      .find({
        where : {
          id : req.params.id
        }
      })
      .then((vote) => {
        res.status(200).send(vote)
      })
      .catch((error) =>{
        console.log(error)
        res.status(500).send(error)
      })
})

router.delete('/votes/:id', function(req, res){
    Vote
      .find({
        where : {
          id : req.params.id
        }
      })
      .then((votes) => {
        return votes.destroy()
      })
      .then(()=> {
        res.status(200).send('Vote deleted')
      })
      .catch((error) =>{
        console.log(error)
        res.status(500).send(error)
      })
})

module.exports = router;