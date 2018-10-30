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
After executing the script, the generated self-signed cert ```cert.pem``` must be placed in the certs/ directory, and the private key ```privkey.pem``` should be placed in the keys/ directory.

Once this service is started, the REST API endpoint can be accessed by sending an HTTP POST request to ```http://localhost:5000/api/certificate/``` using the contents of the public key.

Example cURL command
--------------------
```
curl -X POST \
  http://localhost:5000/api/certificate \
  -H 'Content-Type: application/json' \
  -H 'Postman-Token: 6e5a7599-6b81-40d1-97a8-c4455e218db0' \
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
	"address": "krishnatippur.com",
	"publicKey": "-----BEGIN PUBLIC KEY-----\nMIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAud5CiuqbAO3wHieiUYp9\nQ+PcaQfLXZa5Vq3RLj1o1zFhh18z4nHtUvq/LSNIjSNcZZOYYJDHGp2t5t/pT5rr\nbxDryl4iNGsIOGQhxICncq+6NfRedOR7+S4DE4PR8uz8l1gtOmhgX4prxCLQnZcs\ngHZptNox/8aS6RSuhuUszQpj+8d/qR9vRAGzLKAM1otrhHZPOTuOV2+mDaR7llns\n/IcUDSo/E9gYI8ecs2Y4mh0alPlw4wRMjLAbPHoDumfReRFrY8IvAq55mmsf3s8m\nZfODrkIHpkqjyd4EDQblupPF1oebVlF6WJcmLBNDNoEEWUAjbu0i6sCJ1LDGWrfS\nnwIDAQAB\n-----END PUBLIC KEY-----"
}'
```
