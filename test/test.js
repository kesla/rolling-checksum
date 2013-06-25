var test = require('tap').test

test('rolling checksum', function(t) {
  var stream = require('../rolling')(4)
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