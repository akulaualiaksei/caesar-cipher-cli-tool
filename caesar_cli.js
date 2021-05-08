const { program } = require('commander');

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

if (isNaN(parseInt(options.shift, 10))) {
  console.error('shift must be number');
  process.exit(9);
}

console.log('ok');