import { ICartProduct } from "../../interfaces";
import { CartState } from "./";

type CartAction =
  | {
      type: "Cart - LoadCart from cookies | storage";
      payload: ICartProduct[];
    }
  | {
      type: "Cart - Update products in cart";
      payload: ICartProduct[];
    }
  | {
      type: "Cart - Change Product Quantity";
      payload: ICartProduct;
    }
  | {
      type: "Cart - Delete Product";
      payload: ICartProduct;
    };

export const cartReducer = (
  state: CartState,
  action: CartAction
): CartState => {
  switch (action.type) {
    case "Cart - LoadCart from cookies | storage":
      return {
        ...state,
        cart: action.payload,
      };
    case "Cart - Update products in cart":
      return {
        ...state,
        cart: [...action.payload],
      };
    case "Cart - Change Product Quantity":
      return {
        ...state,
        cart: state.cart.map((product) => {
          if (product._id !== action.payload._id) return product;
          if (product.size !== action.payload.size) return product;

          return action.payload;
        }),
      };
    case "Cart - Delete Product": {
      return {
        ...state,
        cart: state.cart.filter((product) => {
          return !(
            product._id === action.payload._id &&
            product.size === action.payload.size
          );
        }),
      };
    }
    default:
      return state;
  }
};
