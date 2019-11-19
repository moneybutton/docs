---
id: bsv-script
title: Script
---

Bitcoin transactions consist of inputs and outputs. A transaction can have one
or more inputs and one or more outputs. Each input must spend bitcoin from an
output from an earlier transaction. If an output has not yet been spent, it is
called an "unspent output" or UTXO.

Contained inside each input and output is a script. The language itself is
called "Script". As Satoshi Nakamoto himself once told us, it probably should
have been called a "predicate", which is a statement that evaluates either true
or false, but because that word was too long and unfamiliar, he used the word
"Script" instead. A script is what is inside inputs and outputs and the language
is called "Script" with a capital "S".

When a transaction is validated, scripts inside each input are executed. The way
they are executed is, basically, to append the script from the output it is
spending to the end of it and run the whole thing together. In this article, we
don't want to discuss these details (see the documentation on the script
interpreter). We simply want to discuss how to read and write scripts.

A [bitcoin address](./bsv-address) looks like this:

```
1MfQjr97hKaAvpVPJ4XsaHQDskjYhXxLW3
```

In order to spend to this address, an output must be created that contains this
script:

```
OP_DUP OP_HASH160 e2a623699e81b291c0327f408fea765d534baa2a OP_EQUALVERIFY OP_CHECKSIG
```

That script goes in an output. In an input that spends this script, you must put
something like this:

```
[public key] [signature]
```

In order to validate the input, you execute the input followed by the output.
The input pushes a signature and a public key to the stack. The output then
confirms that the public key hashes to the address and that the signature
corresponds to the transction and the public key. For more details, please see
the documentation on the script interpreter and transaction validation.

If you have an address, you can convert it into a script like this:

```javascript
var address = bsv.Address.fromString('1MfQjr97hKaAvpVPJ4XsaHQDskjYhXxLW3')
var script = bsv.Script.fromAddress(address)
script.toASM()
// 'OP_DUP OP_HASH160 e2a623699e81b291c0327f408fea765d534baa2a OP_EQUALVERIFY OP_CHECKSIG'
script.toHex()
// '76a914e2a623699e81b291c0327f408fea765d534baa2a88ac'
```

Notice how we can print the script in two different ways. The first way is in
ASM format, which is a human-readable script:

```
OP_DUP OP_HASH160 e2a623699e81b291c0327f408fea765d534baa2a OP_EQUALVERIFY OP_CHECKSIG
```

The second way is in hex, which is not human-readable, but is more easily
machine-readable and is closer to to the binary format you see inside a bitcoin
transaction:

```
76a914e2a623699e81b291c0327f408fea765d534baa2a88ac
```

We recommend not using the ".toString()" method on a script method. That uses a
less common string format than ASM format. Always use ".toASM()", not
".toString()".

If you have an ASM formatted string, or a hex formatted string, you can input
both of those into a Script object, and print them back out again:

```javascript
var script = bsv.Script.fromASM('OP_DUP OP_HASH160 e2a623699e81b291c0327f408fea765d534baa2a OP_EQUALVERIFY OP_CHECKSIG')
script.toASM()
// 'OP_DUP OP_HASH160 e2a623699e81b291c0327f408fea765d534baa2a OP_EQUALVERIFY OP_CHECKSIG'
var script = bsv.Script.fromHex('76a914e2a623699e81b291c0327f408fea765d534baa2a88ac')
script.toHex()
// '76a914e2a623699e81b291c0327f408fea765d534baa2a88ac'
```

One final useful method is that if a script is a "pubkey hash" script type,
a.k.a. a normal address output script, you can easily get the address for it
with the ".toAddress()" method:

```javascript
script.toAddress().toString()
// '1MfQjr97hKaAvpVPJ4XsaHQDskjYhXxLW3'
```
