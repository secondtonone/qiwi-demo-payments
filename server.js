const express = require('express');
const qiwiRestApi = require('pull-rest-api-node-js-sdk');
const crypto = require('crypto');
const bodyParser = require('body-parser');


const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

app.use('/',express.static('public'));

app.get('/', (req, res) =>{
    res.sendFile(__dirname + '/public/index.html')
});

app.get('/successUrl', (req, res) =>{
    res.sendFile(__dirname + '/public/index.html')
});

app.get('/failUrl', (req, res) =>{
    res.sendFile(__dirname + '/public/index.html')
});


const prv_id = '2042';
const api_id = '59710186';
const api_password = 'CKgKvnZyv5YAoY69DxlR';
const amount = 0.01;

const fieldsTemp = {
    amount,
    ccy: 'RUB',
    comment: 'test',
    lifetime: '2017-10-25T09:00:00',
    user: 'tel:',
    pay_source: 'qw'
};

const redirectOptionsTemp = {
    transaction: '',
    shop: prv_id,
    iframe: true,
    successUrl:'https://example.com/successUrl',
    failUrl: 'https://example.com/failUrl'
};


const client = new qiwiRestApi(prv_id, api_id, api_password);


function randomValueHex(len) {
    return crypto.randomBytes(Math.ceil(len/2))
        .toString('hex') // convert to hexadecimal format
        .slice(0,len);   // return required number of characters
}

function generateBillId() {
    return `demo${randomValueHex(7)}`;
}

app.post('/paymentByBill', (req, res) =>{

    const fields = fieldsTemp;

    const redirectOptions = redirectOptionsTemp;

    const bill_id = generateBillId();

    fields.user = `tel:${req.body.tel}`;

    client.createBill(bill_id, fields).then(data => {

        redirectOptions.transaction = bill_id;

        const redirect = client.paymentForm(redirectOptions);

        data.redirect = redirect;

        res.send(data);
    });

});


app.post('/paymentForMobile', (req, res) =>{

    const fields = fieldsTemp;

    fields.amount = 5;
    fields.pay_source = 'mobile';
    fields.user =  `tel:${req.body.tel}`;

    bill_id = generateBillId();

    client.createBill(bill_id, fields).then(data => {
        res.send(data);
    });

});


app.listen(port, (err) =>  {
    if (err) {
        console.log(err);
        return;
    }

    console.log('Start at ' + port);
});