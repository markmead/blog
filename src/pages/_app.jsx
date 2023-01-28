import Head from 'next/head'

import '@/styles/tailwind.css'
import 'prismjs/themes/prism-okaidia.css'

import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Prose from '@/components/Prose'

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Web Developer | Mark Mead</title>
        <meta
          name="description"
          content="Creator of HyperUI and other less popular things."
          key="description"
        />
        <meta
          property="og:title"
          content="Web Developer | Mark Mead"
          key="og:title"
        />
        <meta
          property="og:description"
          content="Creator of HyperUI and other less popular things."
          key="og:description"
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.markmead.dev/" />
        <meta property="og:image" content="https://www.markmead.dev/og.jpg" />
        <meta
          name="twitter:title"
          content="Web Developer | Mark Mead"
          key="twitter:title"
        />
        <meta
          name="twitter:description"
          content="Creator of HyperUI and other less popular things."
          key="twitter:description"
        />
        <meta name="twitter:image" content="https://www.markmead.dev/og.jpg" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content="https://www.markmead.dev/" />
      </Head>

      <div className="p-4 sm:p-6 lg:p-8 min-h-screen flex flex-col justify-between bg-white">
        <div>
          <Header />

          <main>
            <div className="max-w-prose my-8 sm:my-10 lg:my-12 mx-auto">
              <Prose>
                <Component {...pageProps} />
              </Prose>
            </div>
          </main>
        </div>

        <Footer />
      </div>
    </>
  )
}

export default MyApp
