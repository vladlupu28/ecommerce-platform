var express = require('express');
var router = express.Router();
var models = require('../models');

var User = models.User;
router.get('/users', function(req, res) {
    User.findAll({
      attributes : ['id', 'name', 'email', 'gender']
    })
    .then((users) => {
      res.status(200).send(users);
    })
    .catch((error) => {
      console.log(error);
      res.status(501).send("error in getting users form database");
    })
});

router.get('/countusers', function(req, res) {
    User.findAndCountAll()
    .then((result) => {
      console.log(result.count)
      res.status(200).send(result);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).send("error in getting users form database");
    })
});

router.post('/users', function(req, res) {
    console.log(req.body.name);
    User
      .create(req.body)
      .then(() => {
        res.status(201).send('user added')
      })
      .catch((error) => {
        console.warn(error)
        res.status(400).send('user not added')
      })
})

router.post('/verifyuser', function(req, res){
    User
      .findOrCreate({where : {email : req.body.name}})
      .spread((user, created) => {
        console.log(user.get({
          plain: true
        }))
        console.log(created)
        res.status(200).send(user.id + "")
      })
})

router.get('/users/:id', function(req, res){
    User
      .findOne({
        where : {
          id : req.params.id
        }
      })
      .then((user) => {
        console.log("aici")
        console.log(user)
        // res.status(200).send(user)
      })
      .catch((error) =>{
        console.log(error)
        res.status(500).send(error)
      })
})
router.get('/userspoll/:id', function(req, res){
    User
      .findAll({
        where : {
          id : req.params.id
        }
      })
      .then((users) => {
        res.status(200).send(users)
      })
      .catch((error) =>{
        console.log(error)
        res.status(500).send(error)
      })
})

router.delete('/users/:id', function(req, res){
    User
      .find({
        where : {
          id : req.params.id
        }
      })
      .then((user) => {
        return user.destroy()
      })
      .then(()=> {
        res.status(200).send('user deleted')
      })
      .catch((error) =>{
        console.log(error)
        res.status(500).send(error)
      })
})

module.exports = router;
