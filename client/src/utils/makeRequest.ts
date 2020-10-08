async function makeRequest(endpoint: string, options?: RequestInit) {
  return fetch(endpoint, {
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    ...options,
  });
}

export default makeRequest;
