import { Cart } from "../types/cart";
import { User } from "../types/user";

export const setUser = (currUser: User) => {
  localStorage.setItem("curr-user", JSON.stringify(currUser));
};

export const getUser = (): User | null => {
  const user: string | null = localStorage.getItem("curr-user");
  if (user === null) return null;

  return JSON.parse(user);
};

export const removeUser = () => {
  localStorage.removeItem("curr-user");
};
