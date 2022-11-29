import { UIState } from "./";

type UIAction = {
  type: "UI - Toggle SideMenu";
};

export const uiReducer = (state: UIState, action: UIAction): UIState => {
  switch (action.type) {
    case "UI - Toggle SideMenu":
      return {
        ...state,
        sidemenuOpen: !state.sidemenuOpen,
      };
    default:
      return state;
  }
};
