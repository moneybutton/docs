---
id: bsv-private-key
title: Private Keys
---

A private key can be used to spend Bitcoin. A private key is to be kept private - normally, a user should not share their private key. Anyone who has access to the private key can spend funds. A private key can be used to derive a corresponding public key, and a public key can be used to derive an address.

In bsv, the PrivateKey class is wrapper of [Big Number](./bsv-bn.md). It is a 256 bit big number.

To generate a new, cryptographically secure random private key, use:

```javascript
let privKey = bsv.PrivateKey.fromRandom()
```

Bitcoin has two networks - mainnet (the real network) and testnet. Use the testnet network for testing. You can create a private key on testnet, which is formatted differently:

```javascript
let privateKey = bsv.PrivateKey.fromRandom('testnet')
```

Normally, you should output a private key into Wallet Import Format (WIF). This is a [Base 58 Check](./bsv-base58.md) formatted string. It contains an extra byte, 'compressed', to indicate whether the corresponding public key is compressed or not. Normally, the public key is compressed.

To display the WIF private key, use:

```javascript
console.log(privateKey.toWIF())

// prints:
// Kwn6yDoKobVjH2dqa9UZ4c5yXfUQQo6PxdQCTknbRW85LeyYxTbp
// ...or whatever your randomly generated private key is.
```

You can import a private key and export it again:
```javascript
let str = 'Kwn6yDoKobVjH2dqa9UZ4c5yXfUQQo6PxdQCTknbRW85LeyYxTbp'
let privateKey2 = bsv.PrivateKey.fromWIF(str)

console.log(privateKey2.toWIF())
// prints:
// Kwn6yDoKobVjH2dqa9UZ4c5yXfUQQo6PxdQCTknbRW85LeyYxTbp
```
