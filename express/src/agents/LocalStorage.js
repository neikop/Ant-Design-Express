const localConstants = {
  ACTIVE_USER: 'active_user',
  AUTH_TOKEN: 'auth_token',
};

const setItemObject = (key, object) => localStorage.setItem(key, JSON.stringify(object));
const getItemObject = (key) => JSON.parse(localStorage.getItem(key));
const clear = () => localStorage.clear();

const setAuthToken = (token) => setItemObject(localConstants.AUTH_TOKEN, token);
const getAuthToken = () => getItemObject(localConstants.AUTH_TOKEN);

const setActiveUser = (user) => setItemObject(localConstants.ACTIVE_USER, user);
const getActiveUser = () => getItemObject(localConstants.ACTIVE_USER);

export const storageAgent = {
  clear,

  setAuthToken,
  getAuthToken,

  setActiveUser,
  getActiveUser,
};
