import '../styles/globals.css';
import 'bootstrap/dist/css/bootstrap.css';
import Head from "next/head";

export default function OOPG({ Component, pageProps }){
  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <title>OOOPG</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Component {...pageProps} />
    </>
  )
};
