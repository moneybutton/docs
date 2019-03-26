---
id: bsv-message
title: Bitcoin Signed Messages
---

<iframe width="560" height="315" src="https://www.youtube.com/embed/FonrSDyUqjI" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

----------------------

Source code: [message.js](https://github.com/moneybutton/bsv/blob/master/lib/message/message.js)

There is a standard way to sign arbitrary non-transaction data with a Bitcoin
private key that is appropriate for any type of authentication such as signing a
public statement of ownership of a particular Bitcoin address. The standard is
sometimes called [Bitcoin Signed
Message](https://github.com/bitcoin/bitcoin/pull/524).

One interesting property of this format is that it allows someone to share an
address rather than a public key. Anyone can verify the signed message in an
unusual way, which is by deriving the public key from the signature. A number of
candidate public keys are derived and compared against the address. If one of
the public keys matches, then that is the correct public key, and normal [ECDSA
signature verification](./bsv-ecdsa.md) can be performed.

Because "Message" is not something that is used by all applications, it is
separated from the rest of the library and must be included on its own.

Here is an example of signing and verifying a message with Message:

```javascript
var Message = require('bsv/message')
var bsv = require('bsv')
var privateKey = bsv.PrivateKey.fromRandom()
var address = privateKey.toAddress()
var message = "this is the message that i want to sign"
var sig = Message.sign(message, privateKey)
console.log(sig.toString())
// prints:
// H/kgM5HZYfmP9u1l50cuGwb/Hr3liZS8VfHg1JsL9EuHOux2n9pCStyPV0pOTKJp22ekSUeq8zRATOQvrORPw7E=
var verify = Message.verify(message, address, sig)
console.log(verify)
// prints:
// true
```
