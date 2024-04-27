import { Html, Head, Main, NextScript } from "next/document";
import TopBar from "./components/TopBar";

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body>
        <TopBar />
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
