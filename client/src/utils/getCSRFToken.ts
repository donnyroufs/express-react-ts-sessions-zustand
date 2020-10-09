import Cookies from 'js-cookie';

function getCSRFToken() {
  return Cookies.get('csrf-token')
}

export default getCSRFToken;