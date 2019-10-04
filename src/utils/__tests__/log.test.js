import { log } from '../log';

describe('log()', () => {
  let env, consoleSpy, dateSpy;

  // The log() function is a noop when NODE_ENV === 'test', so we
  // need to manually set the environment. We also mock console and Date.
  beforeEach(() => {
    env = process.env.NODE_ENV;
    process.env.NODE_ENV = 'production';
    consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
    dateSpy = jest.spyOn(window, 'Date').mockImplementation(() => {
      return {
        toISOString: () => 'TEST_TIME',
      };
    });
  });

  afterEach(() => {
    process.env.NODE_ENV = env;
    consoleSpy.mockRestore();
    dateSpy.mockRestore();
  });

  it('logs to the console in non-production environments', () => {
    const data = { error: new Error('something went wrong') };
    const _env = process.env.NODE_ENV;
    process.env.NODE_ENV = 'development';

    log(data);

    expect(console.log).toHaveBeenCalledWith({
      ...data,
      date: 'TEST_TIME',
    });

    process.env.NODE_ENV = _env;
  });

  it('does not log to the console in production environments', () => {
    log({ error: new Error('something went wrong') });

    expect(console.log).not.toHaveBeenCalled();
  });
});
