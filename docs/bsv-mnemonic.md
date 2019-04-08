---
id: bsv-mnemonic
title: Mnemonics (BIP39)
---

<iframe width="560" height="315" src="https://www.youtube.com/embed/IQYN-QqGXAI" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

--------------------

Source code: [mnemonic.js](https://github.com/moneybutton/bsv/blob/master/lib/mnemonic/mnemonic.js)

Note that mnemonics are handled automatically by Money Button behind the scenes
and it is not necessary to deal with mnemonics directly unless you are building
an advanced application.

Overview of Mnemonics
---------------------

Using [hierarchical keys](./bsv-hd-private-key.md) solves many problems with
wallets, particularly allowing uses to back up a single key once without having
to regularly back up their wallet with every payment. However, there is still a
problem - a master key is a very long, random string of digits that is painful
to write down.

An example of a master extended private key is this:

```javascript
var hdPrivateKey = bsv.HDPrivateKey.fromRandom()
console.log(hdPrivateKey.toString())
// prints:
// xprv9s21ZrQH143K4aBZYZJ5XZCcPwuUCug5AuWmVMT7X59v5YAh6ApuqAbVLCEWRiXRSJWnN9bb8BELjKavgmFC8uAsTNEenT7VtCEd3n2k53j
```

It would be very annoying for users if they had to write down this string of
digits to back up their wallet.

Fortunately, there is another way using a standard called [BIP
39](https://github.com/bitcoin/bips/blob/master/bip-0039.mediawiki) for
generating random mnemonics which can be converted into master extended private
keys.

The Mnemonic library must be included separately from bsv. That is because it
contains long word lists for several different languages, and that consumes lots
of data. If your app doesn't need mnemonics, you don't want to have to include
these long word lists in browser-side applications.

A mnemonic looks like this:

```javascript
var Mnemonic = require('bsv/mnemonic')
var mnemonic = Mnemonic.fromRandom()

console.log(mnemonic.toString())
// prints:
// certain dust pave crane renew multiply stone stuff proud flee fancy knee
```

These words are much easier to write down than the random digits of an extended private key.

The way mnemonics work is several fold:

* A standardized list of 2048 words is provided in a certain language. Support languages are English, Spanish, Italian, French, Chinese and Japanese.
* Entropy is generated in the form of a random buffer (entropy) that is either 128 bits or 256 bits long. For most cases, 128 bits is adequate and that is the default because it results in a smaller number of words that are easier to write down.
* The seed is hashed to create a checksum of 32 bits long.
* Then a list of words are picked 11 bits at a time from the 2048 words.

The way the checksum is added to the end of the entropy buffer depends on the
length of the entropy buffer, and is described by this table from teh BIP 39
spec:

> "The following table describes the relation between the initial entropy length
> (ENT), the checksum length (CS) and the length of the generated mnemonic
> sentence (MS) in words."

```
CS = ENT / 32
MS = (ENT + CS) / 11
```
| ENT | CS | ENT+CS | MS |
|-----|----|--------|----|
| 128 | 4  | 132    | 12 |
| 160 | 5  | 165    | 15 |
| 192 | 6  | 198    | 18 |
| 224 | 7  | 231    | 21 |
| 256 | 8  | 264    | 24 |

In the case of a 128 bit entropy buffer, the result is that 12 words are
generated. The words include the checksum, meaning that if a word is written
down wrongly, it will be invalid, making it possible to detect and recover from
errors.

A mnemonic may have an additional password. If the user chooses to add a
password, the password is added to the mnemonic as though it were a 13th word
before converting it into an extended private key.

After the list of words are settled on (either with or without an additional
password), the words are converted into a buffer by running a PBKDF2 hash
function resuling in a 512 bit value (or 64 bytes). This value is long enough
that 32 bytes can be used for a private key and the remaining 32 bytes can be
used for a chain code in a BIP 32 extended private key.

To generate an extended private key from a mnemonic, one can either output the
seed and then input that into HDPrivateKey, or use the convenience method called
.toHDPrivateKey():

```javascript
var hdPrivateKey = bsv.HDPrivateKey.fromSeed(mnemonic.toSeed())
console.log(hdPrivateKey.toString())
// prints:
// xprv9s21ZrQH143K3ADYnTvGdWXEhuNPzxVfCyrX4AJDdPPentd3Y4FBcSmpsq9VFt7d3p4FezxDai42E4GtFuztakMbncHidubsmJqpVy6Sjbg
> var hdPrivateKey = mnemonic.to
mnemonic.toLocaleString  mnemonic.toString

mnemonic.toHDPrivateKey  mnemonic.toSeed
// or:

var hdPrivateKey = mnemonic.toHDPrivateKey()
console.log(hdPrivateKey.toString())
// prints:
// xprv9s21ZrQH143K3ADYnTvGdWXEhuNPzxVfCyrX4AJDdPPentd3Y4FBcSmpsq9VFt7d3p4FezxDai42E4GtFuztakMbncHidubsmJqpVy6Sjbg
```

Either method will result in the same extended private key, of course.

The default language is English. The possible language options are:

ENGLISH, SPANISH, ITALIAN, FRENCH, CHINESE, JAPANESE

Here is an example generating a mnemonic in Spanish:
```javascript
var mnemonic = Mnemonic.fromRandom(Mnemonic.Words.SPANISH)
console.log(mnemonic.toString())
// prints:
// bozal nudo cama típico sombra vacío salmón arnés lacio trabajo votar vehículo
```

Overview of BIP 44 Wallets
--------------------------

Mnemonics (BIP 39) are often used in combination with hierarchical determistic
keys (extended private keys and extended public keys, or BIP 32). Additionally,
there is a specific path structure to derive new addresses that is also often
used. This standard is called [BIP
44](https://github.com/bitcoin/bips/blob/master/bip-0044.mediawiki).

There is a wallet path, which looks like this:

```html
m/44'/0'/0'
```

Then there is an "external path" /0 and "internal path" /1. "External" means the
addresses that you give to other people to receive money. "Internal" means the
addresses that your wallet generates for all unspent money in a transaction,
which is usually called "change" addresses. The number "44'" means BIP 44. The
first "0'" means Bitcoin, and other numbers are used to indicate different
cryptocurrencies. The second "0'" means account number zero, and the same wallet
can have many accounts.

The table explaining this in the BIP 44 spec is as follows:

| Account | External/Internal | Verbal description | Path            |
|---------|-------------------|--------------------|-----------------|
| first   | external          | first              | m/44'/0'/0'/0/0 |
| first   | external          | second             | m/44'/0'/0'/0/1 |
| first   | change            | first              | m/44'/0'/0'/1/0 |
| first   | change            | second             | m/44'/0'/0'/1/1 |
| second  | external          | first              | m/44'/0'/1'/0/0 |
| second  | external          | second             | m/44'/0'/1'/0/1 |
| second  | change            | first              | m/44'/0'/1'/1/0 |
| second  | change            | second             | m/44'/0'/1'/1/1 |

Money Button does not use internal addresses. This is because we do not share
the xpub, and for technical reasons our software is simpler by not having to
track internal addresses. This means Money Button wallets cannot be synchronized
in other wallet applications because the other wallet software will generated
internal addresses that are not seen by Money Button. You can export your
mnemoic from Money Button and import it into other wallets, but you should only
do so as a back up, and not as a way to use the same keys in two different
wallet softwares.
