var test = require('tap').test

test('rolling checksum', function(t) {
  var stream = require('../rolling')(4)
    , checksums = [0x041701A6, 0x042301AD]

  stream.on('data', function(checksum) {
    t.equal(checksum, checksums.shift())
  })
  stream.once('end', function() {
    t.end()
  })

  stream.write('h')
  stream.write(new Buffer('el'))
  stream.write('lo')
  stream.end()
})