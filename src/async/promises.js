export function promiseBlock() {
  /* Convert the arugments into an array and use reduce to call each
   * promise sequentially
   */
  let factories = Array.prototype.slice.call(arguments);

  /* Loop through the promises calling the next one if the current one resolves
   * and rejecting the entire thing on the first one that fails
   */
  return new Promise((resolve, reject) => {
    factories.reduce((currentPromise, factory) => (
      currentPromise.then(factory).catch(error => { reject(error); })
    ), factories.shift()()).then(resolve);
  });
}
