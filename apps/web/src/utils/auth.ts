import cookies from "nookies";

export const login = (token: string) => {
  cookies.set(null, "token", token);
};

export const logout = () => {
  cookies.destroy(null, "token");
};
