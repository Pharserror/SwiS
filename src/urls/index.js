export function scrapeParams(currentLocation) {
  return (
    (currentLocation || window.location)
    .search
    .substr(1)
    .split('&')
    .map(param => param.split('='))
    .reduce((params, param) => ({ [param[0]]: param[1], ...params }))
  );
}
