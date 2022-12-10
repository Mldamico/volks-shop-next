import "../styles/globals.css";
import type { AppProps } from "next/app";
import { SWRConfig } from "swr";
import { AuthProvider, CartProvider, UIProvider } from "../context";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <SWRConfig
      value={{
        fetcher: (resource, init) =>
          fetch(resource, init).then((res) => res.json()),
      }}
    >
      <AuthProvider>
        <CartProvider>
          <UIProvider>
            <Component {...pageProps} />
          </UIProvider>
        </CartProvider>
      </AuthProvider>
    </SWRConfig>
  );
}
