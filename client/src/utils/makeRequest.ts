async function makeRequest(endpoint: string, options?: RequestInit) {
  return fetch(endpoint, {
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "same-origin",
    ...options,
  });
}

export default makeRequest;
