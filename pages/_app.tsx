import "../styles/globals.scss";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Session } from "next-auth";
import type { AppProps } from "next/app";
import Header from "../components/Header";
import { SessionProvider } from "next-auth/react";

function MyApp({
    Component,
    pageProps: { session, ...pageProps },
}: AppProps<{ session: Session }>) {
    return (
        <SessionProvider session={session}>
            <Header />
            <Component {...pageProps} />
        </SessionProvider>
    );
}

export default MyApp;
