var express = require('express');
var router = express.Router();
var parseString = require('xml2js').parseString;

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', {title: 'ORO Wallet'});
});

router.get('/terms-of-service', function (req, res, next) {
    res.render('tos');
});

router.get('/privacy-policy', function (req, res, next) {
    res.render('privacy_policy');
});


module.exports = router;

