import { FC, useReducer } from "react";
import { AuthContext, authReducer } from "./";
import { IUser } from "../../interfaces/user";
import { volksApi } from "../../api";
import Cookies from "js-cookie";
export interface AuthState {
  isLoggedIn: boolean;
  user?: IUser;
}

const AUTH_INITIAL_STATE: AuthState = {
  isLoggedIn: false,
  user: undefined,
};

type Props = {
  children: JSX.Element;
};

export const AuthProvider: FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, AUTH_INITIAL_STATE);

  const loginUser = async (email: string, password: string) => {
    try {
      const { data } = await volksApi.post("/user/login", { email, password });
      const { token, user } = data;
      Cookies.set("token", token);
      dispatch({ type: "Auth - Login", payload: user });
      return true;
    } catch (error) {
      return false;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        ...state,
        loginUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
