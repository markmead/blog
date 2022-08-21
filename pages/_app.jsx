import '../styles/globals.css'
import 'prismjs/themes/prism-okaidia.css'

import Head from 'next/head'
import Script from 'next/script'

import Layout from '../components/Layout'
import Header from '../components/Header'
import Footer from '../components/Footer'

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Web Developer | Mark Mead</title>
        <meta
          name="description"
          content="Creator of HyperUI and an eCommerce developer using the TALL stack and Shopify."
          key="description"
        />
        <meta
          property="og:title"
          content="Web Developer | Mark Mead"
          key="og:title"
        />
        <meta
          property="og:description"
          content="Creator of HyperUI and an eCommerce developer using the TALL stack and Shopify."
          key="og:description"
        />

        <link rel="icon" href="https://fav.farm/💐" />
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

      <div className="bg-white dark:bg-gray-900">
        <div className="max-w-2xl mx-auto p-4 sm:py-8 space-y-8">
          <Header />

          <Layout>
            <Component {...pageProps} />
          </Layout>

          <Footer />
        </div>
      </div>
    </>
  )
}

export default MyApp
