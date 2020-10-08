import create from "zustand";
import Auth from "../api/Auth";

const useStore = create<UserState>((set, get) => ({
  user: null,
  error: null,
  setUser(data: User | null) {
    set(() => ({ user: data }));
  },
  async login(e, user) {
    e.preventDefault();
    try {
      const res = await Auth.login(user);
      if (res.status === 200) {
        const data = await res.json();
        set(() => ({ user: data, error: null }));
      }
    } catch (err) {
      set(() => ({ error: err }));
    }
  },
  async logout(e) {
    e.preventDefault();
    try {
      const res = await Auth.logout();
      if (res.status === 200) {
        set(() => ({ user: null, error: null }));
      }
    } catch (err) {
      set(() => ({ error: err }));
    }
  },
  async status() {
    try {
      const res = await Auth.checkAuthStatus();
      if (res.status === 200) {
        const data = await res.json();
        set(() => ({ user: data, error: null }));
      }
    } catch (err) {
      set(() => ({ error: err }));
    }
  },
  isAuthenticated() {
    return !!get().user;
  },
}));

export default useStore;
