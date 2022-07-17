import csv from 'csvtojson'
import { createReadStream, createWriteStream } from 'fs'
import { join } from 'path'

const pathToCSV = join(__dirname, '../', 'csv', 'nodejs-hw1-ex1.csv')
const pathToJSON = join(__dirname, '../', 'csv', 'data.txt')

const readStream = createReadStream(pathToCSV);
const writeStream = createWriteStream(pathToJSON);

readStream.on('error', (err) => {
  console.error(err.message)
})

writeStream.on('error', (err) => {
  console.error(err.message)
})

const toLowerHead = (fileLine, idx) => {
  if (idx === 0) return fileLine.toLowerCase(); 
  return fileLine;
}

const toFloat = (fileLine) => {
  const float = fileLine.replace(',', '.')
  return parseFloat(float);
}

const option = {
  checkType: true,
  downstreamFormat: 'line',
  delimiter: ';',
  colParser: {
    "price": toFloat,
    "amount": "omit",
  }
}

readStream
  .pipe(csv(option))
  .preFileLine(toLowerHead)
  .pipe(writeStream);
  