const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const routes = require('./routes/');
const app = express();

/* Shamir's secret sharing - Start */
// console.log('this runs by default?');
const secrets = require('secrets.js');
const forge = require('node-forge');
const fs = require('fs');

let fpath = __dirname;
const caKeyPem = fs.readFileSync(fpath +  "/keys/privkey.pem", 'utf8');
// const caKey = forge.pki.privateKeyFromPem(caKeyPem);
const caKey = secrets.str2hex(JSON.stringify(forge.pki.privateKeyFromPem(caKeyPem)));
// const keyStr = JSON.stringify(caKey);
// console.log(typeof keyStr);
// console.log(typeof caKey);
// console.log(caKey);

var shares = secrets.share(caKey, 10, 5);

var i;

for (i = 0 ; i < shares.length ; i++) {
    let j = i + 1;
    /*
    console.log("ENC begin");
    console.log(shares[i]);
    console.log("ENC end");
    */
    fs.writeFile(fpath + "/keys/privkey_part" + j.toString() + ".pem", shares[i], { flag: 'w' }, function(err) {
    if (err) {
        return console.log(err);
    }
    // console.log("The file" + j.toString() + " was saved!");
});
}

/* Shamir's secret sharing - End */

app.set('certs', __dirname + '/certs');
app.set('keys', __dirname + '/keys');
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/ping', (req, res) => {
   res.end('pong');
});
app.use('/api', routes);

module.exports = app;
