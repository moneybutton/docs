---
id: bsv-signature
title: Signatures
---

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
var ecdsa = bsv.crypto.ECDSA().set({ hashbuf: bsv.crypto.Hash.sha256(Buffer.from(data)), privkey: privateKey }).sign().calci()
console.log(ecdsa.sig.toDER().toString('hex'))
// prints:
// 30440220099ac73817b3e735e697bbb8808100bea9517c49f3c65731686c31929f0151f802205ef68f8d945f2ad8228743ebbef464419a47e40822f3a14bc1f13692499380e3
console.log(ecdsa.sig.toCompact().toString('base64'))
// prints:
// IAmaxzgXs+c15pe7uICBAL6pUXxJ88ZXMWhsMZKfAVH4XvaPjZRfKtgih0PrvvRkQZpH5Agi86FLwfE2kkmTgOM=
```
