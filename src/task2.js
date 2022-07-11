const csv = require('csvtojson')
const fs = require('fs')
const path = require('path')
const { JSONtransform: transform } = require('./helpers/JSONtransform')

const pathToCSV = path.join(__dirname, '../', 'csv', 'data.txt')
const pathToJSON = path.join(__dirname, '../', 'csv', 'data.json')

const readStream = fs.createReadStream(pathToCSV);
const writeStream = fs.createWriteStream(pathToJSON);

readStream.on('error', (err) => {
  console.error(err.message)
})

writeStream.on('error', (err) => {
  console.error(err.message)
})



readStream.pipe(csv()).pipe(transform).pipe(writeStream);
