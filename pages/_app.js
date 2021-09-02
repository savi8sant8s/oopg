import '../styles/globals.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-slideshow-image/dist/styles.css';
import Head from "next/head";
import Footer from '../components/Footer';
import Menu from '../components/Menu';
import 'moment/locale/pt-br';

export default function OOPG({ Component, pageProps }) {
  return (
    <>
      <html lang="pt-br" />
      <Head>
        <meta charSet="utf-8" />
        <title>OOPG</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <link rel="icon" href="logo.png"></link>
      </Head>
      <Menu />
      <Component {...pageProps} />
      <Footer />
    </>
  )
};

