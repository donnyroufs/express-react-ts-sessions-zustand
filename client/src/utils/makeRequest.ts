import getCSRFToken from './getCSRFToken';
import Cookies from 'js-cookie'

async function makeRequest(endpoint: string, options?: RequestInit) {
  // const token = getCSRFToken()!;
  const token = Cookies.get('csrf-token')!
  console.log(token)
  
  return fetch(endpoint, {
    headers: {
      "Content-Type": "application/json",
      "x-csrf-token": token!
    },
    credentials: "same-origin",
    ...options,
  });
}

export default makeRequest;
