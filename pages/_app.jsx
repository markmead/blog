import '../styles/globals.css'

import Head from 'next/head'
import Script from 'next/script'

import Layout from '../components/Layout'
import Header from '../components/Header'
import Footer from '../components/Footer'

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>TALL Stack Developer | Mark Mead</title>
        <meta
          name="description"
          content="Web developer using the TALL stack to create eCommerce solutions for clients. Creator of HyperUI, the free open source Tailwind CSS component library."
          key="description"
        />
        <meta
          property="og:title"
          content="TALL Stack Developer | Mark Mead"
          key="og:title"
        />
        <meta
          property="og:description"
          content="Web developer using the TALL stack to create eCommerce solutions for clients. Creator of HyperUI, the free open source Tailwind CSS component library."
          key="og:description"
        />

        <link rel="icon" href="https://fav.farm/🦑" />
      </Head>

      <Script
        strategy="afterInteractive"
        src="https://www.googletagmanager.com/gtag/js?id=G-6JVZMZE949"
      />

      <Script
        id="gtag-init"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
              window.dataLayer=window.dataLayer||[]
              function gtag(){dataLayer.push(arguments)}
              gtag('js',new Date)
              gtag('config','G-6JVZMZE949')`,
        }}
      />

      <div className="max-w-prose mx-auto py-8 space-y-8">
        <Header />

        <Layout>
          <Component {...pageProps} />
        </Layout>

        <Footer />
      </div>
    </>
  )
}

export default MyApp
