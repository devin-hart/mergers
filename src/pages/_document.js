import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
        <title>M&A Search</title>
        <Head />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:wdth,wght@87.5,700&display=swap" rel="stylesheet" />
        <body className="antialiased">
            <Main />
            <NextScript />
        </body>
    </Html>
  );
}
