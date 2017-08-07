var express = require('express');
var router = express.Router();
var models = require('../models');

var Product = models.Product;

router.get('/prod', function(req, res) {
    console.log("getting from products")
    Product.findAll()
    .then((products) => {
      res.status(200).send(products);
    })
    .catch((error) => {
      console.log(error);
      res.status(501).send("error in getting products form database");
    })
});

router.post('/products', function(req, res) {
    Product
      .create(req.body)
      .then(() => {
        res.status(201).send('Product added')
      })
      .catch((error) => {
        console.warn(error)
        res.status(400).send('Product not added')
      })
})

router.get('/products/:id', function(req, res){
    Product
      .find({
        where : {
          id : req.params.id
        }
      })
      .then((product) => {
        res.status(200).send(product)
      })
      .catch((error) =>{
        console.log(error)
        res.status(500).send(error)
      })
})
router.get('/products/community/:id', function(req, res){
  Product
    .findAll({
      where: {
        communityId: req.params.id
      }
    })
    .then((products) => {
      res.status(200).send(products)
    })
    .catch((error) => {
      console.log(error)
      res.status(500).send(error)
    })
})
router.delete('/products/:id', function(req, res){
    Product
      .findOne({
        where : {
          $or: {
            series : req.params.id,
            id : req.params.id
          }
        }
      })
      .then((product) => {
        return product.destroy()
      })
      .then(()=> {
        res.status(200).send('Product deleted')
      })
      .catch((error) =>{
        console.log(error)
        res.status(500).send(error)
      })
})

module.exports = router;