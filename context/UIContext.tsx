import { createContext } from "react";

interface ContextProps {
  sidemenuOpen: boolean;
  toggleSideMenu: () => void;
}

export const UIContext = createContext({} as ContextProps);
