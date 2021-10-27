var express = require('express');
var router = express.Router();
var parseString = require('xml2js').parseString;

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', {title: 'ORO Wallet'});
});

router.get('/test', function (req, res, next) {

    const uid = req.query.uid
    const amount = req.query.amount

    let json = undefined
    const body = "PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz48U2VydmljZVJlc3BvbnNlV1BGIHhtbG5zOnhzZD0iaHR0cDovL3d3dy53My5vcmcvMjAwMS9YTUxTY2hlbWEiIHhtbG5zOnhzaT0iaHR0cDovL3d3dy53My5vcmcvMjAwMS9YTUxTY2hlbWEtaW5zdGFuY2UiPjxhcHBsaWNhdGlvbj48bWVyY2hhbnRpZD4wMDAwMDAxODEwMjEwQkQxMzQ5RjwvbWVyY2hhbnRpZD48cmVxdWVzdF9pZD4yMDA1NzE8L3JlcXVlc3RfaWQ PHJlc3BvbnNlX2lkPjc5OTg3OTIwNDc1NjI3Nzc3MTM3PC9yZXNwb25zZV9pZD48dGltZXN0YW1wPjIwMjEtMTAtMjZUMDQ6NDM6MjAuMDAwMDAwKzA4OjAwPC90aW1lc3RhbXA PHJlYmlsbF9pZCAvPjxzaWduYXR1cmU OTEzYzg1NmFlMTc1NDBhNDU2Y2NlNmFhOGJlOGY4ZTVkNjFiODUxOGZiNmZhYjAyZGUxMWIwMWM3YmMyMTAzMjdkNzhmMGFlNmU5OGM1NzZjYmQ5ZTk3ZjIxYWJiODQzNjEwYmY4OWExM2I0ZDA5MDI0MjdlOTE1ZDMwNzBlZmU8L3NpZ25hdHVyZT48cHR5cGU QlJfQkRPX1BIPC9wdHlwZT48L2FwcGxpY2F0aW9uPjxyZXNwb25zZVN0YXR1cz48cmVzcG9uc2VfY29kZT5HUjAwMTwvcmVzcG9uc2VfY29kZT48cmVzcG9uc2VfbWVzc2FnZT5UcmFuc2FjdGlvbiBTdWNjZXNzZnVsPC9yZXNwb25zZV9tZXNzYWdlPjxyZXNwb25zZV9hZHZpc2U VHJhbnNhY3Rpb24gaXMgYXBwcm92ZWQ8L3Jlc3BvbnNlX2FkdmlzZT48cHJvY2Vzc29yX3Jlc3BvbnNlX2lkPmQ5ODQwM2ZlLTYyOTEtNDVmZC1hYWE3LWU0YTgxMWM3PC9wcm9jZXNzb3JfcmVzcG9uc2VfaWQ PHByb2Nlc3Nvcl9yZXNwb25zZV9hdXRoY29kZSAvPjwvcmVzcG9uc2VTdGF0dXM PHN1Yl9kYXRhIC8 PHRyYW5zYWN0aW9uSGlzdG9yeT48dHJhbnNhY3Rpb24gLz48L3RyYW5zYWN0aW9uSGlzdG9yeT48L1NlcnZpY2VSZXNwb25zZVdQRj4="
    const base64Decoded = Buffer.from(body.replace(/ /g, "+"), 'base64').toString('ascii')
    parseString(base64Decoded, function (err, result) {
        json = result
    });

    res.send(json)

});

router.get('/terms-of-service', function (req, res, next) {
    res.render('tos');
});

router.get('/privacy-policy', function (req, res, next) {
    res.render('privacy_policy');
});


module.exports = router;

