var express = require('express');
var router = express.Router();
var models = require('../models');

var Comment = models.Comment;
var User = models.User;
var Topic = models.Topic;

router.get('/comments', function(req, res) {
    Comment.findAll()
    .then((comments) => {
      res.status(200).send(comments);
    })
    .catch((error) => {
      console.log(error);
      res.status(501).send("error in getting comments form database");
    })
});

router.post('/comments', function(req, res) {
    User
    .findOne({
      where : {
        id : req.body.userId
      }
    })
    .then((user) => {
      return Comment
        .create({
          "message" : req.body.message,
          "topicId" : req.body.topicId,
          "userId" : req.body.userId,
          "authorName" : user.email
        })
    })
    .then(() => {
      return Topic.findOne({where : {topicId : req.body.topicId} })
    })
    .then((topic) => {
      var noOfComm = topic.numberOfComments + 1;
      return topic.update({numberOfComments : noOfComm})
    })
    .then((result) => {
      res.status(200).send("Comment added")
    })
    .catch((error) => {
      console.warn(error)
      res.status(400).send('comment not added')
    })
})

router.get('/comments/:id', function(req, res){
    Comment
      .findAll({
        where : {
          topicId : req.params.id
        }
      })
      .then((comment) => {
        res.status(200).send(comment)
      })
      .catch((error) =>{
        console.log(error)
        res.status(500).send(error)
      })
})

router.delete('/comments/:id', function(req, res){
    Comment
      .find({
        where : {
          id : req.params.id
        }
      })
      .then((comment) => {
        return comment.destroy()
      })
      .then(()=> {
        res.status(200).send('comment deleted')
      })
      .catch((error) =>{
        console.log(error)
        res.status(500).send(error)
      })
})

module.exports = router;