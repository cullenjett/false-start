export const createClient = () => {
  return {
    get: jest.fn(() => new Promise((resolve) => setTimeout(resolve, 1))),
    post: jest.fn(() => new Promise((resolve) => setTimeout(resolve, 1))),
  };
};
