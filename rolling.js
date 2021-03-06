var Transform = require('stream').Transform

  , BASE = 65536
  , NMAX = 65221

  , rolling = function(length, interval) {
      var stream = new Transform({objectMode: true})
        , data = []
        , a = 1
        , b = 0
        , collecting = true
        , step = 0

      if (interval === undefined)
        interval = 1

      stream._transform = function(chunk, encoding, callback) {
        var i
          , tmp1, tmp2

        if (encoding !== 'buffer')
          chunk = new Buffer(chunk, encoding)

        for(i = 0; i < chunk.length; ++i) {
          data.push(chunk[i])
        }

        if (collecting && data.length >= length) {
          for(i = 0; i < length; ++i) {
            a = (a + data[i]) % NMAX
            b = (b + (length - i) * data[i] + 1) % NMAX
          }
          this.push(b * BASE + a)

          collecting = false
        }

        for(i = 0; i < data.length - length; ++i) {
          step++

          tmp1 = data[i]
          tmp2 = data[i + length]

          a = (a - tmp1 + tmp2 + BASE) % BASE
          b = (b - length * tmp1 + a - 1)

          if (step % interval === 0) {
            this.push(b * BASE + a)
          }
        }

        data = data.slice(-length)

        callback(null)
      }

      return stream
    }

module.exports = rolling
