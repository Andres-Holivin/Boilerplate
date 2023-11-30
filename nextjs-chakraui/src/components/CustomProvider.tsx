"use client"
import { CacheProvider } from "@chakra-ui/next-js";
import { Box, ChakraProvider, ColorModeScript, theme } from "@chakra-ui/react";

export default function CustomProvider({ children, }: { children: React.ReactNode }) {
    return (
        <CacheProvider>
            <ChakraProvider theme={theme}>
                <ColorModeScript initialColorMode={theme.config.initialColorMode} />
                <Box w="100vw" h="100vh" minH="100vh">
                    {children}
                </Box>
            </ChakraProvider>
        </CacheProvider>
    )
}