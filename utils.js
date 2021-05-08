const path = require('path');
const fs = require('fs');

const validateInput = (input) => {
    try {
      fs.accessSync(path.resolve(input), fs.constants.R_OK | fs.constants.F_OK);
    } catch (err) {
      console.error(`can't access or open file ${path.resolve(input)}`);
      process.exit(1);
    }
}
const validateOutput = (output) => {
  try {
    fs.accessSync(path.resolve(output), fs.constants.R_OK | fs.constants.W_OK);
  } catch (error) {
    console.error(`can't access or open file ${path.resolve(output)}`);
      process.exit(1);
  }
}

module.exports = {
  validateInput,
  validateOutput
}