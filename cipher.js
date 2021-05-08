module.exports = (str, shift) => {
  const original = 'abcdefghijklmnopqrstuvwxyz';

  return str.split('').map((item) => {
      const letter = item.toLowerCase();
      const index = original.indexOf(letter);
      if(index < 0)
          return item;
      let newIndex = (index + shift) % original.length;
      newIndex < 0 ? newIndex += original.length: newIndex;
      return item == letter ? original[newIndex] : original[newIndex].toUpperCase();
  }).join('');
}