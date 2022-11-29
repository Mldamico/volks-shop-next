import { FC, useReducer } from "react";
import { UIContext, uiReducer } from "./";

export interface UIState {
  sidemenuOpen: boolean;
}

const UI_INITIAL_STATE: UIState = {
  sidemenuOpen: false,
};

type Props = {
  children: JSX.Element;
};

export const UIProvider: FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(uiReducer, UI_INITIAL_STATE);

  const toggleSideMenu = () => {
    dispatch({ type: "UI - Toggle SideMenu" });
  };

  return (
    <UIContext.Provider
      value={{
        ...state,
        toggleSideMenu,
      }}
    >
      {children}
    </UIContext.Provider>
  );
};
