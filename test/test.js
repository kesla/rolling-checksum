var fs = require('fs')

  , test = require('tap').test
  , mhash = require('mhash').hash

  , rolling = require('../rolling')

test('rolling checksum', function(t) {
  var stream = rolling(4)
    , expected = [0x041701A6, 0x042301AD]
    , checksums = []

  stream.on('data', function(checksum) {
    checksums.push(checksum)
  })
  stream.once('end', function() {
    t.deepEqual(checksums, expected)
    t.end()
  })

  stream.write('h')
  stream.write(new Buffer('el'))
  stream.write('lo')
  stream.end()
})

test('rolling checksum with interval', function(t) {
  var stream = rolling(4, 4)
    , expected = [0x041701A6, 0x041701A6]
    , checksums = []

  stream.on('data', function(checksum) {
    checksums.push(checksum)
  })
  stream.once('end', function() {
    t.deepEqual(checksums, expected)
    t.end()
  })

  stream.write('hell')
  stream.write(new Buffer('hell'))
  stream.end()
})

test('larger rolling checksum', function (t) {
  var input = fs.readFileSync(__filename, { encoding: 'utf8' })

    , hash = function(data) {
        var hex = mhash('adler32', data)
        return parseInt(hex, 16)
      }

    , expected = (function () {
        var expected = []
          , i

        for(i = 0; i <= input.length - 10; ++i) (function(i) {
          expected.push(hash(input.slice(i, i + 10)))
        })(i)

        return expected
      })()
    , actual = []
    , stream = rolling(10)

  stream.on('data', function (checksum) {
    actual.push(checksum)
  })
  stream.once('end', function () {
    t.deepEqual(actual, expected)
    t.end()
  })

  stream.write(input)
  stream.end()
})