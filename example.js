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
