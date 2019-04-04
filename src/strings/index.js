export function getSingularWord(pluralWord) {
  try {
    return (
      pluralWord.slice(-3) === 'ies'
      ? pluralWord.replace(/ies/, 'y')
      : pluralWord.split(/s$/)[0].split(/ie$/)[0].split(/e$/)[0]
    );
  } catch (error) {
    throw new Error('You must pass in a plural word!');
  }
}
