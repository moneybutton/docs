---
id: bsv-overview
title: Big Number
---

Because Javascript does not (as of this writing) support big numbers natively,
bsv has a wrapper for a big number library
([bn.js](https://github.com/indutny/bn.js/)). This library is used extensively
in the cryptography of bsv.

With big numbers you can:
* Convert to and from buffers, with big endian or little endian, with zero padding or no padding
* Convert to and from "sign magnitude" format buffers
* Convert to and from CScriptNum, or ScriptNum, which is a special format used inside Script
* Convert to and from numbers (with some loss of precision for numbers greater than 53 bits)
* Convert to and from strings
* Add, subtract, multiply, divide, and modulus numbers together (add, sub, mul, div, mod, invm)

Normally, you do not need to use the big number library directly. This is used
inside bsv for cryptography. It is exposed in case you do need to use a big
number library for some other reason and do not wish to include a second big
number library.

Here is a way to add two numbers together:
```javascript
let BN = bsv.crypto.BN
let n = BN.fromNumber(5)
let m = BN.fromNumber(6)
console.log(n.add(m))
// prints 11
```

The numeric operations you can access are:

| Operation | Description     |
|-----------|-----------------|
| add       | Add             |
| mul       | Multiply        |
| sub       | Subtract        |
| div       | Divide          |
| mod       | Modulus         |
| invm      | Inverse Modulus |

You can also compare numbers together:
```javascript
let BN = bsv.crypto.BN
let n = BN.fromNumber(5)
let m = BN.fromNumber(6)
console.log(n.gt(m))
// prints false
```
The comparison operators you have access to are:

| Operation | Description                  |
|-----------|------------------------------|
| eq        | Equal                        |
| gt        | Greater Than                 |
| lt        | Lesser Than                  |
| cmp       | Compare: returns -1, 0, or 1 |

It is common to want to convert big numbers, strings, numbers, and buffers. Here is an example:
```javascript
let BN = bsv.crypto.BN
let str = '3847f126769a6c65d281d925f9ff990f431d19c8c314f9180def0ab95b24f062'
let buf = Buffer.from(str, 'hex')
let n = BN.fromBuffer(buf)
console.log(n.toString())
// prints:
// 25456630020100109444707942782143792492829674412994957270434525334028981432418
console.log(n.toBuffer().toString('hex'))
// prints:
// 3847f126769a6c65d281d925f9ff990f431d19c8c314f9180def0ab95b24f062
let n2 = n.add(new BN(1))
console.log(n2.toString())
// prints:
// 25456630020100109444707942782143792492829674412994957270434525334028981432419
console.log(n.add(n2).toString())
// prints:
// 50913260040200218889415885564287584985659348825989914540869050668057962864837
console.log(n.add(n2).toBuffer().toString('hex'))
// prints:
// 708fe24ced34d8cba503b24bf3ff321e863a33918629f2301bde1572b649e0c5
console.log(n.add(n2).toNumber())
// prints:
// 5.091326004020022e+76
```
