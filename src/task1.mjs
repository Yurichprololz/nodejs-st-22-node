
import { EOL } from 'os';
import { Transform } from "stream";

const reverseString = new Transform({
  transform(chunk, encoding, callback) {
    const reversedString = chunk.toString().split('').reverse().join('').trim() + EOL
    callback(null, reversedString);
  },
});

console.log('Write your text:')
process.stdin.pipe(reverseString).pipe(process.stdout)
