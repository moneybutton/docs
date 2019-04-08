---
id: bsv-public-key
title: Public Keys
---

<iframe width="560" height="315" src="https://www.youtube.com/embed/wYpifoXE7H0" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

--------------------------------

Source code: [publickey.js](https://github.com/moneybutton/bsv/blob/master/lib/publickey.js)

Note that public keys are handled automatically by Money Button behind the scenes
and it is not necessary to deal with public keys directly unless you are building
an advanced application.

A public key is a key that is derived from a private key and under normal
circumstances can be shared publicly. Public keys can be used for encryption,
Diffie-Helman shared secrets, and deriving addresses for receiving money.
Mathematically, a public key is a [point](./bsv-point.md) on the secp256k1
elliptic curve and it is equal to a private key times the  base point.

In bsv, the PublicKey class is wrapper of [Point](./bsv-point.md).

To generate a new private key and the corresponding public key, use:

```javascript
let privateKey = bsv.PrivateKey.fromRandom()
let publicKey = bsv.PublicKey.fromPrivateKey(privateKey)
```

If you wish to save or display a public key, you should use compressed hex
format, and you can use the .toHex() method to do that. For example:

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

Notice how the length is 33 bytes:
```javascript
console.log(publicKey2.toBuffer().length)
// prints:
// 33
```

That is because public keys are normally in compressed format, which means only
the X value of the point is included. The y can be either odd or even, and the
first byte of the buffer indicates that. The Y value can then be derived from
the X value. See the [point](./bsv-point.md) documentation for more information.

Although you will probably never need to do so in practice, you can convert a
public key to uncompressed format this way:

```javascript
let publicKey3 = bsv.PublicKey.fromPoint(publicKey2.point, false)

console.log(publicKey3.toHex())
// prints:
// 0440a908047b5aa865e48f6c5917bc04c9d45e50ed81b43d10798b6aebe2e55ed9316ff7efb4bad174108f7d8d68635178c5f93145ab30dca239d815f8ac8a2e4b

console.log(publicKey3.toBuffer().length)
// prints:
// 65
```

Notice how in this case the public key is 65 bytes long as a buffer. The extra
byte indicates that it is in uncompressed format. You can confirm by eye that
the bytes 1 through 33 are in fact the same as the uncompressed form - that is
the X value.

You can print out the point like this:

```javascript
console.log(publicKey3.point.getX().toString())
// prints:
// 29246674798077863133660435020507606994691259363264582031446921457222776348377

console.log(publicKey3.point.getY().toString())
// prints:
// 22361160798578429449991880814502461758948300840999541549272530012209202998859

console.log(publicKey3.compressed)
// prints:
// false

console.log(publicKey2.point.getX().toString())
// prints:
// 29246674798077863133660435020507606994691259363264582031446921457222776348377

console.log(publicKey2.point.getY().toString())
// prints:
// 22361160798578429449991880814502461758948300840999541549272530012209202998859

console.log(publicKey2.compressed)
// prints:
// true
```

Notice how both public keys have the same point, but one is compressed and the
other is not.
