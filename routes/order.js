var express = require('express');
var router = express.Router();
var models = require('../models');
var Order = models.Order
router.get('/orders', function(req, res){
    Order
        .findAll()
        .then((orders) => {
            res.status(200).send(orders)
        })
        .catch((error) => {
            console.log(error)
            res.status(500).send(error)
        })
})

router.post('/orders', function(req, res){
    Order
        .create(req.body)
        .then((order) => {
            res.status(200).send("Order added")
        })
        .catch((error) => {
            console.log(error)
            res.status(500).send("Order not added")
        })
})


module.exports = router;