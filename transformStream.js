const cipher = require('./cipher');
const {Transform} = require('stream');

module.exports = (shift) => new Transform({
  transform(chunk, encoding, callback) {
    this.push(cipher(chunk.toString(), shift));
    callback();
  }
});
