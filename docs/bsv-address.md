---
id: bsv-address
title: Addresses
---

<iframe width="560" height="315" src="https://www.youtube.com/embed/a32dlV2xgIw" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

----------------------------

A Bitcoin address is the hash of a public key. It is hashed twice (SHA256 and
then RIPEMD160). Although we do not know for sure why Satoshi designed addresses
this way, it is likely the two layers of hashing are there to provide an extra
layer of security in case the underlying elliptic curve cryptography is ever
broken. If attackers have to break through two hash functions just to get your
public key, that makes attacks on the public key harder.

Addresses are 20 bytes long in raw buffer format but are almost always encoded
in [Base 58 Check](./bsv-base58.md) format, which is a convenient format for
using on the internet. It is also robust against copy errors - if an error
occurs in copying, the address is no longer valid, meaning you are very unlikely
to send money to an address for which no one has the private key.

Addresses are derived from public keys, which in turn are derived from private
keys. Two convenience methods allow you to derive addresses either from the
public key or directly from the private key. For instance:

```javascript
let privateKey = bsv.PrivateKey.fromRandom()
let publicKey = bsv.PublicKey.fromPrivateKey(privateKey)
let address = bsv.Address.fromPublicKey(publicKey)
let address2 = bsv.Address.fromPrivateKey(privateKey)

console.log(address.toString())
// prints:
// 1JvFXyZMC31ShnD8PSKgN1HKQ2kGQLVpCt

console.log(address2.toString())
// prints:
// 1JvFXyZMC31ShnD8PSKgN1HKQ2kGQLVpCt
```

You can use mainnet or testnet. Everything is mainnet by default, but if you are
developing an app and want to do lots of testing without risking losing real
money, you may want to use testnet. For instance:

```javascript
let privateKey = bsv.PrivateKey.fromRandom('testnet')
let publicKey = bsv.PublicKey.fromPrivateKey(privateKey)
let address = bsv.Address.fromPublicKey(publicKey, 'testnet')
let address2 = bsv.Address.fromPrivateKey(privateKey, 'testnet')

console.log(address.toString())
// prints:
// n2DoUfi8oUkTALKdd3AvVeTTyWg1AQmXCD

console.log(address2.toString())
// prints:
// n2DoUfi8oUkTALKdd3AvVeTTyWg1AQmXCD
```

Mainnet addresses always start with a '1' and testnet addresses always start
either with an 'm' or an 'n'.

You can also read an address back in and print it back out again:
```javascript
let address = bsv.Address.fromString('1JvFXyZMC31ShnD8PSKgN1HKQ2kGQLVpCt')

console.log(address.toString())
// prints:
// 1JvFXyZMC31ShnD8PSKgN1HKQ2kGQLVpCt
```

Invalid addresses will throw an error if you try to read them in.

P2SH is a deprecated way to create addresses on Bitcoin SV. The way P2SH works
is that the output script is the hash of another script called the redeem
script. The redeem script is a third script contained inside a pushdata in the
spending input script. It is not recommended to use P2SH for anything, however
bsv will maintain support so long as this style of script is being created on
the blockchain.

The key difference for a P2SH address is that it is the hash of a script instead
of a public key and that in Base 58 format it starts with a '3' instead of a
'1'.

An example is:

```javascript
let script = bsv.Script.fromString('OP_RETURN')
let address = bsv.Address.payingTo(script)

console.log(address.toString())
// prints:
// 37gsHDLSG5TJvApGfiUZDaDo9mSr6rjLv6
```

This example shows you what a P2SH address looks like, but this script would not
actually work on the blockchain because the OP_RETURN would invalidate the
transaction.
