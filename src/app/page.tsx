import React from "react";

interface MyAppProps {
  Component: React.ComponentType<any>;
  pageProps: any;
}

function MyApp({ Component, pageProps }: MyAppProps): JSX.Element {
  return <Component {...pageProps} />;
}

export default MyApp;
