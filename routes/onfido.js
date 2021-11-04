var express = require('express');
var router = express.Router();
var parseString = require('xml2js').parseString;

/* GET home page. */
router.get('/verify', function (req, res, next) {

    if(!req.query.onfidoToken){
        res.send("unauthorized")
    }


    res.render('onfido');
});



module.exports = router;

