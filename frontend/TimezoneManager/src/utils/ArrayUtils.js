/**
 * Updates item in list. Item is found by id.
 * @param array {Array} The array which contains the item
 * @param idName {String} The name of the id of the item to be update
 * @param item {Object} The item to update
 * @returns {Array}
 */
function updateItemInList(array, idName, item) {
  return array.map(entry => {
    if (entry[idName] === item[idName]) {
      return item;
    }
    return entry;
  });
}

/**
 * Removes item from list. Item is found by id
 * @param array {Array} The array which contains the item
 * @param idName {String} The name of the id
 * @param itemId {String} The name of the id of the item to be removed
 * @returns {Array}
 */
function removeItemFromList(array, idName, itemId) {
  return array.filter(entry => entry[idName] !== itemId);
}

export default {
  removeItemFromList,
  updateItemInList
};
