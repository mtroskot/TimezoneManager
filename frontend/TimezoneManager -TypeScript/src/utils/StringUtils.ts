import ObjectUtils from 'src/utils/ObjectUtils';
import { tRequestParams } from '../types/types';

function isEmpty(str: string | undefined | null): boolean {
  return str === null || str === undefined || str.trim() === '';
}

function isNotEmpty(str: string | undefined | null): boolean {
  return !isEmpty(str);
}

function areEmpty(...strings: string[]): boolean {
  return strings.some((str) => str === null || str === undefined || str.trim() === '');
}

function areNotEmpty(...strings: string[]): boolean {
  return !areEmpty(...strings);
}

function isString(str: string | undefined | null): boolean {
  return typeof str === 'string';
}

/**
 * Returns initials of name
 * @param name {String} The name to get initials
 * @returns {String}
 */
function getNameInitials(name: string): string {
  const splitName = name.split(' ');
  return splitName.length === 1 ? splitName[0][0] : `${splitName[0][0]} ${splitName[splitName.length - 1][0]}`;
}

/**
 * Converts number or string to GMT string
 * @param diff {Number|String}
 * @returns {String}
 */
function convertGMTDIffToString(diff: string | number): string {
  const gmtDIff = parseInt(String(diff).replace('+', ''), 10);
  return gmtDIff <= 0 ? `${gmtDIff}` : `+${gmtDIff}`;
}

function capitalizeFirstLetter(str: string): string {
  return str[0].toUpperCase() + str.slice(1);
}

/**
 * Converts camel case string to words.
 * @param str {String}
 * @returns {String}
 */
function camelCaseToWords(str: string): string {
  let newString = '';
  for (let i = 0; i < str.length; i++) {
    const char = str[i];
    if (i === 0) {
      newString += char.toUpperCase();
    } else if (char === char.toUpperCase()) {
      newString += ' ' + char;
    } else {
      newString += char;
    }
  }
  return newString;
}

/**
 * Converts array of params to request parameter string
 * @param  {Array} params
 * @returns {String}
 */
function buildRequestParams(params: tRequestParams): string {
  let str = '';
  for (let i = 0; i < params.length; i++) {
    const el = params[i];
    if (ObjectUtils.exists(el.value)) {
      str += str.length === 0 ? `${el.key}=${el.value}` : `&${el.key}=${el.value}`;
    }
  }
  return str;
}

const StringUtils = {
  isEmpty,
  isNotEmpty,
  areEmpty,
  areNotEmpty,
  isString,
  getNameInitials,
  convertGMTDIffToString,
  capitalizeFirstLetter,
  camelCaseToWords,
  buildRequestParams
};

export default StringUtils;
