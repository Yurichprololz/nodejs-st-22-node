import csv from 'csvtojson'
import { createReadStream, createWriteStream } from 'fs'
import { join } from 'path'
import { Transform } from "stream";

const pathToCSV = join(__dirname, '../', 'csv', 'data.txt')
const pathToJSON = join(__dirname, '../', 'csv', 'data.json')

const readStream = createReadStream(pathToCSV);
const writeStream = createWriteStream(pathToJSON);

readStream.on('error', (err) => {
  console.error(err.message)
})

writeStream.on('error', (err) => {
  console.error(err.message)
})

// Some issues with trailing comma. source: https://github.com/Keyang/node-csvtojson/issues/333
const JSONtransform = new Transform({
  transform(chunk, encoding, cb) {

    this.push((this.isNotAtFirstRow ? ',' : '[') + chunk.toString('utf-8').slice(0, -1));
    this.isNotAtFirstRow = true;
    cb();
  },
  flush(cb) {
    const isEmpty = (!this.isNotAtFirstRow);
    this.push(isEmpty ? '[]' : ']');
    cb();
  }
});


readStream.pipe(csv()).pipe(JSONtransform).pipe(writeStream);
