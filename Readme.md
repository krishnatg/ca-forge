# Certificate Authority

A restful service that generates Certificates and signs them.

This service uses forge to generate certs and sign them.

To run this code, git clone and paste a self signed cert in certs folder
and place the private key for signing in keys folder.

```
npm install
npm run start
```

EDIT
-----
You can use the script ```create_cert.sh``` from the scripts/ directory to generate a self-signed certificate and its corresponding keys (both private and public).
After executing the script, the generated self-signed cert ```cert.pem``` must be placed in the certs/ directory, and the private key ```privkey.pem``` and the public key ```pubkey.pem``` should be placed in the keys/ directory.

Once this service is started, the REST API endpoint can be accessed by sending an HTTP POST request to ```http://localhost:5000/api/certificate/```.

Example cURL command
--------------------
```
curl -X POST \
  http://localhost:5000/api/certificate \
  -H 'Content-Type: application/json' \
  -H 'Postman-Token: 3dc6eef4-d86f-455c-86ae-ac1957eb6dfc' \
  -H 'cache-control: no-cache' \
  -d '{
	"attrs": [
		{
			"name": "commonName",
			"value": "example.org"
		},
		{
			"name": "countryName",
			"value": "US"
		},
		{
			"shortName": "ST",
			"value": "Virginia"
		},
		{
			"name": "localityName",
			"value": "Blacksburg"
		},
		{
			"name": "organizationName",
			"value": "Test"
		},
		{
			"shortName": "OU",
			"value": "Test"
		}
	],
	"address": "krishnatippur.com"
}'
```
