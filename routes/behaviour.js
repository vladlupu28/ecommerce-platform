var express = require('express');
var router = express.Router();
var models = require('../models');

var Behaviour = models.Behaviour;

router.get('/behaviour', function(req, res) {
    Behaviour
        .findOne({
            where : {
                id : 1
            }
        })
        .then((behaviour) => {
            res.status(200).send(behaviour)
        })
        .catch((error)=>{
            console.log(error)
            res.status(500).send(error)
        })
})

router.post('/behaviour', function(req, res){
    Behaviour
        .findOrCreate({
            where : {
                id : 1
            }
        })
        .spread((behaviour, created) => {
            res.status(200).send(behaviour)
        })
        .catch((error) => {
            console.log(error)
            res.status(500).send(error)
        })
})

router.put('/behaviour/bounced', function(req, res) {
    Behaviour
        .findOne({
            where : {
                id : 1
            }
        })
        .then((behaviour) => {
            var number = 0;
            number = behaviour.bouncedUsers + 1;
            behaviour.update({bouncedUsers : number})
            res.status(200).send("One more bounced!")
        })
        .catch((error) => {
            console.log(error)
            res.status(500).send(error)
        })
})

router.put('/behaviour/unfinished', function(req, res) {
    Behaviour
        .findOne({
            where : {
                id : 1
            }
        })
        .then((behaviour) => {
            var number = 0;
            number = behaviour.noOfUserWithUnfinishedTranzactions + 1;
            behaviour.update({noOfUserWithUnfinishedTranzactions : number})
            res.status(200).send("One more unfinished transaction!")
        })
        .catch((error) => {
            console.log(error)
            res.status(500).send(error)
        })
})

router.put('/behaviour/products', function(req, res) {
    Behaviour
        .findOne({
            where : {
                id : 1
            }
        })
        .then((behaviour) => {
            var number = 0;
            number = behaviour.timeSpentOnProductsPage + req.body.timeSpentOnProductsPage;
            behaviour.update({timeSpentOnProductsPage : number})
            res.status(200).send("Added time on product page!")
        })
        .catch((error) => {
            console.log(error)
            res.status(500).send(error)
        })
})

router.put('/behaviour/discussion', function(req, res) {
    Behaviour
        .findOne({
            where : {
                id : 1
            }
        })
        .then((behaviour) => {
            var number = 0;
            number = behaviour.timeSpentOnDiscussionPage + req.body.timeSpentOnDiscussionPage;
            behaviour.update({timeSpentOnDiscussionPage : number})
            res.status(200).send("Added time on discussion page!")
        })
        .catch((error) => {
            console.log(error)
            res.status(500).send(error)
        })
})

router.put('/behaviour/vote', function(req, res) {
    Behaviour
        .findOne({
            where : {
                id : 1
            }
        })
        .then((behaviour) => {
            var number = 0;
            number = behaviour.timeSpentOnVotePage + req.body.timeSpentOnVotePage;
            behaviour.update({timeSpentOnVotePage : number})
            res.status(200).send("Added time on vote page!")
        })
        .catch((error) => {
            console.log(error)
            res.status(500).send(error)
        })
})

router.put('/behaviour/post', function(req, res) {
    Behaviour
        .findOne({
            where : {
                id : 1
            }
        })
        .then((behaviour) => {
            var number = 0;
            number = behaviour.timeSpentOnPostPage + req.body.timeSpentOnPostPage;
            behaviour.update({timeSpentOnPostPage : number})
            res.status(200).send("Added time on a post page!")
        })
        .catch((error) => {
            console.log(error)
            res.status(500).send(error)
        })
})

module.exports = router;