import { eIDName } from '../types/enums';
import { tBaseEntity } from '../types/types';

/**
 * Updates item in list. Item is found by @param{idName}.
 * @param array {Array} The array which contains the item
 * @param idName {String} The name of the id of the item to be update
 * @param item {Object} The item to update
 * @returns {Array}
 */
function updateItemInList<T extends tBaseEntity>(array: T[], idName: eIDName, item: T): T[] {
  return array.map((entry: T) => {
    if (entry[idName] === item[idName]) {
      return item;
    }
    return entry;
  });
}

/**
 * Removes item from list. Item is found by @param{idName}.
 * @param array {Array} The array which contains the item
 * @param idName {String} The name of the id
 * @param itemId {String} The name of the id of the item to be removed
 * @returns {Array}
 */
function removeItemFromList<T extends tBaseEntity>(array: T[], idName: eIDName, itemId: number): T[] {
  return array.filter((entry) => entry[idName] !== itemId);
}

export default {
  removeItemFromList,
  updateItemInList
};
