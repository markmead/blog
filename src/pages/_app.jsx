import { useEffect, useRef } from 'react'

import Head from 'next/head'
import { useRouter } from 'next/router'

import '@/styles/tailwind.css'
import 'prismjs/themes/prism-okaidia.css'

import Header from '@/components/Header'
import Footer from '@/components/Footer'

function MyApp({ Component, pageProps }) {
  const nextRouter = useRouter()
  const innerContainerRef = useRef(null)

  useEffect(() => {
    const innerContainer = innerContainerRef.current

    innerContainer.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }, [nextRouter.asPath])

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

      <div className="overflow-hidden bg-white">
        <div className="flex flex-col h-screen max-w-2xl p-4 mx-auto sm:p-6">
          <div
            ref={innerContainerRef}
            className="px-4 pb-4 sm:pb-6 overflow-scroll border border-black sm:px-6 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:_none] [scrollbar-width:_none]"
          >
            <Header />

            <main className="py-8">
              <Component {...pageProps} />
            </main>

            <Footer />
          </div>
        </div>
      </div>
    </>
  )
}

export default MyApp
