# rolling-checksum[![build status](https://secure.travis-ci.org/kesla/rolling-checksum.png)](http://travis-ci.org/kesla/rolling-checksum)

Caclulate a checksum (adler-32) rolling

## Installation

```
npm install rolling-checksum
```

## Example

```javascript
var rolling = require('./')
  , stream = rolling(4, 2) // calculate rolling checksum on data of chunks with length 4, on every second step
  , i = 0
  , input = 'Hell, Hello, world!'
  , read = function() {
      var checksum = stream.read()
      if (!checksum)
        stream.once('readable', read)
      else {
        console.log(input.slice(i, i + 4), checksum)
        i = i + 2
        read()
      }
    }

stream.write(input)
stream.end()

read()

```

## Licence

Copyright (c) Björklund David

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.

