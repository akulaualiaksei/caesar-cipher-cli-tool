const { program } = require('commander');
const fs = require('fs');
const path = require('path');
const {validateInput, validateOutput} = require('./utils');

program
  .requiredOption('-a, --action <action>', 'action must be encode or decode')
  .requiredOption('-s, --shift <shift>', 'shift must be number')
  .option('-i, --input <input>', 'input file or stdin')
  .option('-o, --output <output>', 'output file or stdout')
  .parse();
console.log(program.args);
console.log(program.opts());
const options = program.opts();

if (options.action !== 'encode' && options.action !== 'decode') {
  console.error('wrong action. Action must be encode or decode');
  process.exit(9);
}

if (isNaN(+options.shift) || Number(+options.shift) % 1 !==0) {
  console.error('shift must be number');
  process.exit(9);
}

// console.log(Number(+options.shift) % 1 !==0);
console.log('number', +options.shift);

let inputStream, outputStream;

if (options.input) {
  console.log('oi', options.input);
  validateInput(options.input);
  // inputStream = fs.createReadStream(path.resolve(options.input));
  inputStream = fs.createReadStream(options.input);
} else {
  inputStream = process.stdin;
}

if (options.output) {
  validateOutput(options.output);
  outputStream = fs.createWriteStream(options.output, {flags: 'a'});
  // outputStream = fs.createWriteStream(path.resolve(options.output), {flags: 'a'});
} else {
  outputStream = process.stdout;
}

// console.log('input', inputStream);
// console.log('output', outputStream);

console.log('ok');
