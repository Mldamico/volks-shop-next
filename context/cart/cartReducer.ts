import { ICartProduct, ShippingAddress } from "../../interfaces";
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
    }
  | {
      type: "Cart - Load Address From Cookies";
      payload: ShippingAddress;
    }
  | {
      type: "Cart - Update Address";
      payload: ShippingAddress;
    }
  | {
      type: "Cart - Update Order Summary";
      payload: {
        numberOfItems: number;
        subtotal: number;
        tax: number;
        total: number;
      };
    }
  | {
      type: "Cart - Order Complete";
    };

export const cartReducer = (
  state: CartState,
  action: CartAction
): CartState => {
  switch (action.type) {
    case "Cart - LoadCart from cookies | storage":
      return {
        ...state,
        isLoaded: true,
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
    case "Cart - Update Order Summary": {
      return {
        ...state,
        ...action.payload,
      };
    }
    case "Cart - Load Address From Cookies":
    case "Cart - Update Address":
      return {
        ...state,
        shippingAddress: action.payload,
      };
    case "Cart - Order Complete":
      return {
        ...state,
        cart: [],
        numberOfItems: 0,
        subtotal: 0,
        tax: 0,
        total: 0,
      };
    default:
      return state;
  }
};
