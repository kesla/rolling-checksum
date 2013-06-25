var test = require('tap').test
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
