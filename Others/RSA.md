# RSA

## Overview

- [ ] what's PEM formatted key, and what others.

## symmetric encryption

Encrypt and decrypt with same key(password).

- `DES` Data Encryption Standard.
- `Triple DES` Replacement of `DES`.
- `AES` Advanced Encryption Standard, commonly used and recommended.

    > The Advanced Encryption Standard (AES) is the algorithm trusted as the standard by the U.S. Government and numerous organizations.
    >
    > Although it is extremely efficient in 128-bit form, AES also uses keys of 192 and 256 bits for heavy duty encryption purposes.
    >
    > AES is largely considered impervious to all attacks, with the exception of brute force, which attempts to decipher messages using all possible combinations in the 128, 192, or 256-bit cipher. Still, security experts believe that AES will eventually be hailed the de facto standard for encrypting data in the private sector.

- `Blowfish` Replacement of `DES`.
- `Twofish` Successor of `Blowfish`
- `IDEA`

```php
```

## asymmetric encryption

Encrypt and decrypt with different keys: _public key_ and _private key_

- RSA

### Message Encryption and Decryption

1. public key
    1. encryption

2. private key
    1. decryption

### Message Signature

1. public key
    1. check signature

2. private key
    1. Sign the signature

## See Alson

- [RSA(cryptosystem)](https://en.wikipedia.org/wiki/RSA_(cryptosystem)))
- [5 Common Encryption Algorithms and the Unbreakables of the Future](https://blog.storagecraft.com/5-common-encryption-algorithms/)