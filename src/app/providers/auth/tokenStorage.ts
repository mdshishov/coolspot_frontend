const REFRESH_KEY = "refresh_token";

export const tokenStorage = {
  getRefresh() {
    return localStorage.getItem(REFRESH_KEY);
  },

  setRefresh(refresh: string) {
    localStorage.setItem(REFRESH_KEY, refresh);
  },

  removeRefresh() {
    localStorage.removeItem(REFRESH_KEY);
  },
};
