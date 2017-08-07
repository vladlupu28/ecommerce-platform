var express = require('express');
var router = express.Router();
var models = require('../models');

var Poll = models.Poll;
var ProposedProduct = models.ProposedProduct;

router.get('/proposedproducts/:pollId', function(req, res) {
  ProposedProduct
    .findAll({
      where: {
        pollId: req.params.pollId
      }
    })
    .then((proposedProducts) => {
      res.status(200).send(proposedProducts)
    })
    .catch((error) => {
      console.log(error)
      res.status(500).send(error)
    })
})
router.post('/proposedproducts', function(req, res) {
  ProposedProduct
    .create(req.body)
    .then(() => {
      res.status(200).send('product proposed')
    })
    .catch((error) => {
      console.log(error)
      res.status(500).send('proposed product not  added')
    })
})
router.put('/voteproposedproduct/:id', function(req, res) {
  ProposedProduct
    .find({
      where: {
        proposedProductId : req.params.id
      }
    })
    .then((product) => {
      var noOfVotes = product.numberOfVotes + 1;
      var usersArray = product.userIdVotes;
      usersArray.push(req.body.userId);
      return product.update({userIdVotes : usersArray, numberOfVotes : noOfVotes})
    })
    .then((result) => {
      res.status(200).send("Vote added")
    })
    .catch((error) => {
      console.log(error)
      res.status(500).send("error in adding vote")
    })
    
})
router.get('/polls', function(req, res) {
    Poll.findAll()
    .then((polls) => {
      res.status(200).send(polls);
    })
    .catch((error) => {
      console.log(error);
      res.status(501).send("error in getting polls form database");
    })
});

router.post('/polls', function(req, res) {
    Poll
      .create(req.body)
      .then((poll) => {
        res.status(201).send(poll)
      })
      .catch((error) => {
        console.warn(error)
        res.status(400).send('Poll not added')
      })
})

router.get('/polls/:id', function(req, res){
    Poll
      .find({
        where : {
          id : req.params.id
        }
      })
      .then((poll) => {
        res.status(200).send(poll)
      })
      .catch((error) =>{
        console.log(error)
        res.status(500).send(error)
      })
})

router.delete('/polls/:id', function(req, res){
    Poll
      .find({
        where : {
          id : req.params.id
        }
      })
      .then((poll) => {
        return poll.destroy()
      })
      .then(()=> {
        res.status(200).send('Poll deleted')
      })
      .catch((error) =>{
        console.log(error)
        res.status(500).send(error)
      })
})

module.exports = router;