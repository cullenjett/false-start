import { log } from './log';

export const createClient = (options) => {
  const { baseUrl, fetch, getAuthToken } = options;

  return {
    get: (path) => {
      const url = baseUrl + path;
      return fetch(url, {
        method: 'GET',
        headers: buildHeaders(getAuthToken),
      })
        .then(handleResponse)
        .catch((err) => handleError(err, url));
    },

    post: (path, body) => {
      const url = baseUrl + path;
      return fetch(url, {
        method: 'POST',
        headers: buildHeaders(getAuthToken),
        body,
      })
        .then(handleResponse)
        .catch((err) => handleError(err, url));
    },
  };
};

if (process.env.NODE_ENV !== 'production') {
  window.createClient = createClient;
}

function buildHeaders(getAuthToken) {
  const headers = {};

  let authToken;
  if (getAuthToken) {
    authToken = getAuthToken();
    headers.Authorization = `Bearer ${authToken}`;
  }

  return new Headers(headers);
}

function handleResponse(res) {
  if (!res.ok) {
    return res.json().then((r) => Promise.reject(r));
  }

  return res.json();
}

function handleError(err, url) {
  log({ err, url });
  return Promise.reject(err);
}
