---
id: mb-crypto-operations
title: Crypto Operations
---

<iframe width="560" height="315" src="https://www.youtube.com/embed/i3M72M4E9OI" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

----------------------------

## Overview

Money Button is a non-custodial Bitcoin SV (BSV) wallet. By swiping Money Button, the
users are signing BSV transactions with their keys. The users have full
control over their keys and apps cannot access them (nor can our own company).

The same keys used to sign BSV transactions can also be used to sign other
data, such as signing a photo uploaded to the blockchain to prove or assert
authorship.

Further, those same keys can also be used to encrypt and decrypt data. For
instance, a user could encrypt their own data, such as photos, and store them
privately to the blockchain. Or user could encrypt data for other users, such as
in an encrypted messaging application, and only the recipient of the message has
the ability to decrypt the data.

In order to make these functions possible, Money Button has created the Crypto
Operations API. The basic idea of Crypto Operations is that the developer
specfies which cryptographic operations are to be performed, such as `sign` or
`encrypt`, and those operations are performed when the users swipes.

The results of the operations can be placed into the transaction through the use
of variable replacements, or, if no outputs are specified, the operations are
performed off-chain.

In particular, signing and encrypting data will be usually done on-chain, but
decrypting data will usually be done off-chain, because the user does not want
their decrypted data to be visible to others.

## Signing Data with a Paymail

This document gives an overview of the Crypto Operations API. It is explanatory
to start with a simple example of signing data, followed by the details of the
API. More complicated examples can be found on the [paymail
signatures](mb-signatures.md) and [paymail encryption](mb-encryption.md)
documentation.

Here is an example of a button that signs data with the user's paymail. The
signature itself is inserted into the transaction `OP_RETURN` output.
Additionally, the paymail, public key, and the data itself are also inserted
into the output.

First, load the correct libraries (Money Button and our bsv library):

``` html
<script src="https://www.moneybutton.com/moneybutton.js"></script>
<script type="text/javascript" src="https://unpkg.com/bsv@0.30.0/bsv.min.js"></script>
```

Second, create a button:
``` html
<div id='my-money-button'></div><br/>
```

Finally, create the code with the correct crypto operations:

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
    console.log(cryptoOperations)
    console.log(`User signature for their content is ${cryptoOperations[0].value},
      the public key used is ${cryptoOperations[1].value}
      the paymail of the user is ${cryptoOperations[2].value},
      and everything was broadcasted in the tx: ${payment.txid}`)
  }
})
```

Let's go over this example. First, we need to create an outputs object with a
script with these variables inside:

``` js
script: bsv.Script.buildSafeDataOut([content, '#{mySignature}', '#{myPublicKey}', '#{myPaymail}']).toASM()
```

The variables are `#{mySignature}`, `#{myPublicKey}`, and `#{myPaymail}`.

Next, we create a list of operations and pass it into the button. The operations
each have a `method` that replaces the variable specified by `name` with the
result in the `value`.

``` js
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
```

The three operations are `sign` (create a signature), `public-key` (return the
user's public key), and `paymail` (return the user's paymail).

The `onPayment` callback prints out the results. The results look something like
this (they will look a bit different for you becase you have a different paymail
and a different key):

```
User signature for their content is H3LheWtnPU3lW7tuNH4GkH2EAPMsNLAHkReTTPOC4f7tGXUBfNKQ4w7qnZGDDz7UmAvmRVy6pH1F0ak58GOrOoA=,
      the public key used is 0380a5d1b99a2b3adab57d2adf4a21aac246652aebd1a4da4668351074172b7ae2
      the paymail of the user is ryan@moneybutton.com,
      and everything was broadcasted in the tx: 9007fa863781ebfe80f2c7999972a1cff0bbb9ce1e7f3cb6eacb5ac971170227
```

It is also instructive to look at the output of the cryptoObject itself. You can
use the `payment.cryptoOperations` object or use the `onCryptoOperations`
callback to retrieve this data. Let's do it both ways. We will modify the above
button to have both callbacks as follows:

``` js
moneyButton.render(div, {
  // ...
  onPayment: (payment) => {
    let cryptoOperations = payment.cryptoOperations
    console.log(cryptoOperations)
  },
  onCryptoOperations: (cryptoOperations) => {
    console.log(cryptoOperations)
  }
```

Both of the callbacks print the same thing. The output is this JSON object:
``` js
[ { name: 'mySignature',
    method: 'sign',
    data:
     'This is an essay that I want to sign. I am the author of it.',
    dataEncoding: 'utf8',
    value:
     'IGwP+yerVmJ2+BwqCeprRw9mNdzk4J5cbCLbHOqYLVJGC7xOSWGVRUkE10r6Y9VcGatDRVc+LTREwUAOJTTqjWY=',
    valueEncoding: 'utf8',
    key: 'identity',
    algorithm: 'bitcoin-signed-message',
    id: '1' },
  { name: 'myPublicKey',
    method: 'public-key',
    value:
     '02e15f758a543b2aeeb7d82b836d215c7ab5d804313ce9de0b205c4b009a60b117',
    valueEncoding: 'hex',
    key: 'identity',
    paymail: 'test1@buttonofmoney.com',
    id: '2' },
  { name: 'myPaymail',
    method: 'paymail',
    value: 'test1@buttonofmoney.com',
    valueEncoding: 'utf8',
    id: '3' } ]
```

You can see what has happened is that the `value` of the method has been
inserted into each method object. (Note, again, that your values will differ
because you have different keys.)

Meanwhile, we can grab the transaction and parse the output with the script in
it (see [bsv documentation](bsv-overview.md)). The script looks like this:

```
0 OP_RETURN 5468697320697320616e206573736179207468617420492077616e7420746f207369676e2e204920616d2074686520617574686f72206f662069742e 48334c686557746e5055336c573774754e4834476b48324541504d734e4c41486b52655454504f433466377447585542664e4b51347737716e5a4744447a37556d41766d525679367048314630616b3538474f724f6f413d 0380a5d1b99a2b3adab57d2adf4a21aac246652aebd1a4da4668351074172b7ae2 7279616e406d6f6e6579627574746f6e2e636f6d
```

The values inside are:

| attribute  | value                                                                                    | hex encoded                                                                                                                                                                      |
|------------|------------------------------------------------------------------------------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| data       | This is an essay that I want to sign. I am the author of it.                             | 5468697320697320616e206573736179207468617420492077616e7420746f207369676e2e204920616d2074686520617574686f72206f662069742e                                                         |
| signature  | H3LheWtnPU3lW7tuNH4GkH2EAPMsNLAHkReTTPOC4f7tGXUBfNKQ4w7qnZGDDz7UmAvmRVy6pH1F0ak58GOrOoA= | 48334c686557746e5055336c573774754e4834476b48324541504d734e4c41486b52655454504f433466377447585542664e4b51347737716e5a4744447a37556d41766d525679367048314630616b3538474f724f6f413d |
| public key | 0380a5d1b99a2b3adab57d2adf4a21aac246652aebd1a4da4668351074172b7ae2                       | 0380a5d1b99a2b3adab57d2adf4a21aac246652aebd1a4da4668351074172b7ae2                                             |
| paymail    | ryan@moneybutton.com                                                                     | 7279616e406d6f6e6579627574746f6e2e636f6d                                                                                                                                         |

Please see the [paymail signatures documentation](mb-signatures.md) or [paymail
encryption documentation](mb-encryption.md) for more information about those
specific features.

## Crypto Operations Methods and Attributes

We provide six methods:

* `sign`
* `verify`
* `encrypt`
* `decrypt`
* `public-key`
* `address`
* `paymail`

The `cryptoOperations` array must be an array containing objects with a `method`
(one of the above method names) and a `name` which is a variable name
consistenting of latin characters that you choose.

Each method takes a number of arguments and copies the object, adds properties
to the object, and returns the object back to the app.

When the operations are performed, they are added to the `payment` and also
called via the `onCryptoOperations` callback. If there are no outputs, then
there is no payment, but the `onCryptoOperations` callback will still be called.
This allow crypto operations to be performed off-chain, which is useful for
decryption.

### Method: sign

Sign data with a particular key. For now, the only option is to sign with the
identity key.

Attributes:

* `name`: A string specifying the name of the variable to be replaced in output scripts. The string must be all latin characters.
* `method`: Must be `sign`.
* `data`: The data to be signed. Can be either a utf8 string or a hex encoded string.
* `dataEncoding`: The encoding of the data to be signed. Must be either `utf8` or `hex`.
* `key`: Must be `identity`.
* `algorithm`: Must be `bitcoin-signed-message`. This refers to the [Bitcoin Signed Message signature format](bsv-message.md).

When `sign` is performed, the object is copied, and these attributes are placed into the object:

* `value`: The signature. It is a string (base 64 encoded). This value is placed in the script as a substitute for `name`.
* `valueEncoding`: Always `utf8`.

### Method: verify

Verify a signature with a particular array of signature, paymail, public key,
and data. You must specify either paymail or public key or both.

Attributes:

* `name`: A string specifying the name of the variable to be replaced in output scripts. The string must be all latin characters.
* `method`: Must be `verify`.
* `data`: The data to be verified. Can be either a utf8 string or a hex encoded string.
* `dataEncoding`: The encoding of the data to be verified. Must be either `utf8` or `hex`.
* `signature`: The signature to be verified.
* `paymail`: The paymail to be verified. This is optional, but if it is not present, then `publicKey` must be present.
* `publicKey`: The public key to be verified. This is optional, but if it is not present, then `paymail` must be present.
* `key`: Must be `identity`.
* `algorithm`: Must be `bitcoin-signed-message`. This refers to the [Bitcoin Signed Message signature format](bsv-message.md).

When `verify` is performed, the object is copied, and these attributes are placed into the object:

* `value`: A hex value of either `01` indicating the signature was valid, or `00` indicating the signature was not valid. This value is placed in the script as a substitute for `name`.
* `valueEncoding`: Always `hex`.
* `verified`: A boolean value of either `true` indicating the signature was valid, or `false` indicating the signature was not valid.

### Method: encrypt

Encrypt data in either utf8 string or hex format. The only encryption algorithm
available at this time is Electrum ECIES, also called BIE1. This allows one to
encrypt data to a public key. This can be used to encrypt one's own data, or to
encrypt data that can only be decrypted by someone else with a particular key.

Attributes:

* `name`: A string specifying the name of the variable to be replaced in output scripts. The string must be all latin characters.
* `method`: Must be `encrypt`.
* `data`: The data to be encrypted. Can be either a utf8 string or a hex encoded string.
* `dataEncoding`: The encoding of the data to be verified. Must be either `utf8` or `hex`.
* `paymail`: The paymail to encrypt the data to. This is optional.
* `publicKey`: The public key to encrypt data to. Is only used if paymail is not present. If neither `paymail` nor `publicKey` are present, then the data is encrypted to the swiping user.
* `key`: Must be `identity`.
* `algorithm`: Must be `electrum-ecies`.

When `encrypt` is performed, the object is copied, and these attributes are placed into the object:

* `value`: The encrypted data in the form of a hex string.
* `data`: This value is always `null` so that the plaintext data is never stored in the Money Button database.

### Method: decrypt

Decryption is different than the other methods in that it is usually not the
case that you want to put decrypted data on-chain. Instead, you want to take
encrypted data on-chain and decrypt it off-chain. To facilitate this, we provide
the option of doing off-chain button swipes. Each button has a list of
`outputs`. Leave `outputs` blank to indicate that a payment is not occurring.
Then you can use the `onCryptoOperations` callback to receive the decrypted data
without worring that it will be posted to the blockchain. Note that any of the
other crypto operations can also be performed off-chain if desired.

* `name`: A string specifying the name of the variable to be replaced in output scripts. The string must be all latin characters.
* `method`: Must be `decrypt`.
* `data`: The data to be decrypted. It is always in the form of a hex encoded string.
* `dataEncoding`: Must be `hex`.
* `valueEncoding`: The encoding of the plaintext. This must correspond to the `dataEncoding` used to encrypt the data. It is either `utf8` or `hex`.
* `key`: Must be `identity`.
* `algorithm`: Must be `electrum-ecies`.

When `decrypt` is performed, the object is copied, and these attributes are
placed into the object:

* `value`: The decrypted data in the form of a utf8 string or a hex string.
* `data`: This value is always `null` so that the plaintext data is never stored in the Money Button database.

### Method: public-key

In order to verify a signature, you usually need the public key used to encrypt
the data. You can write the public key of the button swiper using this simple
method.

* `name`: A string specifying the name of the variable to be replaced in output scripts. The string must be all latin characters.
* `method`: Must be `public-key`.
* `key`: Must be `identity`.

When `decrypt` is performed, the object is copied, and these attributes are
placed into the object:

* `value`: The public key of the button swiper in the form of a hex string.

### Method: address

In order to verify a signature, sometimes you need the address of the public key
used to encrypt the data. You can write the address of the button swiper using
this simple method.

Please note that this address is **not** for receiving payments. It is simply
the hash of the public key used for identity. Do not send payments to this
address.

* `name`: A string specifying the name of the variable to be replaced in output scripts. The string must be all latin characters.
* `method`: Must be `address`.
* `key`: Must be `identity`.

When `address` is performed, the object is copied, and these attributes are placed into the object:

* `value`: The address of the button swiper in the form of a base58 string.

### Method: paymail

In order to verify a signature, you usually need the paymail used to encrypt
the data. You can write the paymail of the button swiper using this simple
method.

* `name`: A string specifying the name of the variable to be replaced in output scripts. The string must be all latin characters.
* `method`: Must be `paymail`.
* `key`: Must be `identity`.

When `paymail` is performed, the object is copied, and these attributes are
placed into the object:

* `value`: The paymail of the button swiper in the form of a utf8 string.
