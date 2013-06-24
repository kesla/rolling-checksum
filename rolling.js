var Transform = require('stream').Transform

  , BASE = 65536

  , rolling = function(length) {
      var stream = new Transform({objectMode: true})
        , data = []
        , a = 1
        , b = 0
        , collecting = true

      stream._transform = function(chunk, encoding, callback) {
        var i
          , tmp1, tmp2
        if (!Buffer.isBuffer(chunk))
          chunk = new Buffer(chunk, encoding)

        for(i = 0; i < chunk.length; ++i) {
          data.push(chunk[i])
        }

        if (collecting && data.length >= length) {
          for(i = 0; i < length; ++i) {
            a = (a + data[i]) % 65221
            b = (b + (length - i) * data[i] + 1) % 65221
          }
          this.push(b * BASE + a)

          collecting = false
        }

        while (data.length > length) {
          tmp2 = data[length]
          tmp1 = data.shift()
          a = (a - tmp1 + tmp2 + BASE) % BASE
          b = (b - length * tmp1 + a - 1)
          this.push(b * BASE + a)
        }

        callback(null)
      }

      return stream
    }

module.exports = rolling
