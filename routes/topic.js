var express = require('express');
var router = express.Router();
var models = require('../models');

var Topic = models.Topic;
var User = models.User;

router.get('/topic', function(req, res) {
    Topic.findAll()
    .then((topics) => {
      res.status(200).send(topics);
    })
    .catch((error) => {
      console.log(error);
      res.status(501).send("error in getting topics form database");
    })
});

router.post('/topics', function(req, res) {
    User
      .findOne({
        where : {
          id : req.body.authorId
        }
      })
      .then((user) => {
          console.log(user.email)
          return Topic
            .create({
              "name" : req.body.name,
              "topicSubject" : req.body.topicSubject,
              "numberOfComments" : "0",
              "communityId" : req.body.communityId,
              "authorId" : req.body.authorId,
              "authorName" : user.email
            })
      })
      .then(() => {
        res.status(201).send('Topic added')
      })
      .catch((error) => {
        console.warn(error)
        res.status(400).send('Topic not added')
      })
})

router.get('/topics/:id', function(req, res){
    Topic
      .find({
        where : {
          id : req.params.id
        }
      })
      .then((topic) => {
        res.status(200).send(topic)
      })
      .catch((error) =>{
        console.log(error)
        res.status(500).send(error)
      })
})

router.delete('/topic/:id', function(req, res){
    Topic
      .find({
        where : {
          id : req.params.id
        }
      })
      .then((topic) => {
        return topic.destroy()
      })
      .then(()=> {
        res.status(200).send('Topic deleted')
      })
      .catch((error) =>{
        console.log(error)
        res.status(500).send(error)
      })
})

module.exports = router;