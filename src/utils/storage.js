export const createStorage = ({ namespace }) => {
  const getFullKey = (key) => {
    return `${namespace}:${key}`;
  };

  return {
    get: (key) => {
      try {
        return Promise.resolve(
          JSON.parse(localStorage.getItem(getFullKey(key)))
        );
      } catch (err) {
        return Promise.reject(err);
      }
    },

    set: (key, value) => {
      try {
        localStorage.getItem(getFullKey(key), JSON.stringify(value));
        return Promise.resolve(true);
      } catch (err) {
        return Promise.reject(err);
      }
    },

    delete: (key) => {
      try {
        localStorage.removeItem(getFullKey(key));
        return Promise.resolve(true);
      } catch (err) {
        return Promise.reject(err);
      }
    },
  };
};

export default createStorage({ namespace: 'APP' });
