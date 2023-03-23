import {
  useState,
  createContext,
  Dispatch,
  SetStateAction,
  ReactNode,
} from "react";

export type User = {
  loggedIn: boolean;
  firstName: string;
  lastName: string;
  email: string;
  accessToken: string;
  refreshToken: string;
};

export interface UserContextInterface {
  user: User;
  setUser: Dispatch<SetStateAction<User>>;
}

export const defaultState: UserContextInterface = {
  user: {
    loggedIn: false,
    firstName: "",
    lastName: "",
    email: "",
    accessToken: "",
    refreshToken: "",
  },
  setUser: (user: User) => {},
} as UserContextInterface;

export const UserContext = createContext(defaultState);

type UserProviderProps = {
  children: ReactNode;
};

export function UserProvider({ children }: UserProviderProps) {
  const [user, setUser] = useState<User>(defaultState.user);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}
