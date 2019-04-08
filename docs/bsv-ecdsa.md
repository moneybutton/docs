---
id: bsv-ecdsa
title: ECDSA
---

<iframe width="560" height="315" src="https://www.youtube.com/embed/-C5cgLzapLE" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

---------------------------

Source code: [ecdsa.js](https://github.com/moneybutton/bsv/blob/master/lib/crypto/ecdsa.js)

Note that ECDSA is handled automatically by Money Button behind the scenes and
it is not necessary to deal with ECDSA directly unless you are building an
advanced application.

Elliptic Curve Digital Signature Algorithm: Overview
----------------------------------------------------

Our goal is the ablity for someone who posseses a private key to be able to take
a piece of data and sign it such that anyone who has that person's public key
can verify the authenticity of the signature without knowing or being able to
derive the private key.

One standard method to produce digital signatures is called the [Digital
Signature Algorithm (DSA), standardized by NIST in
1994](https://csrc.nist.gov/publications/detail/fips/186/archive/1994-05-19).
DSA is based on prime numbers.

An improvement over DSA called Elliptic Curve Digital Signature Algorithm
(ECDSA) is very similar to DSA except that it is based on elliptic curves
instead of prime numbers. The advantage of elliptic curves is that it allows a
smaller key size for the same level of security which saves on storage and
computation costs. [ECDSA was standardized in ANSI x9.63 in
1999](http://citeseerx.ist.psu.edu/viewdoc/download?doi=10.1.1.202.2977&rep=rep1&type=pdf).
ECDSA is what's used inside Bitcoin to sign and verify Bitcoin transactions. In
Bitcoin, ECDSA uses the [SECP256k1 elliptic curve](./bsv-point.md). [This
document by Certicom gives a wonderful overview ECDSA including a preliminary
overview of
DSA](http://www.cs.miami.edu/home/burt/learning/Csc609.142/ecdsa-cert.pdf).

To sign with ECDSA, the algorithm takes a private key and data. The data is
hashed before it is signed. Two big numbers are output, r and s. These two
numbers are just numbers and do not consitute a point, but they are often
labeled as (r, s).

To verify with ECDSA, the algorithm takes public key, data, and a signature (r,
s). The data is hashed before it is verified. If the signature is verified, the
verifier can know that only someone who possesses the private key may have
produced the signature.

Signing and Verifying with bsv
------------------------------

bsv has an object called ECDSA accessible at <code>bsv.crypto.ECDSA</code> that
includes ECDSA signing and verification. The two most important methods are
<code>sign</code> and <code>verify</code>.

To produce a signature, you need a private key and data. The data is hashed
before signing.

To validate a signature, you need a public key, the signature, and the data to
verify. The data is hashed before verifying.

A procedure to produce a signature and verify it is replicated below:

```javascript
var privateKey = bsv.PrivateKey.fromRandom()
var publicKey = bsv.PublicKey.fromPrivateKey(privateKey)
var data = 'this is my data that i want to sign'
var hash = bsv.crypto.Hash.sha256(Buffer.from(data))
var sig = bsv.crypto.ECDSA.sign(hash, privateKey)
console.log(sig.toString())
// prints:
// 304402207b784cf70c5397ce3e5f7b3f237c88b107d895329643df4f9c848ce7246d866402205eec00973cf0844051f9aef276134191afba2e3430e8eb891ec2eab831f3cf29
console.log(sig.r.toString())
// prints:
// 55847033216642490420368864471471608392049650776301729777742159067227725071972
console.log(sig.s.toString())
// prints:
// 42934387751484366241739824216943855505630279211754147570322540311552099340073
var verified = bsv.crypto.ECDSA.verify(hash, sig, publicKey)
console.log(verified)
// prints:
// true
```

Deterministic k and Random k
----------------------------

There is a value called k in ECDSA that is generated randomly each time a
signature is produced. According to the standards for ECDSA, k must be chosen
from the entropy pool. This has the undesirable consequence of generating a
different signature when signing the same piece of data with the same private
key. This property makes it difficult to test, and has lead to bugs whereby k is
chosen insufficiently randomly. [For instance, Android had a broken random
number generator that lead to broken values of
k](https://bitcoin.org/en/alert/2013-08-11-android).

There is a way to generate k deterministically that allows it to be tested more
easily for correctness while still being unpredictable to an attacker. The
standard method to generate k deterministically is called [RFC 6979](https://tools.ietf.org/html/rfc6979).
Deterministic k is used by default in bsv. It is possible to override this
setting by using the <code>signRandomK</code> method.

Here are several calls to both <code>sign</code> and <code>signRandomK</code> so
you can see how the random k version produces a different signature each time:

```javascript
var privateKey = bsv.PrivateKey.fromRandom()
var data = 'this is the data i want to sign'
var hash = bsv.crypto.Hash.sha256(Buffer.from('data'))
console.log(bsv.crypto.ECDSA.sign(hash, privateKey).toString())
// 304502210083fa77f8ddffe9791216b97c37168ce5dee0761b7336934cc13099ff31c80f1302207066a2ae7a21dead1b5e126ba67b4304a2f5c4eb0febc7be63695354b6e84483
console.log(bsv.crypto.ECDSA.sign(hash, privateKey).toString())
// 304502210083fa77f8ddffe9791216b97c37168ce5dee0761b7336934cc13099ff31c80f1302207066a2ae7a21dead1b5e126ba67b4304a2f5c4eb0febc7be63695354b6e84483
console.log(bsv.crypto.ECDSA.sign(hash, privateKey).toString())
// 304502210083fa77f8ddffe9791216b97c37168ce5dee0761b7336934cc13099ff31c80f1302207066a2ae7a21dead1b5e126ba67b4304a2f5c4eb0febc7be63695354b6e84483
console.log(bsv.crypto.ECDSA.sign(hash, privateKey).toString())
// 304502210083fa77f8ddffe9791216b97c37168ce5dee0761b7336934cc13099ff31c80f1302207066a2ae7a21dead1b5e126ba67b4304a2f5c4eb0febc7be63695354b6e84483
console.log(bsv.crypto.ECDSA.signRandomK(hash, privateKey).toString())
// 304402200d720d8381ad83206309c1616d9429c2733d11c949f9d0a68373f907ae15b3e2022052730acfe4bed13e33ac58b653c2996cf2ce9e5ce70d220808da240c86d59e58
console.log(bsv.crypto.ECDSA.signRandomK(hash, privateKey).toString())
// 3045022100fe6a2da3f473fa77e76871520d4619ebc409425b3691c30c74ea5a0c06ffd49802202be6452252f704ea950f642ba80040d198462f8d20e4e191befd40cf956989f6
console.log(bsv.crypto.ECDSA.signRandomK(hash, privateKey).toString())
// 3045022100f289602374f360b904b7b773535efef1d92b321b23e03621865af613b5a95fd502204a1faef736eaaf461d78ff4c33337194c0c17685827b35e0d76da9f39dd50153
console.log(bsv.crypto.ECDSA.signRandomK(hash, privateKey).toString())
// 304402207b507eb14fc4ed61a0ade822c98151501c765126009b7dbccc41d27b2c965f7702204fa607e78733a417fa7f7fb9bff39c0ce5e7c14ac62a427f5e02562c8d5240da
```
