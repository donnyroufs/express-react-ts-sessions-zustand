import makeRequest from "../utils/makeRequest";

class Auth {
  static async login(user: User) {
    return makeRequest("/login", {
      method: "POST",
      body: JSON.stringify(user),
    });
  }

  static async logout() {
    return makeRequest("/logout", {
      method: "DELETE",
    });
  }

  static async checkAuthStatus() {
    return makeRequest("/status");
  }
}

export default Auth;
