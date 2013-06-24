# rolling-checksum[![build status](https://secure.travis-ci.org/kesla/rolling-checksum.png)](http://travis-ci.org/kesla/rolling-checksum)

Caclulate a checksum (adler-32) rolling.

rolling-checksum is a module that returns a [Transform](http://nodejs.org/docs/latest/api/stream.html#stream_class_stream_transform)-stream with a set checksum length.

## Installation

```
npm install rolling-checksum
```

## Example

```javascript
var rolling = require('./')(4)
  , i = 0
  , input = 'Hell, Hello, world!'
  , read = function() {
      var checksum = rolling.read()
      if (!checksum)
        rolling.once('readable', read)
      else {
        console.log(input.slice(i, i + 4), checksum)
        i++
        read()
      }
    }

rolling.write(input)
rolling.end()

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

