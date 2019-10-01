import { Headers, Response } from 'node-fetch';

import { createClient } from '../http';

global.Headers = Headers;
global.Response = Response;

const createFetchMock = (response = {}, status = 200) => {
  return jest.fn(() => {
    return Promise.resolve(
      new Response(JSON.stringify(response), {
        status,
      })
    );
  });
};

const setup = (options) => {
  const fetch = createFetchMock();

  const defaultOptions = {
    baseUrl: 'http://localhost:3000',
    getAuthToken: undefined,
    fetch,
  };

  const client = createClient({
    ...defaultOptions,
    ...options,
  });

  return {
    ...client,
    fetch,
  };
};

describe('createClient', () => {
  describe('.get()', () => {
    it('calls options.fetch', async () => {
      const { get, fetch } = setup();

      await get('/api');

      expect(fetch).toHaveBeenCalled();
    });

    it('appends the given path to the baseUrl', async () => {
      const { get, fetch } = setup({
        baseUrl: 'http://localhost:3000',
      });

      await get('/api');

      expect(fetch).toHaveBeenCalledWith(
        'http://localhost:3000/api',
        expect.any(Object)
      );
    });

    it('pulls an auth token and appends it as the "Authorization" header', async () => {
      const { get, fetch } = setup({
        getAuthToken: jest.fn(() => 'AUTH_TOKEN'),
      });

      await get('/api');

      expect(fetch).toHaveBeenCalledWith(expect.any(String), {
        method: 'GET',
        headers: new Headers({
          Authorization: 'Bearer AUTH_TOKEN',
        }),
      });
    });

    it('treats all non-2xx response statuses as errors', () => {
      const errorRes = {
        message: 'Unauthorized',
        statusCode: 'ACCESS_DENIED',
      };

      const fetch = createFetchMock(errorRes, 404);
      const { get } = setup({
        fetch,
      });

      return expect(get('/api')).rejects.toEqual(errorRes);
    });
  });

  describe('.post()', () => {
    it('calls options.fetch', async () => {
      const { post, fetch } = setup();

      await post('/api', { foo: 'bar' });

      expect(fetch).toHaveBeenCalled();
    });

    it('appends the given path to the baseUrl', async () => {
      const { post, fetch } = setup({
        baseUrl: 'http://localhost:3000',
      });

      await post('/api', { foo: 'bar' });

      expect(fetch).toHaveBeenCalledWith(
        'http://localhost:3000/api',
        expect.any(Object)
      );
    });

    it('pulls an auth token and appends it as the "Authorization" header', async () => {
      const { post, fetch } = setup({
        getAuthToken: jest.fn(() => 'AUTH_TOKEN'),
      });

      await post('/api', { foo: 'bar' });

      expect(fetch).toHaveBeenCalledWith(expect.any(String), {
        method: 'POST',
        headers: new Headers({
          Authorization: 'Bearer AUTH_TOKEN',
        }),
        body: { foo: 'bar' },
      });
    });

    it('treats all non-2xx response statuses as errors', () => {
      const errorRes = {
        message: 'Unauthorized',
        statusCode: 'ACCESS_DENIED',
      };

      const fetch = createFetchMock(errorRes, 404);
      const { post } = setup({
        fetch,
      });

      return expect(post('/api')).rejects.toEqual(errorRes);
    });
  });
});
