import "../styles/globals.css";
import type { AppProps } from "next/app";
import { UIProvider } from "../context";
import { SWRConfig } from "swr";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <SWRConfig
      value={{
        fetcher: (resource, init) =>
          fetch(resource, init).then((res) => res.json()),
      }}
    >
      <UIProvider>
        <Component {...pageProps} />
      </UIProvider>
    </SWRConfig>
  );
}
