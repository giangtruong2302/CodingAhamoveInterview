import Layout from "../src/component/Layout";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  const renderWithLayout =
    Component.getLayout ||
    function (page) {
      return <Layout>{page}</Layout>;
    };
  return (
    <div>
      <Component {...pageProps} />
    </div>
  );
}

export default MyApp;
