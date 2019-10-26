---
id: bsv-hd-private-key
title: HD Private Keys (BIP32)
---

<iframe width="560" height="315" src="https://www.youtube.com/embed/twXnPw9VR8Q" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

------------------

Source code: [hdprivatekey.js](https://github.com/moneybutton/bsv/blob/master/lib/hdprivatekey.js)

Note that HD Private Keys are handled automatically by Money Button behind the scenes
and it is not necessary to deal with HD Private Keys directly unless you are building
an advanced application.

Theoretical Overview
--------------------

The original Bitcoin wallet held a bag of randomly generated private keys and
addresses. This method has good security properties because even if one private
key were compromised that gives the attacker no information about the remaining
private keys. However, it has poor usability properties. Users need to back up
their wallet frequently, which can be difficult.

An alternate was developed called "hierarchical deterministic keys", which is
where one master key can be used to derive all other keys. That way, a wallet
only needs to be backed up one time.

A standard type of hierarchical deterministic (HD) key structure was developed
called [BIP 32](https://github.com/bitcoin/bips/blob/master/bip-0032.mediawiki).
BIP 32 is the most widely used HD wallet structure today.

bsv comes with built-in support for BIP 32 in the form of the classes
HDPrivateKey and HDPublicKey.

The way this works is roughly as follows:

An "extended private key", or "xprv", or hdPrivateKey, can be used to derive a
another key with a number called an index. That key can, in turn, be used to
derive yet another key. Thus, the key structure is hierarchical.

For instance, consider this path:

```html
m/5/2/8
```

This path means "starting from the master key (m), derive the 5th key, then from
that key derive the second key, then from that key derive the eight key."

Paths always start with an "m" and the number are can be anywhere from 0 to the
maximum 31 bit integer (yes, 31).

Paths can also have "hardened" keys, which is denoted like this:

```html
m/5'/2/8
```

In this case, the 5' is hardened, and it means "derive the 5th key from the
master key in such a way that it can only be derived from the extended private
key, but not the extended public key."

Paths that are *not* hardened can be derived either from the extended private
key or the extended public key. This means it is possible to share an extended
public key with someone and for them to be able to derive more of your public
keys.

Here are some more concrete definitions of extended keys:

| Key                                 | Definition                                                                                                                 |
|-------------------------------------|----------------------------------------------------------------------------------------------------------------------------|
| Extended Private Key (HDPrivateKey) | A 256 bit private key and a 256 bit chain code. Any non-hardened path or hardened path can be derived.                     |
| Extended Public key (HDPublicKey)   | A 256 bit public key and a 256 bit chain code. Any non-hardened path can be derived, but hardened paths cannot be derived. |

The idea of deriving one key from another works as follows. Suppose we have a
private key p and public key P, which have the formula P = pG.

It is possible to add numbers and points together. Generated a big number (chain
code) c and then note that a series of new keys can be derived aC = aCG for any
positive integer a.

Now note that we can add these to our original key:

P' = (P + aC) = (p + ac) G = p'G

Thus anyone who has the public key P and "public chain code" and index number aC
can generate new public keys P' to which only the owner who has private key p
can generate the corresponding private key p' = (p + ac).

This is the theory of deterministic keys.

Now the only problem with this approach is that we may wish to share a key with
someone in such a way that they have no ability to derive a particular subset of
the other keys (the hardened ones - they can always derive the non-hardened
ones). So in that case we simply share the public chain code C with them but
generate the private chain code c in such a way that it requires the private key
that is not shared, like c = hash(p).

That is the theory of hardened deterministic keys.

BIP 32 refines these ideas and creates a detailed, secure standard spec that
includes encodings. Extended public keys are encoded in Base 58 Check and always
start with the prefix "xpub" and extended private keys are encoded in Base 58
Check and always start with the prefix "xprv".

HDPrivateKey
------------

One can generate a new cryptographically secure random extended private key like
this:

```javascript
let hdPrivateKey = bsv.HDPrivateKey.fromRandom()

console.log(hdPrivateKey.toString())
// prints:
// xprv9s21ZrQH143K2LcEfSnFRH1JvdKAcuZj2C8kAzCDnvqC4kgo417hYmAYQKdYDSzQSnQMLWXjDG42TgWwdYqwhAWTWpEBG1ighLLNnVHNKxx
```

An extended private key can be recovered from a string like this:
```javascript
let hdPrivateKey2 = bsv.HDPrivateKey.fromString('xprv9s21ZrQH143K2LcEfSnFRH1JvdKAcuZj2C8kAzCDnvqC4kgo417hYmAYQKdYDSzQSnQMLWXjDG42TgWwdYqwhAWTWpEBG1ighLLNnVHNKxx')

console.log(hdPrivateKey2.toString())
// prints:
// xprv9s21ZrQH143K2LcEfSnFRH1JvdKAcuZj2C8kAzCDnvqC4kgo417hYmAYQKdYDSzQSnQMLWXjDG42TgWwdYqwhAWTWpEBG1ighLLNnVHNKxx
```

This key is longer than a normal private key because it includes a "chain code",
which is the number that factors into deriving new keys from this one.

Here is how we can derive a new key from this one:

```javascript
let hdPrivateKey3 = hdPrivateKey.deriveChild("m/5/2/8").toString()

console.log(hdPrivateKey3.toString())
// prints:
// xprv9ymKnkscdL7pTQgQQVh4Depsm7Y4JZEbwQrhxGEvaawPe7CTk3LdGWyfxx7uCeCwL9YQpArGnXzGEUvVWNduXwByVDBPLHaQ67sGLSRiDHE
```

Here is how we can derive a *hardened* extended private key from this one:

```javascript
let hdPrivateKey4 = hdPrivateKey.deriveChild("m/5'/2/8").toString()

console.log(hdPrivateKey4.toString())
// prints:
// xprv9z79GdL4VLf2F69bZ3Zxem5zvVXMvngsHSge32HGUPsQgUEvMQdb7ATBVXtMzMYLjNb38F7J1d9gpWnhEYzCmoWJ8QYtGDWnYdwhJUjYQKK
```

Notice how these keys are different. The hardened keys and non-hardened keys are NOT the same.

You can always derive the private key from an extended private key:

```javascript
console.log(hdPrivateKey.privateKey.toString())
// prints:
// L3U2vMqEB6mdp1MHeStxjErAJTY86v2SBmc79yJRMg9QsXEjjupz
```

As well as the public key:

```javascript
console.log(hdPrivateKey.publicKey.toString())
// prints:
// 02c23e9fc6a959bb5315159ac7438c5a6bff37c7197326d1060b176e3969d72af5
```

Wallet Paths
------------

There is a standard called [BIP
44](https://github.com/bitcoin/bips/blob/master/bip-0044.mediawiki) that
specifies a standard path structure for deriving new keys from HD keys. Money
Button uses BIP 44. The path for Money Button is:

```html
m/44'/0'/0'
```

All Money Button wallet keys are derived from a master key using this path.
