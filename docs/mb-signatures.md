---
id: mb-signatures
title: Paymail Signatures
---

# Overview

Paymail Signatures are a way to sign data on-chain with a paymail. The signature can be verified with ECDSA signature verification and by confirming that the public key corresponds to the paymail using the paymail API.

Creating a signature is something that requires the user's private keys. Money Button does not expose private keys outside of the button. Instead, we expose a crypto API that can be used to sign data inside the button. The basic idea is to create variables that are replaced with signatures and other cryptographic data when the user swipes the button.

## Keys

* identity: The default user key. It's the one asociated with their identity and is used to sign and encrypt most data.
* key: The name of a key or a derivation path inside a the tree of keys.

## On-Chain Signatures

Ths is how a typical config for an OP_RETURN button looks like:

``` js
const outputs = [
  {
    amount: '0',
    currency: 'BSV',
    script: bsv.Script.buildSafeDataOut(['Some original content'])
  }
]
moneyButton.render(someDiv, { outputs })
```

In order to add a signature, we add variables that look like ```#{mySignature}``` and can have any variable name. These variables are replaced with the information specified in the ```cryptoOperations``` object:

``` js
const content = 'This is my essay'
const outputs = [
  {
    amount: '0',
    currency: 'BSV',
    script: bsv.Script.buildSafeDataOut([content, '#{mySignature}', '#{myPublicKey}', '#{myPaymail}']).toASM()
  }
]
moneyButton.render(div, {
  outputs,
  cryptoOperations: [
    {
      name: 'mySignature',
      method: 'sign',
      data: content,
      dataEncoding: 'utf8',
      key: 'identity', // default value
      algorithm: 'bitcoin-signed-message' // default value
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
    console.log(`User signature for their content is ${cryptoOperations[0].value},
      the public key used is ${cryptoOperations[1].value}
      the paymail of the user is ${cryptoOperations[2].value},
      and everything was broadcasted in the tx: ${payment.txid}`)
  }
})
```

Notice how the callback receives the data with operations applied. Supported data encodings are 'utf8' and 'hex'.
