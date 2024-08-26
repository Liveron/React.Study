import { ReactNode, createContext, useContext, useReducer } from "react";
import Action from "../actions/Action";
import UserModel from "../models/UserModel";

const FAKE_USER = {
  name: "Jack",
  email: "jack@example.com",
  password: "qwerty",
  avatar: "https://i.pravatar.cc/100?u=zz",
};

type Context = {
  user: UserModel;
  isAuthenticated: boolean;
  login: (email: string, password: string) => void;
  logout: () => void;
};

const AuthContext = createContext<Context | undefined>(undefined);

type State = {
  user: UserModel;
  isAuthenticated: boolean;
};

const initialState: State = {
  user: new UserModel(),
  isAuthenticated: false,
};

function reducer(state: State, action: Action<string, UserModel>): State {
  switch (action.type) {
    case "login":
      return {
        ...state,
        user: action.payload || state.user,
        isAuthenticated: true,
      };
    case "logout":
      return { ...state, user: new UserModel(), isAuthenticated: false };
    default:
      throw new Error("Unknown action");
  }
}

type AuthProviderProps = {
  children: ReactNode;
};

export default function AuthProveder({ children }: AuthProviderProps) {
  const [{ user, isAuthenticated }, dispatch] = useReducer(
    reducer,
    initialState
  );

  function login(email: string, password: string) {
    if (email === FAKE_USER.email && password === FAKE_USER.password)
      dispatch({ type: "login", payload: FAKE_USER });
  }

  function logout() {
    dispatch({ type: "logout" });
  }

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined)
    throw new Error("Auth context was used outside AuthProvider");
  return context;
}
