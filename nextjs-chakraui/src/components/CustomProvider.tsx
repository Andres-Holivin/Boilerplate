"use client"
import { persistor, store } from "@/redux/store";
import { CacheProvider } from "@chakra-ui/next-js";
import { Box, ChakraProvider, ColorModeScript, theme } from "@chakra-ui/react";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import LoadingPage from "./LoadingPage";

export default function CustomProvider({ children, }: { children: React.ReactNode }) {
    return (
        <Provider store={store}>
            {/* <CacheProvider> */}
            <ColorModeScript initialColorMode={theme.config.initialColorMode} />
            <ChakraProvider theme={theme} cssVarsRoot="body">
                <Box w="100vw" h="100vh" minH="100vh">
                    <PersistGate loading={<LoadingPage />} persistor={persistor}>
                        {children}
                    </PersistGate>
                </Box>
            </ChakraProvider>
            {/* </CacheProvider> */}
        </Provider>
    )
}