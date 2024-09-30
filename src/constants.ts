import { ResponseCode } from './types';

/**
 * IndexNow API Response Codes.
 *
 * @see {@link https://www.indexnow.org/documentation#response}
 *
 * @const {Record<number, ResponseCode>}
 */
export const RESPONSE_CODES: Record<number, ResponseCode> = {
  200: { code: 200, response: 'OK', reason: 'URL submitted successfully' },
  202: {
    code: 202,
    response: 'Accepted',
    reason: 'URL received. IndexNow key validation pending.',
  },
  400: { code: 400, response: 'Bad request', reason: 'Invalid format' },
  403: {
    code: 403,
    response: 'Forbidden',
    reason: 'In case of key not valid (e.g. key not found, file found but key not in the file)',
  },
  422: {
    code: 422,
    response: 'Unprocessable Entity',
    reason:
      "In case of URLs which don't belong to the host or the key is not matching the schema in the protocol",
  },
  429: { code: 429, response: 'Too Many Requests', reason: 'Too Many Requests (potential Spam)' },
};

/**
 * Search Engines that support the IndexNow API.
 * @see {@link https://www.indexnow.org/faq}
 * @const {string[]}
 */
export const SEARCH_ENGINES = [
  'https://api.indexnow.org',

  // Microsoft Bing
  'https://www.bing.com',

  // Korean search engine
  'https://searchadvisor.naver.com',

  // Czech search engine
  'https://search.seznam.cz',

  // Russian search engine
  'https://yandex.com',

  // Misc
  'https://indexnow.yep.com',
];
