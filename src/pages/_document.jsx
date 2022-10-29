import { Head, Html, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html className="h-full scroll-smooth" lang="en">
      <Head>
        <link rel="icon" href="https://fav.farm/🤘" />
      </Head>

      <body className="antialiased">
        <Main />

        <NextScript />
      </body>
    </Html>
  )
}
