var express = require('express');
var router = express.Router();
var parseString = require('xml2js').parseString;


router.get('/verify', function (req, res, next) {
    res.render('onfido_id_verification');
});

router.get('/authenticate', function (req, res, next) {
    res.render('onfido_face_authentication');
});


module.exports = router;

