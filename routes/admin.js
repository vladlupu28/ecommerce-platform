var express = require('express');
var router = express.Router();
var models = require('../models');

var Admin = models.Admin;

router.get('/admin/:id', function(req, res) {
    Admin.findOne({
        where : {
            id : req.params.id
        }
    })
    .then((admin) => {
        res.status(200).send(admin)
    })
    .catch((error) => {
        console.log(error)
        res.status(500).send(error)
    })
})

module.exports = router;