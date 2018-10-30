"""
Author: Krishna Tippur Gururaj
Description: Script to obtain the SSL certificate of a given website
"""

import ssl
import OpenSSL.crypto as crypto
port = 443


def main():
    hostname = input("enter website: ")
    cert = ssl.get_server_certificate((hostname, port))  # gets PEM-encoded string

    cert_d = crypto.load_certificate(crypto.FILETYPE_PEM, cert)
    #  print(cert_d.get_issuer().get_components())
    buf = crypto.dump_certificate(crypto.FILETYPE_TEXT, cert_d)
    buf_contents = buf.decode().split('\n')
    for line in buf_contents:
        print(line.strip())
        '''
        if "Issuer" in line:
            print(line.strip())
        '''
        '''
        print("start ->")
        print(line.strip())
        print("<- end")
        '''


if __name__ == '__main__':
    main()
