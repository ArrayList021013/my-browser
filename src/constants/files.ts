import { DEFAULT_SETTINGS } from './settings';

export const DIRECTORIES = ['adblock', 'extensions', 'storage'];

export const WEB_UI_PROTOCOL = 'wexond';

export const ERROR_PROTOCOL = 'wexond-error';

export const NETWORK_ERROR_HOST = 'network-error';

export const WEB_UI_BASE_URL = 
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:4444'
    : `${WEB_UI_PROTOCOL}://`;

export const WEB_UI_URL_SUFFIX = WEB_UI_BASE_URL.startsWith('http')
  ? '.html' : '';

export const FILES = {
  'settings.json': DEFAULT_SETTINGS,
  'window-data.json': {},
};