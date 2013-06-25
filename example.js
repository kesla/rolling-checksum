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
