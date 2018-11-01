const forge = require('node-forge');
const fs = require('fs');
let debug = require('debug')('ca-forge:routes:auth');

let path = __dirname;
let certPath = path.replace('routes', 'certs' );
let keyPath = path.replace('routes', 'keys');
const caCertPem = fs.readFileSync(certPath + "/cert.pem", 'utf8');
const caKeyPem = fs.readFileSync(keyPath +  "/privkey.pem", 'utf8');
const caCert = forge.pki.certificateFromPem(caCertPem);
const caKey = forge.pki.privateKeyFromPem(caKeyPem);


module.exports = (router) => {
    /**
     * attrs should be of the type array
     * e.g.
     *  [{
          name: 'commonName',
          value: 'example.org'
        }, {
          name: 'countryName',
          value: 'US'
        }, {
          shortName: 'ST',
          value: 'Virginia'
        }, {
          name: 'localityName',
          value: 'Blacksburg'
        }, {
          name: 'organizationName',
          value: 'Test'
        }, {
          shortName: 'OU',
          value: 'Test'
        }];
     *
     * @param req
     * @param res
     * @param next
     * @returns {*}
     */
    let getCertificate = (req, res, next)=>{
        debug('request body', req.body);

        let attrs = req.body.attrs;
        let address = req.body.address;
        let publicKey = forge.pki.publicKeyFromPem(req.body.publicKey);
        let cert = forge.pki.createCertificate();
        cert.serialNumber = '02';
        cert.validity.notBefore = new Date();
        cert.validity.notAfter = new Date();
        cert.validity.notAfter.setFullYear(cert.validity.notBefore.getFullYear() + 1);
        cert.setSubject(attrs);

        cert.setIssuer(caCert.subject.attributes);

        cert.setExtensions([{
            name: 'basicConstraints',
            cA: true
        }, {
            name: 'keyUsage',
            keyCertSign: true,
            digitalSignature: true,
            nonRepudiation: true,
            keyEncipherment: true,
            dataEncipherment: true
        }, {
            name: 'subjectAltName',
            altNames: [{
                type: 6, // URI
                value: address
            }]
        }]);

        cert.publicKey = publicKey;

        cert.sign(caKey);
        res.setHeader('Content-type', "application/octet-stream");
        res.setHeader('Content-disposition', 'attachment; filename='+ address + '.pem');

        return res.send(forge.pki.certificateToPem(cert));
    };

    router.route('/certificate')
        .post(getCertificate);
};
