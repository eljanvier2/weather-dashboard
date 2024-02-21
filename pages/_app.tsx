import "@/styles/globals.css";
import "@/styles/weatherpage.css";
import "@/styles/weeklyforecast.css";
import "@/styles/othercities.css";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}
