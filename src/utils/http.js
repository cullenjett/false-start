export const createClient = (options) => {
  const { baseUrl, fetch, getAuthToken } = options;

  return {
    get: (path) => {
      return fetch(baseUrl + path, {
        method: 'GET',
        headers: buildHeaders(getAuthToken),
      }).then(handleResponse);
    },

    post: (path, body) => {
      return fetch(baseUrl + path, {
        method: 'POST',
        headers: buildHeaders(getAuthToken),
        body,
      }).then(handleResponse);
    },
  };
};

function buildHeaders(getAuthToken) {
  const headers = {};

  let authToken;
  if (getAuthToken) {
    authToken = getAuthToken();
  }

  if (authToken) {
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
