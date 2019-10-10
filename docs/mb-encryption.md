---
id: mb-encryption
title: Paymail Encryption
---
<iframe width="560" height="315" src="https://www.youtube.com/embed/FEs8-aCGvdQ" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

------------------------

## Overview

Paymail Encryption is a way to encrypt data on-chain. Users can encrypt data in three different ways:

1. Data that only they can decrypt.
2. Data that can be decrypted by a paymail.
3. Data that can be decrypted with a private key.

The developer must pass in the configuration of the encryption or decryption into the button. The user encrypts or decrypts with a swipe.

## Keys

* identity: The default user key. It's the one associated with their identity and is used to sign and encrypt most data.
* key: The name of a key or a derivation path inside a the tree of keys.

## On-Chain Encryption

Ths is how a typical config for an OP_RETURN button looks like:

``` js
const outputs = [
  {
    amount: '0',
    currency: 'BSV',
    script: bsv.Script.buildSafeDataOut(['Some public data'])
  }
]
moneyButton.render(someDiv, { outputs })
```

In order to encrypt data, we add variables that look like ```#{myCiphertext}``` and can have any variable name. These variables are replaced with the information specified in the ```cryptoOperations``` object:

``` js
const content = 'Some secret data'
const outputs = [
  {
    amount: '0',
    currency: 'BSV',
    script: bsv.Script.buildSafeDataOut(['#{myCiphertext}', '#{myPublicKey}', '#{myPaymail}']).toASM()
  }
]
moneyButton.render(div, {
  label: 'encrypt',
  outputs,
  cryptoOperations: [
    {
      name: 'myCiphertext',
      method: 'encrypt',
      data: content,
      dataEncoding: 'utf8',
      key: 'identity', // default value
      algorithm: 'electrum-ecies' // default value
    },
    {
      name: 'myPublicKey',
      method: 'public-key',
      key: 'identity' // default value
    },
    {
      name: 'myPaymail',
      method: 'paymail'
    }
  ],
  onPayment: (payment) => {
    let cryptoOperations = payment.cryptoOperations
    console.log(cryptoOperations)
    console.log(`The ciphertext is ${cryptoOperations[0].value},
      the public key used to encrypt data is ${cryptoOperations[0].publicKey},
      the public key of the user is (the same) ${cryptoOperations[1].value},
      the paymail of the user is ${cryptoOperations[2].value},
      and everything was broadcasted in the tx: ${payment.txid}`)
  }
})
```

Notice how the callback receives the data with operations applied. Supported data encodings are 'utf8' and 'hex'.

The above example shows how to encrypt data to one's self. That is to say, when the user swipes the button, it produces encrypted data that only they can decrypt.

It is also possible to encrypt data to a public key. Whoever has the private key corresponding to the public key can decrypt the data.

This is how you encrypt data to a specific public key:

``` js
const privKey = bsv.PrivateKey.fromRandom()
const pubKey = privKey.toPublicKey()
const content = 'Some secret data, encrypted to a third-party public key'
const outputs = [
  {
    amount: '0',
    currency: 'BSV',
    script: bsv.Script.buildSafeDataOut(['#{myCiphertext}', '#{myPublicKey}', '#{myPaymail}']).toASM()
  }
]
moneyButton.render(div, {
  label: 'encrypt pubkey',
  outputs,
  cryptoOperations: [
    {
      name: 'myCiphertext',
      method: 'encrypt',
      publicKey: pubKey.toString(),
      data: content,
      dataEncoding: 'utf8',
      key: 'identity', // default value
      algorithm: 'electrum-ecies' // default value
    },
    {
      name: 'myPublicKey',
      method: 'public-key',
      key: 'identity' // default value
    },
    {
      name: 'myPaymail',
      method: 'paymail'
    }
  ],
  onPayment: (payment) => {
    let cryptoOperations = payment.cryptoOperations
    console.log(cryptoOperations)
    console.log(`The ciphertext is ${cryptoOperations[0].value},
      the public key used to encrypt data is ${cryptoOperations[0].publicKey},
      the public key of the user is (different) ${cryptoOperations[1].value},
      the paymail of the user is ${cryptoOperations[2].value},
      and everything was broadcasted in the tx: ${payment.txid}`)
  }
})
```

It is possible to decrypt the data with a swipe. Usually, decryption is
something best done off-chain. If the user is decrypting data, it is usually for
consumption and not something you also want to put on-chain. It is possible to
decrypt data using the 'decrypt' method and also leaving 'outputs' of the button
blank, indicating that no transaction is to be created.

The following is an example of decryption. Please note that in this example the
ciphertext is not something you can decrypt, becauase you do not have the
correct private key. In order to use this example in practice, you must first
encrypt data, and then take the ciphertext from the output (the 'value' returned
by the 'encrypt' operation) and plug it back into the decrypt operation in the
'data' field.

``` js
const content = 'Some secret data'
moneyButton.render(div, {
  label: 'off-chain dec',
  cryptoOperations: [
    {
      name: 'myPlaintext',
      method: 'decrypt',
      publicKey: pubKey.toString(),
      data: '4249453102e15f758a543b2aeeb7d82b836d215c7ab5d804313ce9de0b205c4b009a60b11754f0ff368b2a676dbabd4363e681581783cb9a569cebbfc265c110db9481e61c9c76a4bfd79f4f733b607e4308b0c110e7c2bb269b2ed34e21f6d15fd46fbee1',
      valueEncoding: 'utf8',
      key: 'identity', // default value
      algorithm: 'electrum-ecies' // default value
    },
    {
      name: 'myPublicKey',
      method: 'public-key',
      key: 'identity' // default value
    },
    {
      name: 'myPaymail',
      method: 'paymail'
    }
  ],
  onPayment: (payment) => {
    console.log('payment id:', payment.id)
  },
  onCryptoOperations: (cryptoOperations) => {
    console.log(cryptoOperations)
    console.log(`The plaintext is ${cryptoOperations[0].value},
      the public key used to encrypt data is ${cryptoOperations[0].publicKey},
      the public key of the user is (different) ${cryptoOperations[1].value},
      the paymail of the user is ${cryptoOperations[2].value}
    `)
  }
})
}
```
