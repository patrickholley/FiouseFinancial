export default class MockAsyncStorage {
  constructor(cache = {}) {
    this.storageCache = cache;
  }

  setItem = jest.fn((key, value) => new Promise(
    (resolve, reject) => {
      if (typeof key !== 'string' || typeof value !== 'string') {
        reject(new Error('key and value must be string'));
      }

      this.storageCache[key] = value;
      return resolve(this.storageCache[key]);
    },
  ));

  getItem = jest.fn((key) => new Promise(
    (resolve) => (
      Object.prototype.hasOwnProperty.call(this.storageCache, key)
        ? resolve(this.storageCache[key])
        : resolve(null)
    ),
  ));

  removeItem = jest.fn((key) => new Promise(
    (resolve, reject) => (
      Object.prototype.hasOwnProperty.call(this.storageCache, key)
        ? resolve(delete this.storageCache[key])
        : reject(new Error('No such key!'))
    ),
  ));

  clear = jest.fn(() => new Promise(
    (resolve) => {
      this.storageCache = {};
      return resolve(this.storageCache);
    },
  ));

  getAllKeys = jest.fn(() => new Promise(
    (resolve) => resolve(Object.keys(this.storageCache)),
  ));
}
