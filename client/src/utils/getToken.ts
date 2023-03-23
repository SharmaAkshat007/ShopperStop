export const getAccessToken = (): string => {
  const token: string = sessionStorage.getItem("jwt-access-token") as string;

  return token;
};

export const getRefreshToken = (): string => {
  const token: string = sessionStorage.getItem("jwt-refresh-token") as string;

  return token;
};
