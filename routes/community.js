var express = require('express');
var router = express.Router();
var models = require('../models');

var Community = models.Community;

router.get('/communities', function(req, res) {
    Community.findAll()
    .then((communities) => {
      res.status(200).send(communities);
    })
    .catch((error) => {
      console.log(error);
      res.status(501).send("error in getting communities form database");
    })
});

router.post('/communities', function(req, res) {
    Community
      .create(req.body)
      .then(() => {
        res.status(201).send('Community added')
      })
      .catch((error) => {
        console.warn(error)
        res.status(400).send('Community not added')
      })
})

router.get('/communities/:id', function(req, res){
    Community
      .find({
        where : {
          id : req.params.id
        }
      })
      .then((community) => {
        res.status(200).send(community)
      })
      .catch((error) =>{
        console.log(error)
        res.status(500).send(error)
      })
})

router.delete('/communities/:id', function(req, res){
    Community
      .find({
        where : {
          id : req.params.id
        }
      })
      .then((community) => {
        return community.destroy()
      })
      .then(()=> {
        res.status(200).send('Community deleted')
      })
      .catch((error) =>{
        console.log(error)
        res.status(500).send(error)
      })
})

module.exports = router;