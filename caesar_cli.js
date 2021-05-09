const { program, requiredOption } = require('commander');
const fs = require('fs');
const path = require('path');
const { pipeline, Transform } = require('stream');
const {validateInput, validateOutput, getNewShift} = require('./utils');
const cipher = require('./cipher');

program
  .requiredOption('-a, --action <action>', 'action must be encode or decode')
  .requiredOption('-s, --shift <shift>', 'shift must be number')
  .option('-i, --input <input>', 'input file or stdin')
  .option('-o, --output <output>', 'output file or stdout')
  .parse();
const options = program.opts();

if (options.action !== 'encode' && options.action !== 'decode') {
  console.error('wrong action. Action must be encode or decode');
  process.exit(9);
}

if (isNaN(+options.shift) || Number(+options.shift) % 1 !==0) {
  console.error('shift must be number');
  process.exit(9);
}

const newShift = getNewShift(options.action, +options.shift);

let inputStream, outputStream;

if (options.input) {
  validateInput(options.input);
  inputStream = fs.createReadStream(options.input);
} else {
  inputStream = process.stdin;
}

if (options.output) {
  validateOutput(options.output);
  outputStream = fs.createWriteStream(options.output, {flags: 'a'});
} else {
  outputStream = process.stdout;
}

const transformStream = (shift) => new Transform({
  transform(chunk, encoding, callback) {
    this.push(cipher(chunk.toString(), shift));
    callback();
  }
});

pipeline(inputStream, transformStream(newShift), outputStream, (error) => {
  if (error) {
    console.error('Pipeline failed.', error.toString());
    process.exit(1);
  } else {
    console.log('Pipeline succeeded.');
  }
});
