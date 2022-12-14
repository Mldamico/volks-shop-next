import { FC, useEffect, useReducer } from "react";
import { ICartProduct, ShippingAddress } from "../../interfaces";
import { CartContext, cartReducer } from "./";
import Cookie from "js-cookie";
import { volksApi } from "../../api";
import { IOrder } from "../../interfaces/order";
import axios from "axios";
export interface CartState {
  cart: ICartProduct[];
  numberOfItems: number;
  subtotal: number;
  tax: number;
  total: number;
  isLoaded: boolean;
  shippingAddress?: ShippingAddress;
}

const CART_INITIAL_STATE: CartState = {
  cart: [],
  numberOfItems: 0,
  subtotal: 0,
  tax: 0,
  total: 0,
  isLoaded: false,
  shippingAddress: undefined,
};

type Props = {
  children: JSX.Element;
};

export const CartProvider: FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, CART_INITIAL_STATE);
  useEffect(() => {
    try {
      const cookieProducts = Cookie.get("cart")
        ? JSON.parse(Cookie.get("cart")!)
        : [];
      dispatch({
        type: "Cart - LoadCart from cookies | storage",
        payload: cookieProducts,
      });
    } catch (err) {
      dispatch({
        type: "Cart - LoadCart from cookies | storage",
        payload: [],
      });
    }
  }, []);

  useEffect(() => {
    if (state.cart.length > 0) {
      Cookie.set("cart", JSON.stringify(state.cart));
    }
  }, [state.cart]);

  useEffect(() => {
    const numberOfItems = state.cart.reduce(
      (prev, current) => current.quantity + prev,
      0
    );
    const subtotal = state.cart.reduce(
      (prev, current) => current.quantity * current.price + prev,
      0
    );
    const taxRate = +process.env.NEXT_PUBLIC_TAX_RATE!;
    const orderSummary = {
      numberOfItems,
      subtotal,
      tax: subtotal * taxRate,
      total: subtotal * (taxRate + 1),
    };

    dispatch({ type: "Cart - Update Order Summary", payload: orderSummary });
  }, [state.cart]);

  useEffect(() => {
    if (Cookie.get("firstName")) {
      const shippingAddress = {
        firstName: Cookie.get("firstName") || "",
        lastName: Cookie.get("lastName") || "",
        address: Cookie.get("address") || "",
        address2: Cookie.get("address2") || "",
        zip: Cookie.get("zip") || "",
        city: Cookie.get("city") || "",
        country: Cookie.get("country") || "",
        phone: Cookie.get("phone") || "",
      };
      dispatch({
        type: "Cart - Load Address From Cookies",
        payload: shippingAddress,
      });
    }
  }, []);

  const addProductToCart = (product: ICartProduct) => {
    const productInCart = state.cart.some((p) => p._id === product._id);
    if (!productInCart) {
      return dispatch({
        type: "Cart - Update products in cart",
        payload: [...state.cart, product],
      });
    }
    const productInCartButSameSize = state.cart.some(
      (p) => p._id === product._id && p.size === product.size
    );
    if (!productInCartButSameSize) {
      return dispatch({
        type: "Cart - Update products in cart",
        payload: [...state.cart, product],
      });
    }

    const updatedProducts = state.cart.map((p) => {
      if (p._id !== product._id) return p;
      if (p.size !== product.size) return p;
      p.quantity += product.quantity;
      return p;
    });
    dispatch({
      type: "Cart - Update products in cart",
      payload: [...updatedProducts],
    });
  };

  const updateCartQuantity = (product: ICartProduct) => {
    dispatch({
      type: "Cart - Change Product Quantity",
      payload: product,
    });
  };

  const removeCartProduct = (product: ICartProduct) => {
    dispatch({
      type: "Cart - Delete Product",
      payload: product,
    });
  };

  const updateAddress = (address: ShippingAddress) => {
    Cookie.set("firstName", address.firstName);
    Cookie.set("lastName", address.lastName);
    Cookie.set("address", address.address);
    Cookie.set("address2", address.address2 || "");
    Cookie.set("zip", address.zip);
    Cookie.set("city", address.city);
    Cookie.set("country", address.country);
    Cookie.set("phone", address.phone);
    dispatch({ type: "Cart - Update Address", payload: address });
  };

  const createOrder = async (): Promise<{
    hasError: boolean;
    message: string;
  }> => {
    if (!state.shippingAddress) {
      throw new Error("There is no shipping address");
    }
    const body: IOrder = {
      orderItems: state.cart.map((p) => ({
        ...p,
        size: p.size!,
      })),
      shippingAddress: state.shippingAddress,
      numberOfItems: state.numberOfItems,
      subtotal: state.subtotal,
      tax: state.tax,
      total: state.total,
      isPaid: false,
    };
    try {
      const { data } = await volksApi.post("/orders", body);

      return {
        hasError: false,
        message: data._id,
      };
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return {
          hasError: true,
          message: error.response?.data.message,
        };
      }
      return {
        hasError: true,
        message: "Something wrong happened",
      };
    }
  };

  return (
    <CartContext.Provider
      value={{
        ...state,
        addProductToCart,
        updateCartQuantity,
        removeCartProduct,
        updateAddress,
        createOrder,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
