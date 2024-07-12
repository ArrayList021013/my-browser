/**
 * knowledge:
 * 1. Math.random(): generate a random float number between 0(inclusive) and 1(exlusive)
 * 2. Math.floor(): rounds down to the nearest integer
 * 3. str.charAt(): retrieves the character at the calculated index
 * 4. str.toUpperCase(): convert the extracted first character to uppercase
 * 5. str.toLowerCase(): convert the extracted substring to lowercase
 * 6. str.charCodeAt(): retrieves the unicode value of the character at the specified inex
 */


/**
 * generates a random string of a specified length
 * @param length specified length
 * @param possible characters from which the random string will be generated
 * @returns 
 */
export const makeId = (length: number, possible = 'abcdefghijklmnopqrstuvwxyz',) => {
  let id = '';
  for (let i = 0; i < length; i++) {
    id += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return id;
};

/**
 * replaces all occurrences of a specified substring within a given string with
 * another substring, using regular expressions
 * @param str the input string in which you want to replace occurrences of the 'find' string
 * @param find the substring that you want to replace
 * @param replace the substring that will replace all occurrences of 'find'
 * @param options optional parameter for the regular express flags, defaulting to 'gi'
 *                'g' means: global search(find all matches rather than stopping after the first match)
 *                'i' means: case-insensitive search
 * @returns 
 */
export const replaceAll = (str: string, find: string, replace: string, options = 'gi',) => {
  //ensures that any special characters in the 'find' string are escaped properly
  //so they are treated as literal characters in the regular expression
  //special characters in regular expression include '.*+?^=!:${}()|[]/\'
  find = find.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, '\\$1');
  return str.replace(new RegExp(find, options), replace);
};

/**
 * capitalizes the first letter of a given string and converts the rest of the string to lowercase
 * @param str the input string you want to transform
 * @returns 
 */
export const capitalizeFirst = (str: string) => {
  return str.substr(0, 1).toUpperCase() + str.substring(1).toLowerCase();
};

/**
 * computes a hash code for a given string.
 * @param str 
 * @returns 
 */
export const hashCode = (str: string) => {
  let hash = 0;

  if (str.length === 0) {
    return hash;
  }

  for (let i = 0; i < str.length; i++) {
    const chr = str.charCodeAt(i);
    //equivalent to 'hash * 31 + chr', '<<' is a bitwise left shift opertion
    hash = (hash << 5) - hash + chr;
    //this bitwise or operation with '0' coerces 'hash' into a 32-bit signed integer
    //handling any potential overflow and maintaining consistent behavior across different js engines
    hash |= 0;
  }
  return hash;
};