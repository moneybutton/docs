---
id: bsv-public-key
title: Public Keys
---

A public key is a key that is derived from a private key and under normal circumstances can be shared publicly. Public keys can be used for encryption, Diffie-Helman shared secrets, and deriving addresses for receiving money. Mathematically, a public key is a [point](./bsv-point.md) on the secp256k1 elliptic curve and it is equal to a private key times the  base point.

In bsv, the PublicKey class is wrapper of [Point](./bsv-point.md).

To generate a new private key and the corresponding public key, use:

```javascript
let privateKey = bsv.PrivateKey.fromRandom()
let publicKey = bsv.PublicKey.fromPrivateKey(privateKey)
```

If you wish to save or display a public key, you should use compressed hex format, and you can use the .toHex() method to do that. For example:

```javascript
console.log(publicKey.toHex())

// prints:
// 0340a908047b5aa865e48f6c5917bc04c9d45e50ed81b43d10798b6aebe2e55ed9
// ...or whatever your public key is corresponding to the private key.
```

You can import a public key and export it again:
```javascript
let str = '0340a908047b5aa865e48f6c5917bc04c9d45e50ed81b43d10798b6aebe2e55ed9'
let publicKey2 = bsv.PublicKey.fromHex(str)

console.log(publicKey2.toHex())
// prints:
// 0340a908047b5aa865e48f6c5917bc04c9d45e50ed81b43d10798b6aebe2e55ed9
```
