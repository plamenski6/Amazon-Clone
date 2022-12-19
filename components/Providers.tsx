"use client";

import { SessionProvider } from "next-auth/react";
import { store, persistor } from "../redux/store";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

type Props = {
    children: React.ReactNode;
};

const Providers = ({ children }: Props) => {
    return (
        <SessionProvider>
            <Provider store={store}>
                <PersistGate loading={null} persistor={persistor}>
                    {children}
                </PersistGate>
            </Provider>
        </SessionProvider>
    );
};

export default Providers;
