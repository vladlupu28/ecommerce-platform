var express = require('express');
var router = express.Router();
var models = require('../models');

var Category = models.Category;

router.get('/categories', function(req, res) {
    Category.findAll()
    .then((categories) => {
      res.status(200).send(categories);
    })
    .catch((error) => {
      console.log(error);
      res.status(501).send("error in getting categories form database");
    })
});

router.post('/categories', function(req, res) {
    Category
      .create(req.body)
      .then(() => {
        res.status(201).send('category added')
      })
      .catch((error) => {
        console.warn(error)
        res.status(400).send('category not added')
      })
})

router.get('/categories/:id', function(req, res){
    Category
      .find({
        where : {
          id : req.params.id
        }
      })
      .then((category) => {
        res.status(200).send(category)
      })
      .catch((error) =>{
        console.log(error)
        res.status(500).send(error)
      })
})

router.delete('/categories/:id', function(req, res){
    Category
      .find({
        where : {
          id : req.params.id
        }
      })
      .then((category) => {
        return category.destroy()
      })
      .then(()=> {
        res.status(200).send('category deleted')
      })
      .catch((error) =>{
        console.log(error)
        res.status(500).send(error)
      })
})

module.exports = router;