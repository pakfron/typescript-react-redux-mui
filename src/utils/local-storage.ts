const ACCESS_TOKEN: string = "accessToken";
export const getAccessToken = () => {
  return localStorage.getItem(ACCESS_TOKEN);
};

export const setAccessToken = (token: string) => {
  return localStorage.setItem(ACCESS_TOKEN, token);
};

export const removeAccessToken = () => {
  return localStorage.removeItem(ACCESS_TOKEN);
};
