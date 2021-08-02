import '../styles/globals.css';
import 'bootstrap/dist/css/bootstrap.css';
import Head from "next/head";

export default function OOPG({ Component, pageProps }){
  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <title>OOPG</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <link rel="icon" href="logo.png"></link>
      </Head>
      <Component {...pageProps} />
    </>
  )
};
