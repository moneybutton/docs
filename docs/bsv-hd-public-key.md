---
id: bsv-hd-public-key
title: HD Public Keys (BIP32)
---

Source code: [hdpublickey.js](https://github.com/moneybutton/bsv/blob/master/lib/hdpublickey.js)

Note that HD Public Keys are handled automatically by Money Button behind the scenes
and it is not necessary to deal with HD Public Keys directly unless you are building
an advanced application.

The HDPublicKey class is the public form of the HDPrivateKey class. Please see
the [HD Private Key](./bsv-hd-private-key.md) documentation for an important
theoretical overview and video of how these keys work.

HDPublicKey
-----------

Suppose one has generated a new cryptographically secure random extended private
key like this:

```javascript
let hdPrivateKey = bsv.HDPrivateKey.fromRandom()

console.log(hdPrivateKey.toString())
// prints:
// xprv9s21ZrQH143K2LcEfSnFRH1JvdKAcuZj2C8kAzCDnvqC4kgo417hYmAYQKdYDSzQSnQMLWXjDG42TgWwdYqwhAWTWpEBG1ighLLNnVHNKxx
```

We can use this to derive a corresponding extended public key like this:

```javascript
let hdPublicKey = bsv.HDPublicKey.fromHDPrivateKey(hdPrivateKey)

console.log(hdPublicKey)
// prints:
// xpub661MyMwAqRbcEpghmUKFnQx3Uf9f2NHaPR4LyNbqMGNAwZ1wbYRx6ZV2FaimDygDPbrHYuii12mYCNwFRWnvXXKnh12CK17XMFGiqUYNwew
```

Notice how the extended private key starts with "xprv" and the extended public
key starts with "xpub".

We can now derive corresponding keys. The private key can be used to derive
other private keys and public keys, and the public key can be used to derive
other public keys (but not private ones). Like so:

```javascript
var hdPrivateKey2 = hdPrivateKey.deriveChild("m/5/2/8").toString()

console.log(hdPrivateKey2.toString())
// prints:
// xprv9ymKnkscdL7pTQgQQVh4Depsm7Y4JZEbwQrhxGEvaawPe7CTk3LdGWyfxx7uCeCwL9YQpArGnXzGEUvVWNduXwByVDBPLHaQ67sGLSRiDHE

var hdPublicKey2 = hdPublicKey.deriveChild("m/5/2/8").toString()

console.log(hdPublicKey2.toString())
// prints:
// xpub6CkgCGQWThg7ftksWXE4anmcK9NYi1xTJdnJkeeY8vUNWuXcHaespKJ9pDF2bFVSCSrPrxipzQPfgf5MvR4cS8KBFthjSurBc2d7zmA61FZ
```

The xpub can derive other xpubs and the xprv can derive other xprvs. Using the
xprv we can derive this corresponding xpub:

```javascript
console.log(bsv.HDPublicKey.fromHDPrivateKey(hdPrivateKey2).toString())
xpub6CkgCGQWThg7ftksWXE4anmcK9NYi1xTJdnJkeeY8vUNWuXcHaespKJ9pDF2bFVSCSrPrxipzQPfgf5MvR4cS8KBFthjSurBc2d7zmA61FZ
```

But there is no way to derive the private key from the public key.

Now suppose we derive a hardened path:
```javascript
var hdPrivateKey2 = hdPrivateKey.deriveChild("m/5'/2/8").toString()

console.log(hdPrivateKey2.toString())
// prints:
// xprv9z79GdL4VLf2F69bZ3Zxem5zvVXMvngsHSge32HGUPsQgUEvMQdb7ATBVXtMzMYLjNb38F7J1d9gpWnhEYzCmoWJ8QYtGDWnYdwhJUjYQKK

var hdPublicKey2 = hdPublicKey.deriveChild("m/5'/2/8").toString()
// throws an error:
// Invalid argument: creating a hardened path requires an HDPrivateKey
```

The hardened extended private key is different than the non-hardened key, and
there is no way to derive any keys from the extended public key on a hardened
path.

You can always derive the public key from an extended public key:

```javascript
console.log(hdPublicKey.publicKey.toString())
// prints:
// 02c23e9fc6a959bb5315159ac7438c5a6bff37c7197326d1060b176e3969d72af5
```

But not the private key:

```javascript
console.log(hdPublicKey.privateKey
// prints:
// undefined
```

Given an extended public key which lies on a hardened path, it is possible to
derive a branch of non-hardened public keys. Here, using the private key, we
derive an extended public key on a hardened path:

```javascript
var hdPublicKey3 = hdPrivateKey.deriveChild("m/5'").hdPublicKey
console.log(hdPublicKey3.toString())
// prints:
// xpub69SAXkHK2SHsWU5hAxMMzFoRy4Je3GRusC7drBefmEvN8CpS4Cf9iGyFy9WNFMwgfYEZGkvGMVRm2h2ikFN38KSC1VftFMa669b3nrANzo6
```

Using this extended public key as the root of a branch, we now derive a child
public key on a non-hardened path:

```javascript
var hdPublicKey4 = hdPublicKey3.deriveChild("m/2/8")
console.log(hdPublicKey4.toString())
// prints:
// xpub6D6Vg8rxKiDKTaE4f56y1u2jUXMrLFQiefcEqQgt2jQPZGa4twwqexmfLoxAjHTqRweEt7c8qyUgcbdsuz8k9qaqoFSz6MFuZEJrB2BCrAE
```

This child public key is the same as if we had  usedthe private key with the
full derivation path.

```javascript
var hdPublicKey5 = hdPrivateKey.deriveChild("m/5'/2/8").hdPublicKey
console.log(hdPublicKey5.toString())
// prints:
// xpub6D6Vg8rxKiDKTaE4f56y1u2jUXMrLFQiefcEqQgt2jQPZGa4twwqexmfLoxAjHTqRweEt7c8qyUgcbdsuz8k9qaqoFSz6MFuZEJrB2BCrAE
````
