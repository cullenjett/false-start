export const storage = {
  get: jest.fn(() => Promise.resolve('{}')),
  set: jest.fn(() => Promise.resolve(true)),
  remove: jest.fn(() => Promise.resolve(true)),
};
