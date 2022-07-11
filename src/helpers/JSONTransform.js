const { Transform } = require("stream");

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

module.exports = { JSONtransform };