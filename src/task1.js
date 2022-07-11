
const { EOL } = require('os');
const { Transform } = require("stream");

const reverseString = new Transform({
  transform(chunk, encoding, callback) {
    const reversedString = chunk.toString().split('').reverse().join('').trim() + EOL
    callback(null, reversedString);
  },
});

process.stdin.pipe(reverseString).pipe(process.stdout)
