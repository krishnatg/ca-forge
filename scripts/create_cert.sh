#!/bin/bash

openssl req -newkey rsa:2048 -new -nodes -x509 -days 3650 -keyout privkey.pem -out cert.pem;
openssl rsa -in privkey.pem -pubout > pubkey.pem;
ls -ltrh;
