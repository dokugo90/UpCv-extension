import type { ReactNode } from "react";
import { Provider } from "react-redux";

import { PersistGate } from "@plasmohq/redux-persist/integration/react"
import { persistor, store } from "@/redux/store"


export default function Providers({ children }: { children: React.ReactNode }) {
    return (
        <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        {children}
      </PersistGate>
    </Provider>
    )
}