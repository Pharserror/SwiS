import isArray     from 'lodash/isArray';
import isNumber    from 'lodash/isNumber';
import isObject    from 'lodash/isObject';
import isString    from 'lodash/isString';
import merge       from 'lodash/merge';
import reduce      from 'lodash/reduce';

/* Generates CRUD actions for a root with a name like "root/name[/:id]"
 *
 * @param root [String] The root of your url, should include the protocol and the domain
 *
 * @params name [String] Root of the CRUD actions, comes after the root
 *
 * @returns [Object]
 */
function crudRoutes(name, root) {
  const localRoute = `/${name}`;
  const indexRoute = query => `${root}${localRoute}${!!query && isString(query) ? `?q=${query}` : ''}`;
  const newRoute = () => `${indexRoute()}/new`;
  const readRoute = id => `${indexRoute()}/${id}`;
  const updateRoute = id => readRoute(id);

  return { localRoute, indexRoute, newRoute, readRoute, updateRoute };
}

/* Creates speific routes from an array and merges them into a single object
 *
 * @params name [String] Root of the CRUD actions, comes after the root
 *
 * @param options [Array] The names of each route to create
 *
 * @param root [String] The root of your url, should include the protocol and the domain
 *
 * @returns [Object]
 */
function constructRoutes(name, options, root) {
  return reduce(
    options,
    (routes, option) => (
      merge(routes, { [option]: ({ id }) => `${routes.indexRoute()}/${id ? `${id}/` : ''}${option}`})
    ),
    crudRoutes(name, root)
  );
}

/* Generates an object from a config object that should be formatted as:
 * (referenced as the variable "myConfig" below) [
 *   { route: { nestedRoute: {... : { deeplyNestedRoute: ['specificRoute', ...] } } } },
 *   "surfaceLevelRoute"
 * ]
 *
 * NOTE: The author would recommend you use JSON to store the route config
 *
 * At each level of nesting generateRoutes will insert CRUD/Rails-Resource-style routes:
 * index, new, read, update
 *
 * Should give you the ability to call something like:
 *
 * const MY_ROUTES = generateRoutes({ config: myConfig, path: '', root: 'http://localhost:3000', startingRoutes: {} })
 *
 * MY_ROUTES.route.nestedRoute.deeplyNestedRoute() => "http://localhost:3000/route/nestedRoute/deeplyNestedRoute"
 *
 * @param config [Object] See notes above on how to format the object
 *
 * @param path [String] Whatever string you want to prepend every route with
 *
 * @param root [String] The root of your url, should include the protocol and the domain
 *
 * @param startingRoutes [Object] Any object you want to merge the resulting routes into
 *
 * @returns [Object]
 */
export function generateRoutes({ config, path, root, startingRoutes }) {
  return reduce(
    config,
    (routes, value, key) => {
      // If we are at the end of the rabbit hole and have hit an array
      if (isArray(value)) {
        return (
          merge(routes, { [key]: constructRoutes(root, `${path}${key}`, value) })
        );
      }

      if (isObject(value) && !isNumber(key)) {
        return merge(
          routes,
          {
            [key]: generateRoutes({
              config:         value,
              path:           `${path}${key}/`,
              startingRoutes: constructRoutes(root, `${path}${key}`, value)
            })
          }
        );
      } else if (isNumber(key) && !isString(value)) {
        return generateRoutes({
          config:         value,
          path:           path,
          startingRoutes: routes
        });
      }

      if (isString(value)) {
        return merge(routes, { [value]: () => `${root}/${value}` });
      }
    }, startingRoutes
  );
}

/* Scrapes the search query from window.location and converts it to an object
 *
 * @param currentLocation [Object] If there is an object that has the search
 * query other than the window.location then pass it in here
 *
 * @returns [Object]
 */
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
