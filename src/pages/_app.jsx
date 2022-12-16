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
          content="Creator of open source projects such as HyperUI, HyperJS, Hypercolor and a range of JavaScript and Alpine JS plugins."
          key="description"
        />
        <meta
          property="og:title"
          content="Web Developer | Mark Mead"
          key="og:title"
        />
        <meta
          property="og:description"
          content="Creator of open source projects such as HyperUI, HyperJS, Hypercolor and a range of JavaScript and Alpine JS plugins."
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
          content="Creator of open source projects such as HyperUI, HyperJS, Hypercolor and a range of JavaScript and Alpine JS plugins."
          key="twitter:description"
        />
        <meta name="twitter:image" content="https://www.markmead.dev/og.jpg" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content="https://www.markmead.dev/" />
      </Head>

      <div className="p-4 sm:p-6 lg:p-8">
        <div className="mx-auto space-y-8 max-w-prose">
          <Header />

          <main>
            <Prose>
              <Component {...pageProps} />
            </Prose>
          </main>

          <Footer />
        </div>
      </div>
    </>
  )
}

export default MyApp
