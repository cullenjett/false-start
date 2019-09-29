/**
 * createStorage() is a factory function that returns an object with methods
 * for interacting with device storage.
 */
export const createStorage = ({ dataStore, namespace }) => {
  const getFullKey = (key) => {
    return `${namespace}:${key}`;
  };

  return {
    get: (key) => {
      try {
        return Promise.resolve(JSON.parse(dataStore.getItem(getFullKey(key))));
      } catch (err) {
        return Promise.reject(err);
      }
    },

    set: (key, value) => {
      try {
        dataStore.setItem(getFullKey(key), JSON.stringify(value));
        return Promise.resolve(true);
      } catch (err) {
        return Promise.reject(err);
      }
    },

    remove: (key) => {
      try {
        dataStore.removeItem(getFullKey(key));
        return Promise.resolve(true);
      } catch (err) {
        return Promise.reject(err);
      }
    },
  };
};

export const storage = createStorage({
  dataStore: localStorage,
  namespace: 'APP',
});

if (process.env.NODE_ENV !== 'production') {
  window.appStorage = storage;
}
