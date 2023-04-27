import "~/styles/globals.css";
import { type AppType } from "next/app";
import { api } from "~/server/api";
import { Toaster } from "react-hot-toast";
import { ClerkProvider } from "@clerk/nextjs";
import Head from "next/head";
import { Layout } from "~/components/layout";
import { Toast } from "~/components/ui/toast";
import { Banner } from "~/components/ui/banner";
import { Provider as JotaiProvider } from "jotai";

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <ClerkProvider {...pageProps}>
      <JotaiProvider>
        <Head>
          <title>Satisfactory Plus Calculator</title>
          <meta name="description" content="Satisfactory Plus Calculator" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <Toaster position="bottom-center">{(t) => (<Toast toast={t} />)}</Toaster>
        <Banner />
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </JotaiProvider>
    </ClerkProvider>
  );
};

export default api.withTRPC(MyApp);
