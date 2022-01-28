var express = require('express');
var router = express.Router();
var crypto = require('crypto');
var axios = require('axios');
var parseString = require('xml2js').parseString;
var ip = require("ip");

// get response data from paynamics after transaction and topup user wallet
router.post('/', async function (req, res) {

    const uid = req.query.uid
    const amount = req.query.amount

    let json = null
    const base64Decoded = Buffer.from(req.body.paymentresponse.replace(/ /g, "+"), 'base64').toString('ascii')

    parseString(base64Decoded, function (err, result) {
        json = result
    });

    if (json.ServiceResponseWPF.application[0].merchantid[0] === process.env.MERCHANT_ID
        && json.ServiceResponseWPF.responseStatus[0].response_code[0] === "GR001"
        || json.ServiceResponseWPF.responseStatus[0].response_code[0] === "GR002") {
        try {
            const topUpData = {
                id: uid,
                amount: amount,
                role: "passenger",
                paynamicsResponseId: json.ServiceResponseWPF.application[0].response_id[0],
                paymentType: json.ServiceResponseWPF.application[0].ptype[0],
                processorResponseId: json.ServiceResponseWPF.responseStatus[0].processor_response_id[0]
            }
            await axios.post('https://api.aicpass.com/wallet/api/internal/topupWallet', topUpData)
            res.send('success')
        } catch (e) {
            res.send("top up failed")
        }
    } else {
        res.send("top up failed")
    }
})


/* get user data from app and redirect to paynamics*/
router.get('/', function (req, res, next) {

    const url = req.protocol + "://" + req.headers.host

    //decode base64 data from app
    const decodedJSON = Buffer.from(req.query.encodedJSON, 'base64').toString('ascii')

    //user data from decoded JSON
    const {uid, fname, lname, email, phone, amount, address, city, state, zip} = JSON.parse(decodedJSON)

    //generate random string for merchant request id
    const randomString = (Math.random() + 1).toString(36).substring(2);

    const mid = process.env.MERCHANT_ID; // merchant id
    const mkey = process.env.MERCHANT_KEY; // merchant key
    const requestid = Date.now() + randomString + uid;

    const noturl = `${url}/payment/?uid=${uid}&amount=${amount}`; // url where paynamics response is posted
    const resurl = url; //url of merchant landing page
    const cancelurl = url; //url of merchant landing page
    const mlogo_url = 'https://aici-aicpass.s3.ap-southeast-1.amazonaws.com/static/logo/oro-logo-full-width.png'

    const country = "PH";
    const currency = "PHP";
    const secure3d = "try3d"
    const ipaddress = ip.address()
    const clientip = req.socket.remoteAddress.substr(7)  // get user browser ip

    //concat strings for signature
    const string = mid + requestid + ipaddress + noturl + resurl + fname + lname + address + city + state + country + zip + email + phone + clientip + amount + currency + secure3d + mkey

    //create sha512 hash for signature
    const signature = crypto.createHash('sha512').update(string).digest('hex')

    //e.xml to encode to base64
    let xml =
        "<?e.xml version=\"1.0\" encoding=\"utf-8\" ?>" +
        "<Request>" +
        "<orders>" +
        "<items>" +
        " <Items> " +
        "<itemname>ORO Wallet TopUp</itemname>" +
        "<quantity>1</quantity>" +
        "<amount>" + amount + "</amount>" +
        "</Items>" +
        "</items>" +
        "</orders>" +
        "<mid>" + mid + "</mid>" +
        "<request_id>" + requestid + "</request_id>" +
        "<ip_address>" + ipaddress + "</ip_address>" +
        "<notification_url>" + noturl + "</notification_url>" +
        "<response_url>" + resurl + "</response_url>" +
        "<cancel_url>" + cancelurl + "</cancel_url>" +
        "<mtac_url>http://www.paynamics.com/index.html</mtac_url>" +
        "<descriptor_note>'My Descriptor .18008008008'</descriptor_note>" +
        "<fname>" + fname + "</fname>" +
        "<lname>" + lname + "</lname>" +
        "<address1>" + address + "</address1>" +
        "<city>" + city + "</city>" +
        "<state>" + state + "</state>" +
        "<country>" + country + "</country>" +
        "<zip>" + zip + "</zip>" +
        "<secure3d>" + secure3d + "</secure3d>" +
        "<trxtype>sale</trxtype>" +
        "<email>" + email + "</email>" +
        "<phone>" + phone + "</phone>" +
        "<client_ip>" + clientip + "</client_ip>" +
        "<amount>" + amount + "</amount>" +
        "<currency>" + currency + "</currency>" +
        "<mlogo_url>" + mlogo_url + "</mlogo_url>" +
        "<signature>" + signature + "</signature>" +
        "</Request>"

    //encode e.xml to base64 for sending to paynamics
    const base64 = Buffer.from(xml).toString('base64')

    res.render('topup', {
        base64,
        amount,
        paynamicsUrl: process.env.PAYNAMICS_URL
    });
});


module.exports = router;
