---
id: bsv-hash
title: Hash Functions
---

<iframe width="560" height="315" src="https://www.youtube.com/embed/Oviz0k3OHNU" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

---------------------

Bitcoin makes extensive use of cryptographic hash functions. The id of a block
is the reverse double SHA256 hash of the block. This is the value that is
iterated with a nonce when miners are mining - they are trying to get a hash
that starts with a large number of zeros. The id of a transaction is also a
double SHA256 hash. An address is the RIPEMD160 hash of a SHA256 hash. And last
but not least, digital signatures involve hashing a transaction to sign and
verify.

Not only does the core protocol use hash functions, but many higher-level
protocols on top of Bitcoin also use hash functions. BIP32 (hierarchical
deterministic wallets), ECIES, and many other standards use a variety of hash
functions.

bsv exposes all of the most important hash functions that you are likely to use
in your application. The hash functions are exposed on the crypto object as:

```javascript
bsv.crypto.Hash
```

For instance:

```javascript
bsv.crypto.Hash.sha256
```

In this document, "hash function" means cryptographic hasn functions, and not
any other kind of hash function. Hash functions have these properties:

* Given a hash, the only way to determine the input is to iterate all possible inputs until you can find the correct hash.
* All bits in a hash are equally likely to be either 0 or 1 when given many inputs.
* Changing a single bit of the input will radically change the output.
* They are a determined length (for instance, 256 bits for SHA256, or 160 bits for RIPEMD160).
* The input can be any length (or at least a very long length with no practical limits in most cases).

Given the data "this is the data I want to hash", the SHA256 hash looks like this:

f88eec7ecabf88f9a64c4100cac1e0c0c4581100492137d1b656ea626cad63e3

Given a slightly different data, "this is the data I want to hash.", which looks
almost exactly the same except there is a period at the end, the SHA256 hash
looks like this:

37c8dbe24e14073958444f45db5b34c4496e87019ab9ce4ce06821c516b5c02d

Notice how almost none of the digits are the same as above. Changing the input
in a very small way produces a completely different hash.

The code to produce these hashes using bsv is this:

```javascript
var bsv = require('./')
var hash1 = bsv.crypto.Hash.sha256(Buffer.from('this is the data I want to hash')).toString('hex')
console.log(hash1)
// prints:
// f88eec7ecabf88f9a64c4100cac1e0c0c4581100492137d1b656ea626cad63e3
var hash2 = bsv.crypto.Hash.sha256(Buffer.from('this is the data I want to hash.')).toString('hex')
console.log(hash2)
// prints:
// 37c8dbe24e14073958444f45db5b34c4496e87019ab9ce4ce06821c516b5c02d
```

The hash functions available in bsv are:

| Hash Function   | Output Length | Description                                                           |
|-----------------|---------------|-----------------------------------------------------------------------|
| sha256          | 32 bytes      | The SHA256 hash.                                                      |
| sha256sha256    | 32 bytes      | The SHA256 hash of the SHA256 hash. Used for blocks and transactions. |
| sha512          | 64 bytes      | The SHA512 hash. Commonly used in applications.                       |
| sha1            | 20 bytes      | The SHA1 hash.                                                        |
| ripemd160       | 20 bytes      | The RIPEMD160 hash.                                                   |
| sha256ripemd160 | 20 bytes      | The RIPEMD160 hash of the SH256 hash. Used in Bitcoin addresses.      |

Every hash function takes a buffer of any length as input. They are all exposed
on the bsv.crypto.Hash object.

bsv provides one more hash-related utility that is commonly used in
applications: HMAC. It is often the case that you may wish to hash two pieces of
data together. There is a common vulnerability called the "hash length extension
attack" which can sometimes occur in services that hash secret data together
with public data where an attacker can control some inputs. As a general rule,
if you need to hash two things together, it is better to use HMAC, which is
designed to prevent length extension attacks.

In other words:

Rather than: hash(data1 + data2)

Do: HMAC(data1, data2)

HMAC itself is an algorithm that lets any hash function be used inside. You can
use HMAC directly, or you can use the two convenience methods we provide for
sha256hmac or sha512hmac.

| HMAC Convenience Function | Output Length | Description                            |
|---------------------------|---------------|----------------------------------------|
| sha256hmac                | 32 bytes      | HMAC with SHA256 as the hash function. |
| sha512hmac                | 32 bytes      | HMAC with SHA512 as the hash function. |

Both of these functions take two buffers as inputs.
