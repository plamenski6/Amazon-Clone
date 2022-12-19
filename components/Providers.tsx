"use client";

import { Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { store, persistor } from "../redux/store";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

type Props = {
    session: Session | null;
    children: React.ReactNode;
};

const Providers = ({ session, children }: Props) => {
    return (
        <SessionProvider session={session}>
            <Provider store={store}>
                <PersistGate loading={null} persistor={persistor}>
                    {children}
                </PersistGate>
            </Provider>
        </SessionProvider>
    );
};

export default Providers;
