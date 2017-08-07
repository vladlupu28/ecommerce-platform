var express = require('express');
var router = express.Router();
var models = require('../models');

var Subscription = models.Subscription;
var User = models.User;

router.get('/subscriptions', function(req, res) {
    Subscription.findAll()
    .then((subscriptions) => {
      res.status(200).send(subscriptions);
    })
    .catch((error) => {
      console.log(error);
      res.status(501).send("error in getting subscriptions form database");
    })
});
router.post('/subscriptions', function(req, res) {
    User
      .find({
        where : {
          email : req.body.email
        }
      })
      .then((user) => {
      for(cId of req.body.communityId){
        Subscription
          .create({"userId" : user.id, "communityId" : cId})
          .then(() => {
            console.log("3")
            return 'subscription added'
          })
          .catch((error) => {
            console.log("4")
            console.log(error)
            return "user id " + user.id;
          })
        }
        return user.id + "";
      })
      .then((response) => {
        res.status(200).send(response)
      })
      .catch((error) => {
        console.log(error)
        res.status(500).send('user not found for subscription')
      })
})

router.get('/subscriptions/:userId', function(req, res){
    Subscription
      .findAll({
        where : {
          userId : req.params.userId
        }
      })
      .then((subscriptions) => {
        res.status(200).send(subscriptions)
      })
      .catch((error) =>{
        console.log(error)
        res.status(500).send(error)
      })
})

router.delete('/subscriptions/:id', function(req, res){
    Subscription
      .find({
        where : {
          id : req.params.id
        }
      })
      .then((subscription) => {
        return subscription.destroy()
      })
      .then(()=> {
        res.status(200).send('Subscription deleted')
      })
      .catch((error) =>{
        console.log(error)
        res.status(500).send(error)
      })
})
router.delete('/unsubscribe/:userId/community/:communityId', function(req, res){
    Subscription
      .find({
        where: {
          userId : req.params.userId,
          communityId : req.params.communityId
        }
      })
      .then((subscription) =>{
        return subscription.destroy()
      })
      .then(() => {
        res.status(200).send('Subscription deleted')
      })
      .catch((error) => {
        res.status(500).send(error)
      })
})

module.exports = router;