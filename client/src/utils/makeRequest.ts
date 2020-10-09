import Cookies from 'js-cookie'

async function makeRequest(endpoint: string, options?: RequestInit) {
  return fetch(endpoint, {
    headers: {
      "Content-Type": "application/json",
      "x-csrf-token": Cookies.get("csrf-token") || ""
    },
    credentials: "same-origin",
    ...options,
  });
}

export default makeRequest;
