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
    const [data, error] = await Auth.login(user)
    set(() => ({ user: data, error }))
  },
  async logout(e) {
    e.preventDefault();
    const [data, error] = await Auth.logout()
    set(() => ({ user: data, error }))
  },
  async status() {
    const [data, error] = await Auth.checkAuthStatus()
    set(() => ({ user: data, error }))
  },
  isAuthenticated() {
    return !!get().user;
  },
}));

export default useStore;
