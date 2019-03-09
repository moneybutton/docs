---
id: bsv-base58
title: Base 58
---

A Bitcoin address is the hash of a public key. In the early days of Bitcoin, and
still often today, users have to copy and paste addresses around, and there is a
lot of opportunity to make mistakes. It would be really bad to accidentally send
money to the wrong address. So Satoshi used a custom Base 58 encoding scheme for
Bitcoin addresses that doesn't allow any confusing characters (no lower case L
and no upper case i). In addition, the encoding scheme includes a hash checksum
to make errors in copying an address almost impossible.

Base 58
-------

First, let's consider the case without the checksum.

Given any piece of data, we can encode it using this list of 58 characters:

```html
123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz
```

The way we do that with bsv is as follows. Suppose I have a string "this is my
string" which I wish to encode. This is how we encode it into base58:

```javascript
var str = "this is my string"
var base58 = bsv.encoding.Base58.fromBuffer(Buffer.from(str)).toString()

console.log(base58)
// prints:
// 26St9k2Wa1oUK3T9MYpNXtzr
```

And this is how we decode it:

```javascript
var base58 = '26St9k2Wa1oUK3T9MYpNXtzr'
var buf = bsv.encoding.Base58.fromString(base58).toBuffer()

console.log(buf.toString())
// prints:
// this is my string
```

Base58Check
-----------

Because Base58 can still be accidentally mistyped, there is also a format that
includes a checksum. A checksum is just a shortened hash of the data that
prefixes the data. That way, if the data is accidentally changed, it will no
longer match the checksum, and you can know the data has been mistyped.

Suppose again I have a string "this is my string" which I wish to encode. This
is how we encode it into base58check:

```javascript
var str = "this is my string"
var base58check = bsv.encoding.Base58Check.fromBuffer(Buffer.from(str)).toString()

console.log(base58check)
// prints:
// 8AArJ45YvcrtshadAYjNgHtXHRGtA
```

Notice how the output is a bit longer and is different on the whole. That is
because it includes a checksum at the start. But it still consists of the same
type of characters - all Base 58 characters.

And this is how we decode it:

```javascript
var base58check = '8AArJ45YvcrtshadAYjNgHtXHRGtA'
var buf = bsv.encoding.Base58Check.fromString(base58check).toBuffer()

console.log(buf.toString())
// prints:
// this is my string
```
