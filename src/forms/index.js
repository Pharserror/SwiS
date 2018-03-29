import { get, isEmpty, merge, reduce } from 'lodash';

/*
 * +===========+
 * |== FORMS ==|
 * +===========+
 */

/* buildFormData()
 *
 * For a form with elements with name attributes in the style of
 * "prop1[prop2][...][propN]"
 * buildFormData() will augment data as:
 * data = { prop1: { prop2: { ...: { propN: value } } } }
 *
 * It can also handle arrays with a given naming scheme in the style of
 * "prop1[0][prop2][...][propN]"
 * buildFormData will augment data as:
 * data = { prop1: [{ prop2: { ...: { propN: value } } }, ...] }
 *
 * @param value [Object] the current value to assign to propN
 *
 * @param props [Array] the properties "path" that determines the structure of data
 *
 * @param allData [Object] the entire data set for the form, used to find arrays
 *                         and augment the objects they contain
 * @param data [Object] an object to store the form data in
 *
 * @return null
 */
const buildFormData = (value, props, allData, data = {}) => {
  let intProp, nextProp;

  // If there are no more props then return
  if (props.length === 0) {
    return value;
  }

  /* We need to check if the next prop to get/set is an integer b/c then we need
   * to deal with an array */
  nextProp = props.pop();
  intProp = parseInt(nextProp);

  /* This will ensure we have an integer b/c parseInt will return NaN for
   * any arg that is not an integer and NaN !=== NaN */
  if (intProp === intProp) {
    /* If we already have an object in the array for the given prop (index) then
     * we want to mutate that object so we check if it exists, if not we assign
     * a blank array */
    data = get(allData, props) || [];

    if (isEmpty(data)) {
      /* If we just assigned a blank array then we just push the value onto it
       * and go to the next cycle */
      data.push(value);

      return buildFormData(data, props, allData);
    } else {
      /* If something already exists at the index then we merge what's there
       * and the value into a new object */
      data[intProp] = merge({}, data[intProp], value);

      return;
    }
  } else {
    /* If we aren't dealing with an array then we can simply assign the value to
     * an object property and move on */
    data[nextProp] = value;

    return buildFormData(data, props, allData);
  }
};

/* gatherFormData()
 *
 * For an onSubmit event of a form, gatherFormData() will create a nested data
 * structure using buildFormData()
 *
 * @param event [Event] the onSubmit event
 *
 * @param initialDataValue [Object] initial Object to pass to reduce()
 *
 * @return [Object] the data object representing the form data, usually to be
 * sent to an API via a POST request
 */
export function gatherFormData(event, initialDataValue) {
  let elementNames;

  /* The main mechanism here is reduce(): we iterate over the elements of the
   * form, split their names up into a "property path" array, and use that
   * "property path" to determine how to structure the data that will be sent
   * to the API - finally we merge that data structure with an initialDataValue */
  return merge(initialDataValue, reduce(event.target.elements, (data, element) => {
    // Don't submit checkboxes that aren't checked
    if ((element.type === 'checkbox' || element.type === 'radio') && !element.checked) { return data; }

    elementNames = element.name.split(/\W/).filter(value => !isEmpty(value));

    if (!isEmpty(elementNames)) {
      // We want to merge the data we already have with the data for the next element
      data = merge({}, data, buildFormData(element.value, elementNames, data));
    }

    return data;
  }, {}));
}
