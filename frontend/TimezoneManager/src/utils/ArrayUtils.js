/**
 *
 * @param array
 * @param idName String The name of the id
 * @param item
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
 *
 * @param array
 * @param idName String The name of the id
 * @param itemId
 * @returns {Array}
 */
function removeItemFromList(array, idName, itemId) {
  return array.filter(entry => entry[idName] !== itemId);
}

export default {
  removeItemFromList,
  updateItemInList
};
