import makeRequest from "../utils/makeRequest";

class Auth {
  static async login(user: User) {
    try {
      const res = await makeRequest("/login", {
        method: "POST",
        body: JSON.stringify(user)
      })
      if(res.status !== 200) throw new Error();
      const data = await res.json();
      return [data, null];
    } catch(err) {
      return [null, err];
    }
  }

  static async logout() {
    try {
      const res = await makeRequest("/logout", {
        method: "DELETE",
      });
      if(res.status !== 200) throw new Error()
      return [null, null];
    } catch(err) {
      return [null, err]
    }
  }

  static async checkAuthStatus() {
    try {
      const res = await makeRequest("/status");
      if(res.status !== 200) throw new Error();
      const data = await res.json()
      return [data, null];
    } catch(err) {
      return [null, err];
    }
  }
}

export default Auth;
