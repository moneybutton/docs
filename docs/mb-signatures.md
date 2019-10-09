---
id: mb-signatures
title: Paymail Signatures
---

# Overview

Paymail Signatures are a way to sign data on-chain with a paymail. The signature can be verified with ECDSA signature verification using the [Bitcoin Signed Message protocol](./bsv-message.md) and by confirming that the public key corresponds to the paymail using the paymail API. All of this is integrated seamlessly into Money Button allowing signatures and verification with a swipe.

Creating a signature is something that requires the user's private keys. Money Button does not expose private keys outside of the button. Instead, we expose a crypto API that can be used to sign data inside the button. The basic idea is to create variables that are replaced with signatures and other cryptographic data when the user swipes the button.

See the [crypto operations documentation](mb-crypto-operations.md) for an overview of the API. This document is specifically about creating and verifying paymail signatures.

## Creating a Signature

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
const content = 'This is an essay that I want to sign. I am the author of it.'
const outputs = [
  {
    amount: '0',
    currency: 'BSV',
    script: bsv.Script.buildSafeDataOut([content, '#{mySignature}', '#{myPublicKey}', '#{myPaymail}']).toASM()
  }
]
moneyButton.render(div, {
  label: 'sign',
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
    console.log(`User signature for their content is ${cryptoOperations[0].value},
      the public key used is ${cryptoOperations[1].value}
      the paymail of the user is ${cryptoOperations[2].value},
      and everything was broadcasted in the tx: ${payment.txid}`)
  }
})
```

Notice how the callback receives the data with operations applied. Supported data encodings are `utf8` and `hex`.

Note that in order to verify the signature later, it is important to record four things:
1. The data
2. The public key of the signer
3. The paymail of the signer
3. The signature

## Verifying a Signature

A signature can be verified with a swipe. The results of the signature operation can be put on-chain or can be kept off-chain. In this example we will verify a paymail signature off-chain, meaning the results are not written to the blockchain.

``` js
const content = 'This is an essay that I want to sign. I am the author of it.'
const recipientPaymail = 'ryan@moneybutton.com'
const publicKey = '0380a5d1b99a2b3adab57d2adf4a21aac246652aebd1a4da4668351074172b7ae2'
const signature = 'H5R/yvwy5q+IPs4uTRkk5GvqcDBEGX7GX53TyiS0JIw4BfhLluMic+YrOMd65Qi1bfz/uEOjNhhW5J8lUjJjEwI=,'
const outputs = [
  {
    amount: '0',
    currency: 'BSV',
    script: bsv.Script.buildSafeDataOut([content, '#{myVerification}', '#{myPublicKey}', '#{myPaymail}']).toASM()
  }
]
moneyButton.render(div, {
  label: 'verify',
  outputs,
  cryptoOperations: [
    {
      name: 'myVerification',
      method: 'verify',
      data: content,
      dataEncoding: 'utf8',
      paymail: recipientPaymail,
      publicKey,
      signature,
      key: 'identity', // default value
      algorithm: 'bitcoin-signed-message' // default value
    }
  ],
  onPayment: (payment) => {
    let cryptoOperations = payment.cryptoOperations
    console.log(`Signature verification value for inserting in tx is is ${cryptoOperations[0].value},
      Signature verified boolean is ${cryptoOperations[0].verified},
      and everything was broadcasted in the tx: ${payment.txid}
    `)
  }
})
```
