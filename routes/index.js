var express = require('express');
var router = express.Router();

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

