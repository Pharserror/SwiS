export function getSingularWord(pluralWord) {
  try {
    return pluralWord.split(/s$/)[0].split(/ie$/)[0];
  } catch (error) {
    throw new Error('You must pass in a plural word!');
  }
}
