import { createStorage } from '../storage';

const setup = () => {
  const data = {};

  const localStorageMock = {
    getItem: jest.fn((key) => data[key] || null),
    setItem: jest.fn((key, value) => (data[key] = value)),
    removeItem: jest.fn((key) => delete data[key]),
  };

  const storage = createStorage({
    dataStore: localStorageMock,
    namespace: 'TEST',
  });

  return {
    data,
    localStorageMock,
    storage,
  };
};

describe('storage', () => {
  describe('.get()', () => {
    it('returns the stored value', async () => {
      const { storage, localStorageMock } = setup();

      await storage.set('USER_ID', 'abc-123');
      const value = await storage.get('USER_ID');

      expect(value).toEqual('abc-123');
      expect(localStorageMock.getItem).toHaveBeenCalledWith('TEST:USER_ID');
    });
  });

  describe('.set()', () => {
    it('saves the given value to the local device', async () => {
      const user = { id: 'abc-123' };
      const { storage, localStorageMock } = setup();

      await storage.set('USER', user);
      const value = await storage.get('USER');

      expect(value).toEqual(user);
      expect(localStorageMock.setItem).toHaveBeenCalledWith(
        'TEST:USER',
        JSON.stringify(user)
      );
    });
  });

  describe('.remove()', () => {
    it('removes the given value from the local device', async () => {
      let value;
      const { storage, localStorageMock } = setup();

      await storage.set('USER_ID', 'abc-123');
      value = await storage.get('USER_ID');

      expect(value).toBeTruthy();

      await storage.remove('USER_ID');
      value = await storage.get('USER_ID');

      expect(value).toEqual(null);
      expect(localStorageMock.removeItem).toHaveBeenCalledWith('TEST:USER_ID');
    });
  });
});
