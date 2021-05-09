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

const getNewShift = (action, oldShift) => {
  let newShift;
  action === 'decode' ? newShift = -oldShift : newShift = oldShift;
  newShift = newShift % 26;
  newShift < 0 ? newShift += 26 : newShift;
  return newShift;
}

module.exports = {
  validateInput,
  validateOutput,
  getNewShift
}
