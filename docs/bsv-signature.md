---
id: bsv-signature
title: Signatures
---

<iframe width="560" height="315" src="https://www.youtube.com/embed/6w3eokMYcRE" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

-------------------------

Source code: [signature.js](https://github.com/moneybutton/bsv/blob/master/lib/crypto/signature.js)

An [ECDSA](./bsv-ecdsa.md) signature consists of two numbers, r and s, both of
which are [big numbers](./bsv-bn.md). A signature is produced from a private key
and a message and a signature is verified using a public key, a signature and
the message. Only the person with the private key can produce a signature for a
corresponding public key, and anyone with the public key can verify the
authenticity of the signature.

In a Bitcoin transaction, another value called the SIGHASH type is added to a
signature. The SIGHASH type specifies what operation is used to create and
verify the signature. A signature inside a Bitcoin transaction is encoded in DER
format followed by a single byte indicated the SIGHASH type. The DER format
itself includes several header bytes.

A DER formatted signature looks like this:

```
[header, length, rheader, rlength, r, sheader, slength, s]
```

Where these fields are defined as:

| field   | explanation                                                               |
|---------|---------------------------------------------------------------------------|
| header  | 0x30                                                                      |
| length  | The total length of what follows, including all headers and r and s value |
| rheader | 0x02                                                                      |
| rlength | The length of r                                                           |
| r       | r encoded in big endian sign magnitude format                             |
| sheader | 0x02                                                                      |
| slength | The length of s                                                           |
| s       | s encoded in big endian sign magnitude format                             |

A signature inside a Bitcoin transaction looks like this:

```
[der, sighash]
```

Where "der" is formatted according to the above definition, and sighash is a
single byte that can be SIGHASH_ALL, SIGHASH_SINGLE, SIGHASH_ANYONECANPAY, or
SIGHASH_NONE.

In a [Bitcoin Signed Message](./bsv-message.md), signatures are formatted
differently than inside a Bitcoin transaction. Firstly, the message is hashed
using a "Bitcoin Signed Message:\n" prefix, and secondly, the signature itself
is formatted as a base64 representation of two 256 bit numbers, r and s, which
is quite different from DER format.

Here is an example building a DER signature (found inside a Bitcoin transction) and a compact signature (found inside a Bitcoin Signed Message):

```javascript
var data = 'my data'
var privateKey = bsv.PrivateKey.fromRandom()
var hash = bsv.crypto.Hash.sha256(Buffer.from(data))
var sig1 = bsv.crypto.ECDSA.sign(hash, privateKey)
console.log(sig1.toString('hex'))
// prints:
// 30440220683f3c385edc42223c4efa00493c34532379ac88c1d2fa57997d903de44a7e9302202175d70f029515f0013c1d10de82b116984c7511f3f52928470ddfb49505ac00
var sig2 = bsv.crypto.ECDSA.signWithCalcI(hash, privateKey)
console.log(sig2.toCompact().toString('base64'))
// prints:
// H2g/PDhe3EIiPE76AEk8NFMjeayIwdL6V5l9kD3kSn6TIXXXDwKVFfABPB0Q3oKxFphMdRHz9SkoRw3ftJUFrAA=
```
