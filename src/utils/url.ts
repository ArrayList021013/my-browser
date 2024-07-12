/**
 * checks if a given string is a valid url
 * @param input 
 * @returns 
 */
export const isURL = (input: string): boolean => {
  const pattern = /^(?:\w+:)?\/\/([^\s.]+\.\S{2}|localhost[:?\d]*)\S*$/;

  if (pattern.test(input)) {
    return true;
  }
  return pattern.test(`http://${input}`);
};

/**
 * checks if a given url matches a specified pattern
 * this function can be used to determine if a url adheres to certain predefined patterns
 * such as those used in web filters or url whitelists/blacklists
 * @param pattern 
 * @param url 
 * @returns ture or false
 */
export const matchesPattern = (pattern: string, url: string) => {
  if (pattern === '<all_urls>') {
    return true;
  }
  //the pattern string is converted into a regular expression
  const regexp = new RegExp(
    `^${pattern.replace(/\*/g, '.*').replace('/', '\\/')}$`,
  );
  return url.match(regexp) != null;
};

/**
 * extracts the domain name from a given url
 * the function processes the url string to isolate and return the domain part
 * removing any protocol, query parameters, and paths
 * @param url 
 * @returns hostname like example.com
 */
export const getDomain = (url: string): string => {
  let hostname = url;

  if (hostname.includes('http://') || hostname.includes('https://')) {
    hostname = hostname.split('://')[1];
  }

  if (hostname.includes('?')) {
    hostname = hostname.split('?')[0];
  }

  if (hostname.includes('://')) {
    hostname = `${hostname.split('://')[0]}://${hostname.split('/')[2]}`;
  } else {
    hostname = hostname.split('/')[0];
  }

  return hostname;
};

/**
 * ensures that a given url starts with a protocol(http:// or https://)
 * if the url does not already contain a protocol, it prefixes it with 'http://'
 * @param url 
 * @returns 
 */
export const prefixHttp = (url: string): string => {
  url = url.trim();
  return url.includes('://') ? url : `http://${url}`;
};