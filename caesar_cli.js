const { program } = require('commander');
const fs = require('fs');
const { pipeline } = require('stream');
const {
  validateInput,
  validateOutput,
  getNewShift,
  validateAction,
  validateShift
} = require('./utils');
const transformStream = require('./transformStream');

program
  .requiredOption('-a, --action <action>', 'action must be encode or decode')
  .requiredOption('-s, --shift <shift>', 'shift must be number')
  .option('-i, --input <input>', 'input file or stdin')
  .option('-o, --output <output>', 'output file or stdout')
  .parse();
const options = program.opts();

validateAction(options.action);

validateShift(options.shift);

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

pipeline(inputStream, transformStream(newShift), outputStream, (error) => {
  if (error) {
    console.error('Pipeline failed.', error.toString());
    process.exit(1);
  } else {
    console.log('Pipeline succeeded.');
  }
});
